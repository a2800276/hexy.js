const { parseArgs } = require('util');

var hexy = require("./hexy.js")
const testcases = require("./test/testcases.js")

var testcase_id = [ 0, 0 ] // some tests have multiple variants (distinguished by the intput).  To make the navigation easier, the tests are numbered as [line.subtest]
var failed = 0
var executed = 0
var iterations = 1

var first_testcase_to_exec = 0
var last_testcase_to_exec = testcases.length

const options = parseArgs({
  args: process.argv.slice(2),
  options: {
    perf: { type: 'boolean', short: 'p' },
    baseline: { type: 'boolean', short: 'b' },
    single: { type: 'string', short: 't' },
    verbose: { type: 'boolean', short: 'v' }
  }  
})

if (options.values.perf) {
  iterations = 100000
}
if (options.values.single !== undefined ) {
  first_testcase_to_exec = parseInt(options.values.single)
  last_testcase_to_exec = first_testcase_to_exec + 1
}
if (options.values.baseline) {           // baselining against version 0.3.2, which 
  last_testcase_to_exec = 29             // had 29 test lines (65 testcases total), that
}                                        // are preserved at the top of the list of tests

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
  } else if (options.values.verbose) {
    console.log("\x1b[32m       SUCCEEDED testcase # " + testcase_id + "\x1b[0m")
    console.log(is)
  }
  executed++
}

for (var rep = 0; rep < iterations; rep++) {
  for (var tc = first_testcase_to_exec; tc < last_testcase_to_exec; tc++) {
    if ('inputs' in testcases[tc]) {
      for (var ii = 0; ii < testcases[tc].inputs.length; ii++) {
        testcase_id = [tc, ii]
        check(testcases[tc].result, hexy.hexy(testcases[tc].inputs[ii], testcases[tc].config))
      }
    } else {
      testcase_id = tc
      check(testcases[tc].result, hexy.hexy(testcases[tc].input, testcases[tc].config))
    }
  }
}

console.log("Executed: " + executed + ", Failed: " + failed)
if (iterations > 1) {
  console.log("This was a perf run over " + iterations + " iterations")
}

function checkVersion () {
  const fs = require("fs") 
  const pkg = fs.readFileSync("package.json") 
  const version = JSON.parse(pkg).version

  if (version !== hexy.Hexy.VERSION) {
    console.log("\x1b[31m       FAILED: the version in package.json and in the code do not match\x1b[0m")
    failed++
  }
}

checkVersion()

if (failed != 0) {
  process.exit(1)
}
