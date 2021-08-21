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
}

export interface FlasherResponseOptions {
  [index: string]: FlasherOptions
}

export interface FlasherOptions {
  [index: string]: any[]
}

export interface FlasherResponse {
  envelopes: Envelope[],
  options: FlasherResponseOptions,
  scripts: string[],
  styles: string[],
}

export interface FlasherInterface {
  render(envelope: Envelope): void;
  renderOptions(options: FlasherOptions): void;
}

export interface QueueableInterface {
  addEnvelope(envelope: Envelope): void;
  renderQueue(): void;
}
