import { Envelope, FlasherNotification, Options, FactoryInterface } from '@flasher/flasher';
import 'toastr/build/toastr.min.css';
export default class ToastrFactory implements FactoryInterface {
    success(message: string | Options, title?: string | Options, options?: Options): void;
    info(message: string | Options, title?: string | Options, options?: Options): void;
    warning(message: string | Options, title?: string | Options, options?: Options): void;
    error(message: string | Options, title?: string | Options, options?: Options): void;
    flash(type: string | Options, message: string | Options, title?: string | Options, options?: Options): void;
    createNotification(type: string | Options, message?: string | Options, title?: string | Options, options?: Options): FlasherNotification;
    render(envelope: Envelope): void;
    renderOptions(options: Options): void;
}
//# sourceMappingURL=toastr.d.ts.map
