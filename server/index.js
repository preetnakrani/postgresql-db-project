const config = require("./config");
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db/index");
const path = require("path");

app.use(cors());
app.use(express.json());

const publicPath = path.join(__dirname, '..','client', "build");
app.use(express.static(publicPath));
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"))
});

app.use(express.static('client/build'));
port = process.env.PORT || 9000
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
  console.log(config.test);
});
