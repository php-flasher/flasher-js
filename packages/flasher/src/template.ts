import {
  Envelope,
  NotificationFactoryInterface,
  FlasherOptions,
  Theme, FlasherNotification,
} from './interfaces';
import { Properties } from 'csstype';
import deepmerge from 'deepmerge';

interface Options {
  timeout: number,
  fps: number,
  position: string,
  direction: string,
  style: Properties<string>,
}

export default class TemplateFactory implements NotificationFactoryInterface {
  viewFactory: Theme;

  constructor(viewFactory: Theme) {
    this.viewFactory = viewFactory;
  }

  static options: Options = {
    timeout: 5000,
    fps: 30,
    position: 'top-right',
    direction: 'top',
    style: {
      position: 'fixed',
      maxWidth: '304px',
      width: '100%',
      zIndex: 999999,
      transition: '0.8s',
    },
  };

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
    notification.type = notification.type || 'info';

    this.renderOptions({});
    this.render({ notification });
  }

  render(envelope: Envelope): void {
    const { notification } = envelope;

    if (!envelope.template) {
      envelope.template = this.viewFactory.render(envelope);
    }

    const template = TemplateFactory.stringToHTML(envelope.template || '') as HTMLElement;

    if (!template) {
      return;
    }

    let options = JSON.parse(JSON.stringify(TemplateFactory.options));
    if (!Array.isArray(notification.options)) {
      options = deepmerge(options, notification.options || {});
    }

    template.style.transition = options.style.transition as string;

    if (undefined !== notification.options && undefined !== notification.options.position) {
      options.position = notification.options.position as unknown as string;
    }

    let container = document.getElementById(`flasher-container-${options.position}`);
    if (container === null) {
      container = document.createElement('div');

      container.id = `flasher-container-${options.position}`;

      Object.keys(options.style).forEach((key: string) => {
        container!.style.setProperty(key, options.style[key as keyof Properties] as string);
      });

      container.style.maxWidth = options.style.maxWidth as string;

      switch (options.position) {
        case 'top-left':
          container.style.top = options.style.top as string || '0';
          container.style.left = options.style.left as string || '0.5em';
          break;
        case 'top-right':
          container.style.top = options.style.top as string || '0';
          container.style.right = options.style.right as string || '0.5em';
          break;
        case 'bottom-left':
          container.style.bottom = options.style.bottom as string || '0';
          container.style.left = options.style.left as string || '0.5em';
          break;
        case 'bottom-right':
        default:
          container.style.bottom = options.style.bottom as string || '0';
          container.style.right = options.style.right as string || '0.5em';
          break;
      }
      document.getElementsByTagName('body')[0].appendChild(container);
    }

    switch (options.direction) {
      case 'top':
        container.insertBefore(template, container.firstChild);
        break;
      case 'bottom':
      default:
        container.appendChild(template);
        break;
    }

    template.addEventListener('click', () => {
      template.style.transform = 'scale(1.05)';
      setTimeout(() => {
        template.remove();
      }, 200);
    });

    const progressBarContainer = template.querySelector('.fl-progress-bar');

    if (progressBarContainer instanceof HTMLElement && options.timeout > 0) {
      const progressBar = document.createElement('div');
      progressBar.classList.add('fl-progress');

      progressBarContainer.appendChild(progressBar);

      let width = 0;
      let progress: number;
      const lapse = 1000 / options.fps;

      const showProgress = () => {
        width += 1;
        const percent = (1 - lapse * (width / options.timeout)) * 100;
        progressBar.style.width = `${percent}%`;

        if (percent <= 0) {
          template.style.opacity = '0';
          clearInterval(progress);

          setTimeout(() => {
            template.remove();
          }, 900);
        }
      };

      progress = window.setInterval(showProgress, lapse);

      template.addEventListener('mouseover', () => {
        clearInterval(progress);
      });

      template.addEventListener('mouseout', () => {
        progress = window.setInterval(showProgress, lapse);
      });
    }
  }

  renderOptions(options: FlasherOptions): void {
    TemplateFactory.options = deepmerge(TemplateFactory.options, options);
  }

  static stringToHTML(str: string) {
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
      return doc.body.firstChild;
    }

    const dom = document.createElement('div');
    dom.innerHTML = str;
    return dom.firstElementChild;
  }
}
