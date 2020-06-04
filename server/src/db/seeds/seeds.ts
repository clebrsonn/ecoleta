import Knex from 'knex';

export async function seed(knex : Knex){
        knex('items').insert([
            {title : 'Lâmpadas', imagem: 'lampadas.svg'},
            {title : 'Lâmpadas', imagem: 'lampadas.svg'},
            {title : 'Lâmpadas', imagem: 'lampadas.svg'},
            {title : 'Lâmpadas', imagem: 'lampadas.svg'},
            {title : 'Lâmpadas', imagem: 'lampadas.svg'},
            {title : 'Lâmpadas', imagem: 'lampadas.svg'},

        ])
}