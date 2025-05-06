/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('users', function(table) {
      table.increments('id').primary(); // id INTEGER PRIMARY KEY AUTOINCREMENT
      table.string('name', 255).notNullable();
      table.string('email', 255).notNullable().unique();
      table.string('password_hash', 255).notNullable();
      table.string('role', 50).defaultTo('seller').comment('admin/seller');
      table.boolean('status').defaultTo(true);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at');
  
      // Indexes
      table.unique(['email'], 'unique_email');
      table.index(['email', 'password_hash'], 'login');
      table.index(['name'], 'search_by_name');
    });
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export async function down(knex) {
    return knex.schema.dropTable('users');
  }
  