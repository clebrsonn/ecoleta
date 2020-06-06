import knex from '../db/db';
import {Request, Response} from 'express';


class ItemsController {
    //index = findAll
    async index(request: Request, response :Response){
        const items = await knex('items').select('*');

        const baseUrl = request.headers.host;

        const serializedItems = items.map(item => {
            return {
                id: item.id,
                name: item.title,
                image_name: item.imagem,
                image_url: `http://${baseUrl}/images/${item.imagem}`
            }

        })

        return response.json(serializedItems);
    }
}
export default ItemsController;