var hexy = require("./hexy.js")
const testcases = require("./test/testcases.js")

var testcase_id = [ 0, 0 ] // some tests have multiple variants (distinguished by the intput).  To make the navigation easier, the tests are numbered as [line.subtest]
var failed = 0
var executed = 0
var iterations = 1
if (process.argv.includes("perf")) {
  iterations = 100000
}
var execute_first_X_tests = null
if (process.argv.includes("baseline")) { // baselining against version 0.3.2, which 
  execute_first_X_tests = 29             // had 29 test lines (65 testcases total), that
}                                        // are preserved at the top of the list of tests
var verbose = false
if (process.argv.includes("-v")) {
  verbose = true
}

function check(should, is) {
  if (should !== is) {
    console.log("\x1b[31m       FAILED testcase # " + testcase_id + "\x1b[0m")
    console.log("   EXPECTED")
    console.log(should)
    console.log("   ACTUALLY RETURNED")
    console.log(is)
    console.log("more detailed view of EXPECTED:")
    console.log(hexy.hexy(should))
    console.log("more detailed view of ACTUALLY RETURNED:")
    console.log(hexy.hexy(is))
    failed++
  } else if (verbose) {
    console.log(is)
  }
  executed++
}

for (var rep = 0; rep < iterations; rep++) {
  for (var tc = 0; tc < (execute_first_X_tests || testcases.length); tc++) {
    if ('inputs' in testcases[tc]) {
      for (var ii = 0; ii < testcases[tc].inputs.length; ii++) {
        testcase_id = [tc, ii]
        check(testcases[tc].result, hexy.hexy(testcases[tc].inputs[ii], testcases[tc].params))
      }
    } else {
      testcase_id = tc
      check(testcases[tc].result, hexy.hexy(testcases[tc].input, testcases[tc].params))
    }
  }
}

function checkVersion () {
  const fs = require("fs") 
  const pkg = fs.readFileSync("package.json") 
  const version = JSON.parse(pkg).version

  check(version, hexy.Hexy.VERSION)
}
checkVersion()

console.log("Executed: " + executed + ", Failed: " + failed)
if (iterations > 1) {
  console.log("This was a perf run over " + iterations + " iterations")
}

if (failed != 0) {
  process.exit(1)
}
