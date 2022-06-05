const Block = require("./block.js");

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock(data) {
    const lastBlock = this.chain[this.chain.length - 1];
    const block = Block.mineBlock(lastBlock, data);
    this.chain.push(block);

    return block;
  }

  isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis()))
      return false;
    // In Javascript, two different objects that aren't referencing the same original object.
    // It cannot be equal to each other, even if they have the same exactly elements.
    // To compare the first element of the incoming chain and a genesis block,
    // what we can do is stringify these objects and then compare their "toString()" version.

    for (let i = 1; i < chain.length; i++) {
      const currentBlock = chain[i];
      const lastBlock = chain[i - 1];

      if (currentBlock.lastHash !== lastBlock.hash) return false;

      if (currentBlock.hash !== Block.blockHash(currentBlock)) return false;
      // There is also a possibilty that a block's data itself has been tempered with and its generated hash is incorrect
    }

    return true;
  }

  replaceChain(newChain) {
    if (newChain.length <= this.chain.length) {
      // check the length of the new chain and make sure that it is actually longer than the current chain's length.
      console.log("Received chain is not longer than the current chain");
      return;
    }

    if (!this.isValidChain(newChain)) {
      console.log("The received chain is not valid.");
      return;
    }

    console.log("Replacing blockchain with the new chain.");
    this.chain = newChain;
  }
}

module.exports = Blockchain;
