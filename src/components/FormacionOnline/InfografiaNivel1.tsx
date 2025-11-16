// src/components/FormacionOnline/InfografiaNivel1.tsx
import React from "react";

/**
 * Infografía Nivel 1 — Fundamentos (Libro: Cap. “Introducción al Omotenashi”)
 * Cobertura explícita del examen Nivel 1:
 * - V/F: “Omotenashi es exclusivamente japonés” → Falso (raíz japonesa, alcance universal)
 * - Significado de “Samurái”: “el que sirve”
 * - Bushido: virtudes (Gi/Justicia) + definición como código de honor
 * - Ryokan: origen (Periodo Nara, s. VII aprox.), símbolo de hospitalidad y tradición
 * - Ukiyo-e: celebra vida y belleza; sensibilidad estética que inspira hospitalidad
 * - Esencia del Omotenashi: Anticipación, No-Reciprocidad, Exceder Expectativas → “Todas las anteriores”
 *
 * Notas de diseño:
 * - No usa librerías nuevas. Estilos se apoyan en tus clases CSS (InfografiaNivel.css) y utilidades Tailwind ya presentes.
 * - Estructura en tarjetas + secciones cortas. Cada tarjeta termina con “Conecta con el examen”.
 * - Texto fiel al libro, condensado para lectura ágil en móvil.
 */

const colorPrimary = "#9b2d30";
const colorAccent = "#2E5A88";

const InfografiaNivel1: React.FC = () => {
  return (
    <div className="infografia-content p-4 w-full">
      {/* Portada / Resumen */}
      <section className="mb-4">
        <h3 className="infografia-title" style={{ color: colorPrimary }}>
          Introducción al Omotenashi
        </h3>
        <p className="infografia-subtitle" style={{ color: colorAccent }}>
          El espíritu de la hospitalidad japonesa: anticipar, cuidar y crear experiencias memorables
          con atención al detalle, respeto y autenticidad.
        </p>
        <p className="mt-2 text-sm text-gray-700">
          Omotenashi nace y se refina en Japón, pero su esencia es <strong>universal</strong>:
          dar con sinceridad, sin esperar retribución, elevando cada interacción a un acto de cuidado.
        </p>
      </section>

      {/* Tarjetas temáticas alineadas con el examen */}
      <div className="infografia-grid">
        {/* Omotenashi ≠ Exclusividad */}
        <article className="infografia-card" style={{ borderTopColor: colorAccent }}>
          <h4 style={{ color: colorAccent }}>Omotenashi: Raíz japonesa, alcance universal</h4>
          <p className="text-sm">
            Más que cortesía: es una <strong>filosofía de vida</strong> que busca experiencias memorables.
            Aunque está profundamente arraigada en la cultura japonesa, sus principios —respeto, empatía,
            atención al detalle— son aplicables a cualquier contexto cultural.
          </p>
          <div className="mt-2 text-xs opacity-80">
            <strong>Conecta con el examen:</strong> “Omotenashi es exclusivamente japonés” → <u>Falso</u>.
          </div>
        </article>

        {/* Significado de Samurái */}
        <article className="infografia-card" style={{ borderTopColor: colorAccent }}>
          <h4 style={{ color: colorAccent }}>“Samurái” = “El que sirve”</h4>
          <p className="text-sm">
            La identidad samurái integra <strong>servicio</strong>, disciplina y honor. Este sentido de servir
            anticipando necesidades inspira el liderazgo Omotenashi contemporáneo.
          </p>
          <ul className="list-disc pl-5 text-xs mt-2">
            <li>Épocas clave: Kamakura (1185–1333) y Muromachi (1336–1573).</li>
            <li>Hospitalidad con <em>seriedad y dignidad</em>, para toda persona sin distinción.</li>
          </ul>
       
        </article>

        {/* Bushido: Código de honor */}
        <article className="infografia-card" style={{ borderTopColor: colorAccent }}>
          <h4 style={{ color: colorAccent }}>Bushidō (武士道): Código de honor</h4>
          <p className="text-sm mb-2">
            El Bushidō guía la conducta: <em>dignidad, rectitud y servicio</em>. Su ética permea el Omotenashi.
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <ul className="list-disc pl-5">
              <li><strong>Gi</strong> — Justicia/Rectitud</li>
              <li><strong>Yū</strong> — Coraje</li>
              <li><strong>Jin</strong> — Compasión</li>
              <li><strong>Rei</strong> — Respeto/Cortesía</li>
            </ul>
            <ul className="list-disc pl-5">
              <li><strong>Makoto</strong> — Honestidad/Sinceridad</li>
              <li><strong>Meiyo</strong> — Honor</li>
              <li><strong>Chūgi</strong> — Lealtad</li>
            </ul>
          </div>
       
        </article>

        {/* Ryokan: origen y símbolo */}
        <article className="infografia-card" style={{ borderTopColor: colorAccent }}>
          <h4 style={{ color: colorAccent }}>Ryokan: Oasis de tradición y cuidado</h4>
          <p className="text-sm">
            Posadas tradicionales con <strong>cuidado extremo del detalle</strong>: desde la bienvenida hasta
            la despedida, integrando naturaleza, calma y rituales (té, baños).
          </p>
          <ul className="list-disc pl-5 text-xs mt-2">
            <li><strong>Origen histórico:</strong> <u>Periodo Nara</u> (s. VII aprox.).</li>
            <li><strong>Símbolo:</strong> <u>Hospitalidad y tradición</u> vivas.</li>
            <li>Hoy, ubicados cerca de templos/santuarios, con experiencias de inmersión cultural.</li>
          </ul>
         
        </article>

        {/* Ukiyo-e: sensibilidad que inspira hospitalidad */}
        <article className="infografia-card" style={{ borderTopColor: colorAccent }}>
          <h4 style={{ color: colorAccent }}>Ukiyo-e (浮世絵): “Imágenes del mundo flotante”</h4>
          <p className="text-sm">
            Grabados que celebran la <strong>belleza de lo cotidiano</strong>, el detalle y la serenidad
            (influencias: wabi-sabi, bokashi). Inspiran el <em>cuidado estético</em> en la experiencia de cliente.
          </p>
          <ul className="list-disc pl-5 text-xs mt-2">
            <li><strong>Uki</strong> (flotante) + <strong>yo</strong> (mundo) + <strong>e</strong> (imagen).</li>
            <li>Maestros: Eijirō Kobayashi, Utagawa Hiroshige (paisaje, transición de color “bokashi”).</li>
          </ul>
         
        </article>

        {/* Esencia del Omotenashi */}
        <article className="infografia-card" style={{ borderTopColor: colorAccent }}>
          <h4 style={{ color: colorAccent }}>Esencia práctica del Omotenashi</h4>
          <ul className="list-disc pl-5 text-sm">
            <li><strong>Anticipación:</strong> detectar necesidades no expresadas.</li>
            <li><strong>No-Reciprocidad:</strong> dar sin esperar devolución.</li>
            <li><strong>Exceder expectativas:</strong> pequeños “wow” con propósito.</li>
          </ul>
          
        </article>
      </div>

      {/* Cierre / Llamado a práctica */}
      <section className="mt-6">
        <h4 className="text-lg font-semibold" style={{ color: colorPrimary }}>
          Del concepto a la práctica diaria
        </h4>
        <ul className="list-disc pl-5 text-sm text-gray-700">
          <li>Observa detalles (estética, orden, aroma, sonidos) que facilitan calma y claridad.</li>
          <li>Anticipa una necesidad no expresada y cúbrela con naturalidad.</li>
          <li>Usa el “toque extra” (un <em>wow</em> pequeño pero significativo) con propósito.</li>
        </ul>
      </section>
    </div>
  );
};

export default InfografiaNivel1;
