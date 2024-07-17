/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
  return await knex.schema.createTable('employees', (table) => {
    table.increments('employee_id').primary();
    table.string('first_name').notNullable();
    table.integer('salary').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
  return await knex.schema.dropTable('employees');
};
