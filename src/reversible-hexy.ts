// # reversible-hexy.js -- utility to create hex dumps
//
// `reversible-hexy` is an easy to use javascript library to create hex dumps. It
// works just as well in node as in your browser. It contains a
// number of options to configure how the hex dump will end up looking.
//
// It creates a pleasant looking hex dump by default:
//
//```javascript
//let reversibleHexy = require('reversible-hexy'),
//    b = Buffer.from("\000\001\003\005\037\012\011bcdefghijklmnopqrstuvwxyz0123456789")
//        // or String or Array containing numbers ( bytes, i.e. < 0xFF )
//
//console.log(reversibleHexy.hexy(b))
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
//import {hexy} from "reversible-hexy";
//import {unHexy} from "reversible-hexy"
//const buff = ...
//console.log(hexy(buff));
//```
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
// This is a fairly straightforward adapation of `hexy.js` which does more or less the
// same thing. You can find it here:
//
//     http://github.com/a2800276/hexy.js
//
// in case these sorts of things interest you.
//
// ### 0.3.5
//
// * Port to pure TypeScript
// * Added ability to revert hexdumps back into binary files (using hexy.unhexy)
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
import HexDumpGenerator from "./HexDumpGenerator";
import BinWriter from "./BinWriter";
import { BinWriterOptions } from "./BinWriterOptions";

export const hexy = (
  buffer: Buffer | string | number[],
  config: FormatOptions
) => {
  const h = new HexDumpGenerator(buffer, config);
  return h.toString();
};

export const unHexy = (hexdump: string, config?: BinWriterOptions) => {
  const h = new BinWriter(hexdump, config);
  return h.bin();
};

export const VERSION = "0.3.5";

export default { hexy, unHexy, VERSION };
