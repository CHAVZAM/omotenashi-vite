// ===== FILE: src/components/FormacionOnline/MenuPrincipal.tsx =====
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./MenuPrincipal.css";

interface MenuNivelesProps {
  onSeleccionarNivel: (nivel: number) => void;
  nivelesEstado: { completado: boolean; aprobado: boolean }[];
  // Acepta también funciones async para evitar el error con Promise<void>
  onDescargarCertificado?: () => void | Promise<void>;
  // Hacemos opcional para que no rompa si el padre aún no la pasa
  onAbrirInteres?: () => void;
}

const MenuNiveles: React.FC<MenuNivelesProps> = ({
  onSeleccionarNivel,
  nivelesEstado,
  onDescargarCertificado,
  onAbrirInteres,
}) => {
  const [nivelSeleccionado, setNivelSeleccionado] = useState<number | null>(
    null
  );
  const [mensaje, setMensaje] = useState<string>("");

  const todosCompletados = nivelesEstado.every((n) => n.aprobado);
  const nivelesCompletados = nivelesEstado
    .map((estado, index) => (estado.completado ? index + 1 : null))
    .filter((n): n is number => n !== null);

  const manejarClickNivel = (nivel: number) => {
    const estado = nivelesEstado[nivel - 1];
    if (estado.aprobado) {
      alert("Este nivel ya ha sido aprobado y no se puede acceder nuevamente.");
      return;
    }
    if (estado.completado && !estado.aprobado) {
      if (confirm("Este nivel no fue aprobado. ¿Deseas reiniciarlo?")) {
        setMensaje("¡Buena suerte en el reinicio!");
        setNivelSeleccionado(nivel);
        setTimeout(() => {
          setMensaje("");
          onSeleccionarNivel(nivel);
        }, 1200);
      }
      return;
    }
    setMensaje("¡Buena suerte!");
    setNivelSeleccionado(nivel);
    setTimeout(() => {
      setMensaje("");
      onSeleccionarNivel(nivel);
    }, 1200);
  };

  const obtenerColorTajada = (nivel: number) => {
    const estado = nivelesEstado[nivel - 1];
    if (estado.aprobado) return "#32CD32";
    if (estado.completado) return "#FFC107";
    return "rgba(255, 255, 255, 0.25)";
  };

  return (
    <div className="menu-niveles-container">
      <motion.div
        className="menu-niveles__circulo-central"
        initial={{ scale: 0 }}
        animate={{
          scale: nivelSeleccionado ? 0.5 : 1,
          x: nivelSeleccionado ? "-150px" : "0px",
          y: "0px",
          boxShadow: nivelSeleccionado
            ? "0 8px 40px rgba(155, 45, 48, 0.5)"
            : "0 4px 30px rgba(0, 0, 0, 0.2)",
        }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {nivelSeleccionado === null && (
          <>
            {todosCompletados ? (
              <div className="formacion-certificado-wrapper">
                <div className="formacion-certificado-icon">🎉</div>

                {/* Descargar certificado (si la prop existe) */}
                <button
                  className="menu-niveles__boton-iniciar-curso"
                  onClick={onDescargarCertificado}
                  disabled={!onDescargarCertificado}
                  title={
                    onDescargarCertificado
                      ? "Descargar certificado"
                      : "Opción no disponible"
                  }
                >
                  Descargar Certificado
                </button>

                {/* CTA seguir avanzando (si la prop existe) */}
                <button
                  className="menu-niveles__boton-iniciar-curso alt"
                  onClick={onAbrirInteres}
                  disabled={!onAbrirInteres}
                  style={{ marginTop: 10 }}
                  title={
                    onAbrirInteres
                      ? "Quiero seguir avanzando"
                      : "Opción no disponible"
                  }
                >
                  Quiero seguir avanzando →
                </button>
              </div>
            ) : (
              <button
                className="menu-niveles__boton-iniciar-curso"
                onClick={() => {}}
              >
                {nivelesCompletados.length > 0
                  ? "Continuar Curso"
                  : "Iniciar Curso"}
              </button>
            )}
          </>
        )}

        {mensaje && <div className="menu-niveles__mensaje">{mensaje}</div>}

        {nivelSeleccionado === null && !todosCompletados && (
          <AnimatePresence>
            <motion.div
              className="menu-niveles__tajada menu-niveles__tajada-1"
              style={{ background: obtenerColorTajada(1) }}
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{ x: "-150px", y: "-150px", opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              onClick={() => manejarClickNivel(1)}
            >
              Nivel 1
            </motion.div>
            <motion.div
              className="menu-niveles__tajada menu-niveles__tajada-2"
              style={{ background: obtenerColorTajada(2) }}
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{ x: "150px", y: "-150px", opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              onClick={() => manejarClickNivel(2)}
            >
              Nivel 2
            </motion.div>
            <motion.div
              className="menu-niveles__tajada menu-niveles__tajada-3"
              style={{ background: obtenerColorTajada(3) }}
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{ x: "-150px", y: "150px", opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              onClick={() => manejarClickNivel(3)}
            >
              Nivel 3
            </motion.div>
            <motion.div
              className="menu-niveles__tajada menu-niveles__tajada-4"
              style={{ background: obtenerColorTajada(4) }}
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{ x: "150px", y: "150px", opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              onClick={() => manejarClickNivel(4)}
            >
              Nivel 4
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>
    </div>
  );
};

export default MenuNiveles;
