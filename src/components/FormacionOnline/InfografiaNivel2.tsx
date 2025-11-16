// src/components/FormacionOnline/InfografiaNivel2.tsx
import React from "react";

/**
 * Infografía Nivel 2 — Los Pilares del Omotenashi
 * Fuente base: Cap. 2 “Los pilares del Omotenashi”
 *
 * Cobertura explícita del examen Nivel 2:
 * - Anticipación: necesidades no expresadas (Completar)
 * - Reciprocidad: respeto y apreciación mutua (Múltiple)
 * - Innovación SIN abandonar lo tradicional (V/F → Falso que haya que abandonar)
 * - Simbolismo del número diez (十): plenitud/estructura completa (Completar)
 * - Paciencia: A) serenidad  B) comunicación clara  C) resiliencia  → D) Todas las anteriores (Múltiple)
 * - Superación: vencer el miedo al cambio para mejorar (V/F → Verdadero)
 * - Diferenciación: basada en necesidades individuales y cambio constante (Múltiple)
 * - Trascendencia: impacto duradero y positivo (V/F → Verdadero)
 *
 * Notas:
 * - Reutiliza estilos de InfografiaNivel.css (grid, cards, títulos).
 * - Texto comprimido y directo para lectura móvil.
 */

const colorPrimary = "#9b2d30";
const colorAccent = "#2E5A88";

const InfografiaNivel2: React.FC = () => {
  return (
    <div className="infografia-content p-4 w-full">
      {/* RESUMEN / APERTURA */}
      <section className="mb-4">
        <h3 className="infografia-title" style={{ color: colorPrimary }}>
          Los Pilares del Omotenashi
        </h3>
        <p className="infografia-subtitle" style={{ color: colorAccent }}>
          Una estructura completa (十) que sostiene experiencias memorables: anticipar, respetar, innovar,
          diferenciar y superarse, sin perder la esencia.
        </p>
        <p className="mt-2 text-sm text-gray-700">
          En la cultura japonesa, el número <strong>diez (十, Jū)</strong> simboliza <em>perfección y plenitud</em>.
          Así, los pilares forman un sistema integral que se refuerza entre sí para lograr un servicio impecable.
        </p>
      </section>

      {/* BLOQUE “十” — PLENITUD */}
      <section className="mb-4">
        <div className="infografia-card" style={{ borderTopColor: colorAccent }}>
          <h4 style={{ color: colorAccent }}>“十” — Plenitud y estructura completa</h4>
          <p className="text-sm">
            Como los diez dedos que actúan coordinados, los pilares funcionan en conjunto: base sólida,
            adaptable y capaz de sostener excelencia a lo largo del tiempo.
          </p>
        </div>
      </section>

      {/* TARJETAS PRINCIPALES (ALINEADAS 1:1 CON EXAMEN) */}
      <div className="infografia-grid">
        {/* Anticipación */}
        <article className="infografia-card" style={{ borderTopColor: colorAccent }}>
          <h4 style={{ color: colorAccent }}>Pilar de la Anticipación</h4>
          <p className="text-sm">
            No es solo responder: es <strong>descubrir necesidades no expresadas</strong> mediante observación
            meticulosa, empatía y personalización. Convertir señales sutiles en acciones concretas.
          </p>
          <ul className="list-disc pl-5 text-xs mt-2">
            <li>Observar lenguaje no verbal y contexto.</li>
            <li>Prever requerimientos antes de que se pidan.</li>
            <li>Ajustar detalles a gustos y expectativas reales.</li>
          </ul>
          
        </article>

        {/* Reciprocidad */}
        <article className="infografia-card" style={{ borderTopColor: colorAccent }}>
          <h4 style={{ color: colorAccent }}>Pilar de la Reciprocidad</h4>
          <p className="text-sm">
            La relación servicio–cliente es un <strong>diálogo</strong>: agradecimiento genuino, valoración mutua
            y respeto que nutren un sentido de comunidad.
          </p>
          <ul className="list-disc pl-5 text-xs mt-2">
            <li>Agradecer presencia e interés del cliente.</li>
            <li>Interés sincero por conocer necesidades y expectativas.</li>
            <li>Reconocer el esfuerzo del equipo y del cliente.</li>
          </ul>
         
        </article>

        {/* Innovación (sin abandonar tradición) */}
        <article className="infografia-card" style={{ borderTopColor: colorAccent }}>
          <h4 style={{ color: colorAccent }}>Pilar de la Innovación</h4>
          <p className="text-sm">
            Innovar es <strong>evolucionar</strong> integrando tecnología y creatividad sin romper la esencia.
            Ajustar procesos con feedback y mejora continua.
          </p>
          <ul className="list-disc pl-5 text-xs mt-2">
            <li>Explorar herramientas que anticipen necesidades.</li>
            <li>Crear “pequeños wow” manteniendo valores base.</li>
            <li>Escuchar al cliente y al equipo, iterar y estandarizar.</li>
          </ul>
        
        </article>

        {/* Paciencia */}
        <article className="infografia-card" style={{ borderTopColor: colorAccent }}>
          <h4 style={{ color: colorAccent }}>Pilar de la Paciencia</h4>
          <p className="text-sm">
            Crear un oasis en la dificultad: <strong>serenidad</strong>, <strong>comunicación clara</strong> y
            <strong> resiliencia</strong> para resolver con profesionalismo.
          </p>
          <ul className="list-disc pl-5 text-xs mt-2">
            <li>Manejar situaciones desafiantes con compostura.</li>
            <li>Comunicar con respeto y objetividad.</li>
            <li>Persistir y aprender de cada obstáculo.</li>
          </ul>
          
        </article>

        {/* Superación */}
        <article className="infografia-card" style={{ borderTopColor: colorAccent }}>
          <h4 style={{ color: colorAccent }}>Pilar de la Superación</h4>
          <p className="text-sm">
            Compromiso con la <strong>mejora personal y profesional</strong>. Vencer el miedo al cambio habilita
            nuevas oportunidades y eleva el estándar.
          </p>
          <ul className="list-disc pl-5 text-xs mt-2">
            <li>Invertir en formación y práctica deliberada.</li>
            <li>Detectar áreas de mejora y actuar.</li>
            <li>Convertir el error en aprendizaje útil.</li>
          </ul>
          
        </article>

        {/* Diferenciación */}
        <article className="infografia-card" style={{ borderTopColor: colorAccent }}>
          <h4 style={{ color: colorAccent }}>Pilar de la Diferenciación</h4>
          <p className="text-sm">
            Ser distinto con propósito: <strong>diseñar experiencias</strong> a partir de necesidades individuales
            y del <strong>cambio constante</strong> del entorno.
          </p>
          <ul className="list-disc pl-5 text-xs mt-2">
            <li>Atención personalizada que excede expectativas.</li>
            <li>Elementos únicos del producto/servicio.</li>
            <li>Enfoques disruptivos con sello de marca.</li>
          </ul>
         
        </article>

        {/* Trascendencia */}
        <article className="infografia-card" style={{ borderTopColor: colorAccent }}>
          <h4 style={{ color: colorAccent }}>Pilar de la Trascendencia</h4>
          <p className="text-sm">
            Comprender el <strong>impacto duradero</strong> de nuestras acciones: responsabilidad ética,
            legado positivo y contribución social.
          </p>
          <ul className="list-disc pl-5 text-xs mt-2">
            <li>Actuar con conciencia del efecto en los demás.</li>
            <li>Honrar talentos como compromisos, no privilegios.</li>
            <li>Elevar comunidad, marca y equipo con cada decisión.</li>
          </ul>
 
        </article>
      </div>

      {/* COMPLEMENTOS (no examinables directos, refuerzan tono) */}
      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {/* Honestidad */}
        <div className="infografia-card" style={{ borderTopColor: colorAccent }}>
          <h4 style={{ color: colorAccent }}>Honestidad</h4>
          <p className="text-sm">
            Transparencia y rectitud fortalecen la confianza: comunicar con claridad, actuar con integridad,
            sostener la verdad en cada situación.
          </p>
        </div>

        {/* Empatía */}
        <div className="infografia-card" style={{ borderTopColor: colorAccent }}>
          <h4 style={{ color: colorAccent }}>Empatía</h4>
          <p className="text-sm">
            Escucha activa, comprensión emocional y soluciones con seguimiento. Humaniza y da sentido al servicio.
          </p>
        </div>

        {/* Excelencia */}
        <div className="infografia-card" style={{ borderTopColor: colorAccent }}>
          <h4 style={{ color: colorAccent }}>Excelencia</h4>
          <p className="text-sm">
            No es perfección; es un <strong>estándar vivo</strong> de mejora: calidad superior, formación continua,
            adaptabilidad y evolución.
          </p>
        </div>
      </section>

      {/* CIERRE PRÁCTICO */}
      <section className="mt-6">
        <h4 className="text-lg font-semibold" style={{ color: colorPrimary }}>
          Del pilar a la acción
        </h4>
        <ul className="list-disc pl-5 text-sm text-gray-700">
          <li>Elige 1 cliente real y anticipa una necesidad no expresada hoy.</li>
          <li>Diseña un micro-“wow” que respete tu tradición de marca.</li>
          <li>Pide feedback breve al cliente y al equipo: itera una mejora.</li>
        </ul>
      </section>
    </div>
  );
};

export default InfografiaNivel2;
