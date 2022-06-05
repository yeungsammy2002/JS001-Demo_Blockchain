const EC = require("elliptic").ec;
const { v1: uuidv1 } = require("uuid");
const ec = new EC("secp256k1");
// secp256k1 - "sec" stands for standards of efficient cryptography,
// "p" stands for prime number, that will be 256 bits
// "k" stands for Koblitz curves, "1" for the first implementation fo the algorithm

class ChainUtil {
  static genKeyPair() {
    return ec.genKeyPair();
  }

  static id() {
    return uuidv1();
  }
}

module.exports = ChainUtil;
