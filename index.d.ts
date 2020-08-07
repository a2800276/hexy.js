
declare module "hexyz" {
  type FormatOptions = {
    width?: number;
    numbering?: "hex_bytes" | "none";
    format?: "eights" | "fours" | "twos" | "none";
    caps?: "lower" | "upper";
    annotate?: "ascii" | "ebcdic" | "ascii_ebcdic" | "none";
    prefix?: string;
    indent?: number;
    html?: boolean;
    offset?: number;
    length?: number;
    display_offset?: number;
  }
  export const hexyz: (arg: Buffer | string | number[], format?: FormatOptions) => string;
}
