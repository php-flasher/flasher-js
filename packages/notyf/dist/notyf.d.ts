import { Envelope, FlasherNotification, FlasherOptions, NotificationFactoryInterface } from '@flasher/flasher';
import 'notyf/notyf.min.css';
export default class NotyfFactory implements NotificationFactoryInterface {
    private notyf?;
    success(message: string | FlasherOptions, title?: string | FlasherOptions, options?: FlasherOptions): void;
    info(message: string | FlasherOptions, title?: string | FlasherOptions, options?: FlasherOptions): void;
    warning(message: string | FlasherOptions, title?: string | FlasherOptions, options?: FlasherOptions): void;
    error(message: string | FlasherOptions, title?: string | FlasherOptions, options?: FlasherOptions): void;
    flash(type: string | FlasherOptions, message: string | FlasherOptions, title?: string | FlasherOptions, options?: FlasherOptions): void;
    createNotification(type: string | FlasherOptions, message?: string | FlasherOptions, title?: string | FlasherOptions, options?: FlasherOptions): FlasherNotification;
    render(envelope: Envelope): void;
    renderOptions(options: FlasherOptions): void;
}
//# sourceMappingURL=notyf.d.ts.map