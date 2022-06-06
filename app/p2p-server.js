const WebSocket = require("ws");

const P2P_PORT = process.env.P2P_PORT || 5001;

const peers = process.env.PEERS ? process.env.PEERS.split(",") : [];
// peers is an array of peer's websocket addresses

const MESSAGE_TYPES = {
  chain: "CHAIN",
  transaction: "TRANSACTION",
  clear_transactions: "CLEAR_TRANSACTIONS",
};

class P2pServer {
  constructor(blockchain, transactionPool) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.sockets = [];
    // this array of sockets will contain a list of the connected WebSocket server
    // that end up connecting to this one
  }

  listen() {
    // allow other instances connect to this server
    const server = new WebSocket.Server({ port: P2P_PORT });
    // "Server()" class for creating a WebSocket server and starting it up first of all
    server.on("connection", (socket) => {
      // setup "on()" event listener,
      // "connection" means you would like to listen for "connection" event
      // "socket" is an object created as the result of this "connection"
      this.connectSocket(socket);
      // connectSocket() is a helper function that
      // pushing "socket" to "this.sockets" array
    });

    this.connectToPeers();
    // if this server is a later instance, this app has to connect to peers

    console.log(`Listening for peer-to-peer connections on: ${P2P_PORT}`);
    // when the local WebSocket server started successfully, will see this message
  }

  // make sure that later instances of the application
  // connect to the original one immediately when they specified as a peer
  connectToPeers() {
    peers.forEach((peer) => {
      // "peers" are specified before start running the server
      // and "peers" are WebSocket addresses
      const socket = new WebSocket(peer);
      // WebSocket address could be used to create "socket" object

      socket.on("open", () => this.connectSocket(socket));
      // setup "on()" event listener for listening "open" event,
      // we can run some code if that server is started later
    });
  }

  connectSocket(socket) {
    this.sockets.push(socket);
    console.log("Socket connected");
    // when a new peer connected, will see this message
    this.messageHandler(socket);
    // any incoming data sent to this app,
    // will invoke this.blockchain.replaceChain()
    this.sendChain(socket);
    // for any peer connected to this instance successfully,
    // send the local chain to the newly connected peer
  }

  messageHandler(socket) {
    socket.on("message", (message) => {
      const data = JSON.parse(message);
      switch (data.type) {
        case MESSAGE_TYPES.chain:
          this.blockchain.replaceChain(data.chain);
          break;
        case MESSAGE_TYPES.transaction:
          this.transactionPool.updateOrAddTransaction(data.transaction);
          break;
        case MESSAGE_TYPES.clear_transactions:
          this.transactionPool.clear();
          break;
      }
    });
  }

  sendChain(socket) {
    socket.send(
      JSON.stringify({
        type: MESSAGE_TYPES.chain,
        chain: this.blockchain.chain,
      })
    );
  }

  sendTransaction(socket, transaction) {
    socket.send(
      JSON.stringify({
        type: MESSAGE_TYPES.transaction,
        transaction,
      })
    );
  }

  syncChains() {
    this.sockets.forEach((socket) => this.sendChain(socket));
  }

  broadcastTransaction(transaction) {
    this.sockets.forEach((socket) => this.sendTransaction(socket, transaction));
  }

  broadcastClearTransactions() {
    this.sockets.forEach((socket) =>
      socket.send(JSON.stringify({ type: MESSAGE_TYPES.clear_transactions }))
    );
  }
}

module.exports = P2pServer;
