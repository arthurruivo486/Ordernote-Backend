/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.alterTable('customers', function(table) {
    // Adiciona a coluna como NULLABLE (isso funciona no SQLite)
    table.integer('user_id').unsigned().nullable();

    // Adiciona chave estrangeira (SQLite permite)
    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');

    // Índice
    table.index(['user_id'], 'idx_customers_user_id');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.alterTable('customers', function(table) {
    table.dropForeign('user_id');
    table.dropIndex(['user_id'], 'idx_customers_user_id');
    table.dropColumn('user_id');
  });
}
