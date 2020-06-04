import express from 'express';
import knex from './db/db';

const routes = express.Router();

routes.get('/items', async (request, response)=>{
    const items = await knex('items').select('*');

return response.json(items);
})

export default routes;