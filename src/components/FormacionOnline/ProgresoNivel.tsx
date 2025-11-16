import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Examen from './Examen';
import './NivelVisual.css';

interface NivelVisualProps {
  nivel: number;
  onCompletarNivel: (aprobado: boolean) => void;
}

interface Pregunta {
  tipo: 'multiple' | 'completar' | 'verdaderoFalso';
  pregunta: string;
  opciones?: string[];
  respuestaCorrecta: string;
}

interface ContenidoNivel {
  videoUrl: string;
  pdfs: { nombre: string; url: string }[];
  imagenUrl: string;
  examen: Pregunta[];
}

const contenidoNiveles: ContenidoNivel[] = [
  // ... (contenido anterior sin cambios)
];

const NivelVisual: React.FC<NivelVisualProps> = ({ nivel, onCompletarNivel }) => {
  const [contenidoVisto, setContenidoVisto] = useState(false);
  const [examenCompletado, setExamenCompletado] = useState(false);
  const nivelData = contenidoNiveles[nivel - 1];

  const manejarCompletarNivel = () => {
    setContenidoVisto(true);
  };

  const manejarCompletarExamen = (aprobado: boolean) => {
    setExamenCompletado(true);
    onCompletarNivel(aprobado);
  };

  if (!nivelData) {
    return <div>Error: Nivel {nivel} no encontrado.</div>;
  }

  return (
    <div className="nivel-visual-container">
      <div className="lado-izquierdo">
        <div className="circulo-nivel">
          <h2>Nivel {nivel}</h2>
        </div>
        {contenidoVisto && <p className="mensaje-completado">✅ Nivel completado</p>}
        {examenCompletado && <p className="mensaje-completado">🎉 Examen aprobado</p>}
      </div>

      <motion.div
        className="lado-derecho"
        initial={{ opacity: 0, x: 100, filter: "blur(10px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        {!contenidoVisto ? (
          <div className="contenido-multimedia">
            <div className="video-nivel">
              <h3>Video del Nivel</h3>
              <iframe
                src={nivelData.videoUrl}
                title={`Video Nivel ${nivel}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="video-iframe"
              ></iframe>
            </div>

            <div className="documentos-nivel">
              <h3>Documentos PDF</h3>
              <ul>
                {nivelData.pdfs.map((pdf, index) => (
                  <li key={index}>
                    <a href={pdf.url} target="_blank" rel="noopener noreferrer">
                      {pdf.nombre}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="imagen-nivel">
              <h3>Imagen Ilustrativa</h3>
              <img src={nivelData.imagenUrl} alt={`Nivel ${nivel}`} />
            </div>

            <button className="btn-completar" onClick={manejarCompletarNivel}>
              He completado este nivel
            </button>
          </div>
        ) : !examenCompletado ? (
          <div className="examen-section">
            <h3>Examen del Nivel {nivel}</h3>
            <Examen preguntas={nivelData.examen as Pregunta[]} onCompletarExamen={manejarCompletarExamen} />
          </div>
        ) : (
          <div className="completado-section">
            <h3>¡Felicidades!</h3>
            <p>Has completado el Nivel {nivel} y su examen.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default NivelVisual;