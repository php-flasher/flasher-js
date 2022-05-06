import {
  Envelope,
  NotificationFactoryInterface,
  FlasherOptions,
  FlasherNotification,
} from '@flasher/flasher';

import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

export default class ToastrFactory implements NotificationFactoryInterface {
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
    const { message, title, options } = notification;
    let type = notification.type || 'info';

    toastr[type as ToastrType](message, title, options as ToastrOptions);
  }

  renderOptions(options: FlasherOptions): void {
    toastr.options = {
      timeOut: (options.timeOut || 5000) as any,
      progressBar: (options.progressBar || 5000) as any,
      ...options,
    } as ToastrOptions;
  }
}
