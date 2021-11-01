#!/usr/bin/env node

var hexy = require("../hexy.js"),
    fs   = require("fs")

function usage(mes) {
  console.log(mes || "usage: " + /[^/\\]*$/.exec(process.argv[1]) + " [options] <filename>");
  console.log("--width     [(16)]                     how many bytes per line")
  console.log("--numbering [(hex_bytes)|none]         prefix current byte count")
  console.log("--radix     [2|8|10|(16)]              radix to use")
  console.log("--format    [sixteens|eights|(fours)|twos|none] how many nibbles per group")
  console.log("--littleEndian                         the data is littleEndian")
  console.log("--extendedChs                          show more characters as-is")
  console.log("--caps      [(lower)|upper]            case of hex chars")
  console.log("--html                                 render the output in HTML format")
  console.log("--annotate  [(ascii)|none]             provide ascii annotation")
  console.log("--prefix    [(\"\")|<prefix>]          printed in front of each line")
  console.log("--indent    [(0)|<num>]                number of spaces to indent output")
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
  var format = {},
      ARGS = [
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
        format.filename = arg
        break;
      } else {
        usage()
      }
    }
    arg = arg.substr(2, arg.length)
    format[arg] = args[++i]
  }

  if (format.width) {
    format.width = parseInt(format.width, 10)
  }
  if (format.indent) {
    format.indent = parseInt(format.indent, 10)
  }
  if (format.radix) {
    format.radix = parseInt(format.radix, 10)
  }
  if (format.html) {
    format.html = true
  }
  format.littleEndian = format.littleEndian == "true"
  format.extendedChs = format.extendedChs == "true"
  return format
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
