import React from 'react';
import './ProgresoGeneral.css';

interface ProgresoGeneralProps {
  nivelesCompletados: number[];
  totalNiveles: number;
  className?: string; // Añadimos className como prop opcional
}

const ProgresoGeneral: React.FC<ProgresoGeneralProps> = ({ nivelesCompletados, totalNiveles, className }) => {
  const porcentajeCompletado = (nivelesCompletados.length / totalNiveles) * 100;

  return (
    <div className={`progreso-general ${className || ''}`}>
      <h3>Progreso General</h3>
      <div className="barra-progreso">
        <div
          className="progreso-llenado"
          style={{ width: `${porcentajeCompletado}%` }}
        ></div>
      </div>
      <p>{`Niveles completados: ${nivelesCompletados.length} de ${totalNiveles}`}</p>
    </div>
  );
};

export default ProgresoGeneral;