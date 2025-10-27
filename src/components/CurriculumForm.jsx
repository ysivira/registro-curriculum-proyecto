/*============================================================================
  Currículum Vitae - Registro y Gestión de Currículos
  ==========================================================================*/  

import React from 'react';
import './CurriculumForm.css';

/*============================================================================
  Componente CurriculumForm
  Descripción: Formulario para registrar o editar un currículo.
  Props:
    - formData: Objeto con los datos del formulario.
  ==========================================================================*/  
function CurriculumForm({
  formData,
  errors,
  fileInputRef,
  handleSubmit,
  handleChange,
  handleFileChange,
  handleRemovePhoto,
  handleEducationChange,
  handleAddEducation,
  handleRemoveEducation,
  handleExperienceChange,
  handleAddExperience,
  handleRemoveExperience,
  isEditing = false,
  onCancel 
}) {
  return (
    <form className="curriculum-form" onSubmit={handleSubmit} noValidate>
      {/*============================================================================
         CONTENEDOR PARA DATOS PERSONALES
        ==========================================================================*/  }
      <div className="form-section-block">
        <h2>{isEditing ? 'Editando Currículo' : 'Datos Personales'}</h2>

        <div className="form-group">
          <label>Nombre Completo</label>
          <input type="text" name="nombreCompleto" placeholder="Ej: Juan Pérez"
             className={errors.nombreCompleto ? 'input-error' : ''}
             value={formData.nombreCompleto} onChange={handleChange} 
          />
          {errors.nombreCompleto && <p className="error-message">{errors.nombreCompleto}</p>}
        </div>

        <div className="form-group">
          <label>Correo Electrónico</label>
          <input type="email" name="email" placeholder="Ej: juan.perez@correo.com" 
            className={errors.email ? 'input-error' : ''} 
            value={formData.email} onChange={handleChange} 
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label>Número de Teléfono</label>
          <input type="tel" name="telefono" placeholder="Ej: +54 9 11 1234-5678" 
            className={errors.telefono ? 'input-error' : ''} 
            value={formData.telefono} onChange={handleChange} 
          />
          {errors.telefono && <p className="error-message">{errors.telefono}</p>}
        </div>

        <div className="form-group">
          <label>Foto del Candidato</label>
          <input type="file" name="foto" accept="image/*" ref={fileInputRef} onChange={handleFileChange} />
          {formData.foto && (
            <div className="photo-preview-container">
              <img src={formData.foto} alt="Previsualización de foto" className="photo-preview-image" />
              <button type="button" onClick={handleRemovePhoto} className="remove-photo-button">Quitar foto</button>
            </div>
          )}
        </div>
      </div>
      
      {/*============================================================================
          CONTENEDOR PARA EDUCACIÓN Y EXPERIENCIA
        ==========================================================================*/ } 
      <h2>Educación</h2>
      {formData.educacion.map((edu, index) => (
        <div key={index} className="education-block">
          <div className="item-header">
            <h4>Estudio #{index + 1}</h4>
            {formData.educacion.length > 1 && (<button type="button" onClick={() =>
               handleRemoveEducation(index)} className="remove-button">Eliminar</button>)
            }
          </div>
          <div className="form-group"> 
            <label>Título Obtenido</label> 
            <input type="text" name="titulo" placeholder="Ej: Ingeniero en Sistemas" 
              className={errors.educacion?.[index]?.titulo ? 'input-error' : ''} 
              value={edu.titulo} onChange={(e) => handleEducationChange(index, e)} 
            /> 
            {errors.educacion?.[index]?.titulo && <p className="error-message">{errors.educacion[index].titulo}</p>} 
          </div>

          <div className="form-group"> 
            <label>Institución Educativa</label> 
            <input type="text" name="institucion" placeholder="Ej: Universidad de Buenos Aires" 
              className={errors.educacion?.[index]?.institucion ? 'input-error' : ''} 
              value={edu.institucion} onChange={(e) => handleEducationChange(index, e)} 
            /> 
            {errors.educacion?.[index]?.institucion && <p className="error-message">{errors.educacion[index].institucion}</p>} 
            </div>

          <div className="form-group"> 
            <label>Año de Graduación</label> 
            <input type="number" name="graduacion" placeholder="Ej: 2020" 
              className={errors.educacion?.[index]?.graduacion ? 'input-error' : ''} 
              value={edu.graduacion} onChange={(e) => handleEducationChange(index, e)} 
            /> 
            {errors.educacion?.[index]?.graduacion && <p className="error-message">{errors.educacion[index].graduacion}</p>} 
          </div>

        </div>
      ))}

    {/*============================================================================
        BOTÓN PARA AGREGAR MÁS EDUCACIÓN
      ==========================================================================*/  }
      <button type="button" onClick={handleAddEducation} className="add-button">+ Agregar otro estudio</button>

      <h2>Experiencia Laboral</h2>
      {formData.experiencias.map((exp, index) => (
        <div key={index} className="experience-block">
          
          <div className="item-header">
            <h4>Experiencia #{index + 1}</h4>
            {formData.experiencias.length > 1 && (<button type="button" onClick={() => 
              handleRemoveExperience(index)} className="remove-button">Eliminar</button>)
            }
          </div>

          <div className="form-group"> 
            <label>Nombre del Empleador</label> 
            <input type="text" name="empleador" placeholder="Ej: Google Inc." 
              className={errors.experiencias?.[index]?.empleador ? 'input-error' : ''} 
              value={exp.empleador} onChange={(e) => handleExperienceChange(index, e)} 
            /> 
            {errors.experiencias?.[index]?.empleador && <p className="error-message">{errors.experiencias[index].empleador}</p>} 
          </div>

          <div className="form-group"> 
            <label>Cargo</label> 
            <input type="text" name="cargo" placeholder="Ej: Desarrollador Frontend" 
              lassName={errors.experiencias?.[index]?.cargo ? 'input-error' : ''} 
              value={exp.cargo} onChange={(e) => handleExperienceChange(index, e)} 
            /> 
            {errors.experiencias?.[index]?.cargo && <p className="error-message">{errors.experiencias[index].cargo}</p>} 
          </div>

          <div className="form-group"> 
            <label>Fechas (Inicio - Fin)</label> 
            <input type="text" name="fechas" placeholder="Ej: Enero 2021 - Presente" 
              className={errors.experiencias?.[index]?.fechas ? 'input-error' : ''} 
              value={exp.fechas} onChange={(e) => handleExperienceChange(index, e)} 
            /> 
            {errors.experiencias?.[index]?.fechas && <p className="error-message">{errors.experiencias[index].fechas}</p>} 
          </div>

          <div className="form-group"> 
            <label>Descripción</label> 
            <textarea name="descripcion" placeholder="Describa sus responsabilidades..." 
              className={errors.experiencias?.[index]?.descripcion ? 'input-error' : ''} 
              value={exp.descripcion} onChange={(e) => handleExperienceChange(index, e)}>
            </textarea> 
            {errors.experiencias?.[index]?.descripcion && <p className="error-message">{errors.experiencias[index].descripcion}</p>} 
          </div>

        </div>
      ))}

    {/*============================================================================
        BOTÓN PARA AGREGAR MÁS EXPERIENCIA CANCELAR Y GUARDAR
      ==========================================================================*/  }
      <button type="button" onClick={handleAddExperience} className="add-button">+ Agregar otra experiencia</button>

      <div className="form-actions">
        {isEditing && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
        )}

        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Guardar Cambios' : 'Registrar Currículo'}
        </button>
      </div>
      
    </form>
  );
}

export default CurriculumForm;