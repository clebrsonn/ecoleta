import Knex from 'knex';


export async function up(knex:Knex){

 return knex.schema.createTable('point_items', function (table) {
    //table.increments('id').primary();

    table.integer('point_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('points');
    
    table.integer('item_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('items');

    table.primary(['item_id', 'point_id'], 'point_item_pk');

  })

}

export async function down(knex:Knex){
  return knex.schema.dropTableIfExists('point_items');
}



