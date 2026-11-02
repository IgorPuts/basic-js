const { NotImplementedError } = require('../lib');

/**
 * There's a list of file, since two files cannot have equal names,
 * the one which comes later will have a suffix (k),
 * where k is the smallest integer such that the found name is not used yet.
 *
 * Return an array of names that will be given to the files.
 *
 * @param {Array} names
 * @return {Array}
 *
 * @example
 * For input ["file", "file", "image", "file(1)", "file"],
 * the output should be ["file", "file(1)", "image", "file(1)(1)", "file(2)"]
 *
 */
function renameFiles(names) {
  const result = [];
  const counter = {};

  for (const name of names) {
    let candidate = name;
    if (result.includes(candidate)) {
      let k = counter[name] || 1;
      while (result.includes(`${name}(${k})`)) k++;
      candidate = `${name}(${k})`;
      counter[name] = k + 1;
    }
    result.push(candidate);
  }
  return result;
}

module.exports = {
  renameFiles
};
