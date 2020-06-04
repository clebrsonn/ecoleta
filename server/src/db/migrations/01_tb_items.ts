import Knex from 'knex';


export async function up(knex:Knex){

 return knex.schema.createTable('items', function (table) {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.string('imagem').notNullable();
  })

}

export async function down(knex:Knex){
  return knex.schema.dropTableIfExists('items');
}

