import { Envelope, FlasherNotification, FlasherOptions, NotificationFactoryInterface } from '@flasher/flasher';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
export default class PnotifyFactory implements NotificationFactoryInterface {
    success(message: string | FlasherOptions, title?: string | FlasherOptions, options?: FlasherOptions): void;
    info(message: string | FlasherOptions, title?: string | FlasherOptions, options?: FlasherOptions): void;
    warning(message: string | FlasherOptions, title?: string | FlasherOptions, options?: FlasherOptions): void;
    error(message: string | FlasherOptions, title?: string | FlasherOptions, options?: FlasherOptions): void;
    flash(type: string | FlasherOptions, message: string | FlasherOptions, title?: string | FlasherOptions, options?: FlasherOptions): void;
    createNotification(type: string | FlasherOptions, message?: string | FlasherOptions, title?: string | FlasherOptions, options?: FlasherOptions): FlasherNotification;
    render(envelope: Envelope): void;
    updateDefaultOptions(defaultOptions: any, options: FlasherOptions): void;
    renderOptions(options: FlasherOptions): void;
}
//# sourceMappingURL=pnotify.d.ts.map