export interface Envelope {
  message: string;
  title: string;
  type: string;
  options: Options;
  metadata?: {
    id: string;
    handler: string;
    priority: number;
    created_at: string;
  }
}

export interface Options {
  [index: string]: any[];
}

export interface Context {
  [index: string]: any[];
}

export interface Response {
  envelopes: Envelope[];
  options?: Options;
  scripts?: string[];
  styles?: string[];
  context?: Context;
}

export interface FactoryInterface {
  success(message: string, title?: string, options?: Options): void;
  info(message: string, title?: string, options?: Options): void;
  warning(message: string, title?: string, options?: Options): void;
  error(message: string, title?: string, options?: Options): void;
  flash(type: string, message: string, title?: string, options?: Options): void;
  render(envelopes: Envelope[]): void;
  renderOptions(options: Options): void;
}

export interface QueueableInterface {
  addEnvelope(envelope: Envelope): void;
  renderQueue(): void;
  resetQueue(): void;
}

export interface Theme {
  styles?: string | string[],
  render: (envelope: Envelope) => string,
}
