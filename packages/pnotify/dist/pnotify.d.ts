import { AbstractPlugin, Envelope, Options } from '@flasher/flasher';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
export default class PnotifyPlugin extends AbstractPlugin {
    renderEnvelopes(envelopes: Envelope[]): void;
    renderOptions(options: Options): void;
    private updateDefaultOptions;
}
//# sourceMappingURL=pnotify.d.ts.map