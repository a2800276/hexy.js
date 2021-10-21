const str = "0123456789abcdefghijklmnopqrstuvwxzy";
const nums = [ 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 97, 98, 99, 100, 
  101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114,
  115, 116, 117, 118, 119, 120, 122, 121 ];

var bundle = null;
if (typeof window === 'undefined') {
  bundle = [ Buffer.from("0123456789abcdefghijklmnopqrstuvwxzy"), str, nums ]; // this is node.js case
} else {
  bundle = [ str, nums ]; // this is browser case: `Buffer` is not the same here
}

const _00 = String.fromCharCode(0);
const _0000 = _00 + _00;
const _08 = String.fromCharCode(8);
const _40 = "@";
const _53 = "S";
const _5100 = "Q"+_00;
const str3 = "#include<stdio.h>\n";
const arr = [0x1001, 0x2002, 0x3003, 0xf00f];
const arr_e = "00000000: 0102 030f                                ....\n";


const results = [
"00000000: 3031 3233 3435 3637 3839 6162 6364 6566  0123456789abcdef\n"+
"00000010: 6768 696a 6b6c 6d6e 6f70 7172 7374 7576  ghijklmnopqrstuv\n"+
"00000020: 7778 7a79                                wxzy\n",

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

"00000000: 30313233 34353637 38396162 63646566  0123456789abcdef\n" +
"00000010: 6768696a 6b6c6d6e 6f707172 73747576  ghijklmnopqrstuv\n" +
"00000020: 77787a79                             wxzy\n",

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

"0000000a: 6162 6364 6566 6768 696a 6b6c 6d6e 6f70  abcdefghijklmnop\n"+
"0000001a: 7172 7374 7576 7778 7a79                 qrstuvwxzy\n",

"0000000a: 6162 6364 6566 6768 696a                 abcdefghij\n",

"<div class='hexy'>\n"+
"<div class='0000000a even'>0000000a: 6162 6364 6566 6768 696a &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; abcdefghij</div>\n"+
"</div>\n",

"0000000a: 3031 3233 3435 3637 3839 6162 6364 6566  0123456789abcdef\n"+
"0000001a: 6768 696a 6b6c 6d6e 6f70 7172 7374 7576  ghijklmnopqrstuv\n"+
"0000002a: 7778 7a79                                wxzy\n",

"00000014: 6162 6364 6566 6768 696a                 abcdefghij\n",
];

const testcases = [
// #0
  { input: str, params: {}, result: results[0] }, // historic first testcase will always remain #0
  { inputs: bundle, params: {}, result: results[0] },
  { inputs: bundle, params: {caps:"upper"}, result: results[1] },
  { inputs: bundle, params: {width:8}, result: results[2] },
  { inputs: bundle, params: {width:8, caps:"upper"}, result: results[3] },
  { inputs: bundle, params: {numbering:"none"}, result: results[4] },
  { inputs: bundle, params: {format:"twos"}, result: results[5] },
  { inputs: bundle, params: {format:"eights"}, result: results[6] },
  { inputs: bundle, params: {format:"none"}, result: results[7] },
  { inputs: bundle, params: {annotate:"none"}, result: results[8] },
// #10
  { inputs: bundle, params: {prefix:"-"}, result: results[9] },
  { inputs: bundle, params: {indent:"5"}, result: results[10] },
  { inputs: bundle, params: {caps:"upper", numbering:"none", annotate:"none", prefix:"dingdong", format:"twos"}, result: results[11] },
  { inputs: bundle, params: {html:true}, result: results[12] },
  { inputs: bundle, params: {offset:10}, result: results[13] },
  { inputs: bundle, params: {offset:10, length:10}, result: results[14] },
  { inputs: bundle, params: {offset:10, length:10, html:true}, result: results[15] },
  { inputs: bundle, params: {display_offset:10}, result: results[16] },
  { inputs: bundle, params: {display_offset:10, offset:10, length:10}, result: results[17] },
  { input: _00 + _00 + _08 + _40 + _53 + _00 + _0000 + _5100 + _0000 + _5100 + _0000, params: {}, result: "00000000: 0000 0840 5300 0000 5100 0000 5100 0000  ...@S...Q...Q...\n" },
// #20
  { input: str3, params: {}, result: "00000000: 2369 6e63 6c75 6465 3c73 7464 696f 2e68  #include<stdio.h\n00000010: 3e0a                                     >.\n" },
  { input: str3, params: {html:true}, result: "<div class='hexy'>\n"+
                                              "<div class='00000000 even'>00000000: 2369 6e63 6c75 6465 3c73 7464 696f 2e68  #include&lt;stdio.h</div>\n"+
                                              "<div class='00000010  odd'>00000010: 3e0a &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &gt;.</div>\n"+
                                              "</div>\n" },
  // empties
  { input: "", params: {}, result: "" },
  // Number arrays with bytes work, arrays containing values larger that 0xff are truncated ( val & 0xff )
  { input: arr, params: {}, result: arr_e },
   // non numerical width
  { input: arr, params: {width: "something"}, result: arr_e },
  { input: arr, params: {width: "2"}, result: "00000000: 0102  ..\n00000002: 030f  ..\n" },
  { input: arr, params: {width: 1}, result: "00000000: 01  .\n00000001: 02  .\n00000002: 03  .\n00000003: 0f  .\n" },
  // endianness
  { input: arr, params: {littleEndian: true}, result: "00000000: 0201 0f03                                ....\n" },
  // alternative radix
  { input: arr, params: {radix: 10, format: "twos"}, result: "00000000: 001 002 003 015                                                    ....\n" },
  // suppression of non-printable characters
  { input: [ 0x68, 0x65, 0x6c, 0x6c, 0x6f, 0xd2, 0x77, 0x6f, 0x72, 0x6c, 0x64 ], params: {format: "twos", html: true, extendedChs: true}, result: "<div class='hexy'>\n"+
                                                                                                                                                  "<div class='00000000 even'>00000000: 68 65 6c 6c 6f d2 77 6f 72 6c 64 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; hello&#xd2;world</div>\n"+
                                                                                                                                                  "</div>\n" },
// #30
  { input: [ 0x68, 0x65, 0x6c, 0x6c, 0x6f, 0xd2, 0x77, 0x6f, 0x72, 0x6c, 0x64 ], params: {format: "twos"}, result: "00000000: 68 65 6c 6c 6f d2 77 6f 72 6c 64                   hello.world\n" },
  { input: [ 0x68, 0x65, 0x6c, 0x6c, 0x6f, 0xd2, 0x77, 0x6f, 0x72, 0x6c, 0x64 ], params: {format: "twos", extendedChs:true}, result: "00000000: 68 65 6c 6c 6f d2 77 6f 72 6c 64                   hello" + "\u00d2" + "world\n" },
];
if (typeof window === 'undefined') {
  module.exports = testcases;
}