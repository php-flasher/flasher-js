import {
  Envelope,
  FlasherNotification,
  FlasherOptions,
  NotificationFactoryInterface,
  QueueableInterface,
} from '@flasher/flasher';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import { SweetAlertOptions } from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

type SwalType = typeof Swal;

export default class SweetAlertFactory implements NotificationFactoryInterface, QueueableInterface {
  swalToastr?: SwalType;

  queue: Envelope[] = [];

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
    }

    if (typeof message === 'object') {
      options = message;
      message = options.message as unknown as string;
    }

    if (typeof title === 'object') {
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

    document.addEventListener('turbo:before-cache', function () {
      if (Swal.isVisible()) {
        Swal.getPopup()?.style.setProperty('animation-duration', '0ms');
        Swal.close();
      }
    });

    document.addEventListener('livewire:navigating', function () {
      if (Swal.isVisible()) {
        Swal.getPopup()?.style.setProperty('animation-duration', '0ms');
        Swal.close();
      }
    });
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
