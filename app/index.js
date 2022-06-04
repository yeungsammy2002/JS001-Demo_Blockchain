const express = require("express");
const bodyParser = require("body-parser");
const Blockchain = require("../blockchain"); // get index.js by default

// define what port out application should listen for request on,
// set it to environment variables because dev server may listen on different port,
// 3001 is just a default port
const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const bc = new Blockchain();

// convert incoming data to JSON
app.use(bodyParser.json());

app.get("/blocks", (req, res) => {
  res.json(bc.chain);
});

// For users submit their data to the blockchain
app.post("/mine", (req, res) => {
  const block = bc.addBlock(req.body.data);
  console.log(`New block added: ${block.toString()}`);

  // response back with the updated chain of blocks that includes the user's new block within the data for this post request
  res.redirect("/blocks");
});

app.listen(HTTP_PORT, () => {
  console.log(`Listening on port ${HTTP_PORT}`);
});
