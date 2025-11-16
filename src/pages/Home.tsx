import React, { useState, useRef, useEffect } from "react";
import "./Home.css";
import SocialMedia from "../components/FormacionOnline/SocialMedia"; // Asegúrate de que la ruta sea correcta
import SiteStats from "../components/SiteStats/SiteStats"; // ¡Importa el nuevo componente!

interface Chapter {
  image: string;
  title: string;
  description: string;
}

const chapters: Chapter[] = [
  {
    image: "portada.png",
    title: "Portada de Omotenashi",
    description:
      "Bienvenidos a Omotenashi, un viaje al corazón de la hospitalidad japonesa.",
  },
  {
    image: "cap 1.png",
    title: "Introducción al Omotenashi",
    description:
      "Conoce su origen, historia y significado, un viaje al corazón de la hospitalidad y su esencia.",
  },
  {
    image: "cap 2.png",
    title: "Los Pilares del Omotenashi",
    description: "Sus principios, bases fundamentales y su relevancia.",
  },
  {
    image: "cap 3.png",
    title: "Casos de éxito Omotenashi en la Práctica",
    description:
      "Cómo llega a mi vida y a compañías que han hecho del Omotenashi parte fundamental de su éxito.",
  },
  {
    image: "cap 4.png",
    title: "Omotenashi en Acción y su Alcance",
    description:
      "Conoce más de su aplicación, la transformación del servicio y sus beneficios universales.",
  },
  {
    image: "cap 5.png",
    title: "Modernidad y Omotenashi",
    description:
      "El servicio al cliente, su revolución y renovación. Las nuevas tecnologías y el manejo de la información.",
  },
  {
    image: "cap 6.png",
    title: "Las 3 'C': Capacitación, Compromiso, Comunicación",
    description:
      "Implementación del Omotenashi para fortalecer, empoderar y motivar a tu equipo de trabajo.",
  },
  {
    image: "cap 7.png",
    title: "Superando Obstáculos",
    description:
      "Conoce una serie de estrategias para superar barreras, promoviendo un ambiente de servicio superior.",
  },
  {
    image: "cap 8.png",
    title: "Calidad, Marketing & Servicio",
    description:
      "Su relevancia, información técnica, exhibición, métricas y parámetros creados y sugeridos.",
  },
  {
    image: "cap 9.png",
    title: "Mi Primer Modelo de Omotenashi",
    description:
      "Decisiones, circunstancias y elementos desde mi propia experiencia.",
  },
  {
    image: "cap 10.png",
    title: "Prevención, Predicción y Rentabilidad",
    description:
      "Mantenimiento Integral Omotenashi (MPO): un análisis de sus beneficios y aplicación.",
  },
  {
    image: "cap 11.png",
    title: "Trascender",
    description:
      "Ética, innovación y servicio en la visión de nuevas estrategias, el CSO y experiencias que trascienden más allá.",
  },
];

const Home: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [currentAngle, setCurrentAngle] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const rotate = () => {
      if (activeIndex === null) {
        setCurrentAngle((prevAngle) => (prevAngle + 0.09) % 360);
      }
      animationRef.current = requestAnimationFrame(rotate);
    };
    animationRef.current = requestAnimationFrame(rotate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [activeIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setActiveIndex((prev) => {
          const newIndex = prev === null ? 0 : (prev + 1) % chapters.length;
          const centeredAngle = -(360 / chapters.length) * newIndex;
          setCurrentAngle(centeredAngle);
          return newIndex;
        });
      } else if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => {
          const newIndex = prev === null ? 0 : (prev - 1 + chapters.length) % chapters.length;
          const centeredAngle = -(360 / chapters.length) * newIndex;
          setCurrentAngle(centeredAngle);
          return newIndex;
        });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleChapterClick = (index: number) => {
    if (index === activeIndex) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
      const centeredAngle = -(360 / chapters.length) * index;
      setCurrentAngle(centeredAngle);
    }
  };

  const handleResetRotation = () => {
    setActiveIndex(null);
  };

  return (
    <div className="page-container">
      <section id="home" className="seccion-desplegable">
        <div className="section-header">
          <h2 className="section-title">Conoce Nuestro Libro Omotenashi</h2>
          <p className="section-description">
            Explora el camino del servicio al cliente excepcional basado en esta
            filosofía japonesa.
          </p>
        </div>
        <div className="carousel-wrapper">
          <div
            className="carousel"
            ref={carouselRef}
            style={{
              transform: `rotateY(${currentAngle}deg)`,
            }}
            role="region"
            aria-label="Carrusel de capítulos"
          >
            {chapters.map((chapter, index) => {
              const angle = (360 / chapters.length) * index;
              const isActive = activeIndex === index;
              return (
                <div
                  key={index}
                  className={`carousel-item ${isActive ? "active" : ""}`}
                  onClick={() => handleChapterClick(index)}
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(350px)`,
                    zIndex: isActive ? 20 : 1,
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Ver ${chapter.title}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleChapterClick(index);
                    }
                  }}
                >
                  <img src={`/images/${chapter.image}`} alt={chapter.title} />
                </div>
              );
            })}
          </div>

          {activeIndex !== null && (
            <div className="chapter-info" key={activeIndex}>
              <h3>{chapters[activeIndex].title}</h3>
              <p>{chapters[activeIndex].description}</p>
              <button className="reset-button" onClick={handleResetRotation}>
                Reanudar Rotación
              </button>
            </div>
          )}
        </div>
      </section>

      <div className="watermark"></div>

      {/* --- NUEVA SECCIÓN DE CONTADORES --- */}
      <SiteStats
        initialHomePageVisits={1000} // Puedes definir un valor inicial para mostrar popularidad
        initialCertificates={500}
        initialCalculaOmotenashiInteractions={250}
      />
      {/* --------------------------------- */}

      <SocialMedia /> {/* Renderizar el componente reutilizable */}

      <footer className="footer">
        <p className="section-description">© 2025 Omotenashi. Todos los derechos reservados.</p>
        <div className="footer__links">
          <a href="/privacy" className="footer__link">
            Política de Privacidad
          </a>
          <span>|</span>
          <a href="/terms" className="footer__link">
            Términos de Servicio
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;