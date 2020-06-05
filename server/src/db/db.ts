import knex from 'knex';
import path from 'path';


const knexFile = require(path.resolve(',,', '..', 'knexfile'));

const db = knex(knexFile);

export default db;