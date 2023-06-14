import { AbstractPlugin, Envelope, Options } from '@flasher/flasher'

import { Notice, Options as PnotifyOptions, alert, defaults, error, info, notice, success } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

export default class PnotifyPlugin extends AbstractPlugin {
  public renderEnvelopes(envelopes: Envelope[]): void {
    envelopes.forEach((envelope) => {
      const { type, title, message, options } = envelope;

      const pnotifyOptions: PnotifyOptions = {
        text: title || message,
        ...options,
      };

      let pnotify: Notice;
      switch (type) {
        case 'success':
          pnotify = success(pnotifyOptions);
          break;
        case 'alert':
          pnotify = alert(pnotifyOptions);
          break;
        case 'info':
          pnotify = info(pnotifyOptions);
          break;
        case 'error':
          pnotify = error(pnotifyOptions);
          break;
        default:
          pnotify = notice(pnotifyOptions);
      }

      if (pnotify.refs.container) {
        pnotify.refs.container.dataset.turboCache = 'false';
      }
    });
  }

  public renderOptions(options: Options): void {
    this.updateDefaultOptions(defaults, {
      delay: options.delay || 5000,
      ...options,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  private updateDefaultOptions(defaultOptions: any, options: Options) {
    Object.entries(options).forEach(([option, value]) => {
      // eslint-disable-next-line no-param-reassign
      defaultOptions[option] = value;
    });
  }
}
