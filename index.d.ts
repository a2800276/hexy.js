
declare module "hexy" {
  type FormatOptions = {
    width?: number;
    littleEndian?: boolean;
    radix?: number;
    numbering?: "hex_bytes" | "none";
    format?: "eights" | "fours" | "twos" | "none";
    caps?: "lower" | "upper";
    annotate?: "ascii" | "none";
    prefix?: string;
    indent?: number;
    html?: boolean;
    extendedChs?: boolean;
    offset?: number;
    length?: number;
    display_offset?: number;
  }
  export const hexy: (arg: Buffer | string | number[], format?: FormatOptions) => string;
  export const maxnumberlen: (bytes: number, radix: number) => number;
}
