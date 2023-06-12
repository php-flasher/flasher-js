import {
  Envelope,
  FlasherNotification,
  Options,
  FactoryInterface,
} from '@flasher/flasher';

import Noty from 'noty';
import 'noty/lib/noty.css';
import 'noty/lib/themes/mint.css';

export default class NotyFactory implements FactoryInterface {
  success(message: string|Options, title?: string|Options, options?: Options): void {
    this.flash('success', message, title, options);
  }

  info(message: string|Options, title?: string|Options, options?: Options): void {
    this.flash('info', message, title, options);
  }

  warning(message: string|Options, title?: string|Options, options?: Options): void {
    this.flash('warning', message, title, options);
  }

  error(message: string|Options, title?: string|Options, options?: Options): void {
    this.flash('error', message, title, options);
  }

  flash(type: string|Options, message: string|Options, title?: string|Options, options?: Options): void {
    const notification = this.createNotification(type, message, title, options);

    this.renderOptions({});
    this.render({ notification });
  }

  render(envelope: Envelope): void {
    const { notification } = envelope;
    notification.type = notification.type || 'info';

    const options: Noty.Options = {
      text: notification.message,
      type: notification.type,
      ...notification.options,
    } as Noty.Options;

    const noty = new Noty(options);
    noty.show();
    // @ts-ignore
    noty.layoutDom.dataset.turboCache = 'false';
  }

  createNotification(
    type: string|Options,
    message?: string|Options,
    title?: string|Options,
    options?: Options
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

  renderOptions(options: Options): void {
    Noty.overrideDefaults({
      timeout: options.timeout || 5000,
      ...options,
    });
  }
}
