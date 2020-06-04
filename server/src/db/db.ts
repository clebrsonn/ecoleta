import knex from 'knex';

const con = knex({
    client: 'pg',
    connection:{
        host : '127.0.0.1',
        user : 'postgres',
        password : 'postgres',
        database : 'ecoleta'
    
    },
    pool: { min: 0, max: 7 }


})


export default db;