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
} from './interfaces';

import TemplateFactory from './template';
import { parseFunction } from './parseFunction';

export default class Flasher {
  private defaultHandler: string = 'template.flasher';

  private factories: Map<string, NotificationFactoryInterface> = new Map<string, NotificationFactoryInterface>();

  private themes: Map<string, Theme> = new Map<string, Theme>();

  success(message: string, title?: string, options?: FlasherOptions): void {
    this.flash({ type: 'success', message, title, options });
  }

  info(message: string, title?: string, options?: FlasherOptions): void {
    this.flash({ type: 'info', message, title, options });
  }

  warning(message: string, title?: string, options?: FlasherOptions): void {
    this.flash({ type: 'warning', message, title, options });
  }

  error(message: string, title?: string, options?: FlasherOptions): void {
    this.flash({ type: 'error', message, title, options });
  }

  flash(notification: FlasherNotification): void {
    const factory = this.create(this.defaultHandler);
    if (!factory) {
      return;
    }

    notification.type = notification.type || 'info';

    factory.renderOptions({});
    factory.render({ notification });
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

  create(alias: string): NotificationFactoryInterface | undefined {
    alias = this.resolveHandler(alias);

    if (0 === alias.indexOf('template.') && !this.factories.has(alias)) {
      let viewFactory = this.themes.get(alias.replace('template.', ''));
      if (viewFactory) {
        this.addFactory(alias, new TemplateFactory(viewFactory));
      }
    }

    return this.factories.get(alias);
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

    document.body.appendChild(tag);
  }

  renderOptions(options: FlasherResponseOptions): void {
    Object.entries(options).forEach(([handler, option]) => {
      const factory = this.create(handler);
      if (factory) {
        factory.renderOptions(option);
      }
    });
  }

  renderEnvelopes(envelopes: Envelope[], context: ResponseContext): void {
    const queues = new Map<string, QueueableInterface>();
    envelopes.forEach((envelope) => {
      envelope.context = context;
      envelope.handler = this.resolveHandler(envelope.handler);

      const factory = this.create(envelope.handler);
      if (undefined !== factory) {
        if (this.isQueueable(factory)) {
          if (!queues.get(envelope.handler)) {
            factory.resetQueue();
          }
          factory.addEnvelope(envelope);
          queues.set(envelope.handler, factory);
        } else {
          factory.render(envelope);
        }
      }
    });

    queues.forEach((factory) => {
      factory.renderQueue();
    });
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
      options[key] = parseFunction(value);
    });

    return options;
  }

  pushStyles(response: FlasherResponse, handler: string): void {
    handler = handler.replace('template.', '');
    const styles = this.themes.get(handler)?.styles || [];

    response.styles = response.styles
      .concat(styles)
      .filter((value, index, self) => self.indexOf(value) === index);
  }

  resolveHandler(handler?: string): string {
    handler = handler || this.defaultHandler;

    if ('template' === handler) {
      handler = 'template.flasher';
    }

    return handler;
  }
}
