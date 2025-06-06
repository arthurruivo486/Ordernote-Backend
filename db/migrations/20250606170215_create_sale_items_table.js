/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// migration sale_items
export async function up(knex) {
  return knex.schema.createTable('sale_items', function (table) {
    table.increments('id').primary();
    table.integer('sale_id').unsigned().notNullable().references('id').inTable('sales').onDelete('CASCADE');
    table.integer('product_id').unsigned().notNullable().references('id').inTable('products').onDelete('CASCADE');
    table.integer('variation_id').unsigned().notNullable().references('id').inTable('product_variations').onDelete('CASCADE');
    table.integer('quantity').notNullable();
    table.decimal('unit_price', 10, 2).notNullable(); // Snapshot do preço
    table.decimal('subtotal', 10, 2).notNullable();

    // Índices com nomes únicos
    table.index(['sale_id'], 'sale_items_by_sale');
    table.index(['product_id'], 'sale_items_by_product');
  });
}


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('sale_items');
}
