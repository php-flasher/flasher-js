import {
  Envelope,
  FlasherNotification,
  FlasherOptions,
  NotificationFactoryInterface,
  Theme,
} from './common';
import { Properties } from 'csstype';

export default class FlasherFactory implements NotificationFactoryInterface {
  private viewFactory: Theme;

  private options = {
    timeout: 5000,
    fps: 30,
    position: 'top-right',
    direction: 'top',
    style: {} as Properties,
  };

  constructor(viewFactory: Theme) {
    this.viewFactory = viewFactory;
  }

  success(message: string|FlasherOptions, title?: string|FlasherOptions, options?: FlasherOptions): void {
    this.flash('success', message, title, options);
  }

  info(message: string|FlasherOptions, title?: string|FlasherOptions, options?: FlasherOptions): void {
    this.flash('info', message, title, options);
  }

  warning(message: string|FlasherOptions, title?: string|FlasherOptions, options?: FlasherOptions): void {
    this.flash('warning', message, title, options);
  }

  error(message: string|FlasherOptions, title?: string|FlasherOptions, options?: FlasherOptions): void {
    this.flash('error', message, title, options);
  }

  flash(type: string|FlasherOptions, message: string|FlasherOptions, title?: string|FlasherOptions, options?: FlasherOptions): void {
    const notification = this.createNotification(type, message, title, options);

    this.renderOptions({});
    this.render({ notification });
  }

  createNotification(
    type: string|FlasherOptions,
    message?: string|FlasherOptions,
    title?: string|FlasherOptions,
    options?: FlasherOptions
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
      options
    };
  }

  render(envelope: Envelope): void {
    const { notification } = envelope;

    const nOptions = notification.options || {};
    const options = Array.isArray(nOptions) ? this.options : Object.assign({}, this.options, nOptions);

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

  renderOptions(options: FlasherOptions): void {
    this.options = Object.assign({}, this.options, options);
  }

  createContainer(options: { position: string; style: Properties}): HTMLDivElement {
    const containerSelector = `.fl-main-container[data-position="${options.position}"]`;
    let container = document.querySelector(containerSelector) as HTMLDivElement;
    if (container) {
      return container;
    }

    container = document.createElement('div');
    container.classList.add('fl-main-container');
    container.dataset.position = options.position;

    Object.keys(options.style).forEach((key: string) => {
      container?.style.setProperty(key, options.style[key as keyof Properties] as string);
    });

    document.body.append(container);

    return container;
  }

  addToContainer(container: HTMLDivElement, envelope: Envelope, options: { direction: string, timeout: number; fps: number }): void {
    const template = this.stringToHTML(envelope.template || this.viewFactory.render(envelope));

    this.appendNotification(container, template, options.direction);
    this.renderProgressBar(template, options);
    this.handleClick(template);
  }

  appendNotification(container: HTMLElement, template: HTMLElement, direction: string): void {
    if (direction === 'bottom') {
      container.append(template);
    } else {
      container.prepend(template);
    }

    setTimeout(() => {
      template.classList.add('fl-show');
    }, 100);
  }

  removeNotification(template: HTMLElement) {
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

  handleClick(template: HTMLElement) {
    template.addEventListener('click', () => this.removeNotification(template));
  }

  renderProgressBar(template: HTMLElement, options: {timeout: number; fps: number}) {
    if (!options.timeout || options.timeout <= 0) {
      return;
    }

    const progressBar = document.createElement('span');
    progressBar.classList.add('fl-progress');

    const progressBarContainer = template.querySelector('.fl-progress-bar');
    progressBarContainer && progressBarContainer.append(progressBar);

    const lapse = 1000 / options.fps;
    let width = 0;
    const showProgress = () => {
      width += 1;
      const percent = (1 - lapse * (width / options.timeout)) * 100;
      progressBar.style.width = `${percent}%`;

      if (percent <= 0) {
        clearInterval(progressInterval);
        this.removeNotification(template);
      }
    };

    let progressInterval = window.setInterval(showProgress, lapse);
    template.addEventListener('mouseout', () => progressInterval = window.setInterval(showProgress, lapse));
    template.addEventListener('mouseover', () => clearInterval(progressInterval));
  }

  stringToHTML(str: string): HTMLElement {
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
