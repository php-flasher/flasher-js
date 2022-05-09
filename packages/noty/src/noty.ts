import {
  Envelope,
  NotificationFactoryInterface,
  FlasherOptions,
  FlasherNotification,
} from '@flasher/flasher';

import Noty from 'noty';
import 'noty/lib/noty.css';
import 'noty/lib/themes/mint.css';

export default class NotyFactory implements NotificationFactoryInterface {
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

    const options: Noty.Options = {
      text: notification.message,
      type: notification.type,
      ...notification.options,
    } as Noty.Options;

    new Noty(options).show();
  }

  renderOptions(options: FlasherOptions): void {
    Noty.overrideDefaults({
      timeout: options.timeout || 5000,
      ...options,
    });
  }
}
