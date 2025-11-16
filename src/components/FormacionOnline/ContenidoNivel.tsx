import React, { useState } from "react";
import { motion } from "framer-motion";
import Examen from "./Examen";
import InfografiaNivel from "./InfografiaNivel";
import "./ContenidoNivel.css";

interface ContenidoNivelProps {
  nivel: number;
  onCompletarNivel: (aprobado: boolean) => void;
  className?: string;
}

interface Pregunta {
  tipo: "multiple" | "completar" | "verdaderoFalso";
  pregunta: string;
  opciones?: string[];
  respuestaCorrecta: string;
}

interface NivelData {
  videoUrl: string;
  imagenUrl: string;
  examen: Pregunta[];
}

const contenidoNiveles: NivelData[] = [
  {
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    imagenUrl: "/images/omotenashi-intro.jpg",
    examen: [
      {
        tipo: "verdaderoFalso",
        pregunta: "El Omotenashi es una filosofía exclusivamente japonesa.",
        respuestaCorrecta: "Falso",
      },
      {
        tipo: "verdaderoFalso",
        pregunta: 'El término "Samurái" significa "el que sirve".',
        respuestaCorrecta: "Verdadero",
      },
      {
        tipo: "verdaderoFalso",
        pregunta:
          "Los Ryokan surgieron en la era Heian sin influencia del Budismo.",
        respuestaCorrecta: "Falso",
      },
      {
        tipo: "verdaderoFalso",
        pregunta:
          "El Ukiyo-e refleja la hospitalidad a través de sus grabados.",
        respuestaCorrecta: "Verdadero",
      },
      {
        tipo: "completar",
        pregunta: "El código de honor de los Samuráis se conoce como ________.",
        respuestaCorrecta: "Bushido",
      },
      {
        tipo: "completar",
        pregunta:
          "Los Ryokan son considerados un símbolo de ________ y tradición en Japón.",
        respuestaCorrecta: "hospitalidad",
      },
      {
        tipo: "completar",
        pregunta:
          "El arte del ________ celebra la vida y la belleza en el Japón antiguo.",
        respuestaCorrecta: "Ukiyo-e",
      },
      {
        tipo: "multiple",
        pregunta: "¿Cuál de estas virtudes es parte del Bushido?",
        opciones: ["Justicia (Gi)", "Envidia", "Codicia", "Apatía"],
        respuestaCorrecta: "Justicia (Gi)",
      },
      {
        tipo: "multiple",
        pregunta: "¿Qué período marcó el inicio de los Ryokan?",
        opciones: ["Kamakura", "Nara", "Muromachi", "Heian"],
        respuestaCorrecta: "Nara",
      },
      {
        tipo: "multiple",
        pregunta: "¿Qué principio es la esencia del Omotenashi?",
        opciones: [
          "Anticipación",
          "No-Reciprocidad",
          "Exceder Expectativas",
          "Todas las anteriores",
        ],
        respuestaCorrecta: "Todas las anteriores",
      },
    ],
  },
  {
    videoUrl: "https://www.youtube.com/embed/3tGwnL_4o7g",
    imagenUrl: "/images/omotenashi-servicio.jpg",
    examen: [
      {
        tipo: "verdaderoFalso",
        pregunta:
          "El pilar de la Anticipación implica únicamente responder a requerimientos básicos del cliente.",
        respuestaCorrecta: "Falso",
      },
      {
        tipo: "completar",
        pregunta:
          "El pilar que requiere descubrir y responder a necesidades no expresadas se conoce como ________.",
        respuestaCorrecta: "Anticipación",
      },
      {
        tipo: "multiple",
        pregunta:
          "En el pilar de la Reciprocidad, el intercambio enriquecedor se basa en:",
        opciones: [
          "Solo el costo del servicio",
          "El respeto y la apreciación mutua",
          "Un modelo de negocios rígido",
          "Una transacción sin diálogo",
        ],
        respuestaCorrecta: "El respeto y la apreciación mutua",
      },
      {
        tipo: "verdaderoFalso",
        pregunta:
          "La innovación en Omotenashi requiere abandonar todos los principios tradicionales para adaptarse a la tecnología.",
        respuestaCorrecta: "Falso",
      },
      {
        tipo: "completar",
        pregunta:
          "En la cultura japonesa, el número ________ (十) simboliza la perfección y plenitud de la estructura Omotenashi.",
        respuestaCorrecta: "diez",
      },
      {
        tipo: "multiple",
        pregunta:
          "El pilar de la Paciencia fortalece la conexión emocional al incluir:",
        opciones: [
          "A) Manejo de situaciones desafiantes con serenidad",
          "B) Comunicación clara basada en el respeto",
          "C) Persistencia y Resiliencia ante obstáculos",
          "D) Todas las anteriores",
        ],
        respuestaCorrecta: "D) Todas las anteriores",
      },
      {
        tipo: "verdaderoFalso",
        pregunta:
          "La superación en Omotenashi requiere vencer el temor al cambio para abrazar nuevas oportunidades de mejora.",
        respuestaCorrecta: "Verdadero",
      },
      {
        tipo: "completar",
        pregunta:
          "El pilar que busca la mejora continua e introduce nuevas formas de sorprender al cliente se llama ________.",
        respuestaCorrecta: "Innovación",
      },
      {
        tipo: "multiple",
        pregunta:
          "La Diferenciación en Omotenashi es un esfuerzo consciente por crear elementos que reflejan una comprensión profunda de:",
        opciones: [
          "La competencia en el mercado",
          "Las necesidades individuales y el cambio constante",
          "La publicidad más efectiva",
          "Los costos de operación",
        ],
        respuestaCorrecta: "Las necesidades individuales y el cambio constante",
      },
      {
        tipo: "verdaderoFalso",
        pregunta:
          "La Trascendencia fomenta una reflexión sobre el impacto duradero y positivo de nuestras acciones diarias en el mundo.",
        respuestaCorrecta: "Verdadero",
      },
    ],
  },
  {
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    imagenUrl: "/images/omotenashi-servicio.jpg",
    examen: [
      {
        tipo: "verdaderoFalso",
        pregunta:
          "La capacitación en Omotenashi solo debe enfocarse en habilidades técnicas.",
        respuestaCorrecta: "Falso",
      },
      {
        tipo: "verdaderoFalso",
        pregunta:
          "La gestión emocional en Omotenashi ayuda a mantener la calma incluso bajo presión.",
        respuestaCorrecta: "Verdadero",
      },
      {
        tipo: "verdaderoFalso",
        pregunta:
          "La Comunicación Efectiva en Omotenashi solo se trata de transmitir información de manera clara.",
        respuestaCorrecta: "Falso",
      },
      {
        tipo: "completar",
        pregunta:
          "La 'C' que busca inculcar el respeto y la anticipación en el equipo es ________.",
        respuestaCorrecta: "Capacitación",
      },
      {
        tipo: "completar",
        pregunta:
          "La fórmula que subraya el efecto positivo de una respuesta correcta en la percepción del cliente es ________.",
        respuestaCorrecta: "RxI²",
      },
      {
        tipo: "completar",
        pregunta:
          "El liderazgo Omotenashi debe fomentar el ________ en el equipo para que sientan su voz escuchada.",
        respuestaCorrecta: "Compromiso",
      },
      {
        tipo: "multiple",
        pregunta:
          "El compromiso con la excelencia en Omotenashi se manifiesta al adoptar una actitud evolutiva más allá de:",
        opciones: [
          "El cliente siempre es primero",
          "Trabajamos por ser los primeros",
          "El servicio debe ser rápido",
          "El producto es lo más importante",
        ],
        respuestaCorrecta: "El cliente siempre es primero",
      },
      {
        tipo: "multiple",
        pregunta:
          "¿Cuál de las 3 C’s es considerada el puente entre la intención del servicio y la percepción del cliente?",
        opciones: ["Capacitación", "Compromiso", "Comunicación", "Competencia"],
        respuestaCorrecta: "Comunicación",
      },
      {
        tipo: "multiple",
        pregunta:
          "¿Cuál es el principal objetivo de un plan de acción post-capacitación?",
        opciones: [
          "Reducir costos",
          "Crear un ciclo virtuoso de mejora constante",
          "Despedir al personal no apto",
          "Aumentar la rotación",
        ],
        respuestaCorrecta: "Crear un ciclo virtuoso de mejora constante",
      },
      {
        tipo: "multiple",
        pregunta:
          "¿Cuál de estos NO es un elemento de la Comunicación No Verbal?",
        opciones: [
          "Tono de voz",
          "Contacto visual",
          "La formulación del mensaje",
          "Lenguaje corporal",
        ],
        respuestaCorrecta: "La formulación del mensaje",
      },
    ],
  },
  {
    videoUrl: "https://www.youtube.com/embed/3tGwnL_4o7g",
    imagenUrl: "/images/omotenashi-servicio.jpg",
    examen: [
      {
        tipo: "verdaderoFalso",
        pregunta:
          'El principio "El Cliente Siempre Tiene la Razón" es un obstáculo para la objetividad del equipo.',
        respuestaCorrecta: "Verdadero",
      },
      {
        tipo: "verdaderoFalso",
        pregunta:
          "El Kintsugi se enfoca en desechar lo roto para mantener la perfección.",
        respuestaCorrecta: "Falso",
      },
      {
        tipo: "verdaderoFalso",
        pregunta:
          "Un error en el servicio, bajo el Omotenashi, debe usarse como oportunidad para edificar relación con el cliente.",
        respuestaCorrecta: "Verdadero",
      },
      {
        tipo: "completar",
        pregunta:
          "La técnica japonesa que repara con oro y celebra la imperfección se llama ________.",
        respuestaCorrecta: "Kintsugi",
      },
      {
        tipo: "completar",
        pregunta:
          "El concepto de mejora continua que impulsa la Maestría Omotenashi se llama ________.",
        respuestaCorrecta: "Kaizen",
      },
      {
        tipo: "completar",
        pregunta:
          "Según el Bushido, la virtud de la Lealtad es conocida como ________.",
        respuestaCorrecta: "Chugi",
      },
      {
        tipo: "multiple",
        pregunta:
          '¿Quién es el visionario a quien se le atribuye el principio "El Cliente Siempre Tiene la Razón"?',
        opciones: [
          "Harry Gordon Selfridge",
          "Ashikaga Yoshimasa",
          "Sam Walton",
          "Kiichiro Toyoda",
        ],
        respuestaCorrecta: "Harry Gordon Selfridge",
      },
      {
        tipo: "multiple",
        pregunta:
          'La Revaluación del Principio "El Cliente Siempre Tiene la Razón" busca:',
        opciones: [
          "Sacrificar al empleado por el cliente",
          "Fomentar un diálogo claro y soluciones asertivas y equitativas",
          "Acatar todas las peticiones ciegamente",
          "Ignorar las quejas complejas",
        ],
        respuestaCorrecta:
          "Fomentar un diálogo claro y soluciones asertivas y equitativas",
      },
      {
        tipo: "multiple",
        pregunta:
          "¿Cuál es el principal enfoque de un líder Omotenashi en su equipo?",
        opciones: [
          "Dictar normas estrictas que corrijan acciones",
          "Servir de modelo, elevar el estándar del servicio y eliminar obstáculos",
          "Centrarse solo en las métricas de venta",
          "Trabajar en aislamiento del equipo",
        ],
        respuestaCorrecta:
          "Servir de modelo, elevar el estándar del servicio y eliminar obstáculos",
      },
      {
        tipo: "multiple",
        pregunta:
          "La aplicación del Kintsugi en el servicio al cliente implica:",
        opciones: [
          "Cubrir el error",
          "Transformar un error en una experiencia extraordinaria",
          "Reembolsar el costo y disculparse",
          "Cambiar de cliente",
        ],
        respuestaCorrecta:
          "Transformar un error en una experiencia extraordinaria",
      },
    ],
  },
];

const ContenidoNivel: React.FC<ContenidoNivelProps> = ({
  nivel,
  onCompletarNivel,
  className,
}) => {
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
    <div className={`nivel-visual-container ${className || ""}`}>
      <div className="lado-izquierdo">
        <div className="circulo-nivel">
          <h2>Nivel {nivel}</h2>
        </div>
        {contenidoVisto && (
          <p className="mensaje-completado">✅ Contenido completado</p>
        )}
        {examenCompletado && (
          <p className="mensaje-completado">🎉 Examen aprobado</p>
        )}
      </div>
      <motion.div
        className="lado-derecho"
        initial={{ opacity: 0, x: 100, filter: "blur(10px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        {!contenidoVisto ? (
          <div className="contenido-multimedia">
            <div className="nivel-column-container">
              {/* VIDEO */}
              <div className="video-nivel">
                <h3 className="resp-title">Video del Nivel</h3>

                {/* Wrapper responsivo 16:9 */}
                <div className="media-aspect">
                  <iframe
                    src={nivelData.videoUrl}
                    title={`Video Nivel ${nivel}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    className="media-el"
                  />
                </div>
              </div>

              {/* INFOGRAFÍA */}
              <div className="infografias-nivel">
                <h3 className="resp-title">Infografía de Apoyo</h3>

                {/* Wrapper 16:9 pero con scroll activado */}
                <div className="media-aspect media-aspect--scroll">
                  {/* Área scrollable (vertical y horizontal) */}
                  <div className="media-scroll-area">
                    <InfografiaNivel nivel={nivel} />
                  </div>
                </div>
              </div>

              {/* IMAGEN */}
              <div className="imagen-nivel">
                <h3 className="resp-title">Imagen Ilustrativa</h3>

                {/* Wrapper responsivo 4:3; imagen centrada y contenida */}
                <div className="media-aspect-43">
                  <img
                    src={nivelData.imagenUrl}
                    alt={`Nivel ${nivel}`}
                    loading="lazy"
                    className="media-el object-contain"
                  />
                </div>
              </div>
            </div>

            <button className="btn-completar" onClick={manejarCompletarNivel}>
              He completado este contenido
            </button>
          </div>
        ) : !examenCompletado ? (
          <div className="examen-section">
            <h3>Examen del Nivel {nivel}</h3>
            <Examen
              preguntas={nivelData.examen as Pregunta[]}
              onCompletarExamen={manejarCompletarExamen}
            />
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

export default ContenidoNivel;
