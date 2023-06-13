import { PluginInterface, Options } from './types'

type Constructor<T = {}> = new (...args: any[]) => T;

export const NotifyMixin = <T extends Constructor<PluginInterface>>(Base: T) => {
  return class extends Base {
    public success(message: string, title?: string, options?: Options): void {
      this.flash('success', message, title, options)
    }

    info(message: string, title?: string, options?: Options): void {
      this.flash('info', message, title, options)
    }

    warning(message: string, title?: string, options?: Options): void {
      this.flash('warning', message, title, options)
    }

    error(message: string, title?: string, options?: Options): void {
      this.flash('error', message, title, options)
    }

    flash(type: string, message: string, title?: string, options?: Options): void {
      const envelope = {
        type,
        message,
        title: title || type,
        options: options || {},
        metadata: {
          plugin: '',
        },
      }

      this.renderOptions(options || {})
      this.renderEnvelopes([envelope])
    }
  }
}
