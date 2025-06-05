/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('customers', function(table) {
    table.increments('id').primary();
    table.string('name', 255).notNullable();
    table.string('phone', 20);
    table.string('address_street', 255);
    table.string('address_number', 20);
    table.string('address_notes', 255);
    table.timestamp('created_at').defaultTo(knex.fn.now());

    table.index(['name'], 'search_customer_by_name');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('customers');
}
