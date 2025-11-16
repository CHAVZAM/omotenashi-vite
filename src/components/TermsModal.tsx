import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./TermsModal.css";

type TermsModalProps = {
  open: boolean;
  onClose: () => void;
};

const TermsModal: React.FC<TermsModalProps> = ({ open, onClose }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="terms-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="terms-modal glass-effect"
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
          >
            <div className="terms-header">
              <h3>Términos y Condiciones</h3>
              <button className="terms-close" onClick={onClose}>✕</button>
            </div>

            <div className="terms-content">
              <h4>Uso de la plataforma</h4>
              <p>
                Esta plataforma se ofrece con fines formativos y de autoevaluación
                en el marco de los Indicadores Globales Omotenashi (IGO).
              </p>
              <p>
                Al continuar, aceptas utilizar el contenido de forma ética, no compartir
                materiales de acceso restringido y respetar la propiedad intelectual del autor.
              </p>

              <h4>Privacidad y datos</h4>
              <p>
                Los datos recabados (p. ej., nombre, correo, resultados de evaluación)
                se gestionan con fines de personalización y mejora de la experiencia.
                Puedes solicitar eliminación o rectificación de tus datos escribiendo a
                <strong> soporte@rankomotenashi.com</strong>.
              </p>

              <h4>Limitación de responsabilidad</h4>
              <p>
                Los resultados de autoevaluación no constituyen asesoría profesional.
                Para implementación empresarial, se recomienda una consultoría formal.
              </p>

              <h4>Contacto</h4>
              <p>
                Para soporte técnico o dudas, contáctanos en
                <strong> soporte@rankomotenashi.com</strong>.
              </p>
            </div>

            <div className="terms-actions">
              <button className="btn-terms" onClick={onClose}>He leído y entiendo</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TermsModal;
