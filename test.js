var hexy = require("./hexy.js")

buf = new Buffer("0123456789abcdefghijklmnopqrstuvwxzy")
str = "0123456789abcdefghijklmnopqrstuvwxzy"

var results = [
"00000000: 3031 3233 3435 3637 3839 6162 6364 6566  0123456789abcdef\n"+
"00000010: 6768 696a 6b6c 6d6e 6f70 7172 7374 7576  ghijklmnopqrstuv\n"+
"00000020: 7778 7a79                                wxzy\n",

"00010000: 3031 3233 3435 3637 3839 6162 6364 6566  0123456789abcdef\n"+
"00010010: 6768 696a 6b6c 6d6e 6f70 7172 7374 7576  ghijklmnopqrstuv\n"+
"00010020: 7778 7a79                                wxzy\n",

"00000000: 3031 3233 3435 3637 3839 6162 6364 6566  0123456789abcdef\n"+
"00000010: 6768 696A 6B6C 6D6E 6F70 7172 7374 7576  ghijklmnopqrstuv\n"+
"00000020: 7778 7A79                                wxzy\n",

"00000000: 3031 3233 3435 3637  01234567\n"+
"00000008: 3839 6162 6364 6566  89abcdef\n"+
"00000010: 6768 696a 6b6c 6d6e  ghijklmn\n"+
"00000018: 6f70 7172 7374 7576  opqrstuv\n"+
"00000020: 7778 7a79            wxzy\n",

"00000000: 3031 3233 3435 3637  01234567\n"+
"00000008: 3839 6162 6364 6566  89abcdef\n"+
"00000010: 6768 696A 6B6C 6D6E  ghijklmn\n"+
"00000018: 6F70 7172 7374 7576  opqrstuv\n"+
"00000020: 7778 7A79            wxzy\n",

"3031 3233 3435 3637 3839 6162 6364 6566  0123456789abcdef\n"+
"6768 696a 6b6c 6d6e 6f70 7172 7374 7576  ghijklmnopqrstuv\n"+
"7778 7a79                                wxzy\n",

"00000000: 30 31 32 33 34 35 36 37 38 39 61 62 63 64 65 66    0123456789abcdef\n"+
"00000010: 67 68 69 6a 6b 6c 6d 6e 6f 70 71 72 73 74 75 76    ghijklmnopqrstuv\n"+
"00000020: 77 78 7a 79                                        wxzy\n",

"00000000: 30313233343536373839616263646566  0123456789abcdef\n"+
"00000010: 6768696a6b6c6d6e6f70717273747576  ghijklmnopqrstuv\n"+
"00000020: 77787a79                          wxzy\n",

"00000000: 3031 3233 3435 3637 3839 6162 6364 6566 \n"+
"00000010: 6768 696a 6b6c 6d6e 6f70 7172 7374 7576 \n"+
"00000020: 7778 7a79                               \n",

"-00000000: 3031 3233 3435 3637 3839 6162 6364 6566  0123456789abcdef\n"+
"-00000010: 6768 696a 6b6c 6d6e 6f70 7172 7374 7576  ghijklmnopqrstuv\n"+
"-00000020: 7778 7a79                                wxzy\n",

"     00000000: 3031 3233 3435 3637 3839 6162 6364 6566  0123456789abcdef\n"+
"     00000010: 6768 696a 6b6c 6d6e 6f70 7172 7374 7576  ghijklmnopqrstuv\n"+
"     00000020: 7778 7a79                                wxzy\n",

"dingdong30 31 32 33 34 35 36 37 38 39 61 62 63 64 65 66   \n"+
"dingdong67 68 69 6A 6B 6C 6D 6E 6F 70 71 72 73 74 75 76   \n"+
"dingdong77 78 7A 79                                       \n"+
"",

"<div class='hexy'>\n"+
"<div class='00000000 even'>00000000: 3031 3233 3435 3637 3839 6162 6364 6566  0123456789abcdef</div>\n"+
"<div class='00000010  odd'>00000010: 6768 696a 6b6c 6d6e 6f70 7172 7374 7576  ghijklmnopqrstuv</div>\n"+
"<div class='00000020 even'>00000020: 7778 7a79 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; wxzy</div>\n"+
"</div>\n",
]

var format = [
  {},
  {offset:0x10000},
  {caps:"upper"},
  {width:8},
  {width:8, caps:"upper"},
  {numbering:"none"},
  {format:"twos"},
  {format:"none"},
  {annotate:"none"},
  {prefix:"-"},
  {indent:"5"},
  {caps:"upper", numbering:"none", annotate:"none", prefix:"dingdong", format:"twos"},
  {html:true}
]

function check (should, is) {
  if (should !== is) {
    console.log("failed:")
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
}

_00 = String.fromCharCode(0)
_0000 = _00 + _00
_08 = String.fromCharCode(8)
_40 = "@"
_53 = "S"
_5100 = "Q"+_00
var str2 = _00 + _00 + _08 + _40 + _53 + _00 + _0000 + _5100 + _0000 + _5100 + _0000
var xxd2 = "00000000: 0000 0840 5300 0000 5100 0000 5100 0000  ...@S...Q...Q...\n"

failed += check(xxd2, hexy.hexy(str2))
++total


str3 = "#include<stdio.h>\n"
xxd3 = "00000000: 2369 6e63 6c75 6465 3c73 7464 696f 2e68  #include<stdio.h\n"+
       "00000010: 3e0a                                     >.\n"

failed += check(xxd3, hexy.hexy(str3))
++total

xxd4 = "<div class='hexy'>\n"+
       "<div class='00000000 even'>00000000: 2369 6e63 6c75 6465 3c73 7464 696f 2e68  #include&lt;stdio.h</div>\n"+
       "<div class='00000010  odd'>00000010: 3e0a &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &gt;.</div>\n"+
       "</div>\n"

failed += check(xxd4, hexy.hexy(str3, {html:true}))
++total

p("failed: "+failed+" of "+total)

if (failed != 0) {
  process.exit(1)
}
