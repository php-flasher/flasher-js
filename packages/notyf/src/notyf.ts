import {
  Envelope,
  NotificationFactoryInterface,
  FlasherOptions,
  FlasherNotification,
} from '@flasher/flasher';

import { Notyf } from 'notyf';
import { INotyfOptions } from 'notyf/notyf.options';
import 'notyf/notyf.min.css';

export default class NotyfFactory implements NotificationFactoryInterface {
  private notyf?: Notyf;

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

    const options = { ...notification, ...notification.options };

    this.notyf?.open(options);
  }

  renderOptions(options: FlasherOptions): void {
    const nOptions = {
      duration: options.duration || 5000,
      ...options,
    } as unknown as INotyfOptions;

    nOptions.types = nOptions.types || [];

    nOptions.types.push({
      type: 'info',
      className: 'notyf__toast--info',
      backgroundColor: '#5784E5',
      icon: {
        className: 'notyf__icon--warning',
        tagName: 'i',
      },
    });

    nOptions.types.push({
      type: 'warning',
      className: 'notyf__toast--warning',
      backgroundColor: '#E3A008',
      icon: {
        className: 'notyf__icon--warning',
        tagName: 'i',
      },
    });

    this.notyf = this.notyf || new Notyf(nOptions as Partial<INotyfOptions>);
  }
}
