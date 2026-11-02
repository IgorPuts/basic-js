const { NotImplementedError } = require('../lib');

/**
 * Create a repeating string based on the given parameters
 *
 * @param {String} str string to repeat
 * @param {Object} options options object
 * @return {String} repeating string
 *
 *
 * @example
 *
 * repeater('STRING', { repeatTimes: 3, separator: '**',
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */

function repeater(str, options = {}) {
  str = String(str);
  const {
    repeatTimes = 1,
    separator = '+',
    addition = '',
    additionRepeatTimes = 1,
    additionSeparator = '|',
  } = options;

  const additionStr = String(addition);
  const additionPart = Array(Math.max(additionRepeatTimes, 0))
    .fill(additionStr)
    .join(additionSeparator);

  const fullPart = str + additionPart;

  return Array(Math.max(repeatTimes, 0))
    .fill(fullPart)
    .join(separator);
}

module.exports = {
  repeater
};
