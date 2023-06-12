import { Envelope, FactoryInterface, Options, Theme } from './types';
import { Properties } from 'csstype';

export default class FlasherFactory implements FactoryInterface {
  private viewFactory: Theme;
  private options = {
    timeout: 5000,
    fps: 30,
    position: 'top-right',
    direction: 'top',
    rtl: false,
    style: {} as Properties,
    darkMode: 'media',
  };

  constructor(viewFactory: Theme) {
    this.viewFactory = viewFactory;
  }

  public success(message: string | Options, title?: string | Options, options?: Options): void {
    this.flash('success', message, title, options);
  }

  public info(message: string | Options, title?: string | Options, options?: Options): void {
    this.flash('info', message, title, options);
  }

  public warning(message: string | Options, title?: string | Options, options?: Options): void {
    this.flash('warning', message, title, options);
  }

  public error(message: string | Options, title?: string | Options, options?: Options): void {
    this.flash('error', message, title, options);
  }

  public flash(type: string | Options, message: string | Options, title?: string | Options, options?: Options): void {
    const notification = this.createNotification(type, message, title, options);

    this.renderOptions({});
    this.render({ notification });
  }

  public createNotification(type: string | Options, message?: string | Options, title?: string | Options, options?: Options): FlasherNotification {
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

  public render(envelope: Envelope): void {
    const { notification } = envelope;

    const nOptions = notification.options || {};
    const options = Array.isArray(nOptions) ? this.options : { ...this.options, ...nOptions };

    const onContainerReady = () => {
      const container = this.createContainer(options);
      this.addToContainer(container, envelope, options);
    };

    if ('loading' !== document.readyState) {
      onContainerReady();
      return;
    }

    document.addEventListener('DOMContentLoaded', onContainerReady);
  }

  public renderOptions(options: Options): void {
    this.options = { ...this.options, ...options };

    this.applyDarkMode();
  }

  public createContainer(options: { position: string; style: Properties }): HTMLDivElement {
    const containerSelector = `.fl-main-container[data-position="${options.position}"]`;
    let container = document.querySelector(containerSelector) as HTMLDivElement;
    if (container) {
      container.dataset.turboCache = 'false';
      return container;
    }

    container = document.createElement('div');
    container.classList.add('fl-main-container');
    container.dataset.position = options.position;
    container.dataset.turboCache = 'false';

    Object.keys(options.style).forEach((key: string) => {
      container?.style.setProperty(key, options.style[key as keyof Properties] as string);
    });

    document.body.append(container);

    return container;
  }

  public addToContainer(
    container: HTMLDivElement,
    envelope: Envelope,
    options: { direction: string; timeout: number; fps: number; rtl: boolean }
  ): void {
    const template = this.stringToHTML(envelope.template || this.viewFactory.render(envelope));
    template.classList.add('fl-container');

    this.appendNotification(container, template, options);
    this.renderProgressBar(template, options);
    this.handleClick(template);
  }

  public appendNotification(container: HTMLElement, template: HTMLElement, options: { direction: string; rtl: boolean }): void {
    if (options.direction === 'bottom') {
      container.append(template);
    } else {
      container.prepend(template);
    }

    if (options.rtl) {
      template.classList.add('fl-rtl');
    }

    setTimeout(() => {
      template.classList.add('fl-show');
    }, 100);
  }

  public removeNotification(template: HTMLElement) {
    const container = template.parentElement as HTMLDivElement;

    template.classList.remove('fl-show');
    template.addEventListener('transitionend', () => {
      template.remove();

      if (container.hasChildNodes()) {
        return;
      }

      container.remove();
    });
  }

  public handleClick(template: HTMLElement) {
    template.addEventListener('click', () => this.removeNotification(template));
  }

  public renderProgressBar(template: HTMLElement, options: { timeout: number; fps: number }) {
    if (!options.timeout || options.timeout <= 0) {
      return;
    }

    const progressBar = document.createElement('span');
    progressBar.classList.add('fl-progress');

    const progressBarContainer = template.querySelector('.fl-progress-bar');
    if (progressBarContainer) {
      progressBarContainer.append(progressBar);
    }

    const lapse = 1000 / options.fps;
    let width = 0;
    const showProgress = () => {
      width += 1;
      const percent = (1 - lapse * (width / options.timeout)) * 100;
      progressBar.style.width = `${percent}%`;

      if (percent <= 0) {
        clearInterval(progressInterval); // eslint-disable-line @typescript-eslint/no-use-before-define
        this.removeNotification(template);
      }
    };

    let progressInterval = window.setInterval(showProgress, lapse);
    template.addEventListener('mouseout', () => (progressInterval = window.setInterval(showProgress, lapse)));
    template.addEventListener('mouseover', () => clearInterval(progressInterval));
  }

  public applyDarkMode(): void {
    if (document.body.classList.contains('fl-dark-mode') || document.querySelector('style.flasher-js')) {
      return;
    }

    const [mode, className = '.dark'] = [].concat(this.options.darkMode as unknown as ConcatArray<never>);
    let css = '.fl-main-container .fl-container.fl-flasher {background-color: rgb(15, 23, 42);color: rgb(255, 255, 255);}';

    css = mode === 'media' ? `@media (prefers-color-scheme: dark) {${css}}` : `${className} ${css}`;

    const style = document.createElement('style');
    style.type = 'text/css';
    style.classList.add('flasher-js');
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);

    document.body.classList.add('fl-dark-mode');
  }

  public stringToHTML(str: string): HTMLElement {
    const support = (() => {
      if (!DOMParser) {
        return false;
      }
      const parser = new DOMParser();
      try {
        parser.parseFromString('x', 'text/html');
      } catch (err) {
        return false;
      }
      return true;
    })();

    if (support) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(str, 'text/html');
      return doc.body.firstChild as HTMLElement;
    }

    const dom = document.createElement('div');
    dom.innerHTML = str;
    return dom.firstElementChild as HTMLElement;
  }
}
