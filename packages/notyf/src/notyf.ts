import {
  Envelope,
  FlasherNotification,
  Options,
  PluginInterface,
} from '@flasher/flasher';

import { Notyf } from 'notyf';
import { INotyfOptions } from 'notyf/notyf.options';
import 'notyf/notyf.min.css';

export default class NotyfFactory implements PluginInterface {
  private notyf?: Notyf;

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
    notification.type = notification.type || 'info';

    const options = { ...notification, ...notification.options };

    this.notyf = this.notyf || new Notyf();
    this.notyf.open(options);

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
