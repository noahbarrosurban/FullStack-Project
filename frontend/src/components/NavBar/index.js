import './style.css';
import React from 'react'; 

const NavBar = () => {
    return (
        <nav className="nav">
            <h2 className="title">Carros API</h2>
            <ul className="navList">
                <li className="navItem"><a href="/cadastrar">Cadastrar Carros</a></li>
                <li className="navItem"><a href="/">Verificar Carros</a></li>
                <li className="navItem"><a href="/cadastrarMarcas">Cadastrar Marcas</a></li>
            </ul>
        </nav>
    );
};



export default NavBar;