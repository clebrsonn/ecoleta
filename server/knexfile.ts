import path from 'path';

module.exports = {

    client: 'postgres',
    connection:{
        host : '127.0.0.1',
        user : 'postgres',
        password : 'postgres',
        database : 'ecoleta'
    
    },
    pool: { min: 1, max: 7 },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'db', 'migrations')

    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'db', 'seeds')

    }
}