import { Envelope, FactoryInterface, Options, QueueableInterface, Response, Theme } from './types';
import FlasherFactory from './flasherFactory';

export default class Flasher {
  private defaultHandler = 'theme.flasher';
  private factories: Map<string, FactoryInterface> = new Map<string, FactoryInterface>();
  private themes: Map<string, Theme> = new Map<string, Theme>();

  public success(message: string, title: string, options: Options): void {
    this.flash('success', message, title, options);
  }

  public info(message: string, title: string, options: Options): void {
    this.flash('info', message, title, options);
  }

  public warning(message: string, title: string, options: Options): void {
    this.flash('warning', message, title, options);
  }

  public error(message: string, title: string, options: Options): void {
    this.flash('error', message, title, options);
  }

  public flash(type: string, message: string, title: string, options: Options): void {
    const factory = this.create(this.defaultHandler);

    factory.renderOptions({});
    factory.render([{ message, title, type, options }]);
  }

  public create(alias: string): FactoryInterface {
    alias = this.resolveHandler(alias);
    this.resolveThemeHandler(alias);

    const factory = this.factories.get(alias);
    if (!factory) {
      throw new Error(`Unable to resolve "${alias}" notification factory, did you forget to register it?`);
    }

    return factory;
  }

  public renderOptions(options: Options): void {
    Object.entries(options).forEach(([handler, option]) => {
      this.create(handler).renderOptions(option);
    });
  }

  public render(response: Response): void {
    response = this.resolveResponse(response);

    this.addStyles(response.styles || [], () => {
      this.addScripts(response.scripts || [], () => {
        this.renderOptions(response.options || {});
        this.renderEnvelopes(response.envelopes, response.context);
      });
    });
  }

  public addFactory(name: string, factory: FactoryInterface): void {
    this.factories.set(name, factory);
  }

  public addTheme(name: string, theme: Theme): void {
    this.themes.set(name, theme);
  }

  public using(name: string): Flasher {
    this.defaultHandler = name;

    return this;
  }

  public addStyles(urls: string[], callback: () => void): void {
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

  public addScripts(urls: string[], callback: () => void): void {
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

  public renderEnvelopes(envelopes: Envelope[], context: ResponseContext): void {
    const queues = new Map<string, QueueableInterface>();

    envelopes.forEach((envelope) => {
      envelope.context = { ...envelope.context, ...context };
      envelope.metadata.handler = this.resolveHandler(envelope.metadata.handler);

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

    queues.forEach((factory) => factory.renderQueue());
  }

  private isQueueable(object: any): object is QueueableInterface {
    return (
      typeof object.addEnvelope === 'function' && typeof object.renderQueue === 'function'
    );
  }

  private resolveResponse(response: Response): Response {
    response.envelopes = response.envelopes || [];
    response.options = response.options || {};
    response.scripts = response.scripts || [];
    response.styles = response.styles || [];
    response.context = response.context || {};

    Object.entries(response.options).forEach(([handler, options]) => {
      response.options[handler] = this.parseOptions(options);
    });

    response.envelopes.forEach((envelope) => {
      envelope.metadata.handler = this.resolveHandler(envelope.metadata.handler);
      envelope.options = this.parseOptions(envelope.options || {});
      this.pushStyles(response, envelope.metadata.handler);
    });

    return response;
  }

  private parseOptions(options: Options): Options {
    Object.entries(options).forEach(([key, value]) => {
      options[key] = this.parseFunction(value);
    });

    return options;
  }

  private parseFunction(func: any): any {
    if (typeof func !== 'string') {
      return func;
    }

    const match = func.match(
      /^function(?:.+)?(?:\s+)?\((.+)?\)(?:\s+|\n+)?{(?:\s+|\n+)?((?:.|\n)+)}$/m
    );

    if (!match) {
      return func;
    }

    const args = match[1]?.split(',').map((arg) => arg.trim()) ?? [];
    const body = match[2];

    // eslint-disable-next-line no-new-func
    return new Function(...args, body);
  }

  private pushStyles(response: Response, handler: string): void {
    handler = handler.replace('theme.', '');
    const styles = this.themes.get(handler)?.styles || [];

    response.styles = Array.from(new Set([...response.styles, ...styles]));
  }

  private resolveHandler(handler?: string): string {
    handler = handler || this.defaultHandler;

    return 'flasher' === handler ? 'theme.flasher' : handler;
  }

  private resolveThemeHandler(alias: string): void {
    const factory = this.factories.get(alias);
    if (factory) {
      return;
    }

    if (alias.includes('theme.')) {
      return;
    }

    const viewFactory = this.themes.get(alias.replace('theme.', ''))
    if (!viewFactory) {
      return;
    }

    this.addFactory(alias, new FlasherFactory(viewFactory));
  }
}
