const { NotImplementedError } = require('../lib');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(direct = true) {
    this.direct = direct;
  }

  _process(message, key, decrypt) {
    if (message === undefined || key === undefined) {
      throw new Error('Incorrect arguments!');
    }

    const msg = String(message).toUpperCase();
    const k = String(key).toUpperCase();
    let result = '';
    let keyIdx = 0;

    for (const ch of msg) {
      if (ch >= 'A' && ch <= 'Z') {
        const shift = k[keyIdx % k.length].charCodeAt(0) - 65;
        let code = ch.charCodeAt(0) - 65;
        code = decrypt ? (code - shift + 26) % 26 : (code + shift) % 26;
        result += String.fromCharCode(code + 65);
        keyIdx++;
      } else {
        result += ch;
      }
    }

    return this.direct ? result : result.split('').reverse().join('');
  }

  encrypt(message, key) {
    return this._process(message, key, false);
  }

  decrypt(encryptedMessage, key) {
    return this._process(encryptedMessage, key, true);
  }
}

module.exports = {
  directMachine: new VigenereCipheringMachine(),
  reverseMachine: new VigenereCipheringMachine(false),
  VigenereCipheringMachine,
};
