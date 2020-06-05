import knex from '../db/db';
import {Request, Response} from 'express';

class PointsController{

    async index(request: Request, response: Response){
        const {uf, city, items}= request.query;
        
        const itemsParsed = String(items)
        .split(',')
        .map(item => Number(item.trim()));

        const points = await knex('points')
        .join('point_tems', 'point_items.point_id', '=', 'point_id')
        .whereIn('point_items.item_id', itemsParsed)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('points.*');

        return response.json(points);
        

    }



    async show(request: Request, response: Response){
        const {id} = request.params;

        const point = await knex('points')
        .where('points.id', id)
        .first();

        if(!point){
            return response.status(404);
        }

        const items = await knex('items')
        .join('point_items', 'point_items.item_id', '=', 'items.id')
        .where('point_items.point_id', id).select('title');

        return response.json({point, items});

    }

    async create(request : Request, response : Response){
        const {
            image,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items    
        } = request.body;
        
        const trx = await knex.transaction();

    const point = {
        image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf
    };


        const idPoint = await trx('points').insert(point).returning('id');
        
        const point_id = idPoint[0];
    
    
        const pointItems = items.map((item_id: number) =>{
          return { 
            point_id,
            item_id,
          };
    
        })
        
        await trx('point_items').insert(pointItems);

        await trx.commit();
    
    
        return response.json({
            id: point_id,
            ...point,
            
        });
    }

};

export default PointsController;