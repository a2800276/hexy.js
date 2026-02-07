
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
    
    // Deprecated options (still supported for backward compatibility)
    /** @deprecated Use bytesPerLine instead */
    width?: number;
    /** @deprecated Use bytesPerGroup instead */
    format?: "none" | "twos" | "fours" | "eights" | "sixteens";
    /** @deprecated Use showAddress instead */
    numbering?: "hex_bytes" | "none";
    /** @deprecated Use displayOffset instead */
    display_offset?: number;
  }
  export const hexy: (arg: Buffer | string | number[], format?: FormatOptions) => string;
  export const maxnumberlen: (bytes: number, radix: number) => number;
}
