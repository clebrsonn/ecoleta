import React, {useEffect, useState, ChangeEvent, FormEvent} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import {Map, TileLayer, Marker} from 'react-leaflet';
import api from '../../services/api';
import axios from 'axios';
import { LeafletMouseEvent } from 'leaflet';

import logo from '../../assets/logo.svg';

import './styles.css';

interface Item{

  id: number;
  title: string;
  image_url: string;
  image_name: string;

}

interface UF{
  id: number;
  uf: string;
  name: string; 
}
interface IbgeUfResponse{
  id: number;
  sigla: string;
  nome: string; 
}

interface IbgeCityResponse{
  nome: string; 
}

const CreatePoint = ()=>{
  const [items, setItems] = useState<Array<Item>>([]);
  const [ufs, setUfs] = useState<Array<UF>>([]);
  const [selectedUF, setSelectedUF] = useState<string>('0');
  const [cities, setCities] = useState<Array<string>>([]);
  const [selectedCity, setSelectedCity] = useState<string>('0');
  const [selectedposition, setSelectedposition] = useState<[number,number]>([0,0]);
  const [userLocation, setuserLocation] = useState<[number,number]>([-7.9943957, -35.0498284]);
  const [selectedItems, setSelectedItems] = useState<Array<number>>([]);
  const [inputData, setInputData] = useState({
    name: '',
    email: '',
    whatsapp: '',
  })
  const history = useHistory();

  useEffect(()=>{
    api.get('items').then(response =>{
      setItems(response.data);
    });
  }, []);

  useEffect(()=>{
    
    navigator.geolocation.getCurrentPosition(position=>{
      const {latitude, longitude} =   position.coords;
      setuserLocation([latitude, longitude]);
    })

    
    
  },[]);

  useEffect(()=>{
    axios.get<IbgeUfResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then(response => {
      const ufsReplaced = response.data.map(ufR =>
       { return {
        id: ufR.id,
          uf: ufR.sigla,
          name: ufR.nome
      }})

      setUfs(ufsReplaced);
    });
  }, [] );

  useEffect(()=>{
    axios.get<Array<IbgeCityResponse>>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`)
      .then(response =>{
        const cityNames = response.data.map(city=>{
         return city.nome;
        });
        setCities(cityNames)
      });
  }, [selectedUF])

  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>){
    setSelectedUF(event.target.value); 

  }
  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>){
    setSelectedCity(event.target.value); 

  }

  function handleMapClick(event: LeafletMouseEvent){
    setSelectedposition([
      event.latlng.lat,
      event.latlng.lng
    ]);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>){
    const { name, value } = event.target;
    setInputData({...inputData, [name]:value })

  }

  function handleSelectItem(id: number){
    const isSelected = selectedItems.findIndex(item => item === id);
    if(isSelected >= 0){
      const filteredItems = selectedItems.filter(item => item !== id);
      setSelectedItems(filteredItems);
    }else{
      setSelectedItems([...selectedItems, id]);
    }
    
  }

  async function handleSubmit(event: FormEvent){
    event.preventDefault();

    const {name, email, whatsapp} = inputData;
    const uf = selectedUF;
    const city = selectedCity;
    const [latitude, longitude] = selectedposition;
    const items = selectedItems;

    const dataForSend = {
      name, 
      email,
      whatsapp,
      uf,
      city,
      latitude,
      longitude,
      items
    }
    await api.post('points', dataForSend);
    history.push('/');
  }

  return(
    <div id="page-create-point">
      <header>
        <img src={logo} alt="logo Ecoleta"/>
        <Link to="/">
          <FiArrowLeft/>
          Voltar para Home
        </Link>
      </header>
      <form onSubmit={handleSubmit}>
        <h1>cadastro do <b>Ponto de Coleta</b></h1>

        <fieldset>
          <legend>
            <h2>Dados</h2>
            </legend>
            <div className="field">
              <label htmlFor="name">Nome da Entidade</label>
              <input type="text" name="name" id="name" onChange={handleInputChange}></input>
            </div>

            <div className="field-group">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" onChange={handleInputChange}></input>
            </div>
            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input type="text" name="whatsapp" id="whatsapp" onChange={handleInputChange}></input>
            </div>
          </div>

        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no Mapa</span>
          </legend>
            <Map center={userLocation} zoom={15} onClick={handleMapClick}>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={selectedposition}/>
            </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select name="uf" id="uf" value={selectedUF} onChange={handleSelectUf}>
                <option value="0">Selecione uma UF</option>
                {ufs.map(uf =>(
                  <option key={uf.uf} value={uf.uf}>{uf.name}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select name="city" id="city" value={selectedCity} onChange={handleSelectCity}>
                <option value="0">Selecione uma Cidade</option>
                {cities.map(city =>(
                  <option key={city} value={city}>{city}</option>
                ))}

              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Ítems de Coleta</h2>
            <span>Selecione um ou mais items abaixo</span>
            </legend>
            <ul className="items-grid">
              {items.map((item) => (
                <li 
                  key={item.id} 
                  onClick={()=> handleSelectItem(item.id)}
                  className={selectedItems.includes(item.id) ? 'selected' : ''}
                >
                  <img src={item.image_url} alt={item.title}/>
                </li>
              ))}
              
            </ul>
        </fieldset>

        <button type="submit">
          Cadastrar Ponto de Coleta 
        </button>

      </form>
    </div>
  );

}
export default CreatePoint;