 {/*============================================================================
    Página de inicio con búsqueda y paginación.
    Permite buscar currículos por nombre, email o título.
    Muestra una lista paginada de curriculums.
    ==========================================================================*/}
import React, { useState } from 'react';
import CurriculumList from '../components/CurriculumList';
import Pagination from '../components/Pagination'; 
import './HomePage.css';

  {/*============================================================================
    Función principal del componente HomePage.
    Recibe la lista de currículos y la función de eliminación como props.
    Maneja el estado de búsqueda y paginación.
    ==========================================================================*/}
function HomePage({ curriculos, onDelete }) {
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const [cvsPorPagina] = useState(5);

  // FILTRAMOS LOS CURRÍCULOS SEGÚN EL TÉRMINO DE BÚSQUEDA
  const curriculosFiltrados = curriculos.filter(cv => {
    const busqueda = terminoBusqueda.toLowerCase();
    const nombreCoincide = cv.nombreCompleto.toLowerCase().includes(busqueda);
    const emailCoincide = cv.email.toLowerCase().includes(busqueda);
    const tituloCoincide = cv.educacion.some(edu => 
      edu.titulo.toLowerCase().includes(busqueda)
    );
    return nombreCoincide || emailCoincide || tituloCoincide;
  });

  // CÁLCULOS PARA LA PAGINACIÓN
  const indiceDelUltimoCv = paginaActual * cvsPorPagina;
  const indiceDelPrimerCv = indiceDelUltimoCv - cvsPorPagina;
  const cvsEnPaginaActual = curriculosFiltrados.slice(indiceDelPrimerCv, indiceDelUltimoCv);

  // FUNCIÓN PARA CAMBIAR DE PÁGINA
  const paginate = (numeroDePagina) => setPaginaActual(numeroDePagina);

  return (
     /*============================================================================
      Renderizado de la página de inicio.
      Incluye el campo de búsqueda, la lista de currículos y la paginación.
      ==========================================================================*/
    <div className="home-page-container">
      <div className="search-container">
        <input 
          type="text"
          placeholder="Buscar por nombre, email o título..."
          className="search-input"
          value={terminoBusqueda}
          onChange={(e) => setTerminoBusqueda(e.target.value)}
        />
      </div>

      <CurriculumList 
        curriculos={cvsEnPaginaActual} 
        onDelete={onDelete} 
      />

      <Pagination 
        cvsPorPagina={cvsPorPagina}
        totalCvs={curriculosFiltrados.length}
        paginate={paginate}
        paginaActual={paginaActual}
      />
    </div>
  );
}

export default HomePage;