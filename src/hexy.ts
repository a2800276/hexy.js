// # hexy.js -- utility to create hex dumps
//
// `hexy` is an easy to use javascript library to create hex dumps. It
// works just as well in node as in your browser. It contains a
// number of options to configure how the hex dump will end up looking.
//
// It creates a pleasant looking hex dump by default:
//
//```javascript
//let hexy = require('hexy'),
//    b = Buffer.from("\000\001\003\005\037\012\011bcdefghijklmnopqrstuvwxyz0123456789")
//        // or String or Array containing numbers ( bytes, i.e. < 0xFF )
//
//console.log(hexy.hexy(b))
// ```
//
// results in this dump:
//
//     00000000: 0001 0305 1f0a 0962 6364 6566 6768 696a  .......bcdefghij
//     00000010: 6b6c 6d6e 6f70 7172 7374 7576 7778 797a  klmnopqrstuvwxyz
//     00000020: 3031 3233 3435 3637 3839                 0123456789
//
// but you can configure:
//
//   * Line numbering
//   * Line width
//   * Format of byte grouping
//   * The case (upper/lower) of hex decimals
//   * Presence of the ASCII annotation in the right column.
//
// This means it's easy to generate exciting dumps like:
//
//     0000000: 0001 0305 1f0a 0962  .... ...b
//     0000008: 6364 6566 6768 696a  cdef ghij
//     0000010: 6b6c 6d6e 6f70 7172  klmn opqr
//     0000018: 7374 7576 7778 797a  stuv wxyz
//     0000020: 3031 3233 3435 3637  0123 4567
//     0000028: 3839                 89
//
// or even:
//
//     0000000: 00 01 03 05 1f 0a 09 62   63 64 65 66 67 68 69 6a
//     0000010: 6b 6c 6d 6e 6f 70 71 72   73 74 75 76 77 78 79 7a
//     0000020: 30 31 32 33 34 35 36 37   38 39
//
// with hexy!
//
// ## Accepted Input
//
// Currently, input should be one of the following:
//
//   - a `Buffer`
//   - a `String`
//   - an `Array` containing `Number`s. These should fit into
//     8 bits, i.e. be smaller than 255. Larger values are truncated
//     (specifically `val & 0xff`)
//
// ## Formatting Options
//
// Formatting options are configured by passing a `format` object to the `hexy` function:
//
//```javascript
//let format = {}
//    format.width = width // how many bytes per line, default 16
//    format.numbering = n // ["hex_bytes" | "none"],  default "hex_bytes"
//    format.radix = b     // [2, 8, 10, 16], the radix for numeral representation
//                         // for the right column,    default 16
//    format.format = f    // ["twos"|"fours"|"eights"|"sixteens"|"none"], number of nibbles per group
//                         //                          default "fours"
//    format.littleEndian = true
//                         // endiannes of data,       default false
//                         // counts when number of nibbles is more than "twos",
//                         // i.e. displaying groups bigger than one byte
//    format.extendedChs = true
//                         // allow displaying more characters in the text column
//                         //                          default false
//    format.caps = c      // ["lower"|"upper"],       default lower
//    format.annotate = a  // ["ascii"|"none"], ascii annotation at end of line?
//                         //                          default "ascii"
//    format.prefix = p    // <string> something pretty to put in front of each line
//                         //                          default ""
//    format.indent = i    // <num> number of spaces to indent
//                         //                          default 0
//    format.html = true   // funky html divs 'n stuff! experimental.
//                         //                          default: false
//    format.offset = X    // generate hexdump based on X byte offset
//                         // into the provided source
//                         //                          default 0
//    format.length = Y    // process Y bytes of the provide source
//                         // starting at `offset`. -1 for all
//                         //                          default -1
//    format.display_offset = Z
//                         // add Z to the address prepended to each line
//                         // (note, even if `offset` is provided, addressing
//                         // is started at 0)
//                         //                          default 0
//
//console.log(hexy.hexy(buffer, format))
//```
// In case you're really nerdy, you'll have noticed that the defaults correspond
// to how `xxd` formats its output.
//
//
// ## Installing
//
// Either use `npm` (or whatever compatible npm thingie people are using
// these days) :
//
//```shell
//$ npm install hexy
//```
//
// This will install the lib which you'll be able to use like so:
//
//```javascript
//let hexy = require("hexy"),
//    buf  = // get Buffer from somewhere,
//    str  = hexy.hexy(buf)
// ```
//
// It will also install `hexy` into your path in case you're totally fed up
// with using `xxd`.
//
//
// If you don't like `npm`, grab the source from github:
//
//     http://github.com/a2800276/hexy.js
//
// ## Typescript
//
//```typescript
//import {hexy} from "hexy";
//const buff = ...
//console.log(hexy(buff));
//```
//
// ## Browser Support
//
// Basically eveything should work fine in the browser as well, just
// include hexy.js in a script tag, and you'll get `hexy` and `Hexy` stuck
// to the global object (window).
//
// Some caveats: "Works fine on my system™". Browser support is 'new' and
// not thoroughly tested (... eh, only on chrome [Version: whatever I'm
// currently running]). Under node, I can generally assume that binary data
// is passed in in a sane fashion using buffers, but plain old Javascript
// doesn't really have any datatypes that can handle bytes gracefully.
// Currently only Strings and arrays containing Number'ish values are
// supported, I'd like to add numeric and typed arrays more explicitly.
//
// Let me know in case you run into any issues, I'd be happy to find out
// about them.
//
// ## TODOS
//
// The current version only pretty prints node.js Buffers, and JS Strings
// and Arrays. This should be expanded to also do typed arrays,
// Streams/series of Buffers which would be nice so you don't have to
// collect the whole things you want to pretty print in memory, and such.
//
// I'd like to improve html rendering, e.g. to be able to mouse over the
// ascii annotation and highlight the hex byte and vice versa, improve
// browser integration and set up a proper build & packaging system.
//
// Deno support would also be nice.
//
// Better testing for browser use.
//
//
// ## Thanks
//
// * Thanks to Isaac Schlueter [isaacs] for gratiously lending a hand and
// cheering me up.
// * dodo (http://coderwall.com/dodo)
// * the fine folks at [Travis](http://travis-ci.org/a2800276/hexy.js)
// * radare (https://github.com/radare)
// * Michele Caini (https://github.com/skypjack)
// * Koen Houtman (https://github.com/automagisch)
// * Stef Levesque (https://github.com/stef-levesque)
// * Abdulaziz Ghuloum (https://github.com/azizghuloum)
//
// ## History
//
// This is a fairly straightforward port of `hexy.rb` which does more or less the
// same thing. You can find it here:
//
//     http://github.com/a2800276/hexy
//
// in case these sorts of things interest you.
//
// ### 0.3.4
//
// * issue concerning static analysis and BigInt usage
//
// ### 0.3.3
//
// * added endianness (BE and LE)
// * added radix (HEX, DEC, OCT and BIN)
// * added 16-nibble (8 byte) groups
// * added option to display more non-lower-ascii chars
// * toString() can now accept Uint8Array -- the natural way
//   of reading files and streams in browsers
// * implemented and exported `maxnumberlen()`
// * performance += { 15-30% }
// * Node.js tests ++
// * created browser tests
// * created static html demo page (view.html)
// * restricted the set of node.js versions and browsers:
//   (now require support of `BigInt`: Node.JS 10.4+, browsers since 2018-2020)
// * the travis is passing now
//
// ### 0.3.2
//
// * documentation typos
// * 2FA for npm publish
//
// ### 0.3.1
//
// * use strict
// * fixes undefined var. Thanks m-kircher!
//
// ### 0.3.0
//
// * adds typescript support. Thanks Abdulaziz!
// * remove support for old node versions (0.6-0.12)
//
// ## Mail
//
// In case you discover bugs, spelling errors, offer suggestions for
// improvements or would like to help out with the project, you can contact
// me directly (tim@kuriositaet.de).

import { FormatOptions } from "./FormatOptions";

  const MAX_ADDRESS_LENGTH = 8; // TODO: might want to calculate

  export default class Hexy {
    public static readonly VERSION = "0.3.5";
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

    public static hexy = (
      buffer: Buffer | string | number[],
      config: FormatOptions
    ) => {
      const h = new Hexy(buffer, config);
      return h.toString();
    };

    constructor(
      private buffer: Buffer | string | number[],
      private config: FormatOptions
    ) {
      // if we have a Buffer class, convert
      if (typeof Buffer !== "undefined") {
        buffer =
          (Buffer.isBuffer(buffer) && buffer) ||
          (typeof buffer === "string" && Buffer.from(buffer)) ||
          (buffer && buffer.constructor === Array && Buffer.from(buffer)) || // accept num arrays
          Buffer.alloc(0);
      }
      buffer = buffer || [];
      config = config || {};

      this.buffer = buffer; // magic string conversion here?
      this.bytes_per_line = config.width ?? 16; // formerly `width`
      this.numbering = config.numbering == "none" ? "none" : "hex_bytes";

      this.bytes_per_group = 2; // by default (not handled below) "fours" will fold into `bytes_per_group == 2`
      switch (config.format) {
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

      this.littleEndian = config.littleEndian || false;
      this.radix = config.radix || 16;
      this.caps = config.caps == "upper" ? "upper" : "lower";
      this.annotate = config.annotate == "none" ? "none" : "ascii";
      this.prefix = config.prefix || "";
      this.indent = config.indent || 0;
      this.html = config.html || false;
      this.offset = config.offset || 0;
      this.length = config.length || -1;
      this.extendedChs = config.extendedChs || false;
      this.display_offset = config.display_offset || 0;

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

      this.hex_line_length =
        (maxnumberlen(this.bytes_per_group, this.radix) * this.bytes_per_line) /
        Math.max(this.bytes_per_group, 1);
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
      this.bytes_per_group = Math.min(
        this.bytes_per_group,
        this.bytes_per_line
      );
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
            " " +
            (this.html ? this.html_escape(text) : this.ascii_escape(text));
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
      const delimiter = this.bytes_per_group == 0 ? "" : " ";
      const group_len = maxnumberlen(this.bytes_per_group, this.radix);
      const padlen =
        (this.bytes_per_line - buffer.length) *
        (this.bytes_per_group == 0
          ? group_len
          : (group_len + 1) / this.bytes_per_group);
      if (this.bytes_per_group == 0) {
        this.bytes_per_group = 1;
      }
      const start = this.littleEndian ? this.bytes_per_group - 1 : 0;
      const end = this.littleEndian ? -1 : this.bytes_per_group;
      const step = this.littleEndian ? -1 : 1;
      for (
        let group = 0;
        group < buffer.length / this.bytes_per_group;
        ++group
      ) {
        let val = this.bytes_per_group < 4 ? 0 : BigInt(0);
        for (let ii = start; ii != end; ii += step) {
          const i = group * this.bytes_per_group + ii;
          if (i >= buffer.length) {
            // not rendering dangling bytes.  TODO: render them as smaller grouping
            break;
          }
          if (this.bytes_per_group < 4) {
            val =
              Number(val) * 256 +
              ((typeof buffer === "string"
                ? buffer.codePointAt(i)!
                : buffer[i]) &
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
          ? Hexy.CONTROL_CHARACTERS_ONLY
          : Hexy.ALL_EXCEPT_PRINTABLE_LATIN,
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
        str = str.replace(Hexy.ALL_EXCEPT_PRINTABLE_LATIN, (ch) => {
          const numChar = ch.codePointAt(0);
          return "&#x" + numChar?.toString(16) + ";";
        });
      } else {
        str = str.replace(Hexy.ALL_EXCEPT_PRINTABLE_LATIN, ".");
      }
      return str;
    }
  }

  export const maxnumberlen = (bytes: number, radix: number) => {
    let result = 2;
    if (bytes == 0) {
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
