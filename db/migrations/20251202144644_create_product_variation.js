/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable("product_variations", function (table) {
    table.increments("id").primary(); // id INTEGER PRIMARY KEY AUTOINCREMENT

    table
      .integer("product_id")
      .notNullable()
      .references("id")
      .inTable("products")
      .onDelete("CASCADE");

    table
      .integer("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table.string("name", 255).notNullable(); // Nome da variação (ex: Calabresa)
    table.decimal("price", 10, 2).defaultTo(0); // Diferença de preço
    table.boolean("is_active").defaultTo(true);

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at");

    // Indexes
    table.index(["product_id"], "variation_by_product");
    table.index(["name"], "search_variation_name");
    table.index(["user_id"], "variation_by_user");
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable("product_variations");
}
