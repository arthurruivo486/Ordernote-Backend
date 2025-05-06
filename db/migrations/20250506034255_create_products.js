/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('products', function(table) {
      table.increments('id').primary(); // id INTEGER PRIMARY KEY AUTOINCREMENT
      table.string('name', 255).notNullable();
      table.text('description');
      table.string('image_url', 512).comment('optional');
      table.boolean('is_active').defaultTo(true);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at');
  
      // Indexes
      table.index(['name'], 'search_product_name');
    });
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export async function down(knex) {
    return knex.schema.dropTable('products');
  }
  