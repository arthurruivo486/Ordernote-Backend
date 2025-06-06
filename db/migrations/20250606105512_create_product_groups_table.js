/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('product_groups', function(table) {
    table.increments('id').primary();
    table.string('name', 255).notNullable();
    table.string('icon', 100);

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at');

    table.unique(['name'], 'unique_product_group_name');
    table.index(['name'], 'search_product_group_name');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('product_groups');
}

