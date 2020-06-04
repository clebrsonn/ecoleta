import knex from 'knex';

const db = knex({
    client: 'postgres',
    connection:{
        host : '127.0.0.1',
        user : 'postgres',
        password : 'postgres',
        database : 'ecoleta'
    
    },
    pool: { min: 0, max: 7 }


})


export default db;