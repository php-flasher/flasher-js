import { Envelope, Options, PluginInterface } from '@flasher/flasher';
import 'noty/lib/noty.css';
import 'noty/lib/themes/mint.css';
declare class NotyPlugin implements PluginInterface {
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
}) & typeof NotyPlugin;
export default _default;
//# sourceMappingURL=noty.d.ts.map