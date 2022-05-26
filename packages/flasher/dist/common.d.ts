export interface FlasherNotification {
    type: string;
    message: string;
    title?: string;
    options?: FlasherOptions;
}
export interface Envelope {
    notification: FlasherNotification;
    handler?: string;
    created_at?: string;
    template?: string;
    priority?: number;
    styles?: string[];
    scripts?: string[];
    context?: ResponseContext;
}
export interface FlasherResponseOptions {
    [index: string]: FlasherOptions;
}
export interface FlasherOptions {
    [index: string]: any[];
}
export interface ResponseContext {
    [index: string]: any[];
}
export interface FlasherResponse {
    envelopes: Envelope[];
    options: FlasherResponseOptions;
    scripts: string[];
    styles: string[];
    context: ResponseContext;
}
export interface NotificationFactoryInterface {
    success(message: string | FlasherOptions, title?: string | FlasherOptions, options?: FlasherOptions): void;
    info(message: string | FlasherOptions, title?: string | FlasherOptions, options?: FlasherOptions): void;
    warning(message: string | FlasherOptions, title?: string | FlasherOptions, options?: FlasherOptions): void;
    error(message: string | FlasherOptions, title?: string | FlasherOptions, options?: FlasherOptions): void;
    flash(type: string | FlasherOptions, message: string | FlasherOptions, title?: string | FlasherOptions, options?: FlasherOptions): void;
    render(envelope: Envelope): void;
    renderOptions(options: FlasherOptions): void;
}
export interface QueueableInterface {
    addEnvelope(envelope: Envelope): void;
    renderQueue(): void;
    resetQueue(): void;
}
export interface Theme {
    styles?: string | string[];
    render: (envelope: Envelope) => string;
}
//# sourceMappingURL=common.d.ts.map