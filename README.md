# JS001-Demo_Blockchain
This is a simple Javascript demo blockchain project that explain the concept of blockchain.

To develop this project, first you need to install a few ***dev dependencies*** by running:
```
npm i -D nodemon
npm i -D jest
```

If ***Intellisense*** doesn't work for some ***jest*** functions, install:
```
npm i -D @types/jest
```

Then you have to install the following dependencies:

### `crypto-js`
`crypto-j` provide ***SHA-256 hash function*** and it can be used create unique ***32-byte (256 bit) hash value*** from transaction data inputs.
```
npm i crypto-js
```

### `express`
`express` help this blockchain app create an ***API***, which is a collection of ***HTTP requests*** that will allow user to interact with our running applications. Through this ***API***, users will be able to view the blocks currently held in one of our blockchain instances. And then they will be able to act as miners through a mining endpoint, which will create in order to add new blocks to the chain.
```
npm i express
```

### `body-parser`
`body-parser` is used for ***post request API*** that allows a user to add a new block to the chain based on the piece of data that they send. In order to receive this data in a ***JSON format***, `body-parser` will be used. It acts like an intermediary function that either transforms ***outgoing data*** into ***JSON format*** or it transforms ***incoming data*** into ***JSON format***.
```
npm i body-parser
```

###  `ws` - WebSocket
***WebSocket*** is used to setup peer to peer server that connects multiple users running this blockchain application. Every individual running the blockchain application will be considered a peer. WebSocket allows us to setup a virtually real-time connection between multiple nodes running a ***Node.js*** application.
```
npm i ws
```

***WebSocket*** will open a ***port*** where it will listen for ***WebSocket connections*** (by using ***WebSocket protocol***, not ***http protocol***). As other nodes fire up the application, they will start up their own ***WebSocket servers*** too.

But more importantly, they now connect to the original server through that open ***WebSocket port***. The orginal server detects that new instances of the application have attempted to connect to its ***WebSocket server***, and thus it makes a connection over the ***WebSocket port*** to those new instances.

Overall, through this connection, all the connected peers had the ability to broadcast data through stringify messages to all the other connected peers.

Each new peer connects to our blockchain application, we need to make sure that the peer has the updated blockchain. As new blocks added by one peer, they will have the ability to broadcast that change in the data of the block to all connected peers over the ***WebSocket connection***.

### `elliptic`
`elliptic` contains classes and methods that enable elliptic curve based cryptography. Elliptic cryptography is an advanced mathemetical subject. It is computationally expensive and infesible to guest the answer to randomly generated elliptic curve. It provides the core private and public key generation for our wallet.
```
npm i elliptic
```

### `uuid`
`uuid` stands for ***Universally Unqiue Identifier***. `uuid` is used to generate a transaction ID - ***TXID*** in `chain-util.js`
```
npm i uuid
```

### Implementation of peer-to-peer server
There are two possiblity of how an individual server will behave:

1. The initial instance of the blockchain application, this node will start the first peer-to-peer server and then it will wait for connections as its peers applications start up.

2. As a second, third or later instance of the blockchain application. This node will connect to the original peer-to-peer server, done in ***step 1***, and connect over a ***designated WebSocket port***.
  
We won't have two separate classes for both of these functionalities. In our implementation, our one peer-to-peer server itself will have both the capability to do ***part 1*** and ***part 2***.

However, it will know whether or not to open the first server, or to connect appears immediately based on us providing an environment variables that we specify for the server on what peers that has.

On ***WebSocket***, you have setup some `on()` event listeners in order to communicate with your peers. There are basically ***3 type of events*** you need to know:
- `connection` - Listening on any peer try to connect this instance
- `open` - Open the channel between peer and this instance. In other words, it create a "handshake" between peer and this instance. 
- `message` - Listening on any peer send message (whole chain) to this instance. So that this instance can accept any `send()` request.

### Jest - `package.json` setting
`--watchAll` option is similar to `nodemon`. It sets up a server that listens to changes and reruns the entire suite whenever it detects a new file with change has been saved.
 ```
   "scripts": {
    "test": "jest --watchAll",
    "dev-test": "nodemon dev-test"
  },
 ```

 ### `config.js`
 `config.js` contains some custom setting including `DIFFICULTY`.