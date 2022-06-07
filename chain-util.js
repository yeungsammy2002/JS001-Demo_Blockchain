const EC = require("elliptic").ec;
const SHA256 = require("crypto-js/sha256");
const { v1: uuidV1 } = require("uuid");
const ec = new EC("secp256k1");
// secp256k1 - "sec" stands for standards of efficient cryptography,
// "p" stands for prime number, that will be 256 bits
// "k" stands for Koblitz curves, "1" for the first implementation fo the algorithm

class ChainUtil {
  static genKeyPair() {
    return ec.genKeyPair();
  }

  static id() {
    return uuidV1();
  }

  static hash(data) {
    return SHA256(JSON.stringify(data)).toString();
  }

  static verifySignature(publicKey, signature, dataHash) {
    return ec.keyFromPublic(publicKey, "hex").verify(dataHash, signature);
  }
}

module.exports = ChainUtil;
