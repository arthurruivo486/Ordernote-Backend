// migrations/YYYYMMDD_update_products_add_price_stock.js
export async function up(knex) {
  return knex.schema.alterTable('products', function (table) {
    table.decimal('price', 10, 2).notNullable().defaultTo(0);
    table.integer('stock').defaultTo(0);
    table.integer('group_id').unsigned().references('id').inTable('product_groups').onDelete('SET NULL');
    table.index(['group_id'], 'by_group');
  });
}

export async function down(knex) {
  return knex.schema.alterTable('products', function (table) {
    table.dropColumn('price');
    table.dropColumn('stock');
    table.dropColumn('group_id');
  });
}
