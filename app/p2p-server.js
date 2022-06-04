const WebSocket = require("ws");

const P2P_PORT = process.env.P2P_PORT || 5001;

// "peers" is used to check if peer environment variable has been declared
// we assumes that this "peers" environment variable is a string,
// contains a list of WebSocket addresses that this WebSocket should
// connect to as a "peer"

// For example, if there's an application running on 5001 as it's P2P_PORT,
// ws://localhost:5001 is going to be its WebSocket addresses
// for our "peers" environment variable, if there is more than one connect to,
// you will combine them with string, i.e. PEERS is an environment variable
// PEERS=ws://localhost:5001,ws://localhost:5002,...
// later may run this command to customize the port of your blockchain app:
// HTTP_PORT=3002 P2P_PORT=5003 PEERS=ws://localhost:5001,ws://localhost:5002 npm run dev

const peers = process.env.PEERS ? process.env.PEERS.split(",") : [];

class P2pServer {
  constructor(blockchain) {
    this.blockchain = blockchain;
    this.sockets = [];
  }

  // make sure the first blockchain application can open up a WebSocket server
  listen() {
    const server = new WebSocket.Server({ port: P2P_PORT });
    // by listening a "connection" event,
    // we can fire specific code whenever a new socket connects to this server
    server.on("connection", (socket) => {
      // "socket" object that is created as the result of this connection
      this.connectSocket(socket);
    });
    console.log(`Listening for peer-to-peer connections on: ${P2P_PORT}`);

    this.connectToPeers();
  }

  // pushing this socket to our array of sockets
  connectSocket(socket) {
    this.sockets.push(socket);
    console.log("Socket connected");
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
}

module.exports = P2pServer;
