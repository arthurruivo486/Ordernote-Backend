export async function up(knex) {
  // PRODUCTS
  await knex.schema.alterTable("products", (table) => {
    table.integer("user_id").unsigned();
    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });

  // SALES
  await knex.schema.alterTable("sales", (table) => {
    table.integer("user_id").unsigned();
    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });

  // ORDERS (caso exista)
  await knex.schema.alterTable("orders", (table) => {
    table.integer("user_id").unsigned();
    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });
}

export async function down(knex) {
  await knex.schema.alterTable("products", (table) => {
    table.dropForeign("user_id");
    table.dropColumn("user_id");
  });

  await knex.schema.alterTable("sales", (table) => {
    table.dropForeign("user_id");
    table.dropColumn("user_id");
  });

  await knex.schema.alterTable("orders", (table) => {
    table.dropForeign("user_id");
    table.dropColumn("user_id");
  });
}

