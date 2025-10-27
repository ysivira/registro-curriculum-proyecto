/*============================================================================
  Archivo: CurriculumList.jsx 
  ==========================================================================*/  
import React from 'react';
import { Link } from 'react-router-dom';
import './CurriculumList.css';
import vacio from '../assets/vacio.jpg'; 

/*============================================================================
  Componente: CurriculumList
  Descripción: Muestra la lista de currículos registrados con opciones para ver detalles o eliminar.
  Props:
    - curriculos: Array de objetos de currículos.
    - onDelete: Función para eliminar un currículo por su ID.
  ==========================================================================*/  
function CurriculumList({ curriculos, onDelete }) {
  return (
    <div className="curriculum-list-container">
      <h2>Currículos Registrados</h2>
      {/*============================================================================
          Usamos una imagen para cuando la lista está vacía
        ==========================================================================*/}
      {curriculos.length === 0 ? (
        <div className="lista-vacia">
          <img src={vacio} alt="No hay currículos registrados" className="lista-vacia-img" />
          <p className="lista-vacia-texto">Aún no hay currículos registrados.</p>
          <p className="lista-vacia-subtexto">¡Anímate a crear el primero!</p>
        </div>
      ) : (
        <ul className="curriculum-list">
          {curriculos.map(cv => (
            <li key={cv.id} className="curriculum-list-item">
              <div className="item-info">
                <span className="item-name">{cv.nombreCompleto}</span>
                <span className="item-email">{cv.email}</span>
              </div>
              <div className="item-actions">
                 {/*============================================================================
                     Enlace para ver detalles del currículo Y boton para eliminar
                    =========================================================================*/}
                <Link to={`/curriculum/${cv.id}`} className="btn btn-primary">
                  Ver Detalles
                </Link>
                <button onClick={() => onDelete(cv.id)} className="btn btn-danger" >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CurriculumList;