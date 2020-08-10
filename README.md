# hexyz -- utility to create hex dumps from mainframe data

[![Build Status](https://travis-ci.com/crshnburn/hexyz.svg?branch=master)](https://travis-ci.com/crshnburn/hexyz)

`hexyz` is a javascript library that's easy to use to create hex dumps. It
works well in node and has cursory browser (more below) support. It contains a
number of options to configure how the hex dump will end up looking. This library
has been forked from [hexy.js](https://github.com/a2800276/hexy.js) to add support
for ebcdic encoded bytes.

It should create a pleasant looking hex dumb by default:

```javascript
var hexyz = require('hexyz'),
b = Buffer.from("\000\001\003\005\037\012\011bcdefghijklmnopqrstuvwxyz0123456789")
// or String or Array containing numbers ( bytes, i.e. < 0xFF )

console.log(hexyz.hexyz(b))
```

results in this dump:

```text
00000000: 0001 0305 1f0a 0962 6364 6566 6768 696a  .......bcdefghij
00000010: 6b6c 6d6e 6f70 7172 7374 7576 7778 797a  klmnopqrstuvwxyz
00000020: 3031 3233 3435 3637 3839                 0123456789
```

but it's also possible to configure:

* Line numbering
* Line width
* Format of byte grouping
* Case of hex decimals
* Presence of the ASCII and or EBCDIC annotation in the right column.

This means it's easy to generate exciting dumps like:

```text
0000000: 0001 0305 1f0a 0962  .... ...b
0000008: 6364 6566 6768 696a  cdef ghij
0000010: 6b6c 6d6e 6f70 7172  klmn opqr
0000018: 7374 7576 7778 797a  stuv wxyz
0000020: 3031 3233 3435 3637  0123 4567
0000028: 3839                 89
```

or even:

```text
0000000: 00 01 03 05 1f 0a 09 62   63 64 65 66 67 68 69 6a
0000010: 6b 6c 6d 6e 6f 70 71 72   73 74 75 76 77 78 79 7a
0000020: 30 31 32 33 34 35 36 37   38 39
```

with hexyz!

## Accepted Input

Currently, input should be one of the following:

* a `Buffer`
* a `String`
* an `Array` containing `Number`s.
  These should fit into 8 bits, i.e. be smaller than 255.
  Larger values are truncated (specifically `val & 0xff`)

## Formatting Options

Formatting options are configured by passing a `format` object to the `hexyz` function:

```javascript
var format = {}
format.width = width // how many bytes per line, default 16
format.numbering = n // ["hex_bytes" | "none"],  default "hex_bytes"
format.format = f    // ["eights"|"fours"|"twos"|"none"], how many nibbles per group
                     //                          default "fours"
format.caps = c      // ["lower"|"upper"],       default lower
format.annotate=a    // ["ascii"|"ebcdic"|"ascii_ebcdic"|"none"], ascii, ebcdic or
                     // both annotations at end of line?
                     //                          default "ascii"
format.prefix=p      // <string> something pretty to put in front of each line
                     //                          default ""
format.indent=i      // <num> number of spaces to indent
                     //                          default 0
format.html=true     // funky html divs 'n stuff! experimental.
                     //                          default: false
format.offset = X    // generate hexdump based on X byte offset
                     // into the provided source
                     //                          default 0
format.length = Y    // process Y bytes of the provide source
                     // starting at `offset`. -1 for all
                     //                          default -1
format.display_offset = Z
                     // add Z to the address prepended to each line
                     // (note, even if `offset` is provided, addressing
                     // is started at 0)
                     //                          default 0

console.log(hexyz.hexyz(buffer, format))
```

In case you're really nerdy, you'll have noticed that the defaults correspond
to how `xxd` formats it's output.

## Installing

Either use `npm` (or whatever compatible npm thingy people are using
these days) :

```shell
npm install @crshnburn/hexyz
```

This will install the lib which you'll be able to use like so:

```javascript
var hexyz = require("hexyz"),
buf  = // get Buffer from somewhere,
str  = hexy.hexy(buf)
```

If you don't like `npm`, grab the source from github:

[https://github.com/crshnburn/hexyz](https://github.com/crshnburn/hexyz)

## Typescript

```typescript
import {hexyz} from "@crshnburn/hexyz";
const buff = ...
console.log(hexyz(buff));
```

## Thanks

* [a2800276](https://github.com/a2800276) For publishing the original hexy.js
