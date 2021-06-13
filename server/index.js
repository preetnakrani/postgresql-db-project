const config = require("./config");
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db/index");
const path = require("path");

app.use(cors());
app.use(express.json());

const insertString = `with new_ticket as (
  insert into tickets(tier) values (3)
    returning tid
  )
  insert into customer_purchases_with(fname, lname, phone, email, code, tid, actual_price, expiry_date, date_issued, family_representative)
  values
    ($1, $2, $3, $4, null, (select tid from new_ticket), 30, '2021-12-12', current_date, null) returning *;`

const publicPath = path.join(__dirname, '..','client', "build");
app.use(express.static(publicPath));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"))
});

// Get all attractions 
app.get("/v1/customer/attractions", async (req, res) => {
  try {
    const results = await db.query("select * from attractions");
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

// Get duration of a show
app.get("/v1/customer/attractions/shows", async (req, res) => {
  try {
    const results = await db.query(
      "select attractions.aid, attractions.name, shows.duration from attractions join shows on attractions.aid = shows.aid;");
    res.status(200).json({
      results: results.rows.length,
      data: {
        shows: results.rows
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Get type of dinosaur at an exhibit
app.get("/v1/customer/attractions/dinos", async (req, res) => {
  try {
    const results = await db.query(
      "select attractions.aid, attractions.name, dinosaurs.animal_name from attractions join dinosaurs on attractions.aid = dinosaurs.aid;");
    res.status(200).json({
      results: results.rows.length,
      data: {
        dinos: results.rows
      },
    });
  } catch (err) {
    console.log(err);
  }
});


// Get capacity of ride 
app.get("/v1/customer/attractions/rides", async (req, res) => {
  try {
    const results = await db.query(
      "select attractions.aid, attractions.name, rides.capacity from attractions join rides on attractions.aid = rides.aid;");
    res.status(200).json({
      results: results.rows.length,
      data: {
        rides: results.rows
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
app.post("/v1/customer/ticket", async (req, res) => {
  try {
    const results = await db.query(insertString, [req.body.fname, req.body.lname, req.body.phone, req.body.email]);
      
      res.status(201).json({
        status: "success",
        data: {
          ticket: results.rows[0],
        }
      });    
    } catch (error) {
      console.log(error);
  }
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
