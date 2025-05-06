/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('product_variations', function(table) {
      table.increments('id').primary();
      table.integer('product_id').notNullable().references('id').inTable('products');
      table.string('name', 255).notNullable().comment('Ex: 500ml, Sabor Laranja');
      table.decimal('price', 10, 2).notNullable();
      table.integer('stock').comment('optional stock control');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at');
  
      // Index
      table.index(['product_id'], 'by_product');
    });
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export async function down(knex) {
    return knex.schema.dropTable('product_variations');
  }
  