import {
  Envelope,
  NotificationFactoryInterface,
  FlasherOptions,
  FlasherNotification,
} from '@flasher/flasher';

import { notice, alert, info, success, error, Options, defaults } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

export default class PnotifyFactory implements NotificationFactoryInterface {
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
    this.renderOptions({});
    this.render({ notification });
  }

  render(envelope: Envelope): void {
    const { notification } = envelope;

    notification.type = notification.type || 'info';

    let options = {
      text: notification.title,
      ...notification.options,
    };

    options = {
      ...options,
      text: (options?.text || notification.message) as string,
    };

    switch (notification.type) {
      case 'success':
        success(options as Options);
        break;
      case 'alert':
      case 'warning':
        alert(options as Options);
        break;
      case 'info':
        info(options as Options);
        break;
      case 'error':
        error(options as Options);
        break;
      default:
        notice(options as Options);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  updateDefaultOptions(defaultOptions: any, options: FlasherOptions) {
    Object.entries(options).forEach(([option, value]) => {
      // eslint-disable-next-line no-param-reassign
      defaultOptions[option] = value;
    });
  }

  renderOptions(options: FlasherOptions): void {
    this.updateDefaultOptions(defaults, {
      delay: options.delay || 5000,
      ...options,
    });
  }
}
