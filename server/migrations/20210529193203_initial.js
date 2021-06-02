
exports.up = async function(knex) {
  await knex.schema.createTable("newStuff", (table) => {
      table.increments();
      table.text("message");
  });
  
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("newStuff");
};
