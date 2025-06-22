export async function up(knex) {
  return knex.schema.alterTable('sale_items', function (table) {
    table.dropColumn('id'); // Remove a chave primária autoincremental
  }).then(() => {
    return knex.schema.alterTable('sale_items', function (table) {
      table.primary(['sale_id', 'product_id']); // Cria a chave primária composta
    });
  });
}

export async function down(knex) {
  return knex.schema.alterTable('sale_items', function (table) {
    table.dropPrimary(); // Remove chave primária composta
    table.increments('id').primary(); // Volta a ter id autoincrement
  });
}
