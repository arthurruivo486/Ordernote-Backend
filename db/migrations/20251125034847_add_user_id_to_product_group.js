/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  const hasUserId = await knex.schema.hasColumn("product_groups", "user_id");

  if (!hasUserId) {
    await knex.schema.alterTable("product_groups", (table) => {
      table.integer("user_id").unsigned();
      table
        .foreign("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
    });

    console.log("✔ user_id adicionado à tabela product_groups");
  } else {
    console.log("ℹ user_id já existe na tabela product_groups — nada alterado");
  }
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  const hasUserId = await knex.schema.hasColumn("product_groups", "user_id");

  if (hasUserId) {
    await knex.schema.alterTable("product_groups", (table) => {
      table.dropForeign("user_id");
      table.dropColumn("user_id");
    });

    console.log("✔ user_id removido da tabela product_groups");
  } else {
    console.log("ℹ user_id não existia em product_groups — nada removido");
  }
}