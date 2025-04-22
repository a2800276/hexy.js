
declare module "hexy" {
  type FormatOptions = {
    bytesPerLine?: number,
    bytesPerGroup?: number;
    showAddress?: boolean;
    littleEndian?: boolean;
    radix?: number;
    caps?: "lower" | "upper";
    annotate?: "ascii" | "none";
    prefix?: string;
    indent?: number;
    offset?: number;
    displayOffset?: number;
    length?: number;
    extendedChs?: boolean;
    html?: boolean;
  }
  export const hexy: (arg: Buffer | string | number[], format?: FormatOptions) => string;
  export const maxnumberlen: (bytes: number, radix: number) => number;
}
