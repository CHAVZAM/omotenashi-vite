import React, { useState } from 'react';

// Definimos una interfaz para la estructura de cada material
interface Material {
  nombre: string;
  url: string;
}

// Actualizamos las props para que el componente reciba los datos del nivel,
// incluyendo un array de materiales.
interface NivelProps {
  nivel: number;
  videoUrl: string;
  imageUrl: string;
  materiales: Material[]; // En lugar de PDFs fijos, ahora recibe una lista de materiales
  onCompletarContenido: () => void;
}

// Para solucionar el error del archivo CSS faltante, integramos los estilos directamente
// en el componente usando objetos de estilo de JavaScript.
const styles = {
  nivelContainer: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    padding: '24px',
    margin: '20px auto',
    maxWidth: '900px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    backgroundColor: '#ffffff',
  },
  h2: {
    color: '#333',
    borderBottom: '2px solid #f0f0f0',
    paddingBottom: '10px',
    marginBottom: '20px',
  },
  h3: {
    color: '#555',
    marginBottom: '10px',
  },
  contenidoMultimedia: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
    marginTop: '20px',
  },
  mediaBlock: {
    padding: '15px',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  video: {
    width: '100%',
    borderRadius: '8px',
  },
  img: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
  },
  materialesList: {
    listStyle: 'none',
    padding: 0,
  },
  materialesListItem: {
    marginBottom: '8px',
  },
  materialLink: {
    color: '#007bff',
    textDecoration: 'none',
  },
  btnCompletar: {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '24px',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  },
  contenidoCompletado: {
    color: '#28a745',
    fontWeight: 'bold',
    marginTop: '24px',
    backgroundColor: '#e9f7eb',
    padding: '12px',
    borderRadius: '8px',
  },
};


const Nivel: React.FC<NivelProps> = ({ nivel, videoUrl, imageUrl, materiales = [], onCompletarContenido }) => {
  const [contenidoVisto, setContenidoVisto] = useState(false);

  const manejarCompletarContenido = () => {
    setContenidoVisto(true);
    onCompletarContenido();
  };

  return (
    <div style={styles.nivelContainer}>
      <h2 style={styles.h2}>Contenido del Nivel {nivel}</h2>

      <div style={styles.contenidoMultimedia}>
        <div style={styles.mediaBlock}>
          <h3 style={styles.h3}>Video del Nivel</h3>
          <video controls style={styles.video}>
            <source src={videoUrl} type="video/mp4" />
            Tu navegador no soporta videos HTML5.
          </video>
        </div>

        <div style={styles.mediaBlock}>
          <h3 style={styles.h3}>Materiales de Apoyo</h3>
          {materiales.length > 0 ? (
            <ul style={styles.materialesList}>
              {materiales.map((material, index) => (
                <li key={index} style={styles.materialesListItem}>
                  <a href={material.url} target="_blank" rel="noopener noreferrer" style={styles.materialLink}>
                    {material.nombre}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay materiales de apoyo para este nivel.</p>
          )}
        </div>

        <div style={styles.mediaBlock}>
          <h3 style={styles.h3}>Imagen Ilustrativa</h3>
          <img src={imageUrl} alt={`Nivel ${nivel}`} style={styles.img} />
        </div>
      </div>

      {!contenidoVisto ? (
        <button
          style={styles.btnCompletar}
          onClick={manejarCompletarContenido}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#218838')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#28a745')}
        >
          He revisado todo el contenido
        </button>
      ) : (
        <p style={styles.contenidoCompletado}>✅ Contenido marcado como completado. Puedes acceder al examen.</p>
      )}
    </div>
  );
};

export default Nivel;

