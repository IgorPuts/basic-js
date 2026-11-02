const { NotImplementedError } = require('../lib');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }

  const result = [];
  const discarded = new Set();

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];

    if (item === '--discard-next') {
      if (i + 1 < arr.length) {
        discarded.add(i + 1);
        i++;
      }
    } else if (item === '--discard-prev') {
      if (i > 0 && !discarded.has(i - 1)) result.pop();
    } else if (item === '--double-next') {
      if (i + 1 < arr.length) result.push(arr[i + 1]);
    } else if (item === '--double-prev') {
      if (i > 0 && !discarded.has(i - 1)) result.push(arr[i - 1]);
    } else {
      if (!discarded.has(i)) result.push(item);
    }
  }

  return result;
}

module.exports = {
  transform
};
