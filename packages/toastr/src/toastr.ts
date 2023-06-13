import { Envelope, NotifyMixin, Options, PluginInterface } from '@flasher/flasher'

import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

class ToastrPlugin implements PluginInterface {
  renderEnvelopes(envelopes: Envelope[]): void {
    envelopes.forEach(envelope => {
      const { message, title, type, options } = envelope;
      const instance = toastr[type as ToastrType](message, title, options as ToastrOptions);
      instance && instance.parent().attr('data-turbo-cache', 'false');
    });
  }

  renderOptions(options: Options): void {
    toastr.options = {
      timeOut: (options.timeOut || 5000) as unknown as number,
      progressBar: (options.progressBar || true) as unknown as boolean,
      ...options,
    } as ToastrOptions;
  }
}

export default NotifyMixin(ToastrPlugin);
