import path from 'path';

module.exports = {

    client: 'pg',
    connection:{
        host : '127.0.0.1',
        user : 'postgres',
        password : 'postgres',
        database : 'ecoleta'
    
    },
    pool: { min: 0, max: 7 },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'db', 'migrations')

    }


}