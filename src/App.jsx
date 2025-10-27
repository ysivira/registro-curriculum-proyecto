{/*============================================================================
    Archivo: src/App.jsx
    Descripción: Componente principal de la aplicación.
    Maneja el estado global de los currículos y las rutas de navegación.
    Incluye funciones para agregar, actualizar y eliminar currículos.
  ==========================================================================*/}

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';
import DetailPage from './pages/DetailPage';

 {/*============================================================================
      Función principal del componente App.
      Maneja el estado de la lista de currículos.
      Incluye funciones para agregar, actualizar y eliminar currículos.
      Configura las rutas de la aplicación.
    ==========================================================================*/}
function App() {
  const [curriculos, setCurriculos] = useState([]);

    {/*============================================================================
        Cargamos los currículos guardados en localStorage al montar el componente.
        ==========================================================================*/}
  useEffect(() => {
    const curriculosAlmacenados = localStorage.getItem('curriculosGuardados');
    if (curriculosAlmacenados) {
      setCurriculos(JSON.parse(curriculosAlmacenados));
    }
  }, []);

    {/*============================================================================
        Función para agregar un nuevo currículo.
        Recibe el nuevo currículo como parámetro.
        Actualiza el estado y el almacenamiento local.
      ==========================================================================*/}
  const handleAddCurriculum = (nuevoCurriculo) => {
    const curriculosActualizados = [...curriculos, nuevoCurriculo];
    setCurriculos(curriculosActualizados);
    localStorage.setItem('curriculosGuardados', JSON.stringify(curriculosActualizados));
  };
  
    {/*============================================================================
        Función para eliminar un currículo por su ID.
        Recibe el ID del currículo a eliminar como parámetro.
        Filtra la lista para excluir el currículo con el ID dado.
        Actualiza el estado y el almacenamiento local.
      ==========================================================================*/}
  const handleDeleteCurriculum = (idAEliminar) => {
    const curriculosActualizados = curriculos.filter(cv => cv.id !== idAEliminar);
    setCurriculos(curriculosActualizados);
    localStorage.setItem('curriculosGuardados', JSON.stringify(curriculosActualizados));
  };

  {/*============================================================================
        Función para actualizar un currículo existente.
        Recibe el currículo actualizado como parámetro.
        Busca el currículo por ID y lo reemplaza en la lista.
        Actualiza el estado y el almacenamiento local.
      ==========================================================================*/}
  const handleUpdateCurriculum = (cvActualizado) => {
    // Usamos .map para crear una nueva lista
    const curriculosActualizados = curriculos.map(cv => {
      // Si el ID del CV de la lista coincide con el ID del CV que editamos...
      if (cv.id === cvActualizado.id) {
        // ...devolvemos el CV con los datos nuevos.
        return cvActualizado;
      }
      // Si no coincide, devolvemos el CV original sin cambios.
      return cv;
    });

     {/*============================================================================
        Actualizamos el estado y el almacenamiento local con la lista modificada.
        ==========================================================================*/}
    setCurriculos(curriculosActualizados);
    localStorage.setItem('curriculosGuardados', JSON.stringify(curriculosActualizados));
  };

  return (
     /*============================================================================
        Configuración del enrutamiento de la aplicación.
        Incluye el encabezado, el pie de página y las rutas para cada página.
      ==========================================================================*/
    <BrowserRouter>
      {/*============================================================================
        Renderizado del contenido principal con las rutas definidas.
        Cada ruta carga el componente correspondiente y le pasa las props necesarias.
        ==========================================================================*/}
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage curriculos={curriculos} onDelete={handleDeleteCurriculum} />}/>
          <Route path="/crear" element={<CreatePage onAddCurriculum={handleAddCurriculum} />}/>
          <Route path="/curriculum/:id" element={<DetailPage curriculos={curriculos} />}/>
          <Route path="/curriculum/:id/editar" element={<EditPage curriculos={curriculos} onUpdateCurriculum={handleUpdateCurriculum} />}/>
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;