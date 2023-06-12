import { Envelope, FlasherNotification, Options, PluginInterface } from '@flasher/flasher';
import 'notyf/notyf.min.css';
export default class NotyfFactory implements PluginInterface {
    private notyf?;
    success(message: string | Options, title?: string | Options, options?: Options): void;
    info(message: string | Options, title?: string | Options, options?: Options): void;
    warning(message: string | Options, title?: string | Options, options?: Options): void;
    error(message: string | Options, title?: string | Options, options?: Options): void;
    flash(type: string | Options, message: string | Options, title?: string | Options, options?: Options): void;
    createNotification(type: string | Options, message?: string | Options, title?: string | Options, options?: Options): FlasherNotification;
    render(envelope: Envelope): void;
    renderOptions(options: Options): void;
}
//# sourceMappingURL=notyf.d.ts.map
