declare module 'fast-text-encoding' {
  export class TextEncoder {
    readonly encoding: string;
    constructor();
    encode(input: string): Uint8Array;
    encodeInto?(input: string, dest: Uint8Array): { read: number; written: number };
  }

  export class TextDecoder {
    readonly encoding: string;
    constructor(label?: string, options?: { fatal?: boolean; ignoreBOM?: boolean });
    decode(input?: Uint8Array): string;
  }
}