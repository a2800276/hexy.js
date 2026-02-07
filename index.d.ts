
declare module "hexy" {
  interface FormatOptions {
    bytesPerLine?: number;
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

  /**
   * The main hexy function that creates hex dumps
   * @param buffer - Input data (Buffer, string, number array, or Uint8Array)
   * @param config - Optional formatting configuration
   * @returns Formatted hex dump string
   */
  export function hexy(
    buffer: Buffer | string | number[] | Uint8Array, 
    config?: FormatOptions
  ): string;

  /**
   * Hexy class for creating hex dump instances
   */
  export class Hexy {
    constructor(buffer: Buffer | string | number[] | Uint8Array, config?: FormatOptions);
    toString(): string;
  }

  /**
   * Calculate the maximum number of characters needed to represent a number
   * @param bytes - Number of bytes
   * @param radix - Numeric base (2, 8, 10, or 16)
   * @returns Maximum character length
   * @deprecated This is an internal helper and will be removed in a future release.
   */
  export function maxnumberlen(bytes: number, radix: number): number;

  // Export the type for external use
  export type { FormatOptions };
}
