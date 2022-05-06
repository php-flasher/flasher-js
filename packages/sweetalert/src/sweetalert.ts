import {
  Envelope,
  NotificationFactoryInterface,
  FlasherOptions,
  QueueableInterface,
  FlasherNotification,
} from '@flasher/flasher';

import Swal, { SweetAlertOptions } from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

type SwalType = typeof Swal;

export default class SweetAlertFactory implements NotificationFactoryInterface, QueueableInterface {
  swalToastr?: SwalType;

  queue: Envelope[] = [];

  success(message: string, title?: string, options?: FlasherOptions) {
    this.flash({ type: 'success', message, title, options });
  }

  info(message: string, title?: string, options?: FlasherOptions) {
    this.flash({ type: 'info', message, title, options });
  }

  warning(message: string, title?: string, options?: FlasherOptions) {
    this.flash({ type: 'warning', message, title, options });
  }

  error(message: string, title?: string, options?: FlasherOptions) {
    this.flash({ type: 'error', message, title, options });
  }

  flash(notification: FlasherNotification) {
    this.renderOptions({});
    return this.render({ notification });
  }

  render(envelope: Envelope) {
    const { notification } = envelope;
    let { options } = notification;

    notification.type = notification.type || 'info';
    options = {
      ...options,
      icon: (options?.icon || notification.type) as any[],
      text: (options?.text || notification.message) as any[],
    };

    return this.swalToastr?.fire(options as SweetAlertOptions).then(function (promise) {
      window.dispatchEvent(new CustomEvent('flasher:sweetalert:promise', {
        detail: {
          promise,
          envelope,
        },
      }));
    });
  }

  renderOptions(options: FlasherOptions): void {
    this.swalToastr = this.swalToastr || Swal.mixin({
      timer: (options.timer || 5000) as any,
      timerProgressBar: (options.timerProgressBar || true) as any,
      ...options,
    } as SweetAlertOptions);
  }

  addEnvelope(envelope: Envelope): void {
    this.queue?.push(envelope);
  }

  resetQueue() {
    this.queue = [];
  }

  async renderQueue() {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < this.queue.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      await this.render(this.queue[i]);
    }
  }
}
