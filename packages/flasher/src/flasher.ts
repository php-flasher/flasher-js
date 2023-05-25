import {
  Envelope,
  FlasherNotification,
  FlasherOptions,
  FlasherResponse,
  FlasherResponseOptions,
  NotificationFactoryInterface,
  QueueableInterface,
  ResponseContext,
  Theme,
} from './common';

import FlasherFactory from './flasherFactory';

export default class Flasher {
  private defaultHandler = 'theme.flasher';

  private factories: Map<string, NotificationFactoryInterface> = new Map<string, NotificationFactoryInterface>();

  private themes: Map<string, Theme> = new Map<string, Theme>();

  success(message: string | FlasherOptions, title?: string | FlasherOptions, options?: FlasherOptions): void {
    this.flash('success', message, title, options);
  }

  info(message: string | FlasherOptions, title?: string | FlasherOptions, options?: FlasherOptions): void {
    this.flash('info', message, title, options);
  }

  warning(message: string | FlasherOptions, title?: string | FlasherOptions, options?: FlasherOptions): void {
    this.flash('warning', message, title, options);
  }

  error(message: string | FlasherOptions, title?: string | FlasherOptions, options?: FlasherOptions): void {
    this.flash('error', message, title, options);
  }

  flash(type: string | FlasherOptions, message: string | FlasherOptions, title?: string | FlasherOptions, options?: FlasherOptions): void {
    const notification = this.createNotification(type, message, title, options);
    const factory = this.create(this.defaultHandler);

    factory.renderOptions({});
    factory.render({ notification });
  }

  createNotification(
    type: string | FlasherOptions,
    message?: string | FlasherOptions,
    title?: string | FlasherOptions,
    options?: FlasherOptions,
  ): FlasherNotification {
    if (typeof type === 'object') {
      options = type;
      type = options.type as unknown as string;
      message = options.message as unknown as string;
      title = options.title as unknown as string;
    } else if (typeof message === 'object') {
      options = message;
      message = options.message as unknown as string;
      title = options.title as unknown as string;
    } else if (typeof title === 'object') {
      options = title;
      title = options.title as unknown as string;
    }

    if (undefined === message) {
      throw new Error('message option is required');
    }

    return {
      type: type || 'info',
      message,
      title,
      options,
    };
  }

  create(alias: string): NotificationFactoryInterface {
    alias = this.resolveHandler(alias);
    this.resolveThemeHandler(alias);

    const factory = this.factories.get(alias);
    if (!factory) {
      throw new Error(`Unable to resolve "${alias}" notification factory, did you forget to register it?`);
    }

    return factory;
  }

  renderOptions(options: FlasherResponseOptions): void {
    Object.entries(options).forEach(([handler, option]) => {
      this.create(handler).renderOptions(option);
    });
  }

  render(response: FlasherResponse): void {
    response = this.resolveResponse(response);

    this.addStyles(response.styles, () => {
      this.addScripts(response.scripts, () => {
        this.renderOptions(response.options);
        this.renderEnvelopes(response.envelopes, response.context);
      });
    });
  }

  addFactory(name: string, factory: NotificationFactoryInterface): void {
    this.factories.set(name, factory);
  }

  addTheme(name: string, theme: Theme): void {
    this.themes.set(name, theme);
  }

  using(name: string): Flasher {
    this.defaultHandler = name;

    return this;
  }

  addStyles(urls: string[], callback: CallableFunction): void {
    if (urls.length === 0) {
      if (typeof callback === 'function') {
        callback();
      }
      return;
    }

    if (document.querySelector(`link[href="${urls[0]}"]`) !== null) {
      this.addStyles(urls.slice(1), callback);
      return;
    }

    const tag = document.createElement('link');

    tag.setAttribute('href', urls[0]);
    tag.setAttribute('type', 'text/css');
    tag.setAttribute('rel', 'stylesheet');
    tag.onload = () => this.addStyles(urls.slice(1), callback);

    document.head.appendChild(tag);
  }

  addScripts(urls: string[], callback: CallableFunction): void {
    if (urls.length === 0) {
      if (typeof callback === 'function') {
        callback();
      }
      return;
    }

    if (document.querySelector(`script[src="${urls[0]}"]`) !== null) {
      this.addScripts(urls.slice(1), callback);
      return;
    }

    const tag = document.createElement('script');

    tag.setAttribute('src', urls[0]);
    tag.setAttribute('type', 'text/javascript');
    tag.onload = () => this.addScripts(urls.slice(1), callback);

    document.head.appendChild(tag);
  }

  renderEnvelopes(envelopes: Envelope[], context: ResponseContext): void {
    const queues = new Map<string, QueueableInterface>();

    envelopes.forEach((envelope) => {
      envelope.context = Object.assign({}, envelope.context || {}, context);
      envelope.handler = this.resolveHandler(envelope.handler);

      const factory = this.create(envelope.handler);
      if (!this.isQueueable(factory)) {
        factory.render(envelope);
        return;
      }

      if (!queues.get(envelope.handler)) {
        factory.resetQueue();
      }

      factory.addEnvelope(envelope);
      queues.set(envelope.handler, factory);
    });

    queues.forEach(factory => factory.renderQueue());
  }

  isQueueable(object: any): object is QueueableInterface {
    return typeof object.addEnvelope === 'function'
      && typeof object.renderQueue === 'function';
  }

  resolveResponse(response: FlasherResponse): FlasherResponse {
    response.envelopes = response.envelopes || [];
    response.options = response.options || {};
    response.scripts = response.scripts || [];
    response.styles = response.styles || [];
    response.context = response.context || {};

    Object.entries(response.options).forEach(([handler, options]) => {
      response.options[handler] = this.parseOptions(options);
    });

    response.envelopes.forEach(envelope => {
      envelope.handler = this.resolveHandler(envelope.handler);
      envelope.notification.options = this.parseOptions(envelope.notification.options || {});
      this.pushStyles(response, envelope.handler);
    });

    return response;
  }

  parseOptions(options: FlasherOptions): FlasherOptions {
    Object.entries(options).forEach(([key, value]) => {
      options[key] = this.parseFunction(value);
    });

    return options;
  }

  parseFunction(func: any): any {
    if (typeof func !== 'string') {
      return func;
    }

    const match = func.match(/^function(?:.+)?(?:\s+)?\((.+)?\)(?:\s+|\n+)?{(?:\s+|\n+)?((?:.|\n)+)}$/m);

    if (!match) {
      return func;
    }

    const args = match[1]?.split(',').map(arg => arg.trim()) ?? [];
    const body = match[2];

    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    return new Function(...args, body);
  }

  pushStyles(response: FlasherResponse, handler: string): void {
    handler = handler.replace('theme.', '');
    const styles = this.themes.get(handler)?.styles || [];

    response.styles = response.styles
      .concat(styles)
      .filter((value, index, self) => self.indexOf(value) === index);
  }

  resolveHandler(handler?: string): string {
    handler = handler || this.defaultHandler;

    if (['flasher', 'theme', 'template'].includes(handler)) {
      handler = 'theme.flasher';
    }

    handler = handler.replace('template.', 'theme.');

    return handler;
  }

  resolveThemeHandler(alias: string): void {
    const factory = this.factories.get(alias);
    if (factory) {
      return;
    }

    if (0 !== alias.indexOf('theme.')) {
      return;
    }

    const viewFactory = this.themes.get(alias.replace('theme.', ''));
    if (!viewFactory) {
      return;
    }

    this.addFactory(alias, new FlasherFactory(viewFactory));
  }
}
