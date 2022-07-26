import { exit } from "process";
import { BinWriterOptions } from "./BinWriterOptions";

const HEX_POSTSCRIPT = 1;

export default class BinWriter {
  private config: Required<BinWriterOptions> = this.defaultConfig();
  private binary: Array<number> = new Array();

  constructor(private hexdump: string, config?: BinWriterOptions) {
    if (config) {
      this.config = {
        ...JSON.parse(JSON.stringify(this.config)),
        ...JSON.parse(JSON.stringify(config)),
      };
    }

    this.huntype();
  }

  /**
   * Max. cols binary characters are decoded from the input stream per line.
   * Two adjacent garbage characters after evaluated data delimit valid data.
   * Everything up to the next newline is discarded.
   *
   * The name is historic and came from 'undo type opt h'.
   *
   * Adapted from the huntype function of the Unix xxd executable:
   * https://github.com/vim/vim/blob/master/src/xxd/xxd.c
   */
  private huntype() {
    let c: string;
    let ignGarb = 1;
    let n1 = -1;
    let n2 = 0;
    let n3;
    let p = this.config.columns;
    let haveOff = 0;
    let wantOff = 0;

    for (let i = 0; i < this.hexdump.length; i++) {
      c = this.hexdump.charAt(i);
      if (c === "\r") {
        continue;
      }

      /* Allow multiple spaces.  This doesn't work when there is normal text
       * after the hex codes in the last line that looks like hex, thus only
       * use it for PostScript format. */
      if (
        this.config.hexType === HEX_POSTSCRIPT &&
        (c === " " || c === "\n" || c === "\t")
      ) {
        continue;
      }

      n3 = n2;
      n2 = n1;

      n1 = BinWriter.parseHexDigit(c);

      if (n1 === -1 && ignGarb) {
        continue;
      }

      ignGarb = 0;

      if (!this.config.hexType && p >= this.config.columns) {
        if (n1 < 0) {
          p = 0;
          continue;
        }
        wantOff = (wantOff << 4) | n1;
        continue;
      }

      if (this.config.baseOff + wantOff !== haveOff) {
        haveOff = this.config.baseOff + wantOff;
        if (this.config.baseOff + wantOff < haveOff) {
          console.error("Sorry, cannot seek backwards.");
          exit(5);
        }
        for (; haveOff < this.config.baseOff + wantOff; haveOff++) {
          this.binary.push(0);
        }
      }

      if (n2 >= 0 && n1 >= 0) {
        this.binary.push((n2 << 4) | n1);
        haveOff++;
        wantOff++;
        n1 = -1;
        if (!this.config.hexType && ++p >= this.config.columns) {
          // skip the rest of the line as garbage
          i = this.getEOL(i);
          c = this.hexdump.charAt(i);
        }
      } else if (n1 < 0 && n2 < 0 && n3 < 0) {
        // already stumbled into garbage, skip line, wait and see
        i = this.getEOL(i);
        c = this.hexdump.charAt(i);
      }

      if (c === "\n") {
        if (!this.config.hexType) {
          wantOff = 0;
        }
        p = this.config.columns;
        ignGarb = 1;
      }
    }
  }

  private getEOL(i: number): number {
    let j = i;
    while (this.hexdump.charAt(j) !== "\n") {
      j++;
    }
    return j;
  }

  private static parseHexDigit(c: string): number {
    const cCharCode = c.charCodeAt(0);
    if (c >= "0" && c <= "9") {
      return cCharCode - "0".charCodeAt(0);
    } else if (c >= "a" && c <= "f") {
      return cCharCode - "a".charCodeAt(0) + 10;
    } else if (c >= "A" && c <= "F") {
      return cCharCode - "A".charCodeAt(0) + 10;
    }
    return -1;
  }

  // TODO
  public bin(): Buffer {
    return Buffer.from(this.binary);
  }

  private defaultConfig(): Required<BinWriterOptions> {
    return {
      columns: 16,
      hexType: 0,
      baseOff: 0,
    };
  }
}
