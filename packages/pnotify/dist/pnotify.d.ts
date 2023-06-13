import { Envelope, Options, PluginInterface } from '@flasher/flasher';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
declare class PnotifyPlugin implements PluginInterface {
    renderEnvelopes(envelopes: Envelope[]): void;
    renderOptions(options: Options): void;
    updateDefaultOptions(defaultOptions: any, options: Options): void;
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
}) & typeof PnotifyPlugin;
export default _default;
//# sourceMappingURL=pnotify.d.ts.map