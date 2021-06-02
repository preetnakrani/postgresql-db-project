const db = require("./pg-migrations");

const rollback = async function() {

    await db.query("drop table if exists visits;");
    await db.query("drop table if exists customer_purchases_with;");
    await db.query("drop table if exists shift_at_worksOn;");
    await db.query("drop table if exists tickets;");
    await db.query("drop table if exists ticket_tier");
    await db.query("drop table if exists eats;")
    await db.query("drop table if exists dinosaurs;");
    await db.query("drop table if exists shows;");
    await db.query("drop table if exists rides;");
    await db.query("drop table if exists attractions;");
    await db.query("drop table if exists inventory_order;");
    await db.query("drop table if exists employees;");
    await db.query("drop table if exists food;");
    await db.query("drop table if exists schedules;");
    await db.query("drop table if exists offers;");
    await db.query("drop table if exists tier_quantity;");

}

console.log("hello");
(async() => {
    console.log('before start');
  
    await rollback();
    
    console.log('after start');
  })();