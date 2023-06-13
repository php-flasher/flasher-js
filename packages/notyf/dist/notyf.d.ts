import { Envelope, Options, PluginInterface } from '@flasher/flasher';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
declare class NotyfPlugin implements PluginInterface {
    notyf?: Notyf;
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
}) & typeof NotyfPlugin;
export default _default;
//# sourceMappingURL=notyf.d.ts.map