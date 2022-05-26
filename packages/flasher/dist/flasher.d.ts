import { Envelope, FlasherNotification, FlasherOptions, FlasherResponse, FlasherResponseOptions, NotificationFactoryInterface, QueueableInterface, ResponseContext, Theme } from './common';
export default class Flasher {
    private defaultHandler;
    private factories;
    private themes;
    success(message: string | FlasherOptions, title?: string | FlasherOptions, options?: FlasherOptions): void;
    info(message: string | FlasherOptions, title?: string | FlasherOptions, options?: FlasherOptions): void;
    warning(message: string | FlasherOptions, title?: string | FlasherOptions, options?: FlasherOptions): void;
    error(message: string | FlasherOptions, title?: string | FlasherOptions, options?: FlasherOptions): void;
    flash(type: string | FlasherOptions, message: string | FlasherOptions, title?: string | FlasherOptions, options?: FlasherOptions): void;
    createNotification(type: string | FlasherOptions, message?: string | FlasherOptions, title?: string | FlasherOptions, options?: FlasherOptions): FlasherNotification;
    create(alias: string): NotificationFactoryInterface;
    renderOptions(options: FlasherResponseOptions): void;
    render(response: FlasherResponse): void;
    addFactory(name: string, factory: NotificationFactoryInterface): void;
    addTheme(name: string, theme: Theme): void;
    using(name: string): Flasher;
    addStyles(urls: string[], callback: CallableFunction): void;
    addScripts(urls: string[], callback: CallableFunction): void;
    renderEnvelopes(envelopes: Envelope[], context: ResponseContext): void;
    isQueueable(object: any): object is QueueableInterface;
    resolveResponse(response: FlasherResponse): FlasherResponse;
    parseOptions(options: FlasherOptions): FlasherOptions;
    parseFunction(func: any): any;
    pushStyles(response: FlasherResponse, handler: string): void;
    resolveHandler(handler?: string): string;
    resolveThemeHandler(alias: string): void;
}
//# sourceMappingURL=flasher.d.ts.map