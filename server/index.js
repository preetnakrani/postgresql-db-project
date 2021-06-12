const config = require("./config");
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db/index");
const path = require("path");


app.use(cors());
app.use(express.json());


app.get("/all", async function(req, res) {
  let selection = req.body.selection.reduce((accum, curr) => (
    `${accum} ${curr}`
  ));

  let order = (req.body.orderBy) ? req.body.orderBy.reduce((accum, curr) => (
    `${accum} ${curr.column} ${(curr.asc) ? "asc" : "desc"}`
  ), "") : "";

  if (order.length > 0) {
    order = `order by${order}`
  }

  let query = `select ${selection} from ${req.body.tableName} ${order};`;
  console.log(query);

  try {
    let results = await db.query(query);
    res.status(200).json(results);
  } catch (e) {
    res.status(500).json(e);  
  }
});  



if (process.env.NODE_ENV === "production") { 

  const publicPath = path.join(__dirname, '..','client', "build");
  app.use(express.static(publicPath));

  app.get("*", function(req, res) { 
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
  });
  
}


port = process.env.PORT || 9000
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
