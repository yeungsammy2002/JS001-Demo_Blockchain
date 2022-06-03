const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(timestamp, lastHash, hash, data) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }

  toString() {
    return `Block -
        Timestamp:  ${this.timestamp}
        Last Hash:  ${this.lastHash}
        Hash:       ${this.hash}
        Data:       ${this.data}`;
  }

  static genesis() {
    return new this("genesis time", "-", "genesisHash", []);
  }

  static hash(timestamp, lastHash, data) {
    return SHA256(`${timestamp}${lastHash}${data}`).toString();
  }

  static mineBlock(lastBlock, data) {
    const timestamp = Date.now();
    const lastHash = lastBlock.hash;
    const hash = this.hash(timestamp, lastHash, data);

    return new this(timestamp, lastHash, hash, data);
  }

  static blockHash(block) {
    const { timestamp, lastHash, data } = block;
    return Block.hash(timestamp, lastHash, data);
  }
}

module.exports = Block;
