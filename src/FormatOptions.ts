export interface FormatOptions {
    width?: number;
    littleEndian?: boolean;
    radix?: number;
    numbering?: "hex_bytes" | "none";
    format?: "sixteens" | "eights" | "fours" | "twos" | "none";
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