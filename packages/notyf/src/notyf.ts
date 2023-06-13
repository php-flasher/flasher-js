import { Envelope, NotifyMixin, Options, PluginInterface } from '@flasher/flasher'

import { Notyf } from 'notyf';
import { INotyfOptions } from 'notyf/notyf.options';
import 'notyf/notyf.min.css';

class NotyfPlugin implements PluginInterface {
  notyf?: Notyf;

  renderEnvelopes(envelopes: Envelope[]): void {
    envelopes.forEach((envelope) => {
      const options = { ...envelope, ...envelope.options };
      this.notyf?.open(options);
    });

    // @ts-ignore
    this.notyf.view.container.dataset.turboCache = 'false';
    // @ts-ignore
    this.notyf.view.a11yContainer.dataset.turboCache = 'false';
  }

  renderOptions(options: Options): void {
    const nOptions = {
      duration: options.duration || 5000,
      ...options,
    } as unknown as INotyfOptions;

    nOptions.types = nOptions.types || [];

    nOptions.types.push({
      type: 'info',
      className: 'notyf__toast--info',
      background: '#5784E5',
      icon: {
        className: 'notyf__icon--info',
        tagName: 'i',
      },
    });

    nOptions.types.push({
      type: 'warning',
      className: 'notyf__toast--warning',
      background: '#E3A008',
      icon: {
        className: 'notyf__icon--warning',
        tagName: 'i',
      },
    });

    this.notyf = this.notyf || new Notyf(nOptions as Partial<INotyfOptions>);
  }
}

export default NotifyMixin(NotyfPlugin);
