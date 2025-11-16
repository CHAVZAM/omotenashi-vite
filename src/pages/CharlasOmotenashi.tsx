// src/components/CharlasOmotenashi.tsx
import React from "react";
import { motion } from "framer-motion";
import "./CharlasOmotenashi.css";

const CharlasOmotenashi: React.FC = () => {
  return (
    <section className="charlas-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="charlas-header"
      >
        <h2>Charlas Especializadas sobre Omotenashi</h2>
        <p className="subtitle">
          Experiencias que transforman y elevan la cultura del servicio
        </p>
      </motion.div>

      {/* IMAGEN 3: César en conferencia (destacada) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="imagen-conferencia"
      >
        <img
          src="/public/images/IMAGEN_3_CESAR_J_CHAVES_CONFERENCIA.png"
          alt="César J. Chaves dando conferencia sobre Omotenashi"
          className="imagen-destacada"
        />
      </motion.div>

      <div className="charlas-content glassmorphic">
        <div className="intro-text">
          <p>
            Como <strong>autor del libro</strong> creador y del curso online{" "}
            <strong>gratuito</strong> <strong>Omotenashi</strong>, ofrezco
            charlas diseñadas para <strong>inspirar y transformar</strong> a
            organizaciones y equipos con las herramientas necesarias para
            trabajar en procura de la{" "}
            <strong>excelencia en el servicio al cliente</strong> y fortalecer
            su <strong>cultura empresarial, su credibilidad y presencia en el mercado</strong>.
          </p>
        </div>

        <div className="section">
          <h3>¿Qué incluyen estas charlas?</h3>
          <ul className="checklist">
            <li>
              Fundamentos prácticos del Omotenashi y su aplicación en el
              contexto personal y empresarial.
            </li>
            <li>
              Casos reales y estrategias implementadas en empresas líderes.
            </li>
            <li>
              Conexión directa con los contenidos de mi libro y plataforma de
              curso online.
            </li>
            <li>
              Dinámicas participativas adaptadas a sus objetivos específicos.
            </li>
          </ul>
        </div>

      <div className="section">
  <h3>Temas principales</h3>
  <div className="temas-grid">
    <div className="tema-card">
      <span className="icon">
        <img
          src="/images/icons/beneficios.svg"
          alt="Beneficios"
          className="icon-img"
        />
      </span>
      <p>
        De la teoría a la acción: implementando Omotenashi en tu
        organización.
      </p>
    </div>

    <div className="tema-card">
      <span className="icon">
        <img
          src="/images/icons/ventajas.svg"
          alt="Ventajas"
          className="icon-img"
        />
      </span>
      <p>Servicio al cliente como ventaja competitiva sostenible.</p>
    </div>

    <div className="tema-card">
      <span className="icon">
        <img
          src="/images/icons/liderazgo.svg"
          alt="Liderazgo"
          className="icon-img"
        />
      </span>
      <p>
        Liderazgo con propósito, atención al detalle, comunicación
        empática y ciclo de la reciprocidad.
      </p>
    </div>

    <div className="tema-card">
      <span className="icon">
        <img
          src="/images/icons/indicadores.svg"
          alt="Indicadores"
          className="icon-img"
        />
      </span>
      <p>
        Indicadores globales omotenashi <strong>(IGO)</strong> su
        implementación.
      </p>
    </div>
  </div>
</div>
        <div className="section">
          <h3>Dirigido a</h3>
          <ul className="target-list">
            <li>
              Empresas interesadas en diferenciarse mediante un servicio
              excepcional.
            </li>
            <li>
              Personas interesadas marcar la diferencia en sus
              proyectos de vida y entornos.
            </li>
            <li>
              Equipos comerciales, de atención al cliente y líderes
              organizacionales.
            </li>
            <li>Universidades, cámaras de comercio y eventos sectoriales.</li>
          </ul>
        </div>

        <div className="section highlight-section">
          <h3>¿Por qué una de mis charlas?</h3>
          <div className="why-grid">
            <div className="why-item">
              <strong>Experiencia</strong>
              <p>
                Soy el autor del libro Omotenashi y he implementado esta
                filosofía en multinacionales con grandes resultados medibles y testimoniales.
              </p>
            </div>
            <div className="why-item">
              <strong>Enfoque práctico</strong>
              <p>
                Conceptos profundos con herramientas aplicables desde el primer
                día.
              </p>
            </div>
            <div className="why-item">
              <strong>Recursos exclusivos</strong>
              <p>
                Los participantes acceden a precios especiales de mi libro como
                material de apoyo y al siguiente nivel del curso online.
              </p>
            </div>
          </div>
        </div>

        {/* IMAGEN 6: César en acción (refuerzo final) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="imagen-conferencia"
        >
          <img
            src="/public/images/IMAGEN_6_CESAR_J_CHAVES_CONFERENCIA.png"
            alt="César J. Chaves en conferencia Omotenashi"
            className="imagen-destacada"
          />
        </motion.div>

        <div className="cta-section">
          <h3>¿Listo para llevar el Omotenashi a tu organización?</h3>
          <div className="cta-buttons">
            <a
              href="mailto:cesar.chaves@rankomotenashi.com?subject=Solicitud%20de%20Charla%20Omotenashi"
              className="btn-primary animated-button"
            >
              Quiero información para mi evento y conferencia.
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CharlasOmotenashi;
