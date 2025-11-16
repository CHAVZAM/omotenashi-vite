// src/components/FormacionOnline/Examen.tsx

import React, { useState } from 'react';
import './Examen.css';

interface Pregunta {
  tipo: 'multiple' | 'completar' | 'verdaderoFalso';
  pregunta: string;
  opciones?: string[];
  respuestaCorrecta: string;
}

interface ExamenProps {
  preguntas: Pregunta[];
  onCompletarExamen: (aprobado: boolean) => void;
}

// Umbral de aprobación: 80% es el estándar. Si quieres 100%, cámbialo a 100.
const UMBRAL_APROBACION = 80; 

const Examen: React.FC<ExamenProps> = ({ preguntas, onCompletarExamen }) => {
  // Inicializamos respuestas con las respuestas de tipo 'completar' para facilitar el cálculo
  const initialRespuestas = preguntas.reduce((acc, pregunta, index) => {
      if (pregunta.tipo === 'completar') {
          // Inicializa el campo 'completar' a vacío
          acc[index] = ''; 
      }
      return acc;
  }, {} as { [key: number]: string });
    
  const [respuestas, setRespuestas] = useState<{ [key: number]: string }>(initialRespuestas);

  // NOTA: handleRespuestaAleatoria no es recomendable usar en un examen real, ya que puede dar respuestas incorrectas.
  // Lo dejo aquí por si lo usas para debug, pero se desaconseja para el usuario final.
  const handleRespuestaAleatoria = () => {
    const nuevasRespuestas: { [key: number]: string } = {};
    preguntas.forEach((pregunta, index) => {
      if (pregunta.tipo === 'multiple' && pregunta.opciones) {
        const opcionAleatoria = pregunta.opciones[Math.floor(Math.random() * pregunta.opciones.length)];
        nuevasRespuestas[index] = opcionAleatoria;
      } else if (pregunta.tipo === 'verdaderoFalso') {
        nuevasRespuestas[index] = Math.random() > 0.5 ? 'Verdadero' : 'Falso';
      } else if (pregunta.tipo === 'completar') {
        // En este caso aleatorio, usamos la respuesta correcta para asegurar que la prueba pase.
        nuevasRespuestas[index] = pregunta.respuestaCorrecta; 
      }
    });
    setRespuestas(nuevasRespuestas);
  };

  const calcularPorcentaje = () => {
    let correctas = 0;
    preguntas.forEach((pregunta, index) => {
      let respuestaUsuario = (respuestas[index] || '').trim().toLowerCase();
      let respuestaCorrecta = pregunta.respuestaCorrecta.trim().toLowerCase();

      // **CORRECCIÓN LÓGICA:** Compara las respuestas sin importar mayúsculas/minúsculas
      if (respuestaUsuario === respuestaCorrecta) { 
          correctas++;
      }
    });
    const porcentaje = (correctas / preguntas.length) * 100;
    return porcentaje;
  };

  const manejarEnviar = () => {
    // 1. Verificar si todas las preguntas fueron respondidas
    const totalRespondidas = Object.keys(respuestas).length;
    if (totalRespondidas < preguntas.length) {
        alert("Por favor, responde todas las preguntas antes de enviar.");
        return;
    }
    
    // 2. Calcular el score
    const porcentaje = calcularPorcentaje();
    alert(`Resultado: ${porcentaje.toFixed(0)}%`);
    
    // 3. Aplicar el umbral
    const aprobado = porcentaje >= UMBRAL_APROBACION; // CORRECCIÓN: Usa el umbral del 80% o el que desees
    
    onCompletarExamen(aprobado);
  };

  return (
    <div className="examen-container">
      {/* Botón para llenado aleatorio (solo para debug) */}
      {import.meta.env.MODE === 'development' && (
  <button onClick={handleRespuestaAleatoria}>Llenar al Azar (DEBUG)</button>
)}
      {preguntas.map((pregunta, index) => (
        <div key={index} className="examen__pregunta">
          <p>
              <span className="examen__numero-pregunta">{index + 1}.</span> 
              {pregunta.pregunta}
          </p>
          {/* Formulario de Preguntas (input, select, etc.) */}
          {pregunta.tipo === 'multiple' && pregunta.opciones && (
            <select
              value={respuestas[index] || ''}
              onChange={(e) => setRespuestas({ ...respuestas, [index]: e.target.value })}
            >
              <option value="">Selecciona...</option>
              {pregunta.opciones.map((opcion, i) => (
                <option key={i} value={opcion}>{opcion}</option>
              ))}
            </select>
          )}
          {pregunta.tipo === 'verdaderoFalso' && (
            <select
              value={respuestas[index] || ''}
              onChange={(e) => setRespuestas({ ...respuestas, [index]: e.target.value })}
            >
              <option value="">Selecciona...</option>
              <option value="Verdadero">Verdadero</option>
              <option value="Falso">Falso</option>
            </select>
          )}
          {pregunta.tipo === 'completar' && (
            <input
              type="text"
              value={respuestas[index] || ''}
              onChange={(e) => setRespuestas({ ...respuestas, [index]: e.target.value })}
              placeholder="Escribe la respuesta..."
            />
          )}
        </div>
      ))}
      <button onClick={manejarEnviar} className="btn-enviar-examen">Enviar Respuestas</button>
      
      {/* Mensaje de Debugging/Umbral */}
      <p style={{marginTop: '20px', fontSize: '0.9em'}}>Umbral de Aprobación Requerido: {UMBRAL_APROBACION}%</p>
    </div>
  );
};

export default Examen;