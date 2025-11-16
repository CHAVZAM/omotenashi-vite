// ===== FILE: src/components/FormacionOnline/InteresModal.tsx =====
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./FormacionOnline.css";

type InteresModalProps = {
  open: boolean;
  onClose: () => void;
  defaultNombre?: string;
  defaultApellidos?: string;
  defaultEmail?: string;
  onSubmit?: (payload: any) => void;
};

const INTERESES = [
  { id: "info", label: "Quiero recibir más información de Omotenashi" },
  { id: "siguiente", label: "Quiero hacer el siguiente nivel" },
  { id: "empresa", label: "Quiero implementar Omotenashi en mi compañía/proyecto" },
  { id: "charla", label: "Quiero una charla/taller para mi equipo" },
];

export default function InteresModal({
  open,
  onClose,
  defaultNombre,
  defaultApellidos,
  defaultEmail,
  onSubmit,
}: InteresModalProps) {
  const [nombre, setNombre] = useState(defaultNombre || "");
  const [apellidos, setApellidos] = useState(defaultApellidos || "");
  const [profesion, setProfesion] = useState(""); // ← un solo campo
  const [edad, setEdad] = useState<number | undefined>(undefined);
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState(defaultEmail || "");
  const [intereses, setIntereses] = useState<string[]>([]);
  const [comentarios, setComentarios] = useState("");
  const [ok, setOk] = useState(false);

  const isValid = useMemo(() => {
    return (
      nombre.trim().length >= 2 &&
      apellidos.trim().length >= 2 &&
      email.trim().includes("@") &&
      telefono.trim().length >= 6 &&
      intereses.length > 0
    );
  }, [nombre, apellidos, email, telefono, intereses]);

  const toggleChip = (id: string) => {
    setIntereses((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    const payload = {
      nombre,
      apellidos,
      profesion,
      edad,
      telefono,
      email,
      intereses,
      comentarios,
      fecha: new Date().toISOString(),
      origen: "post-completion-omotenashi",
    };

    try {
      // 1) Enviar a backend si está configurado
      const api = import.meta.env.VITE_API_URL;
      if (api) {
        await fetch(`${api}/api/interes`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      // 2) Guardado local como respaldo
      const prev = JSON.parse(localStorage.getItem("omote_interes") || "[]");
      localStorage.setItem("omote_interes", JSON.stringify([payload, ...prev]));

      onSubmit?.(payload);
      setOk(true);
      setTimeout(() => {
        setOk(false);
        onClose();
      }, 1200);
    } catch {
      // Fallback solo local si el backend falla
      const prev = JSON.parse(localStorage.getItem("omote_interes") || "[]");
      localStorage.setItem("omote_interes", JSON.stringify([payload, ...prev]));
      onSubmit?.(payload);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-backdrop"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 4000,
            background:
              "linear-gradient(135deg, rgba(0,0,0,.55), rgba(155,45,48,.75))",
            display: "grid",
            placeItems: "center",
            backdropFilter: "blur(6px)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="modal glass"
            style={{
              width: "min(760px, 94vw)",
              borderRadius: 16,
              padding: 18,
              zIndex: 4100,
            }}
            initial={{ scale: 0.96, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 10 }}
          >
            <div className="modal-head">
              <h3>¿Quieres seguir avanzando?</h3>
              <button className="btn ghost" onClick={onClose}>Cerrar</button>
            </div>

            <form onSubmit={handleSubmit} className="interes-form interes-form--areas">
              {/* fila 1 */}
              <label className="ga-nombre">
                Nombre*
                <input value={nombre} onChange={(e) => setNombre(e.target.value)} required />
              </label>
              <label className="ga-apellidos">
                Apellidos*
                <input value={apellidos} onChange={(e) => setApellidos(e.target.value)} required />
              </label>

              {/* fila 2 */}
              <label className="ga-profesion">
                Profesión / Oficio
                <input value={profesion} onChange={(e) => setProfesion(e.target.value)} />
              </label>
              <label className="ga-telefono">
                Teléfono*
                <input value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
              </label>

              {/* fila 3 */}
              <label className="ga-edad">
                Edad
                <input
                  type="number"
                  min={10}
                  max={120}
                  value={edad ?? ""}
                  onChange={(e) => setEdad(e.target.value ? Number(e.target.value) : undefined)}
                />
              </label>
              <label className="ga-correo">
                Correo*
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </label>

              {/* chips + comentarios ocupan toda la fila */}
              <div className="ga-chips chips">
                {INTERESES.map((opt) => (
                  <button
                    type="button"
                    key={opt.id}
                    className={`chip ${intereses.includes(opt.id) ? "chip--sel" : ""}`}
                    onClick={() => toggleChip(opt.id)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <label className="ga-comentarios">
                Comentarios / contexto
                <textarea
                  rows={4}
                  value={comentarios}
                  onChange={(e) => setComentarios(e.target.value)}
                  placeholder="Cuéntanos qué necesitas, timing, equipo, etc."
                />
              </label>

              <div className="ga-actions modal-actions">
                <button type="button" className="btn ghost" onClick={onClose}>
                  Cancelar
                </button>
                <button type="submit" className="btn primary" disabled={!isValid}>
                  Enviar
                </button>
              </div>

              {ok && <p className="ok-msg">¡Gracias! Te contactaremos muy pronto ✨</p>}
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
