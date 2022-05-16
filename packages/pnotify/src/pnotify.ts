import {
  Envelope,
  FlasherNotification,
  FlasherOptions,
  NotificationFactoryInterface,
} from '@flasher/flasher';

import { notice, alert, info, success, error, Options, defaults } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

export default class PnotifyFactory implements NotificationFactoryInterface {
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
