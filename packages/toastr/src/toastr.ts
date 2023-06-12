import {
  Envelope,
  FlasherNotification,
  Options,
  FactoryInterface,
} from '@flasher/flasher';

import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

export default class ToastrFactory implements FactoryInterface {
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

  render(envelope: Envelope): void {
    const { notification } = envelope;
    const { message, title, options } = notification;
    const type = notification.type || 'info';

    const instance = toastr[type as ToastrType](message, title, options as ToastrOptions);
    instance.parent().attr('data-turbo-cache', 'false');
  }

  renderOptions(options: Options): void {
    toastr.options = {
      timeOut: (options.timeOut || 5000) as any,
      progressBar: (options.progressBar || 5000) as any,
      ...options,
    } as ToastrOptions;
  }
}
