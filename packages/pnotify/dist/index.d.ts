declare const pnotify: {
    [key: string]: any;
    success(message: string, title?: string | undefined, options?: import("@flasher/flasher").Options | undefined): void;
    info(message: string, title?: string | undefined, options?: import("@flasher/flasher").Options | undefined): void;
    warning(message: string, title?: string | undefined, options?: import("@flasher/flasher").Options | undefined): void;
    error(message: string, title?: string | undefined, options?: import("@flasher/flasher").Options | undefined): void;
    flash(type: string, message: string, title?: string | undefined, options?: import("@flasher/flasher").Options | undefined): void;
    renderEnvelopes(envelopes: import("@flasher/flasher").Envelope[]): void;
    renderOptions(options: import("@flasher/flasher").Options): void;
} & {
    renderEnvelopes(envelopes: import("@flasher/flasher").Envelope[]): void;
    renderOptions(options: import("@flasher/flasher").Options): void;
    updateDefaultOptions(defaultOptions: any, options: import("@flasher/flasher").Options): void;
};
export default pnotify;
//# sourceMappingURL=index.d.ts.map