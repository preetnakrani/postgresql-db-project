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
app.post("/v1/customer/attractions", async (req, res) => {
  try {
    let results = await db.query("select * from attractions");
    res.status(201).json(results.rows);
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


// Select for rides based on capacity 
app.post("/v1/customer/attractions/rides", async (req, res) => {

  let query = `select attractions.aid, attractions.name, rides.capacity 
  from attractions join rides on attractions.aid = rides.aid 
  where capacity ${req.body.connector} ${req.body.capacity};`

  console.log(query);
  try {
    const results = await db.query(query);
    res.status(201).json(results.rows);
  } catch (err) {
    console.log(err);
  }
});


// Customer buys ticket 
app.post("/v1/customer/ticket", async (req, res) => {
  let insertString = `with new_ticket as (
    insert into tickets(tier) values (3)
      returning tid)
    insert into customer_purchases_with(fname, lname, phone, email, code, tid, actual_price, expiry_date, date_issued, family_representative)
    values
      ($1, $2, $3, $4, null, (select tid from new_ticket), 30, '2021-12-12', current_date, null) returning *;`  
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


// Customers can view tickets that they bought
app.post("/v1/customer/view-tickets", async (req, res) => {
  var firstjoin = req.body.tier ? "inner join tickets on customer_purchases_with.tid = tickets.tid" : "";
  
  /*
  select * from customer_purchases_with 
  {inner join tickets on customer_purchases_with.tid = tickets.tid}
  where
  customer_purchases_with.email = {customer.email}
  */

  let query = `select * from customer_purchases_with ${firstjoin} where customer_purchases_with.email = '${req.body.email}';`;
  console.log(query);

  try {
    const results = await db.query(query);
    console.log(results);
    res.status(201).json(results.rows);
  } catch (err) {
    console.log(err);
  }
});



app.use(express.static('client/build'));
port = process.env.PORT || 9000
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
  console.log(config.test);
});
