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
  { input: str, config: { bytesPerGroup: 2 }, result: results[0] }, // historic first testcase will always remain #0
  { inputs: bundle, config: { bytesPerGroup: 2, }, result: results[0] },
  { inputs: bundle, config: { bytesPerGroup: 2, caps: "upper" }, result: results[1] },
  { inputs: bundle, config: { bytesPerGroup: 2, bytesPerLine: 8 }, result: results[2] },
  { inputs: bundle, config: { bytesPerGroup: 2, bytesPerLine: 8, caps:"upper" }, result: results[3] },
  { inputs: bundle, config: { bytesPerGroup: 2, showAddress: false }, result: results[4] },
  { inputs: bundle, config: { bytesPerGroup: 1 }, result: results[5] },
  { inputs: bundle, config: { bytesPerGroup: 4 }, result: results[6] },
  { inputs: bundle, config: { bytesPerGroup: 0 }, result: results[7] },    // bytesPerGroup === 0 means there's no spaces between hex nibbles
  { inputs: bundle, config: { bytesPerGroup: 2, annotate: "none" }, result: results[8] },
// #10
  { inputs: bundle, config: { bytesPerGroup: 2, prefix: "-" }, result: results[9] },
  { inputs: bundle, config: { bytesPerGroup: 2, indent: 5 }, result: results[10] },
  { inputs: bundle, config: { bytesPerGroup: 2, caps: "upper", showAddress: false, annotate: "none", prefix: "dingdong", bytesPerGroup: 1 }, result: results[11] },
  { inputs: bundle, config: { bytesPerGroup: 2, html: true }, result: results[12] },
  { inputs: bundle, config: { bytesPerGroup: 2, offset: 10 }, result: results[13] },
  { inputs: bundle, config: { bytesPerGroup: 2, offset: 10, length: 10 }, result: results[14] },
  { inputs: bundle, config: { bytesPerGroup: 2, offset: 10, length: 10, html: true }, result: results[15] },
  { inputs: bundle, config: { bytesPerGroup: 2, displayOffset: 10 }, result: results[16] },
  { inputs: bundle, config: { bytesPerGroup: 2, displayOffset: 10, offset: 10, length: 10 }, result: results[17] },
  { input: _00 + _00 + _08 + _40 + _53 + _00 + _0000 + _5100 + _0000 + _5100 + _0000, config: { bytesPerGroup: 2 }, result: "00000000: 0000 0840 5300 0000 5100 0000 5100 0000  ...@S...Q...Q...\n" },
// #20
  { input: str3, config: { bytesPerGroup: 2 }, result: "00000000: 2369 6e63 6c75 6465 3c73 7464 696f 2e68  #include<stdio.h\n00000010: 3e0a                                     >.\n" },
  { input: str3, config: { bytesPerGroup: 2, html:true }, result: "<div class='hexy'>\n"+
                                              "<div class='00000000 even'>00000000: 2369 6e63 6c75 6465 3c73 7464 696f 2e68  #include&lt;stdio.h</div>\n"+
                                              "<div class='00000010  odd'>00000010: 3e0a &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &gt;.</div>\n"+
                                              "</div>\n" },
  // Number arrays with bytes work, arrays containing values larger that 0xff are truncated ( val & 0xff )
  { input: arr, config: { bytesPerGroup: 2}, result: arr_e },
   // non numerical bytesPerLine
  { input: arr, config: { bytesPerLine: "something" }, result: "00000000: 0102 030f                                ....\n" },
  { input: arr, config: { bytesPerLine: 2, bytesPerGroup: 2 }, result: "00000000: 0102  ..\n00000002: 030f  ..\n" },
  { input: arr, config: { bytesPerGroup: 2, bytesPerLine: 1 }, result: "00000000: 01  .\n00000001: 02  .\n00000002: 03  .\n00000003: 0f  .\n" },
  // endianness
  { input: arr, config: { bytesPerGroup: 2, littleEndian: true }, result: "00000000: 0201 0f03                                ....\n" },
  // alternative radix
  { input: arr, config: { radix: 10, bytesPerGroup: 1 }, result: "00000000: 001 002 003 015                                                    ....\n" },
  // suppression of non-printable characters
  { input: [ 0x68, 0x65, 0x6c, 0x6c, 0x6f, 0xd2, 0x77, 0x6f, 0x72, 0x6c, 0x64 ], config: { bytesPerGroup: 1, html: true, extendedChs: true }, result: "<div class='hexy'>\n"+
                                                                                                                                                      "<div class='00000000 even'>00000000: 68 65 6c 6c 6f d2 77 6f 72 6c 64 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; hello&#xd2;world</div>\n"+

                                                                                                                                                      "</div>\n" },
// #30
  { input: [], config: {}, result: "" },
  { input: null, config: {}, result: "" },
  { input: "", config: {}, result: "" },
  { input: undefined, config: {}, result: "" },
  { input: [0x41], config: { bytesPerGroup: 2 }, result: "00000000: 41                                       A\n" },
  { input: "A", config: {}, result: "00000000: 41                                       A\n" },
  { input: "😀", config: { bytesPerGroup: 2 }, result: "00000000: f09f 9880                                ....\n" },
  { input: "-\u{1d11e}+" /*𝄞*/, config: { bytesPerGroup: 1 }, result: "00000000: 2d f0 9d 84 9e 2b                                  -....+\n" },
  { input: new Uint8Array([0x41, 0x42, 0x43]), config: { bytesPerGroup: 2 }, result: "00000000: 4142 43                                  ABC\n" },
  { input: [0x123, 0x456], config: { bytesPerGroup: 2 }, result: "00000000: 2356                                     #V\n" },
  { input: [-1, 0, 255], config: { bytesPerGroup: 2 }, result: "00000000: ff00 ff                                  ...\n" },
// #40
  { input: [1,2,3], config: { offset: 10 }, result: "0000000a: 0102 03                                  ...\n" },
  { input: [1,2,3], config: { bytesPerGroup: 2, length: 10 }, result: "00000000: 0102 03                                  ...\n" },
  { input: [1,2,3], config: { bytesPerGroup: 2, offset: -1 }, result: "000000-1: 03                                       .\n" },
  { input: [1,2,3], config: { bytesPerGroup: 2, length: -5 }, result: "" },
  { input: "<>&'\"", config: { bytesPerGroup: 2, html: true, extendedChs: true }, result: "<div class='hexy'>\n<div class='00000000 even'>00000000: 3c3e 2627 22 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;&gt;&amp;&apos;&quot;</div>\n</div>\n" },
  { input: [0x61, 0x62, 0x63], config: { radix: 8, caps: "upper", showAddress: false, bytesPerGroup: 1, html: false, prefix: ">", indent: 2 }, result: "  >141 142 143                                                        abc\n" },
  { input: [0x61, 0x62], config: { prefix: 123, indent: 3 }, result: "   12300000000: 6162                                     ab\n" },
  { input: new ArrayBuffer(4), config: {}, result: "" },
  { input: [ 0x68, 0x65, 0x6c, 0x6c, 0x6f, 0xd2, 0x77, 0x6f, 0x72, 0x6c, 0x64 ], config: { bytesPerGroup: 1 }, result: "00000000: 68 65 6c 6c 6f d2 77 6f 72 6c 64                   hello.world\n" },
  { input: [ 0x68, 0x65, 0x6c, 0x6c, 0x6f, 0xd2, 0x77, 0x6f, 0x72, 0x6c, 0x64 ], config: { bytesPerGroup: 1, extendedChs: true }, result: "00000000: 68 65 6c 6c 6f d2 77 6f 72 6c 64                   hello" + "\u00d2" + "world\n" },
// #50
  { input: "abc", config: { bytesPerGroup: 2, littleEndian: true }, result: "00000000: 6261 63                                  abc\n" },
  { input: "abc", config: { bytesPerGroup: 4, littleEndian: true }, result: "00000000: 636261                               abc\n" },
  // Issue #24 - Test case for dangling bytes alignment fix (hex)
  { input: `{"client_id":"YzEzMGdoMHJnOHBiOG1ibDhyNTA=","response_type":"code","scope":"introscpect_tokens, revoke_tokens","iss":"bjhIRjM1cXpaa21zdWtISnp6ejlMbk44bTlNZjk3dXE=","sub":"YzEzMGdoMHJnOHBiOG1ibDhyNTA=","aud":"https://localhost:8443/{tid}/{aid}/oauth2/authorize","jti":"1516239022","exp":"2021-05-17T07:09:48.000+0545"}`, 
    config: { bytesPerGroup: 2 }, 
    result: "00000000: 7b22 636c 6965 6e74 5f69 6422 3a22 597a  {\"client_id\":\"Yz\n" +
            "00000010: 457a 4d47 646f 4d48 4a6e 4f48 4269 4f47  EzMGdoMHJnOHBiOG\n" +
            "00000020: 3169 6244 6879 4e54 413d 222c 2272 6573  1ibDhyNTA=\",\"res\n" +
            "00000030: 706f 6e73 655f 7479 7065 223a 2263 6f64  ponse_type\":\"cod\n" +
            "00000040: 6522 2c22 7363 6f70 6522 3a22 696e 7472  e\",\"scope\":\"intr\n" +
            "00000050: 6f73 6370 6563 745f 746f 6b65 6e73 2c20  oscpect_tokens, \n" +
            "00000060: 7265 766f 6b65 5f74 6f6b 656e 7322 2c22  revoke_tokens\",\"\n" +
            "00000070: 6973 7322 3a22 626a 6849 526a 4d31 6358  iss\":\"bjhIRjM1cX\n" +
            "00000080: 7061 6132 317a 6457 7449 536e 7036 656a  paa21zdWtISnp6ej\n" +
            "00000090: 6c4d 626b 3434 6254 6c4e 5a6a 6b33 6458  lMbk44bTlNZjk3dX\n" +
            "000000a0: 453d 222c 2273 7562 223a 2259 7a45 7a4d  E=\",\"sub\":\"YzEzM\n" +
            "000000b0: 4764 6f4d 484a 6e4f 4842 694f 4731 6962  GdoMHJnOHBiOG1ib\n" +
            "000000c0: 4468 794e 5441 3d22 2c22 6175 6422 3a22  DhyNTA=\",\"aud\":\"\n" +
            "000000d0: 6874 7470 733a 2f2f 6c6f 6361 6c68 6f73  https://localhos\n" +
            "000000e0: 743a 3834 3433 2f7b 7469 647d 2f7b 6169  t:8443/{tid}/{ai\n" +
            "000000f0: 647d 2f6f 6175 7468 322f 6175 7468 6f72  d}/oauth2/author\n" +
            "00000100: 697a 6522 2c22 6a74 6922 3a22 3135 3136  ize\",\"jti\":\"1516\n" +
            "00000110: 3233 3930 3232 222c 2265 7870 223a 2232  239022\",\"exp\":\"2\n" +
            "00000120: 3032 312d 3035 2d31 3754 3037 3a30 393a  021-05-17T07:09:\n" +
            "00000130: 3438 2e30 3030 2b30 3534 3522 7d         48.000+0545\"}\n" },
  // Test dangling bytes with octal radix
  { input: "abc", config: { radix: 8, bytesPerGroup: 2 }, result: "00000000: 060542 143                                               abc\n" },
  // Test dangling bytes with decimal radix
  { input: "abc", config: { radix: 10, bytesPerGroup: 2 }, result: "00000000: 024930 099                                               abc\n" },
  // Test dangling bytes with binary radix
  { input: "abc", config: { radix: 2, bytesPerGroup: 2 }, result: "00000000: 0110000101100010 01100011                                                                                                                abc\n" },

];

export default testcases;
