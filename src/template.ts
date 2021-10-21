import { Envelope, FlasherInterface, FlasherOptions } from './interfaces';
import Flasher from './flasher';

interface Options {
  timeout: number,
  fps: number,
  position: string,
  direction: string,
  x_offset: string,
  y_offset: string,
}

export default class TemplateFactory implements FlasherInterface {
  options: Options = {
    timeout: 5000,
    fps: 30,
    position: 'top-right',
    direction: 'top',
    x_offset: '0.5em',
    y_offset: '0',
  };

  render(envelope: Envelope): void {
    const { notification } = envelope;
    const template = TemplateFactory.stringToHTML(envelope.template || '') as HTMLElement;

    if (!template) {
      return;
    }

    template.style.transition = '0.8s';

    if (undefined !== notification.options && undefined !== notification.options.position) {
      this.options.position = notification.options.position as unknown as string;
    }

    let container = document.getElementById(`flasher-container-${this.options.position}`);
    if (container === null) {
      container = document.createElement('div');
      container.id = `flasher-container-${this.options.position}`;
      container.style.position = 'fixed';
      container.style.maxWidth = '304px';
      container.style.width = '100%';
      container.style.zIndex = '999999';

      switch (this.options.position) {
        case 'top-left':
          container.style.top = this.options.y_offset;
          container.style.left = this.options.x_offset;
          break;
        case 'top-right':
          container.style.top = this.options.y_offset;
          container.style.right = this.options.x_offset;
          break;
        case 'bottom-left':
          container.style.bottom = this.options.y_offset;
          container.style.left = this.options.x_offset;
          break;
        case 'bottom-right':
        default:
          container.style.bottom = this.options.y_offset;
          container.style.right = this.options.x_offset;
          break;
      }
      document.getElementsByTagName('body')[0].appendChild(container);
    }

    switch (this.options.direction) {
      case 'top':
        container.insertBefore(template, container.firstChild);
        break;
      case 'bottom':
      default:
        container.appendChild(template);
        break;
    }

    const progressBar = template.querySelector('.flasher-progress');
    if (progressBar instanceof HTMLElement) {
      let width = 0;
      let progress: NodeJS.Timeout;
      const lapse = 1000 / this.options.fps;

      const showProgress = () => {
        width += 1;
        const percent = (1 - lapse * (width / this.options.timeout)) * 100;
        progressBar.style.width = `${percent}%`;

        if (percent <= 0) {
          template.style.opacity = '0';
          clearInterval(progress);

          setTimeout(() => {
            template.remove();
          }, 900);
        }
      };

      progress = setInterval(showProgress, lapse) as NodeJS.Timeout;

      template.addEventListener('mouseover', () => {
        clearInterval(progress);
      });

      template.addEventListener('mouseout', () => {
        progress = setInterval(showProgress, lapse) as NodeJS.Timeout;
      });
    }
  }

  renderOptions(options: FlasherOptions): void {
    this.options = { ...this.options, ...options };
  }

  private static stringToHTML(str: string) {
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

const flasher = Flasher.getInstance();
flasher.addFactory('template', new TemplateFactory());
