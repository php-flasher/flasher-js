import { Envelope, Options, PluginInterface } from '@flasher/flasher';
import 'toastr/build/toastr.min.css';
declare class ToastrPlugin implements PluginInterface {
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
}) & typeof ToastrPlugin;
export default _default;
//# sourceMappingURL=toastr.d.ts.map