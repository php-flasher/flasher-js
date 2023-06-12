import { Envelope, FlasherNotification, Options, FactoryInterface, QueueableInterface } from '@flasher/flasher';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/dist/sweetalert2.min.css';
type SwalType = typeof Swal;
export default class SweetAlertFactory implements FactoryInterface, QueueableInterface {
    swalToastr?: SwalType;
    queue: Envelope[];
    success(message: string | Options, title?: string | Options, options?: Options): void;
    info(message: string | Options, title?: string | Options, options?: Options): void;
    warning(message: string | Options, title?: string | Options, options?: Options): void;
    error(message: string | Options, title?: string | Options, options?: Options): void;
    flash(type: string | Options, message: string | Options, title?: string | Options, options?: Options): void;
    createNotification(type: string | Options, message?: string | Options, title?: string | Options, options?: Options): FlasherNotification;
    render(envelope: Envelope): Promise<void> | undefined;
    renderOptions(options: Options): void;
    addEnvelope(envelope: Envelope): void;
    resetQueue(): void;
    renderQueue(): Promise<void>;
}
export {};
//# sourceMappingURL=sweetalert.d.ts.map
