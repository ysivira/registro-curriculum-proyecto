{/*============================================================================
  Archivo: Pagination.jsx
  Descripción: Componente de paginación para listas largas.
  ==========================================================================*/}
import React from 'react';
import './Pagination.css';

function Pagination({ cvsPorPagina, totalCvs, paginate, paginaActual }) {
  const numerosDePagina = [];

   {/*============================================================================
      Calculamos los números de página necesarios
      ==========================================================================*/}
  for (let i = 1; i <= Math.ceil(totalCvs / cvsPorPagina); i++) {
    numerosDePagina.push(i);
  }

   {/*============================================================================
      No mostramos la paginación si solo hay una página
      ==========================================================================*/}
  if (numerosDePagina.length <= 1) {
    return null;
  }

  return (
    <nav>
      <ul className="pagination">
        {numerosDePagina.map(numero => (
          <li key={numero} className={`page-item ${paginaActual === numero ? 'active' : ''}`}>
            <a onClick={() => paginate(numero)} href="#!" className="page-link">
              {numero}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;