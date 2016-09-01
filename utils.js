// baseline estimates, used to improve performance
const TX_EMPTY_SIZE = 8
const TX_INPUT_BASE = 40 + 2
const TX_INPUT_PUBKEYHASH = 106
const TX_OUTPUT_BASE = 8 + 1
const TX_OUTPUT_PUBKEYHASH = 25

// FIXME: an estimate is used due to missing data
function inputBytes (input) {
  return TX_INPUT_BASE + TX_INPUT_PUBKEYHASH
}

function outputBytes (output) {
  return TX_OUTPUT_BASE + (output.script ? output.script.length : TX_OUTPUT_PUBKEYHASH)
}

function dustThreshold (output, feeRate) {
  return 3 * (outputBytes(output) * feeRate)
}

function transactionBytes (inputs, outputs) {
  return TX_EMPTY_SIZE +
    inputs.reduce((a, x) => a + inputBytes(x), 0) +
    outputs.reduce((a, x) => a + outputBytes(x), 0)
}

module.exports = {
  dustThreshold,
  inputBytes,
  outputBytes,
  transactionBytes
}
