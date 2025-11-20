export async function up(knex) {
  // PRODUCTS
  const hasUserIdProducts = await knex.schema.hasColumn("products", "user_id");
  if (!hasUserIdProducts) {
    await knex.schema.alterTable("products", (table) => {
      table.integer("user_id").unsigned();
      table.foreign("user_id").references("id").inTable("users").onDelete("CASCADE");
    });
  }

  // SALES
  const hasUserIdSales = await knex.schema.hasColumn("sales", "user_id");
  if (!hasUserIdSales) {
    await knex.schema.alterTable("sales", (table) => {
      table.integer("user_id").unsigned();
      table.foreign("user_id").references("id").inTable("users").onDelete("CASCADE");
    });
  }

  // ORDERS
  const hasUserIdOrders = await knex.schema.hasColumn("orders", "user_id");
  if (!hasUserIdOrders) {
    await knex.schema.alterTable("orders", (table) => {
      table.integer("user_id").unsigned();
      table.foreign("user_id").references("id").inTable("users").onDelete("CASCADE");
    });
  }
}

export async function down(knex) {
  const drop = async (tableName) => {
    const has = await knex.schema.hasColumn(tableName, "user_id");
    if (has) {
      await knex.schema.alterTable(tableName, (table) => {
        table.dropForeign("user_id");
        table.dropColumn("user_id");
      });
    }
  };

  await drop("products");
  await drop("sales");
  await drop("orders");
}
