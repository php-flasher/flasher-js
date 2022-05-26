import { Envelope, FlasherNotification, FlasherOptions, NotificationFactoryInterface } from '@flasher/flasher';
import 'noty/lib/noty.css';
import 'noty/lib/themes/mint.css';
export default class NotyFactory implements NotificationFactoryInterface {
    success(message: string | FlasherOptions, title?: string | FlasherOptions, options?: FlasherOptions): void;
    info(message: string | FlasherOptions, title?: string | FlasherOptions, options?: FlasherOptions): void;
    warning(message: string | FlasherOptions, title?: string | FlasherOptions, options?: FlasherOptions): void;
    error(message: string | FlasherOptions, title?: string | FlasherOptions, options?: FlasherOptions): void;
    flash(type: string | FlasherOptions, message: string | FlasherOptions, title?: string | FlasherOptions, options?: FlasherOptions): void;
    render(envelope: Envelope): void;
    createNotification(type: string | FlasherOptions, message?: string | FlasherOptions, title?: string | FlasherOptions, options?: FlasherOptions): FlasherNotification;
    renderOptions(options: FlasherOptions): void;
}
//# sourceMappingURL=noty.d.ts.map