import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./SupportModal.css";

type SupportModalProps = {
  open: boolean;
  onClose: () => void;
  defaultNombre?: string;
  defaultEmail?: string;
};

const SupportModal: React.FC<SupportModalProps> = ({
  open, onClose, defaultNombre = "", defaultEmail = ""
}) => {
  const [nombre, setNombre] = useState(defaultNombre);
  const [email, setEmail] = useState(defaultEmail);
  const [mensaje, setMensaje] = useState("");

  const subject = useMemo(() => {
    const who = nombre?.trim() || email?.trim() || "Usuario";
    return `Soporte Formación Online — ${who}`;
  }, [nombre, email]);

  const body = useMemo(() => {
    const lines = [
      `Nombre: ${nombre || "(sin especificar)"}`,
      `Email: ${email || "(sin especificar)"}`,
      "",
      "Describe tu problema o duda:",
      mensaje || "(pendiente)"
    ];
    return encodeURIComponent(lines.join("\n"));
  }, [nombre, email, mensaje]);

  const handleEnviar = () => {
    const href = `mailto:soporte@rankomotenashi.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    window.location.href = href;
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="support-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="support-modal glass-effect"
            initial={{ scale: 0.95, y: 14, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 14, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 13 }}
          >
            <div className="support-header">
              <h3>Soporte — Formación Online</h3>
              <button className="support-close" onClick={onClose}>✕</button>
            </div>
            <div className="support-content">
              <label>
                Nombre
                <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
              </label>
              <label>
                Email
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </label>
              <label>
                Mensaje
                <textarea value={mensaje} onChange={(e) => setMensaje(e.target.value)} placeholder="Cuéntanos qué ocurre…" />
              </label>
              <div className="support-actions">
                <button className="btn-cancel" onClick={onClose}>Cancelar</button>
                <button className="btn-send" onClick={handleEnviar}>Enviar email</button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SupportModal;
