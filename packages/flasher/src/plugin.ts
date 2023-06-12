import { Envelope, PluginInterface, Options, Theme } from './types';
import { NotificationMixin } from './mixin'
import { Properties } from 'csstype';

class FlasherPlugin implements PluginInterface {
  private theme: Theme;
  private options = {
    timeout: 5000,
    fps: 30,
    position: 'top-right',
    direction: 'top',
    rtl: false,
    style: {} as Properties,
    darkMode: 'media',
  };

  constructor(theme: Theme) {
    this.theme = theme;
  }

  public renderEnvelopes(envelopes: Envelope[]): void {
    const onContainerReady = (envelopes: Envelope[]) => {
      envelopes.forEach(envelope => {
        const options = { ...this.options, ...envelope.options }

        const container = this.createContainer(options)
        this.addToContainer(container, envelope, options)
      })
    }

    if (['interactive', 'complete'].includes(document.readyState)) {
      onContainerReady(envelopes)
    } else {
      document.addEventListener('DOMContentLoaded', () => onContainerReady(envelopes))
    }
  }

  public renderOptions(options: Options): void {
    this.applyDarkMode();
  }

  private createContainer(options: { position: string; style: Properties }): HTMLDivElement {
    let container = document.querySelector(`.fl-main-container[data-position="${options.position}"]`) as HTMLDivElement;
    if (container) {
      container.dataset.turboCache = 'false'
      return container;
    }

    container = document.createElement('div');
    container.classList.add('fl-main-container')
    container.dataset.position = options.position
    container.dataset.turboCache = 'false'

    Object.keys(options.style).forEach((key: string) => {
      container?.style.setProperty(key, options.style[key as keyof Properties] as string)
    })

    document.body.append(container)

    return container
  }

  private addToContainer(
    container: HTMLDivElement,
    envelope: Envelope,
    options: { direction: string; timeout: number; fps: number; rtl: boolean }
  ): void {
    const template = this.stringToHTML(this.theme.render(envelope));
    template.classList.add('fl-container');

    this.appendNotification(container, template, options);
    this.renderProgressBar(template, options);
    this.handleClick(template);
  }

  private appendNotification(container: HTMLElement, template: HTMLElement, options: { direction: string; rtl: boolean }): void {
    if (options.direction === 'bottom') {
      container.append(template);
    } else {
      container.prepend(template);
    }

    if (options.rtl) {
      template.classList.add('fl-rtl');
    }

    requestAnimationFrame(() => template.classList.add('fl-show'));
  }

  private removeNotification(template: HTMLElement) {
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

  private handleClick(template: HTMLElement) {
    template.addEventListener('click', () => this.removeNotification(template));
  }

  private renderProgressBar(template: HTMLElement, options: { timeout: number; fps: number }) {
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

  private applyDarkMode(): void {
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

  private stringToHTML(str: string): HTMLElement {
    const dom = document.createElement('div');
    dom.innerHTML = str.trim();
    return dom.firstElementChild as HTMLElement;
  }
}

export default NotificationMixin(FlasherPlugin);
