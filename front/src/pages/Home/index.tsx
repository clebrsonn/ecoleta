import React from 'react';

import './styles.css'
import {} from 'react-icons/fi'

import logo from '../../assets/logo.svg';

const Home = ()=>{
    return(
        <div id="page-home">
        <div className="content">
            <header>
                <img src={logo} alt="Ecoleta"/>
            </header>
            <main>
                <h1>Marketplace de coleta de Resíduos</h1>

                <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</p>
                <a href='/cadastro'>
                    <span>></span>
                    <strong>Cadastre um ponto de coleta</strong>
                </a>
            </main>
        </div>
      </div>
      );

}
export default Home;