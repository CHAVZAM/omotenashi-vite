// src/components/FormacionOnline/InfografiaNivel3.tsx
import React from "react";

/**
 * Infografía Nivel 3 — Las 3 C en la Formación (Cap. 6)
 *
 * Cobertura explícita del examen Nivel 3:
 * - V/F: “La capacitación en Omotenashi solo debe enfocarse en habilidades técnicas” → Falso
 * - V/F: “La gestión emocional ayuda a mantener la calma bajo presión” → Verdadero
 * - V/F: “Comunicación efectiva = solo transmitir claro” → Falso
 * - Completar: “La 'C' que inculca respeto y anticipación es ________” → Capacitación
 * - Completar: “La fórmula que subraya el efecto positivo… es ________” → RxI²
 * - Completar: “El liderazgo debe fomentar el ________ en el equipo” → Compromiso
 * - Múltiple: “Actitud evolutiva más allá de…” → Trabajamos por ser los primeros
 * - Múltiple: “¿Cuál C es el puente entre intención y percepción?” → Comunicación
 * - Múltiple: “Objetivo del plan post-capacitación” → Crear un ciclo virtuoso de mejora constante
 * - Múltiple: “¿Qué NO es CNV?” → La formulación del mensaje
 */

const colorPrimary = "#9b2d30";
const colorAccent = "#2E5A88";

const InfografiaNivel3: React.FC = () => {
  return (
    <div className="infografia-content p-4 w-full">
      {/* RESUMEN */}
      <section className="mb-4">
        <h3 className="infografia-title" style={{ color: colorPrimary }}>
          Las 3 C en la Formación: Capacitación · Compromiso · Comunicación
        </h3>
        <p className="infografia-subtitle" style={{ color: colorAccent }}>
          Tres pilares para transformar intención en percepción: equipos
          preparados, involucrados y capaces de comunicar con técnica, calidez y
          autocontrol.
        </p>
      </section>

      {/* GRID PRINCIPAL */}
      <div className="infografia-grid">
        {/* CAPACITACIÓN */}
        <article
          className="infografia-card"
          style={{ borderTopColor: colorAccent }}
        >
          <h4 style={{ color: colorAccent }}>C de Capacitación</h4>
          <p className="text-sm">
            Va más allá de lo técnico:{" "}
            <strong>
              inculcar respeto, anticipación y atención al detalle
            </strong>
            . Enseñar a leer entre líneas y responder a necesidades no
            expresadas. Adaptable a culturas y contextos.
          </p>
          <ul className="list-disc pl-5 text-xs mt-2">
            <li>Role-playing con escenarios reales y desafiantes.</li>
            <li>Casos y ejemplos (benchmark) que modelan buenas prácticas.</li>
            <li>Plan post-cap: objetivos, métricas y seguimiento regular.</li>
          </ul>
          
        </article>

        {/* COMPROMISO */}
        <article
          className="infografia-card"
          style={{ borderTopColor: colorAccent }}
        >
          <h4 style={{ color: colorAccent }}>
            C de Compromiso con la Excelencia
          </h4>
          <p className="text-sm">
            Estándar vivo que permea toda la organización. Reconoce, mide y
            celebra a los
            <em> embajadores del Omotenashi</em>.
          </p>
          <ul className="list-disc pl-5 text-xs mt-2">
            <li>
              Mantra práctico: “<strong>Trabajamos por ser los primeros</strong>
              y el cliente merece nuestra atención y respeto”.
            </li>
            <li>Sistema de evaluación continua + feedback.</li>
            <li>Liderazgo que modela, reconoce y elimina obstáculos.</li>
          </ul>
        </article>

        {/* COMUNICACIÓN */}
        <article
          className="infografia-card"
          style={{ borderTopColor: colorAccent }}
        >
          <h4 style={{ color: colorAccent }}>C de Comunicación Efectiva</h4>
          <p className="text-sm">
            Es el <strong>puente</strong> entre intención y percepción: decir lo
            correcto, de la manera correcta, en el momento correcto.
          </p>
          <ul className="list-disc pl-5 text-xs mt-2">
            <li>Contenido + calidez + sinceridad (no solo claridad).</li>
            <li>
              Estrategias para situaciones difíciles y clientes frustrados.
            </li>
            <li>Comunicación interna: alineación y voz del equipo.</li>
          </ul>
        </article>

        {/* GESTIÓN EMOCIONAL + CNV */}
        <article
          className="infografia-card"
          style={{ borderTopColor: colorAccent }}
        >
          <h4 style={{ color: colorAccent }}>Gestión Emocional & CNV</h4>
          <p className="text-sm">
            Mantener la <strong>calma profesional</strong> bajo presión
            enriquece la experiencia y evita escaladas. La Comunicación No
            Verbal (CNV) moldea la percepción.
          </p>
          <ul className="list-disc pl-5 text-xs mt-2">
            <li>CNV: tono de voz, contacto visual, lenguaje corporal.</li>
            <li>Respirar, pausar, reformular: conducir la interacción.</li>
            <li>Empatía táctica: validar emoción, ofrecer pasos siguientes.</li>
          </ul>
        </article>

        {/* RxI² */}
        <article
          className="infografia-card"
          style={{ borderTopColor: colorAccent }}
        >
          <h4 style={{ color: colorAccent }}>Fórmula RxI²</h4>
          <p className="text-sm">
            <strong>R</strong>espuesta × <strong>I</strong>nteracción²: una
            respuesta correcta y bien ejecutada amplifica la percepción
            favorable del cliente y transforma retos en oportunidades.
          </p>
          <ul className="list-disc pl-5 text-xs mt-2">
            <li>R: precisión, oportunidad, solución clara.</li>
            <li>I: calidad de la interacción (empatía, tono, presencia).</li>
            <li>I²: consistencia y repetición de buenas interacciones.</li>
          </ul>
        </article>

        {/* PLAN POST-CAPACITACIÓN */}
        <article
          className="infografia-card"
          style={{ borderTopColor: colorAccent }}
        >
          <h4 style={{ color: colorAccent }}>Plan Post-Capacitación</h4>
          <p className="text-sm">
            Asegura que lo aprendido se implemente y se mida. Crea un{" "}
            <strong>ciclo virtuoso</strong> de mejora.
          </p>
          <ul className="list-disc pl-5 text-xs mt-2">
            <li>Objetivos claros y medibles (KPI de experiencia).</li>
            <li>Seguimiento regular y coaching on-the-job.</li>
            <li>Estandarizar lo que funciona, iterar lo que no.</li>
          </ul>
        </article>
      </div>

      {/* CIERRE PRÁCTICO */}
      <section className="mt-6">
        <h4 className="text-lg font-semibold" style={{ color: colorPrimary }}>
          Llevar las 3 C a la práctica hoy
        </h4>
        <ul className="list-disc pl-5 text-sm text-gray-700">
          <li>
            Role-play de 10 min sobre un caso real con feedback inmediato.
          </li>
          <li>
            Definir 1 KPI de experiencia y 1 micro-hábito de CNV para esta
            semana.
          </li>
          <li>
            Aplicar RxI² en la próxima incidencia y registrar el resultado.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default InfografiaNivel3;
