const config = require("./config");
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db/index");
const path = require("path");

app.use(cors());
app.use(express.json());

app.post("/allTables", async function (req, res) {
  console.log(req.body);
  let selection = req.body.selection;
  let temp = "";
  for (let i in selection) {
    temp += `${selection[i]}, `;
  }

  temp = temp.slice(0, -2);
  selection = temp;

  let order = req.body.orderBy
    ? req.body.orderBy.reduce(
        (accum, curr) =>
          `${accum} ${curr.column} ${curr.asc ? "asc" : "desc"}, `,
        ""
      )
    : "";

  if (order.length > 0) {
    order = order.slice(0, -2);
    order = `order by${order}`;
  }

  let conditions = req.body.conditions ? req.body.conditions : [];
  let connector = req.body.connectors ? req.body.connectors : [];
  let cond = "";
  for (let k in conditions) {
    let o = conditions[k];
    let column = o.access;
    let val = parseFloat(o.value);
    let final = null;
    if (isNaN(val)) {
      final = `\'${o.value}\'`;
    } else if (Number.isInteger(val)) {
      final = parseInt(val);
    }
    let tempCond = `${column} ${o.currentOperator} ${final}`;
    if (k < conditions.length - 1) {
      let connect = connector[k];
      tempCond = `${tempCond} ${connect}`;
    }
    tempCond = `${tempCond} `;
    cond = cond + tempCond;
  }

  if (cond.length > 0) {
    cond = cond.slice(0, -1);
    cond = `where ${cond}`;
  }

  let query = `select ${selection} from  ${req.body.table} ${cond} ${order};`;
  console.log(query);

  try {
    let results = await db.query(query);
    res.status(200).json(results.rows);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

app.get("/all", async function (req, res) {
  console.log(req);
  let selection = req.body.selection;
  let temp = "";
  for (let i in selection) {
    temp += `${selection[i]}, `;
  }

  temp = temp.slice(0, -2);
  selection = temp;

  let order = req.body.orderBy
    ? req.body.orderBy.reduce(
        (accum, curr) =>
          `${accum} ${curr.column} ${curr.asc ? "asc" : "desc"}, `,
        ""
      )
    : "";

  if (order.length > 0) {
    order = order.slice(0, -2);
    order = `order by${order}`;
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

app.get("/eats", async function (req, res) {
  try {
    let results = await db.query("select * from eats;");
    console.log(results);
    res.status(200).json(results.rows);
  } catch (e) {
    res.status(500).json(e);
  }
});

app.post("/customer", async function (req, res) {
  let selection = req.body.selection;
  let temp = "";
  for (let i in selection) {
    temp += `${selection[i]}, `;
  }

  temp = temp.slice(0, -2);
  selection = temp;

  let order = req.body.orderBy
    ? req.body.orderBy.reduce(
        (accum, curr) =>
          `${accum} ${curr.column} ${curr.asc ? "asc" : "desc"}, `,
        ""
      )
    : "";

  if (order.length > 0) {
    order = order.slice(0, -2);
    order = `order by${order}`;
  }

  let query = `select ${selection} from customer_purchases_with ${order};`;
  console.log(query);

  try {
    let results = await db.query(query);
    res.status(200).json(results.rows);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

app.post("/join", async function (req, res) {
  console.log(req.body);
  let selection = req.body.selection;
  let temp = "";
  for (let i in selection) {
    temp += `${selection[i]}, `;
  }

  temp = temp.slice(0, -2);
  selection = temp;

  let order = req.body.orderBy
    ? req.body.orderBy.reduce(
        (accum, curr) =>
          `${accum} ${curr.column} ${curr.asc ? "asc" : "desc"}, `,
        ""
      )
    : "";

  if (order.length > 0) {
    order = order.slice(0, -2);
    order = `order by${order}`;
  }

  let conditions = req.body.conditions ? req.body.conditions : [];
  let connector = req.body.connectors ? req.body.connectors : [];
  let cond = "";
  for (let k in conditions) {
    let o = conditions[k];
    let column = o.access;
    let val = parseFloat(o.value);
    let final = null;
    if (isNaN(val)) {
      final = `\'${o.value}\'`;
    } else if (Number.isInteger(val)) {
      final = parseInt(o.val);
    }
    let tempCond = `${column} = ${final}`;
    if (k < conditions.length - 1) {
      let connect = connector[k];
      tempCond = `${tempCond} ${connect}`;
    }
    tempCond = `${tempCond} `;
    cond = cond + tempCond;
  }

  if (cond.length > 0) {
    cond = cond.slice(0, -1);
    cond = `where ${cond}`;
  }

  let join = "";
  for (let k in req.body.joins) {
    let table1 = req.body.table;
    let table2 = req.body.joins[k].table;
    let currJoin = req.body.joins[k].join;
    let on = req.body.joins[k].on;
    let tempOn = `on ${table1}.${on[0]} = ${table2}.${on[1]} `;
    let tempJoin = `${currJoin} ${table2} ${tempOn} `;
    join += tempJoin;
  }

  let query = `select ${selection} from  ${req.body.table} ${cond} ${join} ${order};`;
  console.log(query);

  try {
    let results = await db.query(query);
    res.status(200).json(results.rows);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

app.post("/join/park", async function (req, res) {
  console.log("here");
  let selection = req.body.selection;
  let temp = "";
  for (let i in selection) {
    temp += `${selection[i]}, `;
  }

  temp = temp.slice(0, -2);
  selection = temp;
  let base =
    "from visits inner join (select attractions.aid, attractions.name, attractions.location, dinosaurs.animal_name, rides.capacity, shows.sid, shows.duration from attractions full outer join dinosaurs on dinosaurs.aid = attractions.aid full outer join rides on rides.aid = attractions.aid full outer join shows on shows.aid = attractions.aid) as foo on foo.aid = visits.aid order by visits.aid;";
  let query = `select ${selection} ${base}`;
  console.log(query);

  try {
    let results = await db.query(query);
    res.status(200).json(results.rows);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

app.post("/join/park/min-max", async function (req, res) {
  console.log("here");
  let selection = req.body.selection;
  let temp = "";
  for (let i in selection) {
    temp += `${selection[i]}, `;
  }

  temp = temp.slice(0, -2);
  selection = temp;
  let base =
    "from visits inner join (select attractions.aid, attractions.name, attractions.location, dinosaurs.animal_name, rides.capacity, shows.sid, shows.duration from attractions full outer join dinosaurs on dinosaurs.aid = attractions.aid full outer join rides on rides.aid = attractions.aid full outer join shows on shows.aid = attractions.aid) as foo on foo.aid = visits.aid order by visits.aid;";
  let query = `select ${selection} ${base};`;
  console.log(query);

  try {
    let results = await db.query(query);
    res.status(200).json(results.rows);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

app.post("/visit/attractions/park/reports", async function (req, res) {
  console.log(req.body);
  let selection = req.body.selection;
  let temp = "";
  for (let i in selection) {
    temp += `${selection[i]}, `;
  }

  temp = temp.slice(0, -2);
  selection = temp;

  let conditions = req.body.conditions ? req.body.conditions : [];

  let cond = "";
  for (let k in conditions) {
    let o = conditions[k];
    let column = o.access;
    let val = parseFloat(o.value);
    let final = null;
    if (isNaN(val)) {
      final = `\'${o.value}\'`;
    } else if (Number.isInteger(val)) {
      final = parseInt(o.val);
    }
    let tempCond = `${column} ${o.currentOperator} ${final}`;
    tempCond = `${tempCond} `;
    cond = cond + tempCond;
  }

  if (cond.length > 0) {
    cond = cond.slice(0, -1);
    cond = `where ${cond}`;
  }

  let groupBy = req.body.groupBy ? req.body.groupBy : [];
  console.log(groupBy);
  let g = "";
  for (let m of groupBy) {
    g += m;
  }

  if (g.length > 0) {
    g = `group by ${g}`;
  }

  let base =
    "from visits inner join (select attractions.aid, attractions.name, attractions.location, dinosaurs.animal_name, rides.capacity, shows.sid, shows.duration from attractions full outer join dinosaurs on dinosaurs.aid = attractions.aid full outer join rides on rides.aid = attractions.aid full outer join shows on shows.aid = attractions.aid) as foo on foo.aid = visits.aid";
  let query = `select ${selection} ${base} ${cond} ${g};`;
  console.log(query);

  try {
    let results = await db.query(query);
    res.status(200).json(results.rows);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

const insertShift = `
  insert into shift_at_workson (description, start_date, end_date, start_time, end_time, status, eid, aid)
  values
    ($1, $2, $3, $4, $5, $6, $7, $8) returning *;`;

const updateShift = `
  update Shift_At_WorksOn
  set start_date = $2, end_date = $3, start_time = $4, end_time = $5, status = $6, aid = $8
  where description = $1 AND eid = $7 returning *;`;

const deleteShift = `
  delete from Shift_At_WorksOn
  where description = $1 AND eid = $2 returning *;`;

// add shift to employee
app.post("/v1/employee/add", async (req, res) => {
  try {
    const results = await db.query(insertShift, [
      req.body.description,
      req.body.start_date,
      req.body.end_date,
      req.body.start_time,
      req.body.end_time,
      req.body.status,
      req.body.eid,
      req.body.aid,
    ]);

    res.status(201).json({
      status: "success",
      data: {
        shift: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// update shift of employee
app.post("/v1/employee/update", async (req, res) => {
  try {
    const results = await db.query(updateShift, [
      req.body.description,
      req.body.start_date,
      req.body.end_date,
      req.body.start_time,
      req.body.end_time,
      req.body.status,
      req.body.eid,
      req.body.aid,
    ]);

    res.status(201).json({
      status: "success",
      data: {
        shift: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// delete shift of employee
app.post("/v1/employee/delete", async (req, res) => {
  try {
    const results = await db.query(deleteShift, [
      req.body.description,
      req.body.eid,
    ]);

    res.status(201).json({
      status: "success",
      data: {
        shift: results.rows[0],
        //not sure if I need the above
      },
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/visit/attractions/park/stats", async function (req, res) {
  console.log(req.body);
  let outer = req.body.nest;
  let inner = req.body.inner;
  let group = req.body.group;

  let base = `select ${outer} from (select ${inner} from visits inner join (select attractions.aid, attractions.name, attractions.location, dinosaurs.animal_name, rides.capacity, shows.sid, shows.duration from attractions full outer join dinosaurs on dinosaurs.aid = attractions.aid full outer join rides on rides.aid = attractions.aid full outer join shows on shows.aid = attractions.aid) as foo on foo.aid = visits.aid group by ${group}) as x;`;
  let query = base;
  console.log(query);

  try {
    let results = await db.query(query);
    res.status(200).json(results.rows);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

const publicPath = path.join(__dirname, "..", "client", "build");
app.use(express.static(publicPath));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
