/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('products', function(table) {
    table.increments('id').primary(); // id INTEGER PRIMARY KEY AUTOINCREMENT
    table.integer('group_id').unsigned().references('id').inTable('product_groups').onDelete('SET NULL'); // opcional
    table.string('name', 255).notNullable(); // Ex: "Coca-Cola 2L"
    table.text('description');
    table.string('image_url', 512).comment('optional');
    table.decimal('price', 10, 2).notNullable(); // Preço diretamente no produto
    table.integer('stock').defaultTo(0); // Quantidade em estoque
    table.boolean('is_active').defaultTo(true);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at');

    // Indexes
    table.index(['name'], 'search_product_name');
    table.index(['group_id'], 'by_group');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('products');
}
