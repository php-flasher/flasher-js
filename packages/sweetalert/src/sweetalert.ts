import { AbstractPlugin, Envelope, Options } from '@flasher/flasher'

import Swal from 'sweetalert2/dist/sweetalert2.js';
import { SweetAlertOptions } from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

type SwalType = typeof Swal;

export default class SweetAlertPlugin extends AbstractPlugin {
  sweetalert?: SwalType;

  public renderEnvelopes(envelopes: Envelope[]): void {
    envelopes.forEach((envelope) => {
        let { options } = envelope;

        options = {
          ...options,
          icon: (options?.icon || envelope.type) as any[],
          text: (options?.text || envelope.message) as any[],
        };

        this.sweetalert?.fire(options as SweetAlertOptions).then(function (promise) {
          window.dispatchEvent(new CustomEvent('flasher:sweetalert:promise', {
            detail: {
              promise,
              envelope,
            },
          }));
        });
    });
  }

  public renderOptions(options: Options): void {
    this.sweetalert = this.sweetalert || Swal.mixin({
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
  }
}
