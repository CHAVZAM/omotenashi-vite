// src/components/FormacionOnline/InfografiaNivel4.tsx
import React from "react";

/**
 * Infografía Nivel 4 — Superando Obstáculos (Cap. 7)
 *
 * Cobertura explícita del examen Nivel 4:
 * - V/F: “El Cliente Siempre Tiene la Razón” puede obstaculizar objetividad del equipo → Verdadero
 * - V/F: Kintsugi = desechar lo roto → Falso (reparar con oro, transformar)
 * - V/F: Un error debe usarse como oportunidad para educar al cliente → Verdadero
 * - Completar: Kintsugi (金継ぎ) — reparación con oro
 * - Completar: Kaizen — mejora continua
 * - Completar: Chūgi — lealtad (virtud Bushidō)
 * - Múltiple: Atribuido a “El Cliente Siempre Tiene la Razón” → Harry Gordon Selfridge
 * - Múltiple: Revaluación busca diálogo claro y soluciones asertivas y equitativas
 * - Múltiple: Enfoque del líder Omotenashi → Servir de modelo, elevar el estándar y eliminar obstáculos
 * - Múltiple: Aplicación del Kintsugi → Transformar un error en una experiencia extraordinaria
 */

const colorPrimary = "#9b2d30";
const colorAccent = "#2E5A88";

const InfografiaNivel4: React.FC = () => {
  return (
    <div className="infografia-content p-4 w-full">
      {/* RESUMEN / APERTURA */}
      <section className="mb-4">
        <h3 className="infografia-title" style={{ color: colorPrimary }}>
          Superando Obstáculos: Revaluar, Reparar y Mejorar
        </h3>
        <p className="infografia-subtitle" style={{ color: colorAccent }}>
          Del mantra “el cliente siempre tiene la razón” al enfoque Omotenashi:
          diálogo claro, soluciones equitativas, Kintsugi y Kaizen con liderazgo
          ejemplar.
        </p>
      </section>

      {/* GRID PRINCIPAL */}
      <div className="infografia-grid">
        {/* Revaluación del Principio */}
        <article
          className="infografia-card"
          style={{ borderTopColor: colorAccent }}
        >
          <h4 style={{ color: colorAccent }}>
            Revaluar “El Cliente Siempre Tiene la Razón”
          </h4>
          <p className="text-sm">
            El mantra histórico (popularizado por{" "}
            <strong>Harry Gordon Selfridge</strong>) puede
            <strong> obstaculizar la objetividad</strong> del equipo en
            situaciones complejas. El enfoque actual: <em>escucha activa</em>,
            diálogo, límites sanos y soluciones equitativas.
          </p>
          <ul className="list-disc pl-5 text-xs mt-2">
            <li>Evitar concesiones ciegas que dañen al equipo y la marca.</li>
            <li>Respuestas asertivas, educativas y proporcionales.</li>
            <li>
              Balance entre satisfacción del cliente y justicia/criterio
              profesional.
            </li>
          </ul>
          <div className="mt-2 text-xs opacity-80">
            <strong>Conecta (examen):</strong> <br />• “¿Quién es el visionario
            del principio…?” → <u>Harry Gordon Selfridge</u>. <br />• “Este
            principio es obstáculo…” → <u>Verdadero</u>. <br />• “La revaluación
            busca…” → <u>Diálogo claro y soluciones asertivas y equitativas</u>.
          </div>
        </article>

        {/* Respuesta Profesional y Educativa */}
        <article
          className="infografia-card"
          style={{ borderTopColor: colorAccent }}
        >
          <h4 style={{ color: colorAccent }}>
            Respuesta Profesional y Educativa
          </h4>
          <p className="text-sm">
            No se trata solo de devolver/reemplazar: es orientar, enseñar uso
            óptimo y personalizar soluciones. Cada incidencia es una{" "}
            <strong>oportunidad de formación</strong> para el cliente y el
            equipo.
          </p>
          <ul className="list-disc pl-5 text-xs mt-2">
            <li>Explicar causa raíz y opciones de resolución.</li>
            <li>Guiar próximos pasos y prevención futura.</li>
            <li>
              Documentar y compartir aprendizaje interno (procedimientos
              compartidos).
            </li>
          </ul>
        </article>

        {/* Kintsugi */}
        <article
          className="infografia-card"
          style={{ borderTopColor: colorAccent }}
        >
          <h4 style={{ color: colorAccent }}>
            Kintsugi (金継ぎ): Reparar con Oro
          </h4>
          <p className="text-sm">
            Filosofía/arte (Muromachi) de{" "}
            <strong>reparar lo roto con oro</strong>. No se desecha: se
            <strong> resignifica</strong> y se vuelve más valioso. En servicio:
            convertir fallas en momentos icónicos.
          </p>
          <ul className="list-disc pl-5 text-xs mt-2">
            <li>
              (金) oro + (継ぎ) arreglo → <strong>Kintsugi</strong>.
            </li>
            <li>
              Del error al valor: reconocer, reparar, comunicar, capitalizar.
            </li>
            <li>Refuerza autenticidad, humanidad y lealtad a largo plazo.</li>
          </ul>
          
        </article>

        {/* Kaizen */}
        <article
          className="infografia-card"
          style={{ borderTopColor: colorAccent }}
        >
          <h4 style={{ color: colorAccent }}>Kaizen: Mejora Continua</h4>
          <p className="text-sm">
            Micro-mejoras constantes, estandarización de lo que funciona y
            aprendizaje del fallo. Cultura de <strong>evolución diaria</strong>{" "}
            al servicio del cliente.
          </p>
          <ul className="list-disc pl-5 text-xs mt-2">
            <li>Rituales de retrospectiva y acciones pequeñas sostenidas.</li>
            <li>Indicadores de experiencia y revisión periódica.</li>
            <li>Feedback de clientes y equipo integrado al ciclo.</li>
          </ul>
         
        </article>

        {/* Liderazgo Omotenashi */}
        <article
          className="infografia-card"
          style={{ borderTopColor: colorAccent }}
        >
          <h4 style={{ color: colorAccent }}>Liderazgo Omotenashi</h4>
          <p className="text-sm">
            El líder <strong>sirve de modelo</strong>, eleva el estándar y{" "}
            <strong>elimina obstáculos</strong>. Prioriza criterios justos,
            protege al equipo y facilita excelencia.
          </p>
          <ul className="list-disc pl-5 text-xs mt-2">
            <li>Coaching, reconocimiento y accountability.</li>
            <li>Procesos claros ante incidencias; escalamiento sano.</li>
            <li>Transparencia y cuidado genuino por personas y marca.</li>
          </ul>
         
        </article>

        {/* Bushidō — Chūgi (Lealtad) */}
        <article
          className="infografia-card"
          style={{ borderTopColor: colorAccent }}
        >
          <h4 style={{ color: colorAccent }}>
            Bushidō: Chūgi (忠義) — Lealtad
          </h4>
          <p className="text-sm">
            Lealtad activa con propósito: al cliente, al equipo y a los valores
            de la marca. Sostiene decisiones justas en escenarios desafiantes.
          </p>
          <ul className="list-disc pl-5 text-xs mt-2">
            <li>Coherencia entre lo que se promete y lo que se hace.</li>
            <li>Defender con respeto al equipo ante demandas injustas.</li>
            <li>Lealtad = confianza acumulada en el tiempo.</li>
          </ul>
        
        </article>
      </div>

      {/* PLAYBOOK: DEL ERROR AL ORO (KINTSUGI EN ACCIÓN) */}
      <section className="mt-6">
        <h4 className="text-lg font-semibold" style={{ color: colorPrimary }}>
          Playbook Kintsugi: convertir fallas en valor
        </h4>
        <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-1">
          <li>
            <strong>Reconocer:</strong> validar impacto y disculparse con
            precisión.
          </li>
          <li>
            <strong>Reparar:</strong> resolver causa raíz, no solo el síntoma.
          </li>
          <li>
            <strong>Elevar:</strong> compensar con un “extra” significativo (no
            siempre monetario).
          </li>
          <li>
            <strong>Educar:</strong> explicar cómo evitar la repetición (cliente
            + equipo).
          </li>
          <li>
            <strong>Capitalizar:</strong> documentar, estandarizar la mejora y
            compartir el aprendizaje.
          </li>
        </ol>
      
      </section>

      {/* CIERRE PRÁCTICO */}
      <section className="mt-6">
        <h4 className="text-lg font-semibold" style={{ color: colorPrimary }}>
          De la revaluación a la excelencia diaria
        </h4>
        <ul className="list-disc pl-5 text-sm text-gray-700">
          <li>
            Redacta un guion breve de respuesta asertiva y educativa para 1 caso
            real.
          </li>
          <li>
            Define un “extra Kintsugi” aplicable esta semana (micro-experiencia
            memorable).
          </li>
          <li>
            Activa un micro-ritual Kaizen: una mejora diaria, 10 minutos con el
            equipo.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default InfografiaNivel4;
