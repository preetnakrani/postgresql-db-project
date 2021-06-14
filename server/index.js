const config = require("./config");
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db/index");
const path = require("path");

app.use(cors());
app.use(express.json());

const insertShift = `
  insert into Shift_At_WorksOn(description, start_date, end_date, start_time, end_time, status, eid, aid)
  values
    ($1, $2, $3, $4, $5, $6, $7, $8) returning *;`

const updateShift = `
  update Shift_At_WorksOn
  set start_date = $2, end_date = $3, start_time = $4, end_time = $5, status = $6, aid = $8
  where description = $1 AND eid = $7 returning *;`

const deleteShift = `
  delete from Shift_At_WorksOn
  where description = $1 AND eid = $2 returning *;`


const publicPath = path.join(__dirname, '..','client', "build");
app.use(express.static(publicPath));
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"))
});

// add shift to employee
app.post("/v1/employee/add", async (req, res) => {
  try {
    const results = await db.query(insertShift, [req.body.description, req.body.start_date, req.body.end_date, req.body.start_time, req.body.end_time,
      req.body.status, req.body.eid, req.body.aid]);

      res.status(201).json({
        status: "success",
        data: {
          shift: results.rows[0],
        }
      });    
    } catch (error) {
      console.log(error);
  }
});

// update shift of employee
app.post("/v1/employee/update", async (req, res) => {
  try {
    const results = await db.query(updateShift, [req.body.description, req.body.start_date, req.body.end_date, req.body.start_time, req.body.end_time,
      req.body.status, req.body.eid, req.body.aid]);

      res.status(201).json({
        status: "success",
        data: {
          shift: results.rows[0],
        }
      });    
    } catch (error) {
      console.log(error);
  }
});

// delete shift of employee
app.post("/v1/employee/delete", async (req, res) => {
  try {
    const results = await db.query(deleteShift, [req.body.description, req.body.eid]);

      res.status(201).json({
        status: "success",
        data: {
          shift: results.rows[0],
          //not sure if I need the above
        }
      });    
    } catch (error) {
      console.log(error);
  }
});

app.use(express.static('client/build'));
port = process.env.PORT || 9000
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
  console.log(config.test);
});
