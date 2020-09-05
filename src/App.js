import React, { useState, useEffect } from 'react';
import { Formulario } from './components/Formulario';
import { Cita } from './components/Cita';

// arreglos citas
function App() {
  //Citas en local storage

  let citasIniciales = JSON.parse(localStorage.getItem('citas'));

  if (!citasIniciales) {
    citasIniciales = [];
  }

  // Arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  // Use Effect para realizar ciertas operaciones cunado el state cambia

  useEffect(() => {
    if (citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas, citasIniciales]);

  // Función que toma citas actuales y agregue la nueva
  const crearCita = cita => {
    guardarCitas([...citas, cita]);
  };

  // Función que elimina la cita

  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  };

  //Mensaje condicional

  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';

  return (
    <>
      <h1>Administrador de Pecientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita => (
              <Cita
                key={cita.id}
                cita={cita}
                eliminarCita={() => eliminarCita(cita.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
