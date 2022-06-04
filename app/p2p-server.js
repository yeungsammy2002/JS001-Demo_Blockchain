const WebSocket = require("ws");

const P2P_PORT = process.env.P2P_PORT || 5001;

// peers is an array of peer's websocket addresses
const peers = process.env.PEERS ? process.env.PEERS.split(",") : [];

class P2pServer {
  constructor(blockchain) {
    this.blockchain = blockchain;
    this.sockets = [];
  }

  // make sure the first blockchain application can open up a WebSocket server
  listen() {
    const server = new WebSocket.Server({ port: P2P_PORT });
    server.on("connection", (socket) => {
      // any new instance try connect to this app,
      // their sockets will be pushed to "this.sockets" array
      this.connectSocket(socket);
    });
    console.log(`Listening for peer-to-peer connections on: ${P2P_PORT}`);

    this.connectToPeers();
  }

  // make sure that later instances of the application
  // connect to the original one immediately when they specified as a peer
  connectToPeers() {
    peers.forEach((peer) => {
      // open a new WebSocket module, by using the WebSocket class module
      // and passing "peer" address into the constructor, to create a
      // "socket" object
      const socket = new WebSocket(peer);

      // open another event listener for the "open" event,
      // we can run some code if that server is started later,
      // eventhough we specified this as a peer first
      socket.on("open", () => this.connectSocket(socket));
    });
  }

  // pushing this socket to our array of sockets
  connectSocket(socket) {
    this.sockets.push(socket);
    console.log("Socket connected");
    // any incoming data sent to this app,
    // will invoke this.blockchain.replaceChain()
    this.messageHandler(socket);
    // if the local chain is longer, send it back to the peer is useful
    this.sendChain(socket);
  }

  messageHandler(socket) {
    socket.on("message", (message) => {
      const data = JSON.parse(message);
      console.log("data", data);

      this.blockchain.replaceChain(data);
    });
  }

  sendChain(socket) {
    socket.send(JSON.stringify(this.blockchain.chain));
  }

  syncChains() {
    this.sockets.forEach((socket) => this.sendChain(socket));
  }
}

module.exports = P2pServer;
