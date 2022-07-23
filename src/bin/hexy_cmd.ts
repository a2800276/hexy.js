#!/usr/bin/env node

import hexy from "../hexy";
import fs from "fs";
import { FormatOptions } from "../FormatOptions";

function usage(mes?: string) {
  console.log(
    mes ||
      "usage: " + /[^/\\]*$/.exec(process.argv[1]) + " [options] <filename>"
  );
  console.log("--width     [(16)]                     how many bytes per line");
  console.log(
    "--numbering [(hex_bytes)|none]         prefix current byte count"
  );
  console.log("--radix     [2|8|10|(16)]              radix to use");
  console.log(
    "--format    [sixteens|eights|(fours)|twos|none] how many nibbles per group"
  );
  console.log(
    "--littleEndian                         the data is littleEndian"
  );
  console.log(
    "--extendedChs                          show more characters as-is"
  );
  console.log("--caps      [(lower)|upper]            case of hex chars");
  console.log(
    "--html                                 render the output in HTML format"
  );
  console.log(
    "--annotate  [(ascii)|none]             provide ascii annotation"
  );
  console.log(
    '--prefix    [("")|<prefix>]          printed in front of each line'
  );
  console.log(
    "--indent    [(0)|<num>]                number of spaces to indent output"
  );
  console.log("parameters in (parens) are default");
  process.exit(1);
}

function existsFatal(fn: string) {
  try {
    let stat = fs.statSync(fn);
    if (stat.isFile()) {
      return;
    }
  } catch (e) {}
  usage("not a file: " + fn);
}

function handleArgs(): { filename?: string; format: FormatOptions } {
  const format: FormatOptions = {};
  const cliFormat: { [key: string]: string } = {};
  const ARGS = [
    "--width",
    "--numbering",
    "--radix",
    "--format",
    "--littleEndian",
    "--extendedChs",
    "--caps",
    "--annotate",
    "--prefix",
    "--indent",
  ];

  let args = process.argv;
  let filename;

  for (let i = 2; i < args.length; ++i) {
    let arg = args[i];
    if ("--help" === arg) {
      usage();
    }
    if (-1 === ARGS.indexOf(arg)) {
      // not a valid flag
      if (args.length - 1 === i) {
        // last arg, could be filename
        existsFatal(arg);
        filename = arg;
        break;
      } else {
        usage();
      }
    }
    arg = arg.substring(2, arg.length);
    console.log(arg);
    cliFormat[arg] = args[++i];
  }

  if (cliFormat.width) {
    format.width = parseInt(cliFormat.width, 10);
  }
  if (cliFormat.indent) {
    format.indent = parseInt(cliFormat.indent, 10);
  }
  if (cliFormat.radix) {
    format.radix = parseInt(cliFormat.radix, 10);
  }
  if (cliFormat.html) {
    format.html = true;
  }
  format.littleEndian = cliFormat.littleEndian == "true";
  format.extendedChs = cliFormat.extendedChs == "true";
  return { filename, format };
}

/************************************************************************
 * MAIN *****************************************************************
 ************************************************************************/

const { format, filename } = handleArgs();
let buffer: Buffer | null = null;
let buffer_: Buffer;

if (filename) {
  buffer = fs.readFileSync(filename);
  console.log(hexy.hexy(buffer, format));
} else {
  const stdin = process.openStdin();
  stdin.on("data", function (data) {
    let offset = 0;
    if (buffer) {
      offset = buffer.length;
      buffer_ = Buffer.from(buffer.length + data.length);
      buffer.copy(buffer_, 0, 0);
      buffer = buffer_;
      data.copy(buffer, offset, data.length);
    } else {
      buffer = data;
    }
  });

  stdin.on("end", function () {
    if (buffer) {
      console.log(hexy.hexy(buffer, format));
    }
  });
}
