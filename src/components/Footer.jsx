 {/*============================================================================
    Archivo: Footer.jsx
  ==========================================================================*/}

import React from 'react';
import './Footer.css'; 

function Footer() {
   {/*============================================================================
      Obtenemos el año actual dinamicamente para mostrar en el pie de página
      ==========================================================================*/}
  const anioActual = new Date().getFullYear(); 

  return (
    <footer className="app-footer">
      <p>&copy; {anioActual} Gestor de Curriculum. Todos los derechos reservados.</p>
    </footer>
  );
}

export default Footer; 