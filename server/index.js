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

// Get all attractions 
app.get("/v1/customer/attractions", async (req, res) => {
  try {
    const results = await db.query("select * from attractions");
    console.log(results);
    res.status(200).json({
      results: results.rows.length,
      data: {
        attractions: results.rows
      },
    });
  } catch (err) {
    console.log(err);
  }
  
});


// Get all customer purchases -- test feature
app.get("/v1/customer/all", async (req, res) => {
  try {
    const results = await db.query("select * from customer_purchases_with");
    console.log(results);
    res.status(200).json({
      results: results.rows.length,
      data: {
        customers: results.rows
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Get one customer purchase -- test feature
app.get("/v1/customer/:id", async (req, res) => {
  try {
    const results = await db.query(
      "select * from customer_purchases_with where cid = $1", [req.params.id]
      );
    console.log(results);
    res.status(200).json({
      data: {
        customer: results.rows[0]
      },
    });
  } catch (err) {
    console.log(err);
  }
});


// Customer buys ticket 
app.post("/v1/customer/ticket", (req, res) => {
  console.log(req.params.id);
});

// Customer updates profile 
app.post("/v1/customer/:id", (req, res) => {
  console.log(req.params.id);
});



app.use(express.static('client/build'));
port = process.env.PORT || 9000
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
  console.log(config.test);
});
