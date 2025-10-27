 {/*============================================================================
  Página de detalle del currículo.
  Muestra la información completa del currículo seleccionado.
  Permite editar o volver a la página principal.
  ==========================================================================*/}
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './DetailPage.css';

 {/*============================================================================
    Función principal del componente DetailPage.
    Recibe la lista de currículos como prop.
    Obtiene el ID del currículo desde los parámetros de la URL.
    Busca el currículo correspondiente y muestra sus detalles.
    Si no se encuentra el currículo, muestra un mensaje de error.
    ==========================================================================*/}
function DetailPage({ curriculos }) {
  const { id } = useParams();
  const cv = curriculos.find(c => c.id == id);

  if (!cv) {
    return (
      <div className="detail-container">
        <h2>Currículo no encontrado</h2>
        <Link to="/" className="btn btn-secondary">Volver al inicio</Link>
      </div>
    );
  }

  return (
     /*============================================================================
      Renderizado de los detalles del currículo.
      Muestra nombre completo, datos de contacto, educación y experiencia laboral.
      Incluye botones para editar el currículo o volver a la página principal.
      ==========================================================================*/
    <div className="detail-container">

      {/*============================================================================
        Encabezado con el nombre completo y acciones (editar, volver).
        ==========================================================================*/}
      <div className="detail-header">
        <h1>{cv.nombreCompleto}</h1>
        <div className="detail-header-actions">
          <Link to={`/curriculum/${id}/editar`} className="btn btn-success">
            Editar
          </Link>
          <Link to="/" className="btn btn-secondary">
            Volver
          </Link>
        </div>
      </div>

     {/*============================================================================
        Sección de detalles del currículo.
        Incluye datos de contacto, educación y experiencia laboral.
      ==========================================================================*/}
      <div className="detail-section contact-section">
        <div className="contact-info">
          <h3>Datos de Contacto</h3>
          <p><strong>Email:</strong> {cv.email}</p>
          <p><strong>Teléfono:</strong> {cv.telefono || 'No especificado'}</p>
        </div>
        
        {cv.foto && (
          <div className="contact-photo">
            <img src={cv.foto} alt={`Foto de ${cv.nombreCompleto}`} />
          </div>
        )}
      </div>

      {/*============================================================================
        Sección de educación y experiencia laboral.
        Muestra listas de educación y experiencias con sus detalles.
        ==========================================================================*/}
      <div className="detail-section">
        <h3>Educación</h3>
        {cv.educacion.map((edu, index) => (
          <div key={index} className="detail-block">
            <p><strong>Título:</strong> {edu.titulo}</p>
            <p><strong>Institución:</strong> {edu.institucion}</p>
            <p><strong>Año de Graduación:</strong> {edu.graduacion}</p>
          </div>
        ))}
      </div>

      <div className="detail-section">
        <h3>Experiencia Laboral</h3>
        {cv.experiencias.map((exp, index) => (
          <div key={index} className="detail-block">
            <p><strong>Cargo:</strong> {exp.cargo}</p>
            <p><strong>Empleador:</strong> {exp.empleador}</p>
            <p><strong>Fechas:</strong> {exp.fechas}</p>
            <p><strong>Descripción:</strong> {exp.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DetailPage;