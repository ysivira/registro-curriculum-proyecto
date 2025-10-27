{/*============================================================================
  Página de edición del currículo.
  Permite modificar los datos del currículo seleccionado.
  Incluye validación de formulario y manejo de imagen.
  ==========================================================================*/}
import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CurriculumForm from '../components/CurriculumForm';

 {/*============================================================================
    Función principal del componente EditPage.
    Recibe la lista de currículos y la función para actualizar un currículo como props.
    Obtiene el ID del currículo desde los parámetros de la URL.
    Carga los datos del currículo a editar en el estado local.
    Maneja cambios en el formulario, validación y envío de datos.
    ==========================================================================*/} 
function EditPage({ curriculos, onUpdateCurriculum }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

   {/*============================================================================
      useEffect para cargar los datos del currículo a editar cuando el componente se monta o cambia el ID.
    ==========================================================================*/}
  useEffect(() => {
    const cvAEditar = curriculos.find(cv => cv.id == id);
    if (cvAEditar) {
      setFormData(cvAEditar);
    }
  }, [id, curriculos]);

  if (!formData) {
    return <div>Cargando datos del currículo...</div>;
  }

    {/*============================================================================
      Funciones para manejar cambios en el formulario y validación.
    ==========================================================================*/}
    const handleChange = (e) => { 
    const { name, value } = e.target; 
    setFormData({ ...formData, [name]: value }); 
  };

   {/*============================================================================
        Manejo de carga y eliminación de foto.
      ==========================================================================*/}
  const handleFileChange = (e) => { 
    const file = e.target.files[0]; 
    if (file) { const reader = new FileReader(); 
      reader.onloadend = () => { 
        setFormData(prevData => ({ 
          ...prevData, foto: reader.result 
        })); 
      }; 
      reader.readAsDataURL(file); 
    } 
  };

  const handleRemovePhoto = () => { 
    setFormData(prevData => ({ 
      ...prevData, 
      foto: null 
    })); 
      if (fileInputRef.current) { 
        fileInputRef.current.value = null; 
      } 
  };

   {/*============================================================================
        Manejo dinámico de listas de educación y experiencia laboral.
      ==========================================================================*/}
  const handleEducationChange = (index, e) => { 
    const { name, value } = e.target; 
    const nuevaEducacion = [...formData.educacion]; 
    nuevaEducacion[index][name] = value; 
    setFormData({ ...formData, educacion: nuevaEducacion });
  };

  const handleAddEducation = () => { 
    setFormData({ ...formData, educacion: [ ...formData.educacion, { titulo: '', institucion: '', graduacion: '' } ] 
    }); 
  };

  const handleRemoveEducation = (index) => { 
    const nuevaEducacion = [...formData.educacion]; 
    nuevaEducacion.splice(index, 1); 
    setFormData({ ...formData, educacion: nuevaEducacion }); 
  };

   {/*============================================================================
        Manejo dinámico de listas de experiencia laboral.
      ==========================================================================*/}
  const handleExperienceChange = (index, e) => { 
    const { name, value } = e.target; 
    const nuevasExperiencias = [...formData.experiencias]; 
    nuevasExperiencias[index][name] = value; 
    setFormData({ ...formData, experiencias: nuevasExperiencias }); 
  };

  const handleAddExperience = () => { 
    setFormData({ ...formData, experiencias: [ ...formData.experiencias, { empleador: '', cargo: '', fechas: '', descripcion: '' } ] }); 
  };

  const handleRemoveExperience = (index) => { 
    const nuevasExperiencias = [...formData.experiencias]; 
    nuevasExperiencias.splice(index, 1); 
    setFormData({ ...formData, experiencias: nuevasExperiencias }); 
  };

    {/*============================================================================
        Validación del formulario antes de enviar.
      ==========================================================================*/}
  const validate = () => { 
    const newErrors = { educacion: [], experiencias: [] }; 
    let isValid = true; 
    const nombreTrimmed = formData.nombreCompleto.trim(); 
    if (!nombreTrimmed) { 
      newErrors.nombreCompleto = 'El nombre completo es obligatorio.'; 
      isValid = false; 
    } else if (nombreTrimmed.length < 3) { 
      newErrors.nombreCompleto = 'El nombre debe tener al menos 3 caracteres.'; 
      isValid = false; 
    } else if (/\d/.test(nombreTrimmed)) { 
      newErrors.nombreCompleto = 'El nombre no puede contener números.'; 
      isValid = false; 
    } if (!formData.email.trim()) { 
      newErrors.email = 'El correo electrónico es obligatorio.'; 
      isValid = false; 
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) { 
      newErrors.email = 'El formato del correo no es válido.'; 
      isValid = false; 
    } 
     {/*============================================================================
        Validación del campo de teléfono 
        Solo se valida si se ha ingresado un valor.
        El formato debe ser numérico y puede incluir +, -, espacios o paréntesis.
        Mínimo 7 dígitos para considerar un número válido.
        ==========================================================================*/}
    const telefonoTrimmed = formData.telefono.trim(); 
    if (telefonoTrimmed && !/^[0-9+\-() ]{7,}$/.test(telefonoTrimmed)) { 
      newErrors.telefono = 'Debe ser un número de teléfono válido de al menos 7 dígitos.'; 
      isValid = false; 
    } 
      {/*============================================================================
        Validación de listas de educación y experiencia laboral.
        Cada entrada debe tener los campos obligatorios completos.
        ==========================================================================*/}
    formData.educacion.forEach((edu, index) => { 
      const eduErrors = {}; 
      if (!edu.titulo.trim()) { 
        eduErrors.titulo = 'El título es obligatorio.'; 
        isValid = false; 
      } if (!edu.institucion.trim()) { 
        eduErrors.institucion = 'La institución es obligatoria.'; 
        isValid = false; 
      } if (!edu.graduacion) { 
        eduErrors.graduacion = 'El año es obligatorio.'; 
        isValid = false; 
      } else if (edu.graduacion < 1950 || edu.graduacion > new Date().getFullYear() + 5) {
        eduErrors.graduacion = 'Por favor, introduce un año válido.'; 
        isValid = false; 
      } if (Object.keys(eduErrors).length > 0) { 
        newErrors.educacion[index] = eduErrors; 
      } 
    }); 

    formData.experiencias.forEach((exp, index) => {
      const expErrors = {}; 
      if (!exp.empleador.trim()) { 
        expErrors.empleador = 'El empleador es obligatorio.'; 
        isValid = false; 
      } if (!exp.cargo.trim()) { 
        expErrors.cargo = 'El cargo es obligatorio.'; 
        isValid = false; 
      } if (!exp.fechas.trim()) { 
        expErrors.fechas = 'Las fechas son obligatorias.'; 
        isValid = false; 
      } if (!exp.descripcion.trim()) { 
        expErrors.descripcion = 'La descripción es obligatoria.'; 
        isValid = false; 
      } if (Object.keys(expErrors).length > 0) { 
        newErrors.experiencias[index] = expErrors; 
      } 
    }); 

    setErrors(newErrors); 
    return isValid; 
  };

    {/*============================================================================
        Manejo del envío del formulario.
        Valida los datos y llama a la función para actualizar el currículo.
        Redirige a la página de detalle del currículo actualizado.
      ==========================================================================*/}
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const emailEstandarizado = formData.email.trim().toLowerCase();
      const cvActualizado = { ...formData, email: emailEstandarizado };
      onUpdateCurriculum(cvActualizado);
      alert('¡Currículo actualizado con éxito!');
      navigate(`/curriculum/${id}`);
    }
  };
  
   {/*============================================================================
        Manejo de la cancelación de la edición.
        Redirige a la página de detalle del currículo sin guardar cambios.
      ==========================================================================*/}
  const handleCancel = () => {
    navigate(`/curriculum/${id}`);
  };

  return (
    /*============================================================================
       Renderizado del formulario de currículo.
      ==========================================================================*/
    <div className="app-container">
      <CurriculumForm
        formData={formData}
        errors={errors}
        fileInputRef={fileInputRef}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleFileChange={handleFileChange}
        handleRemovePhoto={handleRemovePhoto}
        handleEducationChange={handleEducationChange}
        handleAddEducation={handleAddEducation}
        handleRemoveEducation={handleRemoveEducation}
        handleExperienceChange={handleExperienceChange}
        handleAddExperience={handleAddExperience}
        handleRemoveExperience={handleRemoveExperience}
        isEditing={true}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default EditPage;