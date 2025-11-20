export async function up(knex) {
  const hasUserId = await knex.schema.hasColumn("orders", "user_id");

  if (!hasUserId) {
    await knex.schema.alterTable("orders", (table) => {
      table.integer("user_id").unsigned();
      table
        .foreign("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
    });

    console.log("✔ user_id adicionado à tabela orders");
  } else {
    console.log("ℹ user_id já existe na tabela orders — nada alterado");
  }
}

export async function down(knex) {
  const hasUserId = await knex.schema.hasColumn("orders", "user_id");

  if (hasUserId) {
    await knex.schema.alterTable("orders", (table) => {
      table.dropForeign("user_id");
      table.dropColumn("user_id");
    });

    console.log("✔ user_id removido da tabela orders");
  } else {
    console.log("ℹ user_id não existia em orders — nada removido");
  }
}
