import { FormatOptions } from "./FormatOptions";
import Hexy from "./hexy";
import { testcases } from "./test/testcases";

let testcase_id: number | [number, number] = [0, 0]; // some tests have multiple variants (distinguished by the intput).  To make the navigation easier, the tests are numbered as [line.subtest]
let failed = 0;
let executed = 0;
let iterations = 1;
if (process.argv.includes("perf")) {
  iterations = 100000;
}
let execute_first_X_tests = null;
if (process.argv.includes("baseline")) {
  // baselining against version 0.3.2, which
  execute_first_X_tests = 29; // had 29 test lines (65 testcases total), that
} // are preserved at the top of the list of tests
let verbose = false;
if (process.argv.includes("-v")) {
  verbose = true;
}

function check(
  should: string | number[] | Buffer,
  is: string | number[] | Buffer
) {
  if (should !== is) {
    console.log("\x1b[31m       FAILED testcase # " + testcase_id + "\x1b[0m");
    console.log("   EXPECTED");
    console.log(should);
    console.log("   ACTUALLY RETURNED");
    console.log(is);
    console.log("more detailed view of EXPECTED:");
    console.log(Hexy.hexy(should, {}));
    console.log("more detailed view of ACTUALLY RETURNED:");
    console.log(Hexy.hexy(is, {}));
    failed++;
  } else if (verbose) {
    console.log(is);
  }
  executed++;
}

for (let rep = 0; rep < iterations; rep++) {
  for (let tc = 0; tc < (execute_first_X_tests || testcases.length); tc++) {
    const input = testcases[tc]?.input;
    const inputs = testcases[tc].inputs;
    const params = testcases[tc].params;
    if (params) {
      if (inputs) {
        for (let ii = 0; ii < inputs.length; ii++) {
          testcase_id = [tc, ii];
          check(testcases[tc].result, Hexy.hexy(inputs[ii], params));
        }
      } else if (input) {
        testcase_id = tc;
        check(testcases[tc].result, Hexy.hexy(input, params));
      }
    }
  }
}

function checkVersion() {
  const fs = require("fs");
  const pkg = fs.readFileSync("package.json");
  const version = JSON.parse(pkg).version;

  check(version, Hexy.VERSION);
}
checkVersion();

console.log("Executed: " + executed + ", Failed: " + failed);
if (iterations > 1) {
  console.log("This was a perf run over " + iterations + " iterations");
}

if (failed != 0) {
  process.exit(1);
}
