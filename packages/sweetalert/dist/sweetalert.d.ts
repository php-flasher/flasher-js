import { Envelope, FlasherNotification, FlasherOptions, NotificationFactoryInterface, QueueableInterface } from '@flasher/flasher';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/dist/sweetalert2.min.css';
type SwalType = typeof Swal;
export default class SweetAlertFactory implements NotificationFactoryInterface, QueueableInterface {
    swalToastr?: SwalType;
    queue: Envelope[];
    success(message: string | FlasherOptions, title?: string | FlasherOptions, options?: FlasherOptions): void;
    info(message: string | FlasherOptions, title?: string | FlasherOptions, options?: FlasherOptions): void;
    warning(message: string | FlasherOptions, title?: string | FlasherOptions, options?: FlasherOptions): void;
    error(message: string | FlasherOptions, title?: string | FlasherOptions, options?: FlasherOptions): void;
    flash(type: string | FlasherOptions, message: string | FlasherOptions, title?: string | FlasherOptions, options?: FlasherOptions): void;
    createNotification(type: string | FlasherOptions, message?: string | FlasherOptions, title?: string | FlasherOptions, options?: FlasherOptions): FlasherNotification;
    render(envelope: Envelope): Promise<void> | undefined;
    renderOptions(options: FlasherOptions): void;
    addEnvelope(envelope: Envelope): void;
    resetQueue(): void;
    renderQueue(): Promise<void>;
}
export {};
//# sourceMappingURL=sweetalert.d.ts.map