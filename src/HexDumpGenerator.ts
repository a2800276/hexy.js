import { FormatOptions } from "./FormatOptions";

const MAX_ADDRESS_LENGTH = 8; // TODO: might want to calculate

export default class HexDumpGenerator {
  private static readonly ALL_EXCEPT_PRINTABLE_LATIN = /[^\x20-\x7f]/g;
  private static readonly CONTROL_CHARACTERS_ONLY = /[\x00-\x1f]/g;

  private bytes_per_line: number;
  private numbering: string;
  private bytes_per_group: number;
  private littleEndian: boolean;
  private radix: number;
  private caps: string;
  private annotate: string;
  private prefix: string;
  private indent: number;
  private html: boolean;
  private offset: number;
  private length: number;
  private extendedChs: boolean;
  private display_offset: number;
  private hex_line_length: number;

  constructor(
    private buffer: Buffer | string | number[],
    private config: FormatOptions
  ) {
    this.bytes_per_line = this.config.width ?? 16; // formerly `width`
    this.numbering = this.config.numbering === "none" ? "none" : "hex_bytes";

    this.bytes_per_group = 2; // by default (not handled below) "fours" will fold into `bytes_per_group === 2`
    switch (this.config.format) {
      case "none":
        this.bytes_per_group = 0; // one byte per group, but no delimiters
        break;
      case "twos":
        this.bytes_per_group = 1;
        break;
      case "eights":
        this.bytes_per_group = 4;
        break;
      case "sixteens":
        this.bytes_per_group = 8;
        break;
    }

    this.littleEndian = this.config.littleEndian || false;
    this.radix = this.config.radix || 16;
    this.caps = this.config.caps === "upper" ? "upper" : "lower";
    this.annotate = this.config.annotate === "none" ? "none" : "ascii";
    this.prefix = this.config.prefix || "";
    this.indent = this.config.indent || 0;
    this.html = this.config.html || false;
    this.offset = this.config.offset || 0;
    this.length = this.config.length || -1;
    this.extendedChs = this.config.extendedChs || false;
    this.display_offset = this.config.display_offset || 0;
    this.hex_line_length =
      (maxnumberlen(this.bytes_per_group, this.radix) * this.bytes_per_line) /
      Math.max(this.bytes_per_group, 1);

    this.parseToHexdump();
  }

  private parseToHexdump() {
    if (this.offset) {
      if (this.offset < this.buffer.length) {
        this.buffer = this.buffer.slice(this.offset);
      }
    }

    if (this.length !== -1) {
      if (this.length <= this.buffer.length) {
        this.buffer = this.buffer.slice(0, this.length);
      }
    }

    this.prefix =
      (this.html ? "&nbsp;" : " ").repeat(this.indent) + this.prefix;

    switch (
      this.bytes_per_group // the original code (now documented in the tests),
    ) {
      case 8: // some modes had mode-dependent number of extra spaces at the end of the line
      case 4:
      case 2:
        this.hex_line_length += Math.floor(
          this.bytes_per_line / this.bytes_per_group
        );
        break;
      case 1:
        this.hex_line_length += this.bytes_per_line + 3;
        break;
      case 0:
        this.hex_line_length += 2;
        break;
    }
    this.bytes_per_group = Math.min(this.bytes_per_group, this.bytes_per_line);
  }

  public toString() {
    let str = "";
    let addr = this.offset + this.display_offset;
    let odd = false;

    if (this.html) {
      str += "<div class='hexy'>\n";
    }

    // each `slice` is a single output line:
    for (
      let start = 0;
      start < this.buffer.length;
      start += this.bytes_per_line
    ) {
      const end = Math.min(start + this.bytes_per_line, this.buffer.length);
      const slice = this.buffer.slice(start, end);

      if (this.html) {
        str +=
          "<div class='" +
          this.num2str(addr, MAX_ADDRESS_LENGTH, 16) +
          (odd ? "  odd" : " even") +
          "'>";
        odd = !odd;
      }
      str += this.prefix;

      // the address column:
      if (this.numbering === "hex_bytes") {
        str += this.num2str(addr, MAX_ADDRESS_LENGTH, 16) + ": ";
      }

      // the binary representation column:
      str += this.hex(slice);

      // the text representation column:
      if (this.annotate === "ascii") {
        let text = "";
        switch (slice.constructor) {
          case Array:
            text = String.fromCharCode.apply(this, slice as number[]);
            break;
          case Uint8Array:
            (slice as number[] | Buffer).forEach(
              (ch) => (text += String.fromCharCode(ch))
            );
            break;
          default:
            text = slice.toString("latin1");
        }
        str +=
          " " + (this.html ? this.html_escape(text) : this.ascii_escape(text));
      }
      str += this.html ? "</div>\n" : "\n";
      addr += this.bytes_per_line;
    }

    if (this.html) {
      str += "</div>\n";
    }
    return str;
  }

  // renders the binary representation of individual line
  private hex(buffer: string | Buffer | number[]) {
    let str = "";
    let bytes_per_group = this.bytes_per_group;
    const delimiter = bytes_per_group === 0 ? "" : " ";
    const group_len = maxnumberlen(bytes_per_group, this.radix);
    const padlen =
      (this.bytes_per_line - buffer.length) *
      (bytes_per_group === 0 ? group_len : (group_len + 1) / bytes_per_group);
    if (bytes_per_group === 0) {
      bytes_per_group = 1;
    }
    const start = this.littleEndian ? bytes_per_group - 1 : 0;
    const end = this.littleEndian ? -1 : bytes_per_group;
    const step = this.littleEndian ? -1 : 1;
    for (let group = 0; group < buffer.length / bytes_per_group; ++group) {
      let val = bytes_per_group < 4 ? 0 : BigInt(0);
      for (let ii = start; ii !== end; ii += step) {
        const i = group * bytes_per_group + ii;
        if (i >= buffer.length) {
          // not rendering dangling bytes.  TODO: render them as smaller grouping
          break;
        }
        if (bytes_per_group < 4) {
          val =
            Number(val) * 256 +
            ((typeof buffer === "string" ? buffer.codePointAt(i)! : buffer[i]) &
              0xff);
        } else {
          val =
            BigInt(val) * BigInt(256) +
            BigInt(
              (typeof buffer === "string"
                ? buffer.codePointAt(i)!
                : buffer[i]) & 0xff
            );
        }
      }
      const text = val.toString(this.radix);
      for (let c = 0; c < group_len - text.length; c++) {
        str += "0";
      }
      str += text;
      str += delimiter;
      if (this.caps === "upper") {
        str = str.toUpperCase();
      }
    }
    if (buffer.length < this.bytes_per_line) {
      str += (this.html ? "&nbsp;" : " ").repeat(padlen);
    }
    str = this.rpad(str);
    return str;
  }

  // converts a number to a string and pads it with '0' on the left, up to requested length
  private num2str(b: number, len: number, radix?: number) {
    const s = b.toString(radix);
    return "0".repeat(len - s.length) + s;
  }

  private rpad(s: string) {
    const to_add = this.hex_line_length - s.length - 1;
    if (to_add > 0) {
      s += (this.html ? "&nbsp;" : " ").repeat(to_add);
    }
    return s;
  }

  private ascii_escape(str: string) {
    return str.replace(
      this.extendedChs
        ? HexDumpGenerator.CONTROL_CHARACTERS_ONLY
        : HexDumpGenerator.ALL_EXCEPT_PRINTABLE_LATIN,
      "."
    );
  }

  private html_escape(str: string) {
    str = str.replace(/&/g, "&amp;"); // `replace()` is measurably faster than `split().join()` in Node.js v.*
    str = str.replace(/</g, "&lt;");
    str = str.replace(/>/g, "&gt;");
    if (this.extendedChs) {
      str = str.replace(/\'/g, "&apos;");
      str = str.replace(/\"/g, "&quot;");
      str = str.replace(HexDumpGenerator.ALL_EXCEPT_PRINTABLE_LATIN, (ch) => {
        const numChar = ch.codePointAt(0);
        return "&#x" + numChar?.toString(16) + ";";
      });
    } else {
      str = str.replace(HexDumpGenerator.ALL_EXCEPT_PRINTABLE_LATIN, ".");
    }
    return str;
  }
}

export const maxnumberlen = (bytes: number, radix: number) => {
  let result = 2;
  if (bytes === 0) {
    bytes = 1;
  }
  switch (radix) {
    case 2: // BIN: 8, 16, 32, 64
      result = bytes * 8;
      break;
    case 8: // OCT: 3, 6, 11, 22
      switch (bytes) {
        case 1:
          result = 3;
          break;
        case 2:
          result = 6;
          break;
        case 4:
          result = 11;
          break;
        case 8:
          result = 22;
          break;
      }
      break;
    case 10: // DEC: 3, 6, 10, 20
      switch (bytes) {
        case 1:
          result = 3;
          break;
        case 2:
          result = 6;
          break;
        case 4:
          result = 10;
          break;
        case 8:
          result = 20;
          break;
      }
      break;
    case 16: // HEX: 2, 4, 8, 16
      result = 2 * bytes;
      break;
  }
  return result;
};
