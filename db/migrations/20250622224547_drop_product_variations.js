export async function up(knex) {
  return knex.schema.dropTableIfExists('product_variations');
}

export async function down(knex) {
  return knex.schema.createTable('product_variations', function (table) {
    table.increments('id').primary();
    table.integer('product_id').unsigned().references('id').inTable('products').onDelete('CASCADE');
    table.string('name', 255).notNullable();
    table.decimal('price', 10, 2).notNullable();
    table.integer('stock');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at');
    table.index(['product_id'], 'by_product');
  });
}
