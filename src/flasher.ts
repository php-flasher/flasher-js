import {
  FlasherInterface,
  FlasherResponse,
  Envelope,
  FlasherResponseOptions,
} from './interfaces';

export default class Flasher {
  private static instance: Flasher;

  private factories: Map<string, FlasherInterface>;

  private constructor() {
    this.factories = new Map<string, FlasherInterface>();
  }

  public static getInstance(): Flasher {
    if (!Flasher.instance) {
      Flasher.instance = new Flasher();
    }

    return Flasher.instance;
  }

  public render(response: FlasherResponse): void {
    this.addStyles(response.styles, () => {
      this.addScripts(response.scripts, () => {
        this.renderOptions(response.options);
        this.renderEnvelopes(response.envelopes);
      });
    });
  }

  public addStyles(urls: string[], callback: CallableFunction): void {
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

  public addScripts(urls: string[], callback: CallableFunction): void {
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

  public renderOptions(options: FlasherResponseOptions): void {
    Object.entries(options).forEach(([handler, option]) => {
      const factory = this.create(handler);
      if (undefined !== factory) {
        factory.renderOptions(option);
      }
    });
  }

  public renderEnvelopes(envelopes: Envelope[]): void {
    envelopes.forEach((envelope) => {
      const factory = this.create(envelope.handler);
      if (undefined !== factory) {
        factory.render(envelope);
      }
    });
  }

  public create(alias: string): FlasherInterface|undefined {
    return this.factories.get(alias);
  }

  public addFactory(name: string, driver: FlasherInterface): void {
    this.factories.set(name, driver);
  }
}
