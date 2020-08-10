declare namespace hexyz {
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
  };
}

export function hexyz(arg: Buffer | string | number[], format?: hexyz.FormatOptions): string;
