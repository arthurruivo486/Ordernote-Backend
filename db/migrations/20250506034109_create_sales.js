/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('sale', function(table) {
      table.increments('id').primary(); // id INTEGER PRIMARY KEY AUTOINCREMENT
      table.integer('order_id').notNullable();
      table.integer('customer_id').nullable().comment('opcional');
      table.integer('user_id').notNullable().references('id').inTable('users');
      table.decimal('total_amount', 10, 2).notNullable();
      table.string('payment_method', 50).notNullable().comment('cash/card/pix');
      table.string('status', 20).notNullable().comment('paid/pending');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at');
  
      // Indexes
      table.index(['created_at'], 'sale_by_date');
      table.index(['user_id'], 'sale_by_user');
    });
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export async function down(knex) {
    return knex.schema.dropTable('sale');
  }
  