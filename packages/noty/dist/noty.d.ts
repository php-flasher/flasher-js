import { Envelope, FlasherNotification, Options, FactoryInterface } from '@flasher/flasher';
import 'noty/lib/noty.css';
import 'noty/lib/themes/mint.css';
export default class NotyFactory implements FactoryInterface {
    success(message: string | Options, title?: string | Options, options?: Options): void;
    info(message: string | Options, title?: string | Options, options?: Options): void;
    warning(message: string | Options, title?: string | Options, options?: Options): void;
    error(message: string | Options, title?: string | Options, options?: Options): void;
    flash(type: string | Options, message: string | Options, title?: string | Options, options?: Options): void;
    render(envelope: Envelope): void;
    createNotification(type: string | Options, message?: string | Options, title?: string | Options, options?: Options): FlasherNotification;
    renderOptions(options: Options): void;
}
//# sourceMappingURL=noty.d.ts.map
