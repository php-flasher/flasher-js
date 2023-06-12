import { Envelope, FlasherNotification, Options, FactoryInterface } from '@flasher/flasher';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
export default class PnotifyFactory implements FactoryInterface {
    success(message: string | Options, title?: string | Options, options?: Options): void;
    info(message: string | Options, title?: string | Options, options?: Options): void;
    warning(message: string | Options, title?: string | Options, options?: Options): void;
    error(message: string | Options, title?: string | Options, options?: Options): void;
    flash(type: string | Options, message: string | Options, title?: string | Options, options?: Options): void;
    createNotification(type: string | Options, message?: string | Options, title?: string | Options, options?: Options): FlasherNotification;
    render(envelope: Envelope): void;
    updateDefaultOptions(defaultOptions: any, options: Options): void;
    renderOptions(options: Options): void;
}
//# sourceMappingURL=pnotify.d.ts.map
