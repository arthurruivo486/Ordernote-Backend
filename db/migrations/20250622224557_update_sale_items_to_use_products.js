export async function up(knex) {
  return knex.schema.alterTable('sale_items', function (table) {
    table.dropForeign('variation_id');
    table.dropColumn('variation_id');

    // Já existe product_id, então não precisa recriar
  });
}

export async function down(knex) {
  return knex.schema.alterTable('sale_items', function (table) {
    table.integer('variation_id').unsigned().references('id').inTable('product_variations').onDelete('CASCADE');
  });
}
