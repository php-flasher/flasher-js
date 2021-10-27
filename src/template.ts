import { Envelope, FlasherInterface, FlasherOptions } from './interfaces';
import { Properties } from 'csstype';
import deepmerge from 'deepmerge';

interface Options {
  timeout: number,
  fps: number,
  position: string,
  direction: string,
  style: Properties<string>
}

export default class TemplateFactory implements FlasherInterface {
  options: Options = {
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

  render(envelope: Envelope): void {
    const { notification } = envelope;
    const template = TemplateFactory.stringToHTML(envelope.template || '') as HTMLElement;

    if (!template) {
      return;
    }

    template.style.transition = this.options.style.transition as string;

    if (undefined !== notification.options && undefined !== notification.options.position) {
      this.options.position = notification.options.position as unknown as string;
    }

    let container = document.getElementById(`flasher-container-${this.options.position}`);
    if (container === null) {
      container = document.createElement('div');

      container.id = `flasher-container-${this.options.position}`;

      Object.keys(this.options.style).forEach((key: string) => {
        container!.style.setProperty(key, this.options.style[key as keyof Properties] as string);
      });

      container.style.maxWidth = this.options.style.maxWidth as string;

      switch (this.options.position) {
        case 'top-left':
          container.style.top = this.options.style.top as string || '0';
          container.style.left = this.options.style.left as string || '0.5em';
          break;
        case 'top-right':
          container.style.top = this.options.style.top as string || '0';
          container.style.right = this.options.style.right as string || '0.5em';
          break;
        case 'bottom-left':
          container.style.bottom = this.options.style.bottom as string || '0';
          container.style.left = this.options.style.left as string || '0.5em';
          break;
        case 'bottom-right':
        default:
          container.style.bottom = this.options.style.bottom as string || '0';
          container.style.right = this.options.style.right as string || '0.5em';
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

    template.addEventListener('click', () => {
      template.style.transform = 'scale(1.05)';
      setTimeout(() => {
        template.remove();
      }, 200);
    });

    const progressBar = template.querySelector('.flasher-progress');
    if (progressBar instanceof HTMLElement && this.options.timeout > 0) {
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
    this.options = deepmerge(this.options, options);
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
