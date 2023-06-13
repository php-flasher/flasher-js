import { Envelope, Options, PluginInterface } from '@flasher/flasher';
import 'sweetalert2/dist/sweetalert2.min.css';
declare class SweetAlertPlugin implements PluginInterface {
    sweetalert: any;
    renderEnvelopes(envelopes: Envelope[]): void;
    renderOptions(options: Options): void;
}
declare const _default: (new (...args: any[]) => {
    [key: string]: any;
    success(message: string, title?: string | undefined, options?: Options | undefined): void;
    info(message: string, title?: string | undefined, options?: Options | undefined): void;
    warning(message: string, title?: string | undefined, options?: Options | undefined): void;
    error(message: string, title?: string | undefined, options?: Options | undefined): void;
    flash(type: string, message: string, title?: string | undefined, options?: Options | undefined): void;
    renderEnvelopes(envelopes: Envelope[]): void;
    renderOptions(options: Options): void;
}) & typeof SweetAlertPlugin;
export default _default;
//# sourceMappingURL=sweetalert.d.ts.map