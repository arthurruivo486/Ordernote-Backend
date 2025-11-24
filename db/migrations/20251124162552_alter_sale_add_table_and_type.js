/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.alterTable("sales", (table) => {
    // Adicionar número da mesa
    table.integer("table_number")
      .nullable()
      .comment("número da mesa para vendas locais");

    // Adicionar tipo da venda
    table.string("sale_type", 20)
      .notNullable()
      .defaultTo("local")
      .comment("local/delivery");

    // Criar índice para table_number
    table.index(["table_number"], "sale_by_table");
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.alterTable("sales", (table) => {

    // Remover índice
    table.dropIndex(["table_number"], "sale_by_table");

    // Remover campos adicionados
    table.dropColumn("table_number");
    table.dropColumn("sale_type");
  });
}
