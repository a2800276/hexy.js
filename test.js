var hexy = require("./hexy.js")

var buf = Buffer.from("0123456789abcdefghijklmnopqrstuvwxzy")
var str = "0123456789abcdefghijklmnopqrstuvwxzy"
var nums = [ 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 97, 98, 99, 100, 
  101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114,
  115, 116, 117, 118, 119, 120, 122, 121 ]

var results = [
"00000000: 3031 3233 3435 3637 3839 6162 6364 6566 \t\t0123456789abcdef\n"+
"00000010: 6768 696a 6b6c 6d6e 6f70 7172 7374 7576 \t\tghijklmnopqrstuv\n"+
"00000020: 7778 7a79                               \t\twxzy            \n",

"00000000: 3031 3233 3435 3637 3839 6162 6364 6566 \t\t0123456789abcdef\n"+
"00000010: 6768 696A 6B6C 6D6E 6F70 7172 7374 7576 \t\tghijklmnopqrstuv\n"+
"00000020: 7778 7A79                               \t\twxzy            \n",

"00000000: 3031 3233 3435 3637 \t\t01234567\n"+
"00000008: 3839 6162 6364 6566 \t\t89abcdef\n"+
"00000010: 6768 696a 6b6c 6d6e \t\tghijklmn\n"+
"00000018: 6f70 7172 7374 7576 \t\topqrstuv\n"+
"00000020: 7778 7a79           \t\twxzy    \n",

"00000000: 3031 3233 3435 3637 \t\t01234567\n"+
"00000008: 3839 6162 6364 6566 \t\t89abcdef\n"+
"00000010: 6768 696A 6B6C 6D6E \t\tghijklmn\n"+
"00000018: 6F70 7172 7374 7576 \t\topqrstuv\n"+
"00000020: 7778 7A79           \t\twxzy    \n",

"3031 3233 3435 3637 3839 6162 6364 6566 \t\t0123456789abcdef\n"+
"6768 696a 6b6c 6d6e 6f70 7172 7374 7576 \t\tghijklmnopqrstuv\n"+
"7778 7a79                               \t\twxzy            \n",

"00000000: 30 31 32 33 34 35 36 37 38 39 61 62 63 64 65 66   \t\t0123456789abcdef\n"+
"00000010: 67 68 69 6a 6b 6c 6d 6e 6f 70 71 72 73 74 75 76   \t\tghijklmnopqrstuv\n"+
"00000020: 77 78 7a 79                                       \t\twxzy            \n",

"00000000: 30313233 34353637 38396162 63646566 \t\t0123456789abcdef\n" +
"00000010: 6768696a 6b6c6d6e 6f707172 73747576 \t\tghijklmnopqrstuv\n" +
"00000020: 77787a79                            \t\twxzy            \n",

"00000000: 30313233343536373839616263646566 \t\t0123456789abcdef\n"+
"00000010: 6768696a6b6c6d6e6f70717273747576 \t\tghijklmnopqrstuv\n"+
"00000020: 77787a79                         \t\twxzy            \n",

"00000000: 3031 3233 3435 3637 3839 6162 6364 6566 \n"+
"00000010: 6768 696a 6b6c 6d6e 6f70 7172 7374 7576 \n"+
"00000020: 7778 7a79                               \n",

"-00000000: 3031 3233 3435 3637 3839 6162 6364 6566 \t\t0123456789abcdef\n"+
"-00000010: 6768 696a 6b6c 6d6e 6f70 7172 7374 7576 \t\tghijklmnopqrstuv\n"+
"-00000020: 7778 7a79                               \t\twxzy            \n",

"     00000000: 3031 3233 3435 3637 3839 6162 6364 6566 \t\t0123456789abcdef\n"+
"     00000010: 6768 696a 6b6c 6d6e 6f70 7172 7374 7576 \t\tghijklmnopqrstuv\n"+
"     00000020: 7778 7a79                               \t\twxzy            \n",

"dingdong30 31 32 33 34 35 36 37 38 39 61 62 63 64 65 66   \n"+
"dingdong67 68 69 6A 6B 6C 6D 6E 6F 70 71 72 73 74 75 76   \n"+
"dingdong77 78 7A 79                                       \n"+
"",

"<div class='hexy'>\n"+
"<div class='00000000 even'>00000000: 3031 3233 3435 3637 3839 6162 6364 6566 \t\t0123456789abcdef</div>\n"+
"<div class='00000010  odd'>00000010: 6768 696a 6b6c 6d6e 6f70 7172 7374 7576 \t\tghijklmnopqrstuv</div>\n"+
"<div class='00000020 even'>00000020: 7778 7a79 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\t\twxzy&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>\n"+
"</div>\n",

"0000000a: 6162 6364 6566 6768 696a 6b6c 6d6e 6f70 \t\tabcdefghijklmnop\n"+
"0000001a: 7172 7374 7576 7778 7a79                \t\tqrstuvwxzy      \n",

"0000000a: 6162 6364 6566 6768 696a                \t\tabcdefghij      \n",

"<div class='hexy'>\n"+
"<div class='0000000a even'>0000000a: 6162 6364 6566 6768 696a &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\t\tabcdefghij&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>\n"+
"</div>\n",

"0000000a: 3031 3233 3435 3637 3839 6162 6364 6566 \t\t0123456789abcdef\n"+
"0000001a: 6768 696a 6b6c 6d6e 6f70 7172 7374 7576 \t\tghijklmnopqrstuv\n"+
"0000002a: 7778 7a79                               \t\twxzy            \n",

"00000014: 6162 6364 6566 6768 696a                \t\tabcdefghij      \n",
]

var format = [
  {},
  {caps:"upper"},
  {width:8},
  {width:8, caps:"upper"},
  {numbering:"none"},
  {format:"twos"},
  {format:"eights"},
  {format:"none"},
  {annotate:"none"},
  {prefix:"-"},
  {indent:"5"},
  {caps:"upper", numbering:"none", annotate:"none", prefix:"dingdong", format:"twos"},
  {html:true},
  {offset:10},
  {offset:10, length:10},
  {offset:10, length:10, html:true},
  {display_offset: 10},
  {display_offset: 10, offset:10, length:10},
]

function check (should, is) {
  if (should !== is) {
    console.log("failed:")
    console.log(hexy.hexy(should))
    console.log(hexy.hexy(is))
    console.log("==")
    console.log(should)
    console.log(is)
    return 1
  }
  return 0
}

check (results[0], hexy.hexy(buf))

function p (o) {console.log(o)}

var total, failed;
total = failed = 0
for (var i = 0; i!= format.length ; ++i) {
  failed += check(results[i], hexy.hexy(buf, format[i]))
  ++total
  failed += check(results[i], hexy.hexy(str, format[i]))
  ++total
  failed += check(results[i], hexy.hexy(nums, format[i]))
  ++total
}

_00 = String.fromCharCode(0)
_0000 = _00 + _00
_08 = String.fromCharCode(8)
_40 = "@"
_53 = "S"
_5100 = "Q"+_00
var str2 = _00 + _00 + _08 + _40 + _53 + _00 + _0000 + _5100 + _0000 + _5100 + _0000
var xxd2 = "00000000: 0000 0840 5300 0000 5100 0000 5100 0000 \t\t...@S...Q...Q...\n"

failed += check(xxd2, hexy.hexy(str2))
++total


str3 = "#include<stdio.h>\n"
xxd3 = "00000000: 2369 6e63 6c75 6465 3c73 7464 696f 2e68 \t\t#include<stdio.h\n"+
       "00000010: 3e0a                                    \t\t>.              \n"

failed += check(xxd3, hexy.hexy(str3))
++total

xxd4 = "<div class='hexy'>\n"+
       "<div class='00000000 even'>00000000: 2369 6e63 6c75 6465 3c73 7464 696f 2e68 \t\t#include&lt;stdio.h</div>\n"+
       "<div class='00000010  odd'>00000010: 3e0a &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\t\t&gt;.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>\n"+
       "</div>\n"

failed += check(xxd4, hexy.hexy(str3, {html:true}))
++total

// empty string/buffer/nil etc should return empty string, as does xxd
var empties = ["", undefined, null]
empties.forEach( function (empty) {
  failed += check("", hexy.hexy(empty))
  ++total
})

// Number arrays with bytes work, arrays containing values larger that 
// 0xff are truncated ( val & 0xff )
var arr = [0x1001, 0x2002, 0x3003, 0xf00f]
var arr_e = "00000000: 0102 030f                               \t\t....            \n"
failed += check(arr_e, hexy.hexy(arr))
++total

// non numerical width
failed += check(arr_e, hexy.hexy(arr, {width: "something"}))
++total

arr_e = "00000000: 0102 \t\t..\n00000002: 030f \t\t..\n"

failed += check(arr_e, hexy.hexy(arr, {width: "2"}))
++total

arr_e = "00000000: 01 \t\t.\n00000001: 02 \t\t.\n00000002: 03 \t\t.\n00000003: 0f \t\t.\n"

failed += check(arr_e, hexy.hexy(arr, {width: 1}))
++total

function checkVersion () {
  const fs = require("fs") 
  const pkg = fs.readFileSync("package.json") 
  const version = JSON.parse(pkg).version

  failed += check(version, hexy.Hexy.VERSION)
  ++total
}
checkVersion()


p("failed: "+failed+" of "+total)

if (failed != 0) {
  process.exit(1)
}


