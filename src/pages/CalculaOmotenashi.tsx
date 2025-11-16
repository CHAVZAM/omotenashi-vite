import React, { useState, useEffect } from "react"; // <--- Asegúrate de importar useEffect
import IGOChart from "../components/IGOChart";
import allCountries from "../data/countries.json";
import { useForm } from "react-hook-form";
import "./CalculaOmotenashi.css";
import TermsModal from "../components/TermsModal"; // NUEVO


// Preguntas para la evaluación personal y empresarial
// Estas preguntas están diseñadas para evaluar diferentes aspectos del Omotenashi
// y se agrupan en Indicadores Globales Omotenashi (IGOs).
const personalQuestions = [
  "¿Sientes que posees y brindas sensación de anticipación?",
  "¿Manejas y posees comunicación empática?",
  "¿Es importante para ti la puntualidad y el manejo del tiempo?",
  "¿Te gusta tener dominio y seguridad del tema que estás a cargo?",
  "¿Has brindado experiencias memorables en el último mes?",
  "¿Alguien te ha dejado saber que se sintió a gusto con tu atención, respuestas o detalles?",
  "¿Buscas activamente nuevas formas de mejorar la experiencia de quienes te rodean?", // Innovación
  "¿Te adaptas con facilidad a los cambios inesperados en las interacciones?", // Resolución/Empatía
  "¿Prestas atención a los pequeños detalles que pueden marcar una gran diferencia para los demás?", // Anticipación
  "¿Te sientes motivado/a a ir más allá de lo esperado en tus interacciones?", // Memorables
];

const businessQuestions = [
  "¿En tu empresa es importante anticiparse a las necesidades del cliente?",
  "¿En tu equipo manejan y poseen comunicación empática?",
  "¿En tu equipo la puntualidad y el manejo del tiempo es una manera de brindar respeto a sus clientes?",
  "¿En su empresa se preocupan por la formación de los equipos de trabajo y más cuando rotan periódicamente en la organización?",
  "¿En los últimos tres meses han recibido notificaciones de experiencias memorables por parte de los usuarios?",
  "¿En el último mes han recibido respuestas positivas y gratificantes por las soluciones brindadas?",
  "¿Fomenta tu empresa la experimentación y la implementación de nuevas ideas para mejorar la experiencia del cliente/usuario?", // Innovación
  "¿Tu equipo está capacitado para manejar situaciones inesperadas de manera flexible y eficaz?", // Resolución
  "¿Se presta atención en tu empresa a los detalles que pueden generar un impacto positivo en la experiencia del cliente/usuario?", // Anticipación
  "¿Se incentiva a los empleados a superar las expectativas del cliente/usuario?", // Memorables
];

// Definición de los IGOs con pesos y asignación de preguntas
const IGOs = [
  { name: "Anticipación", weight: 0.15, questions: [0, 8] }, // Índices de las preguntas
  { name: "Comunicación Empática", weight: 0.2, questions: [1, 5, 7] },
  { name: "Gestión del Tiempo y Puntualidad", weight: 0.15, questions: [2] },
  { name: "Dominio y Seguridad", weight: 0.1, questions: [3] },
  {
    name: "Creación de Experiencias Memorables",
    weight: 0.15,
    questions: [4, 9],
  },
  { name: "Resolución y Satisfacción", weight: 0.15, questions: [7, 5] },
  { name: "Innovación", weight: 0.1, questions: [6] },
];


const CalculaOmotenashi: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const [consent, setConsent] = useState<boolean>(false);
  const [type, setType] = useState<string>("");
  const [userData, setUserData] = useState<any>({});
  const [results, setResults] = useState<{
    data: number[];
    igoScores: number[];
    cso: number;
    legend: string;
    igoLabels: string[];
  } | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>(Array(10).fill(0)); // 10 preguntas
  const [showTerms, setShowTerms] = useState(false);
  
  // NUEVO ESTADO para la animación
  const [currentQuestionKey, setCurrentQuestionKey] = useState<number>(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: "",
      correo: "",
      profesion: "",
      empresa: "",
      correoEmpresa: "",
      sector: "",
      empleados: "",
      pais: "",
      ciudad: "",
    },
  });

  const questions = type === "empresa" ? businessQuestions : personalQuestions;
  const labels = questions.map((q) => q.split(" ")[0]);

  const handleConsent = () => {
    if (consent) setStep(1);
  };

  const handleTypeSelection = (selected: string) => {
    setType(selected);
    setStep(2);
  };

  const onSubmit = (data: any) => {
    if (!selectedCountry || !selectedCity) {
      alert("Por favor selecciona un país y una ciudad.");
      return;
    }
    setUserData({
      ...data,
      pais: selectedCountry,
      ciudad: selectedCity,
    });
    setStep(3);
  };

  const getCSOLegend = (cso: number) => {
    if (cso < 40)
      return "Tu nivel de Omotenashi necesita atención. Considera agendar una consulta.";
    if (cso < 70)
      return "Estás en el camino correcto, pero hay áreas de mejora. ¿Una consulta?";
    return "¡Excelente nivel de Omotenashi! Lleva tu servicio al siguiente nivel con nosotros.";
  };

  const handleAnswer = (value: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = value;
    setAnswers(updatedAnswers);
    
    // Si no es la última pregunta, actualiza el índice y la clave para la animación
    if (questionIndex < questions.length - 1) {
      // Usamos setTimeout para permitir que la animación de "fade-out" se reproduzca
      // antes de que la nueva pregunta aparezca (con su fade-in)
      setTimeout(() => {
        setQuestionIndex(questionIndex + 1);
        setCurrentQuestionKey(prevKey => prevKey + 1); // Cambia la clave para forzar la animación
      }, 300); // Pequeño retraso para la animación (ajusta si es necesario)
    } else {
      // Si es la última pregunta, calcula los resultados y avanza al paso 4
      const igoScores = IGOs.map((igo) => {
        const relevantAnswers = igo.questions.map(
          (index) => updatedAnswers[index]
        );
        return (
          relevantAnswers.reduce((sum, val) => sum + val, 0) /
          relevantAnswers.length
        );
      });

      const cso = IGOs.reduce(
        (acc, igo, index) => acc + (igoScores[index] / 7) * igo.weight * 100,
        0
      );
      const legend = getCSOLegend(cso);
      setResults({
        data: updatedAnswers,
        igoScores,
        cso,
        legend,
        igoLabels: IGOs.map((igo) => igo.name),
      });
      setTimeout(() => { // Pequeño retraso para que la última pregunta se desvanezca antes de mostrar resultados
        setStep(4);
      }, 300);
    }
  };

  // Función para volver a la pregunta anterior con animación
  const handlePreviousQuestion = () => {
    if (questionIndex > 0) {
      setTimeout(() => {
        setQuestionIndex(questionIndex - 1);
        setCurrentQuestionKey(prevKey => prevKey + 1); // Cambia la clave para forzar la animación
      }, 300);
    } else {
      // Si estamos en la primera pregunta, volvemos al paso 2
      setStep(2);
    }
  };


  const renderCountryCitySelector = () => (
    <>
      <label>
        País:
        <select
          {...register("pais", { required: "El país es obligatorio" })}
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="">Selecciona un país</option>
          {(allCountries as string[]).map((country: string) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        {errors.pais && (
          <span className="error-message">{errors.pais.message}</span>
        )}
      </label>
      {selectedCountry && (
        <label>
          Ciudad:
          <input
            {...register("ciudad", { required: "La ciudad es obligatoria" })}
            type="text"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            placeholder="Escribe tu ciudad"
          />
          <small>Por favor, escribe el nombre de tu ciudad manualmente.</small>
          {errors.ciudad && (
            <span className="error-message">{errors.ciudad.message}</span>
          )}
        </label>
      )}
    </>
  );

  return (
    <div className="calcula-omotenashi-container">
  {step === 0 && (
  <div className="intro-screen">
    <h2>Evalúa tu Nivel de Omotenashi</h2>
    <p className="intro-subtitle">
      Autoevalúa aquí tus competencias en servicio al cliente, basadas en los Indicadores Globales Omotenashi y sus principios (IGO).
    </p>
    <p>
      Este cuestionario de 10 preguntas busca ayudarte a reflexionar sobre tu
      nivel de servicio, en tu entorno personal o empresarial.
    </p>

    <p className="consent-warning">
      Tu privacidad es nuestra prioridad. Acepta nuestra política de datos para continuar.
      {" "}<button type="button" className="link-like" onClick={() => setShowTerms(true)}>
        Ver Términos y Condiciones
      </button>
    </p>

    <label className="consent-row">
      <input
        type="checkbox"
        checked={consent}
        onChange={(e) => setConsent(e.target.checked)}
      />
      <span>Acepto los Términos y Condiciones</span>
    </label>

    <button className="animated-button" onClick={handleConsent}>
      Comenzar Evaluación
    </button>

    {/* Modal Términos */}
    <TermsModal open={showTerms} onClose={() => setShowTerms(false)} />
  </div>
)}


      {step === 1 && (
        <div className="type-selection-screen">
          <h3>Elige tu Evaluación</h3>
          <p>Selecciona el enfoque que mejor se adapte a ti:</p>
          <div className="options-group">
            <button
              className="option-button"
              onClick={() => handleTypeSelection("persona")}
            >
              Personal
            </button>
            <button
              className="option-button"
              onClick={() => handleTypeSelection("empresa")}
            >
              Empresarial
            </button>
          </div>
          <button className="back-button" onClick={() => setStep(0)}>
            Volver
          </button>
        </div>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit(onSubmit)} className="user-data-form">
          <h3>Tu Perfil</h3>
          <p>Proporciona información para personalizar tus resultados:</p>
          {type === "persona" && (
            <>
              <label>
                Nombre Completo:
                <input
                  {...register("nombre", {
                    required: "El nombre es obligatorio",
                  })}
                />
                {errors.nombre && (
                  <span className="error-message">{errors.nombre.message}</span>
                )}
              </label>
              <label>
                Correo Electrónico:
                <input
                  type="email"
                  {...register("correo", {
                    required: "El correo es obligatorio",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Correo inválido",
                    },
                  })}
                />
                {errors.correo && (
                  <span className="error-message">{errors.correo.message}</span>
                )}
              </label>
              <label>
                Profesión u Ocupación:
                <input
                  {...register("profesion", {
                    required: "La profesión es obligatoria",
                  })}
                />
                {errors.profesion && (
                  <span className="error-message">
                    {errors.profesion.message}
                  </span>
                )}
              </label>
            </>
          )}
          {type === "empresa" && (
            <>
              <label>
                Nombre de la Empresa:
                <input
                  {...register("empresa", {
                    required: "El nombre de la empresa es obligatorio",
                  })}
                />
                {errors.empresa && (
                  <span className="error-message">
                    {errors.empresa.message}
                  </span>
                )}
              </label>
              <label>
                Correo de Contacto:
                <input
                  type="email"
                  {...register("correoEmpresa", {
                    required: "El correo es obligatorio",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Correo inválido",
                    },
                  })}
                />
                {errors.correoEmpresa && (
                  <span className="error-message">
                    {errors.correoEmpresa.message}
                  </span>
                )}
              </label>
              <label>
                Sector de la Empresa:
                <select
                  {...register("sector", {
                    required: "El sector es obligatorio",
                  })}
                >
                  <option value="">Selecciona un sector</option>
                  <option value="Comercio">Comercio</option>
                  <option value="Servicios">Servicios</option>
                  <option value="Manufactura">Manufactura</option>
                  <option value="Tecnología">Tecnología</option>
                  <option value="Otro">Otro</option>
                </select>
                {errors.sector && (
                  <span className="error-message">{errors.sector.message}</span>
                )}
              </label>
              <label>
                Número de Empleados:
                <select
                  {...register("empleados", {
                    required: "El número de empleados es obligatorio",
                  })}
                >
                  <option value="">Selecciona un rango</option>
                  <option value="1-5">1-5</option>
                  <option value="6-19">6-19</option>
                  <option value="20-49">20-49</option>
                  <option value="50-99">50-99</option>
                  <option value="100+">100 o más</option>
                </select>
                {errors.empleados && (
                  <span className="error-message">
                    {errors.empleados.message}
                  </span>
                )}
              </label>
            </>
          )}
          {renderCountryCitySelector()}
          <div className="button-group">
            <button
              type="button"
              className="back-button"
              onClick={() => setStep(1)}
            >
              Volver
            </button>
            <button type="submit" className="animated-button">
              Continuar
            </button>
          </div>
        </form>
      )}

      {step === 3 && (
        <div className="evaluation-screen">
          <h3>
            Pregunta {questionIndex + 1} de {questions.length}
          </h3>
          {/* Aplicamos la animación al contenedor de la pregunta */}
          <div key={currentQuestionKey} className="question-content fade-in-out"> {/* <-- NUEVO: key y clase para animación */}
            <p className="question-text">{questions[questionIndex]}</p>
            <div className="answer-options">
              {[1, 2, 3, 4, 5, 6, 7].map((val) => (
                <button
                  key={val}
                  className="option-button"
                  onClick={() => handleAnswer(val)}
                  title={`Puntaje ${val}: ${
                    val === 1
                      ? "Muy poco o nada"
                      : val === 7
                      ? "Sin lugar a dudas"
                      : val < 4
                      ? "Poco"
                      : val < 6
                      ? "Regular"
                      : "Mucho"
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
            <progress value={questionIndex + 1} max={questions.length}></progress>
            <p className="legend-note">
              Evalúa cada aspecto seleccionando un valor del 1 al 7, donde 1 representa la mínima aplicación y 7 el máximo nivel. Tu respuesta honesta es esencial para obtener resultados precisos
            </p>
          </div>
          {questionIndex === 0 ? (
            <button className="back-button" onClick={() => setStep(2)}>
              Volver
            </button>
          ) : (
            <button
              className="back-button"
              onClick={handlePreviousQuestion} // <--- Usamos la nueva función para el botón Volver
            >
              Pregunta Anterior
            </button>
          )}
        </div>
      )}

      {results && (
        <div
          className={`results-screen ${
            results.cso < 40
              ? "result-rojo"
              : results.cso < 70
              ? "result-amarillo"
              : "result-verde"
          }`}
        >
          <h3>Tu Nivel de Omotenashi</h3>
          <IGOChart
            data={results.igoScores}
            cso={results.cso}
            userName={type === "persona" ? userData.nombre : userData.empresa}
            labels={results.igoLabels}
            legend={results.legend}
          />
        </div>
      )}
    </div>
  );
};

export default CalculaOmotenashi;