const Wallet = require("./wallet");
const ChainUtil = require("./chain-util");
const Transaction = require("./wallet/transaction");

const wallet = new Wallet();
// console.log(wallet.toString());

let amount = 50,
  recipient = "r3c1p1ent";
