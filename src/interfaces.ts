// eslint-disable-next-line @typescript-eslint/no-redeclare
export interface Notification {
  type: string,
  title: string,
  message: string,
  options: FlasherOptions,
}

export interface Envelope {
  created_at: string,
  handler: string,
  notification: Notification,
  template?: string,
  priority: number,
  styles?: string[],
  scripts?: string[],
  context: ResponseContext,
}

export interface FlasherResponseOptions {
  [index: string]: FlasherOptions
}

export interface FlasherOptions {
  [index: string]: any[]
}

export interface ResponseContext {
  [index: string]: any[]
}

export interface FlasherResponse {
  envelopes: Envelope[],
  options: FlasherResponseOptions,
  scripts: string[],
  styles: string[],
  context: ResponseContext,
}

export interface FlasherInterface {
  render(envelope: Envelope): void;
  renderOptions(options: FlasherOptions): void;
}

export interface QueueableInterface {
  addEnvelope(envelope: Envelope): void;
  renderQueue(): void;
  resetQueue(): void;
}
