 {/*============================================================================
    Archivo: Header.jsx
    Descripción: Componente de cabecera con logo y navegación.
    ==========================================================================*/}
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/logo.png';

 {/*============================================================================
    Componente Header
    Descripción: Cabecera de la aplicación con logo y enlaces de navegación.
    ==========================================================================*/}
function Header() {
  return (
    <header className="app-header">
      <div className="header-content">
         {/*============================================================================
              Contenedor para la marca (logo + título)
            ==========================================================================*/}
        <div className="header-brand">
          <img src={logo} alt="Logo de la aplicación" className="header-logo" />
          <h1>Gestor de Currículos</h1>
        </div>

        {/*============================================================================
            Contenedor de navegación
          ==========================================================================*/}
        <nav className="header-nav">
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/crear" className="nav-link">Crear Currículo</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;