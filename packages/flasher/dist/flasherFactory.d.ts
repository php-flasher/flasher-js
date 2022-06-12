import { Envelope, FlasherNotification, FlasherOptions, NotificationFactoryInterface, Theme } from './common';
import { Properties } from 'csstype';
export default class FlasherFactory implements NotificationFactoryInterface {
    private viewFactory;
    private options;
    constructor(viewFactory: Theme);
    success(message: string | FlasherOptions, title?: string | FlasherOptions, options?: FlasherOptions): void;
    info(message: string | FlasherOptions, title?: string | FlasherOptions, options?: FlasherOptions): void;
    warning(message: string | FlasherOptions, title?: string | FlasherOptions, options?: FlasherOptions): void;
    error(message: string | FlasherOptions, title?: string | FlasherOptions, options?: FlasherOptions): void;
    flash(type: string | FlasherOptions, message: string | FlasherOptions, title?: string | FlasherOptions, options?: FlasherOptions): void;
    createNotification(type: string | FlasherOptions, message?: string | FlasherOptions, title?: string | FlasherOptions, options?: FlasherOptions): FlasherNotification;
    render(envelope: Envelope): void;
    renderOptions(options: FlasherOptions): void;
    createContainer(options: {
        position: string;
        style: Properties;
    }): HTMLDivElement;
    addToContainer(container: HTMLDivElement, envelope: Envelope, options: {
        direction: string;
        timeout: number;
        fps: number;
        rtl: boolean;
    }): void;
    appendNotification(container: HTMLElement, template: HTMLElement, options: {
        direction: string;
        rtl: boolean;
    }): void;
    removeNotification(template: HTMLElement): void;
    handleClick(template: HTMLElement): void;
    renderProgressBar(template: HTMLElement, options: {
        timeout: number;
        fps: number;
    }): void;
    applyDarkMode(): void;
    stringToHTML(str: string): HTMLElement;
}
//# sourceMappingURL=flasherFactory.d.ts.map