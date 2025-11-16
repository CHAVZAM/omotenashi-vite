import React from 'react';
import './Certificado.css';

interface CertificadoProps {
  isVisible: boolean;
}

const Certificado: React.FC<CertificadoProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="certificate-container">
      <button className="download-certificate">Descargar Certificado (PDF)</button>
    </div>
  );
};

export default Certificado;