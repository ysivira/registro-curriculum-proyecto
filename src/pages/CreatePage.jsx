 {/*============================================================================
      CreatePage.jsx
      Página para crear un nuevo currículo.
      Recibe la función onAddCurriculum como prop para agregar el currículo al estado principal.
      Maneja la validación del formulario y la navegación después de guardar.
    =============================================================================*/}
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CurriculumForm from '../components/CurriculumForm';

 {/*============================================================================
      Estado inicial del formulario.
    ==========================================================================*/}
const initialFormState = {
  nombreCompleto: '',
  email: '',
  telefono: '',
  foto: null,
  educacion: [{ titulo: '', institucion: '', graduacion: '' }],
  experiencias: [{ empleador: '', cargo: '', fechas: '', descripcion: '' }]
};

 {/*============================================================================
      Componente CreatePage
      Maneja la creación de un nuevo currículo.
    ==========================================================================*/}
function CreatePage({ onAddCurriculum }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

   {/*============================================================================
      Función para manejar cambios en los campos del formulario.
      ==========================================================================*/}
  const handleChange = (e) => { 
    const { name, value } = e.target; 
    setFormData({ ...formData, [name]: value }); 
  };

   {/*============================================================================
      Función para manejar la carga de la foto.
      ==========================================================================*/}
  const handleFileChange = (e) => { 
    const file = e.target.files[0]; 
    if (file) { 
      const reader = new FileReader(); 
      reader.onloadend = () => { 
        setFormData(prevData => ({
          ...prevData, 
          foto: reader.result 
        }));
      }; 
      reader.readAsDataURL(file); 
    } 
  };

    {/*============================================================================
      Función para eliminar la foto cargada.
      ==========================================================================*/}
  const handleRemovePhoto = () => { 
    setFormData(prevData => ({ 
      ...prevData, foto: null 
    })); 
    if (fileInputRef.current) { 
      fileInputRef.current.value = null; 
    } 
  };

    {/*============================================================================
      Funciones para manejar cambios en educación y experiencia laboral.
      ==========================================================================*/}
  const handleEducationChange = (index, e) => { 
    const { name, value } = e.target; 
    const nuevaEducacion = [...formData.educacion]; 
    nuevaEducacion[index][name] = value; 
    setFormData({ ...formData, educacion: nuevaEducacion }); 
  };

   {/*============================================================================
      Función para agregar una nueva entrada de educación.
      ==========================================================================*/}
  const handleAddEducation = () => { 
    setFormData({ ...formData, educacion: [ ...formData.educacion, { titulo: '', institucion: '', graduacion: '' } ] }); 
  };

    {/*============================================================================
      Función para eliminar una entrada de educación.
      ==========================================================================*/}
  const handleRemoveEducation = (index) => { 
    const nuevaEducacion = [...formData.educacion]; 
    nuevaEducacion.splice(index, 1); 
    setFormData({ ...formData, educacion: nuevaEducacion }); 
  };

    {/*============================================================================
      Función para manejar cambios en experiencia laboral.
      ==========================================================================*/}
  const handleExperienceChange = (index, e) => { 
    const { name, value } = e.target; 
    const nuevasExperiencias = [...formData.experiencias]; 
    nuevasExperiencias[index][name] = value; 
    setFormData({ ...formData, experiencias: nuevasExperiencias }); 
  };

    {/*============================================================================
      Función para agregar una nueva experiencia laboral.
      ==========================================================================*/}
  const handleAddExperience = () => { 
    setFormData({ ...formData, experiencias: [ ...formData.experiencias, { empleador: '', cargo: '', fechas: '', descripcion: '' } ] }); 
  };

   {/*============================================================================
      Función para eliminar una experiencia laboral.
      ==========================================================================*/}
  const handleRemoveExperience = (index) => { 
    const nuevasExperiencias = [...formData.experiencias]; 
    nuevasExperiencias.splice(index, 1); 
    setFormData({ ...formData, experiencias: nuevasExperiencias }); 
  };

   {/*============================================================================
      Función de validación del formulario.
      ==========================================================================*/}
  const validate = () => { 
    const newErrors = { educacion: [], experiencias: [] }; 
    let isValid = true; 
      {/*============================================================================
        Validación del nombre completo, correo electrónico 
        ==========================================================================*/}
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
        Validación del número de teléfono.
        ==========================================================================*/}
    const telefonoTrimmed = formData.telefono.trim(); 
    if (telefonoTrimmed && !/^[0-9+\-() ]{7,}$/.test(telefonoTrimmed)) { 
      newErrors.telefono = 'Debe ser un número de teléfono válido de al menos 7 dígitos.'; 
      isValid = false; 
    } 
     {/*============================================================================
        Validación de cada entrada en educación y experiencia laboral.
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
      {/*============================================================================
        Validación de cada entrada en experiencia laboral.
        ==========================================================================*/}
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
      Función para manejar el envío del formulario.
      Valida los datos, agrega el nuevo currículo y navega de regreso a la página principal.
      También limpia el formulario después de enviar.
     ==========================================================================*/}
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const emailEstandarizado = formData.email.trim().toLowerCase();
      const nuevoCurriculo = { ...formData, email: emailEstandarizado, id: Date.now() };
      onAddCurriculum(nuevoCurriculo);
      alert('¡Currículo registrado con éxito!');
      
      // limpiear el formulario después de enviar
      setFormData(initialFormState);
      setErrors({});
      
      navigate('/');
    }
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
        isEditing={false}
      />
    </div>
  );
}

export default CreatePage;