# JS001-Demo_Blockchain
A simple Javascript demo blockchain project that explain the concept of blockchain

To develop this project, first you need to install a few dev dependencies by running:
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

### Jest - `package.json` setting

`--watchAll` option is similar to `nodemon`. It sets up a server that listens to changes and reruns the entire suite whenever it detects a new file with change has been saved.
 ```
   "scripts": {
    "test": "jest --watchAll",
    "dev-test": "nodemon dev-test"
  },
 ```

 