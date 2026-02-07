#!/usr/bin/env node

import * as hexyModule from "../hexy.js"
import fs from "fs"

const hexy = hexyModule

function usage(mes) {
  console.log(mes || "usage: " + /[^/\\]*$/.exec(process.argv[1]) + " [options] <filename>");
  console.log("--bytesPerLine  [(16)]                 number of bytes per line")
  console.log("--bytesPerGroup [0|(1)|2|4|8]          number of bytes per group")
  console.log("--showAddress                          display address in the left column")
  console.log("--littleEndian                         the data is littleEndian")
  console.log("--radix         [2|8|10|(16)]          radix to use")
  console.log("--caps          [(lower)|upper]        case of hex chars")
  console.log("--annotate      [(ascii)|none]         display ascii annotation in the right column")
  console.log("--prefix        [(\"\")|<prefix>]      printed in front of each line")
  console.log("--indent        [(0)|<num>]            number of spaces to indent output")
  console.log("--offset        (0)                    number of bytes to skip from the start")
  console.log("--displayOffset (0)                    shift the address values by this")
  console.log("--length        (-1) mean all          number of bytes to render")
  console.log("--extendedChs                          show more characters as-is")
  console.log("--html                                 render the output in HTML format")
  console.log("parameters in (parens) are default")
  process.exit(1)
}

function existsFatal(fn) {
  try {
    var stat = fs.statSync(fn)
    if (stat.isFile()) {
      return;
    }
  } catch (e) {}
  usage("not a file: "+fn)
}

function handleArgs () {
  var config = {},
      ARGS = [
      "--bytesPerLine",
      "--bytesPerGroup",
      "--showAddress",
      "--littleEndian",
      "--radix",
      "--caps",
      "--annotate",
      "--prefix",
      "--indent",
      "--offset",
      "--displayOffset",
      "--length",
      "--extendedChs",
      "--html"
      ]

  var args = process.argv

  for (var i=2; i<args.length; ++i) {
    var arg = args[i]
    if ("--help" === arg) {
      usage()
    }
    if (-1 === ARGS.indexOf(arg)) {
      // not a valid flag
      if (args.length-1 === i) {
        // last arg, could be filename
        existsFatal(arg)
        config.filename = arg
        break;
      } else {
        usage()
      }
    }
    arg = arg.substr(2, arg.length)
    config[arg] = args[++i]
  }

  if (config.bytesPerLine) {
    config.bytesPerLine = parseInt(config.bytesPerLine, 10)
  }
  if (config.bytesPerGroup) {
    config.bytesPerGroup = parseInt(config.bytesPerGroup, 10)
  }
  if (config.indent) {
    config.indent = parseInt(config.indent, 10)
  }
  if (config.radix) {
    config.radix = parseInt(config.radix, 10)
  }
  if (config.offset) {
    config.offset = parseInt(config.offset, 10)
  }
  if (config.displayOffset) {
    config.displayOffset = parseInt(config.displayOffset, 10)
  }
  if (config.html) {
    config.html = true
  }
  config.littleEndian = config.littleEndian == "true"
  config.extendedChs = config.extendedChs == "true"
  return config
}

/************************************************************************
 * MAIN ***************************************************************** 
************************************************************************/

var format = handleArgs(),
    buffer = null

if (format.filename) {
  buffer = fs.readFileSync(format.filename)
  console.log(hexy.hexy(buffer, format))
} else {
  var stdin = process.openStdin()
  stdin.on("data", function(data) {
    var offset = 0
    if (buffer) {
      offset = buffer.length
      buffer_ = new Buffer(buffer.length + data.length)
      buffer.copy(buffer_,0,0)
      buffer = buffer_
      data.copy(buffer, offset, data.length)
    } else {
      buffer = data 
    }
  })

  stdin.on("end", function(){
    console.log(hexy.hexy(buffer, format))
  }) 
}
