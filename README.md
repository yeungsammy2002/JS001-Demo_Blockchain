# JS001-Demo_Blockchain
A simple Javascript demo blockchain project that explain the concept of blockchain

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

### Jest - `package.json` setting

`--watchAll` option is similar to `nodemon`. It sets up a server that listens to changes and reruns the entire suite whenever it detects a new file with change has been saved.
 ```
   "scripts": {
    "test": "jest --watchAll",
    "dev-test": "nodemon dev-test"
  },
 ```

 