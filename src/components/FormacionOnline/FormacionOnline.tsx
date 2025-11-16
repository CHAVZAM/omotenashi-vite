// ===== FILE: src/components/FormacionOnline/FormacionOnline.tsx =====
import React, { useState, useEffect } from 'react';
import MenuNiveles from './MenuPrincipal';
import NivelVisual from './ContenidoNivel';
import ProgresoGeneral from './ProgresoGeneral';
import { AnimatePresence, motion } from 'framer-motion';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import InteresModal from './InteresModal'; // ===== PATCH: nuevo modal de interés
import './FormacionOnline.css';
import SupportModal from './SupportModal'; // NUEVO

interface NivelEstado {
  completado: boolean;
  aprobado: boolean;
}

type PerfilUsuario = {
  nombre: string;
  apellido1: string;
  apellido2?: string;
  email?: string;
};

const FormacionOnline: React.FC = () => {
  const [nivelSeleccionado, setNivelSeleccionado] = useState<number | null>(null);

  const [nivelesEstado, setNivelesEstado] = useState<NivelEstado[]>(() => {
    const saved = localStorage.getItem('nivelesEstado');
    return saved
      ? JSON.parse(saved)
      : [
          { completado: false, aprobado: false },
          { completado: false, aprobado: false },
          { completado: false, aprobado: false },
          { completado: false, aprobado: false },
        ];
  });

  const [loginVisible, setLoginVisible] = useState<boolean>(() => {
    const savedLogin = localStorage.getItem('loginVisible');
    return savedLogin ? JSON.parse(savedLogin) : true;
  });

  const [usuario, setUsuario] = useState<string>(() => {
    const savedUsuario = localStorage.getItem('usuario');
    return savedUsuario || '';
  });

  const [perfil, setPerfil] = useState<PerfilUsuario>(() => {
    const raw = localStorage.getItem('usuarioPerfil');
    return raw ? JSON.parse(raw) : { nombre: '', apellido1: '', apellido2: '', email: '' };
  });

  const [showCongrats, setShowCongrats] = useState<boolean>(() => {
    const saved = localStorage.getItem('certGranted');
    return saved ? JSON.parse(saved) : false;
  });

  // ===== PATCH: estado para modal de interés
  const [mostrarInteres, setMostrarInteres] = useState(false);
  const abrirInteres = () => setMostrarInteres(true);
  const cerrarInteres = () => setMostrarInteres(false);

  const allApproved = nivelesEstado.every((n) => n.completado && n.aprobado);
  // Soporte — modal
const [showSupport, setShowSupport] = useState(false);
const openSupport = () => setShowSupport(true);
const closeSupport = () => setShowSupport(false);

  // --- Helpers de perfil / usuario ---
  const isPerfilCompleto = (p: PerfilUsuario) =>
    !!(p?.nombre?.trim() && p?.apellido1?.trim());

  const safeUserNameFromUsuario = (usuarioRaw: string) => {
    try {
      if (usuarioRaw?.trim()?.startsWith('{')) {
        const parsed = JSON.parse(usuarioRaw);
        if (parsed?.nombre && parsed?.apellido1) {
          return `${parsed.nombre} ${parsed.apellido1}`;
        }
        if (parsed?.email && typeof parsed.email === 'string') {
          return String(parsed.email).split('@')[0];
        }
      }
    } catch {}
    return usuarioRaw;
  };

  const nameFromEmail = (email: string) => {
    const local = (email || '').split('@')[0].replace(/[._-]+/g, ' ');
    return local
      .split(' ')
      .filter(Boolean)
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(' ')
      .trim();
  };

  // -------- Helpers nombre para certificado --------
  const getDisplayName = () => {
    const p = perfil;
    if (p?.nombre?.trim() && p?.apellido1?.trim()) {
      const ap2Ini = p.apellido2?.trim() ? ` ${p.apellido2.trim()[0].toUpperCase()}.` : '';
      return `${p.nombre.trim()} ${p.apellido1.trim()}${ap2Ini}`;
    }
    const limpio = safeUserNameFromUsuario(usuario || '');
    if (limpio && limpio.includes('@')) return limpio.split('@')[0];
    return limpio || 'Usuario Anónimo';
  };

  // Persistencias
  useEffect(() => {
    localStorage.setItem('loginVisible', JSON.stringify(loginVisible));
    localStorage.setItem('usuario', usuario);
    localStorage.setItem('usuarioPerfil', JSON.stringify(perfil));
  }, [loginVisible, usuario, perfil]);

  useEffect(() => {
    localStorage.setItem('nivelesEstado', JSON.stringify(nivelesEstado));
  }, [nivelesEstado]);

  // Forzar login si el perfil está incompleto
  useEffect(() => {
    const incompleto = !isPerfilCompleto(perfil);
    if (incompleto) {
      setLoginVisible(true);
      localStorage.setItem('loginVisible', JSON.stringify(true));
    }
  }, [perfil]);

  // ===== PATCH: Detectar CAMBIO DE CUENTA (usuario/email distinto) y reabrir modal con prefill
  useEffect(() => {
    const u = safeUserNameFromUsuario(usuario || '');
    if (!u || !u.includes('@')) return;
    if (loginVisible) return;

    const perfilEmail = (perfil?.email || '').toLowerCase();
    if (!perfilEmail || perfilEmail !== u.toLowerCase()) {
      setPerfil((p) => ({
        ...p,
        email: u,
        nombre: p?.nombre?.trim() ? p.nombre : nameFromEmail(u),
      }));
      setLoginVisible(true);
      localStorage.setItem('loginVisible', JSON.stringify(true));
    }
  }, [usuario, loginVisible, perfil?.email]);

  // Descarga automática del certificado al completar los 4 niveles
  useEffect(() => {
    if (allApproved && !showCongrats) {
      setShowCongrats(true);
      localStorage.setItem('certGranted', JSON.stringify(true));
      setTimeout(() => {
        handleGenerarCertificadoConQR();
      }, 700);
    }
  }, [allApproved, showCongrats]);

  // Navegación
  const manejarSeleccionNivel = (nivel: number) => setNivelSeleccionado(nivel);

  const manejarCompletarNivel = (aprobado: boolean) => {
    if (nivelSeleccionado !== null) {
      setNivelesEstado((prev) => {
        const nuevosEstados = [...prev];
        nuevosEstados[nivelSeleccionado - 1] = { completado: true, aprobado };
        return nuevosEstados;
      });
    }
    manejarVolverMenu();
  };

  const manejarVolverMenu = () => setNivelSeleccionado(null);

  // Login
  const manejarLogin = () => {
    const usuarioLimpio = safeUserNameFromUsuario(usuario || '');
    if (!perfil.nombre?.trim() || !perfil.apellido1?.trim()) {
      alert('Por favor, completa al menos Nombre y Primer apellido.');
      return;
    }
    if (!perfil.email && usuarioLimpio.includes('@')) {
      setPerfil((p) => ({ ...p, email: usuarioLimpio }));
    }
    setUsuario(usuarioLimpio);
    setLoginVisible(false);
  };

  const manejarLogout = () => {
    // Mantener perfil para no hacerlo tedioso
    setUsuario('');
    setLoginVisible(true);
    localStorage.removeItem('usuario');
    localStorage.setItem('loginVisible', JSON.stringify(true));
  };

  // ---------- Certificado ----------
  const buildQRPayload = (nombre: string, fechaISO: string, niveles: NivelEstado[]) => ({
    tipo: 'cert_omotenashi_v1',
    nombre,
    fecha: fechaISO,
    niveles: niveles.map((n, i) => ({
      nivel: i + 1,
      completado: n.completado,
      aprobado: n.aprobado,
    })),
    verificacion: `OMTN-${Date.now()}`,
  });

  const handleGenerarCertificadoConQR = async () => {
    try {
      const nombre = getDisplayName();
      const payload = buildQRPayload(nombre, new Date().toISOString(), nivelesEstado);
      const qrDataUrl = await QRCode.toDataURL(JSON.stringify(payload), { margin: 1, scale: 4 });

      // Genera y guarda el PDF
      generarCertificado(qrDataUrl, nombre);

      // === PATCH: registrar descarga en backend (después de guardar el PDF)
      try {
        const api = import.meta.env.VITE_API_URL;
        if (api) {
          await fetch(`${api}/api/certificados`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              nombre,
              email: perfil?.email,
              origen: "formacion-online",
            }),
          });
        }
      } catch (err) {
        console.warn("No se pudo registrar el certificado:", err);
      }
    } catch (e) {
      console.error('Error generando QR:', e);
      // Aún permitimos generar el PDF sin QR
      generarCertificado(undefined, getDisplayName());
    }
  };

  const generarCertificado = (qrDataUrl?: string, displayName?: string) => {
    const nombre = displayName || getDisplayName();

    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'pt',
      format: [612, 396],
    });

    const imgLogo = new Image();
    const imgFirma = new Image();
    imgLogo.src = '/images/omotenashilogo.png';
    imgFirma.src = '/images/firmadigital.png';

    const fuentePrincipal = 'Helvetica';
    const colorTextoPrincipal = '#333333';
    const colorAcento = '#9b2d30';
    const colorFondo = '#FFFFFF';

    // Fondo
    doc.setFillColor(colorFondo);
    doc.rect(0, 0, 612, 396, 'F');

    // Figuras decorativas
    try {
      doc.setFillColor(colorAcento);
      // @ts-ignore
      doc.triangle(0, 0, 0, 200, 80, 0, 'F');
      doc.rect(0, 200, 20, 196, 'F');
      doc.setFillColor('#4a5568');
      // @ts-ignore
      doc.triangle(612, 0, 612, 200, 532, 0, 'F');
      doc.rect(592, 200, 20, 196, 'F');
    } catch {}

    // Marco
    doc.setDrawColor(colorAcento);
    doc.setLineWidth(2);
    doc.roundedRect(10, 10, 592, 376, 10, 10, 'S');

    // Logo
    try {
      doc.addImage(imgLogo, 'PNG', 50, 20, 80, 60);
    } catch {}

    // Títulos
    doc.setFont(fuentePrincipal, 'bold');
    doc.setTextColor(colorTextoPrincipal);
    doc.setFontSize(24);
    doc.text('Certificado de Reconocimiento', 306, 80, { align: 'center' });

    doc.setFont(fuentePrincipal, 'normal');
    doc.setFontSize(16);
    doc.text('Por su iniciación en Omotenashi', 306, 110, { align: 'center' });

    doc.setFont(fuentePrincipal, 'bold');
    doc.setFontSize(28);
    doc.setTextColor(colorAcento);
    doc.text('Otorgado a:', 306, 180, { align: 'center' });
    doc.text(nombre, 306, 210, { align: 'center' });

    // Texto central
    doc.setFont(fuentePrincipal, 'normal');
    doc.setFontSize(12);
    doc.setTextColor(colorTextoPrincipal);
    const texto =
      'En reconocimiento a su compromiso y exitosa culminación de los 4 niveles iniciales de formación en Omotenashi y la búsqueda de la excelencia en el servicio.';
    const lineas = doc.splitTextToSize(texto, 350);
    doc.text(lineas, 306, 250, { align: 'center' });

    // Fecha
    doc.setFontSize(10);
    doc.text(`Fecha de Emisión: ${new Date().toLocaleDateString()}`, 306, 310, { align: 'center' });

    // Firma
    try {
      doc.addImage(imgFirma, 'PNG', 276, 310, 60, 40);
    } catch {}
    doc.setFont(fuentePrincipal, 'normal');
    doc.setFontSize(11);
    doc.setTextColor(colorTextoPrincipal);
    doc.text('César J. Chaves', 306, 360, { align: 'center' });
    doc.setFontSize(9);
    doc.text('CEO & Founder — RankOmotenashi', 306, 375, { align: 'center' });

    // QR opcional
    if (qrDataUrl) {
      doc.addImage(qrDataUrl, 'PNG', 500, 260, 80, 80);
      doc.setFont(fuentePrincipal, 'normal');
      doc.setFontSize(8);
      doc.setTextColor(colorTextoPrincipal);
      doc.text('Verificación QR', 540, 350, { align: 'center' });
    }

    // Descarga del PDF
    doc.save(`${nombre}_certificado_omotenashi.pdf`);
  };

  return (
    <div className="formacion-online-container main-under-header">
      <motion.div
        className="background-blur"
        initial={{ opacity: 1, filter: 'blur(0px)' }}
        animate={{
          opacity: nivelSeleccionado !== null ? 0.95 : 1,
          filter: nivelSeleccionado !== null ? 'blur(4px)' : 'blur(0px)',
          background:
            nivelSeleccionado !== null
              ? [
                  'linear-gradient(45deg, #ff9999, #9b2d30, #ffb7c5)',
                  'linear-gradient(135deg, #ff9999, #9b2d30, #ffb7c5)',
                  'linear-gradient(225deg, #ff9999, #9b2d30, #ffb7c5)',
                  'linear-gradient(315deg, #ff9999, #9b2d30, #ffb7c5)',
                ]
              : [
                  'linear-gradient(45deg, #ffdfdf, #9b2d30, #ffdfdf)',
                  'linear-gradient(135deg, #ff9999, #9b2d30, #ffdfdf)',
                  'linear-gradient(225deg, #ffdfdf, #9b2d30, #ffdfdf)',
                  'linear-gradient(315deg, #ffdfdf, #9b2d30, #ffdfdf)',
                ],
        }}
        transition={{
          background: { duration: 5, repeat: Infinity, repeatType: 'loop', ease: 'linear' },
          opacity: { duration: 1.2, ease: 'easeInOut' },
          filter: { duration: 1.2, ease: 'easeInOut' },
        }}
      />

      {/* MODAL LOGIN */}
      {loginVisible && (
        <div className="formacion-login-overlay glass-effect">
          <div className="formacion-login-modal glass-effect">
            <h3>Login</h3>

            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Usuario o Email (ej. test)"
            />

            <input
              type="text"
              value={perfil.nombre}
              onChange={(e) => setPerfil({ ...perfil, nombre: e.target.value })}
              placeholder="Nombre"
            />
            <input
              type="text"
              value={perfil.apellido1}
              onChange={(e) => setPerfil({ ...perfil, apellido1: e.target.value })}
              placeholder="Primer apellido"
            />
            <input
              type="text"
              value={perfil.apellido2}
              onChange={(e) => setPerfil({ ...perfil, apellido2: e.target.value })}
              placeholder="Segundo apellido (opcional)"
            />

            <button onClick={manejarLogin}>Iniciar Sesión</button>
          </div>
        </div>
      )}

      <div className="contenido-formacion">
        <ProgresoGeneral
          nivelesCompletados={nivelesEstado
            .map((estado, index) => (estado.completado ? index + 1 : null))
            .filter((n): n is number => n !== null)}
          totalNiveles={4}
          className="glass-effect"
        />

        {nivelSeleccionado === null ? (
          <MenuNiveles
            onSeleccionarNivel={manejarSeleccionNivel}
            nivelesEstado={nivelesEstado}
            onDescargarCertificado={handleGenerarCertificadoConQR}
            onAbrirInteres={abrirInteres} // ===== PATCH: CTA seguir avanzando
          />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              className="formacion-nivel-visual-wrapper"
              key="nivel-visual"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            >
              <div className="btn-volver-wrapper">
                <button className="btn-volver glass-effect" onClick={manejarVolverMenu}>
                  Volver al Menú de Niveles
                </button>
              </div>
              <NivelVisual
                nivel={nivelSeleccionado}
                onCompletarNivel={manejarCompletarNivel}
                className="glass-effect"
              />
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Telón de Felicitación */}
      {showCongrats && (
        <motion.div
          className="fixed inset-0 z-[2000] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{
            background: 'linear-gradient(135deg, rgba(0,0,0,0.65), rgba(155,45,48,0.85))',
            backdropFilter: 'blur(6px)',
          }}
        >
          <motion.div
            initial={{ scale: 0.8, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 12 }}
            className="glass-effect"
            style={{ maxWidth: 560, textAlign: 'center', padding: 20, borderRadius: 16 }}
          >
            <h2 style={{ color: '#fff', fontSize: 28, marginBottom: 10 }}>¡Felicitaciones! 🎉</h2>
            <p style={{ color: '#fff', marginBottom: 18 }}>
              Has completado y aprobado los 4 niveles de Omotenashi.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn-volver" onClick={() => setShowCongrats(false)}>
                Seguir explorando
              </button>
              <button className="btn-volver" onClick={handleGenerarCertificadoConQR}>
                Descargar Certificado con QR
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* MODAL INTERÉS */}
      <InteresModal
        open={mostrarInteres}
        onClose={cerrarInteres}
        defaultNombre={perfil?.nombre}
        defaultApellidos={[perfil?.apellido1, perfil?.apellido2].filter(Boolean).join(' ')}
        defaultEmail={perfil?.email}
      />
      {/* Botón flotante de Soporte */}
<button className="support-fab" onClick={openSupport} title="Soporte técnico · Formación Online">
  <img src="<span>🛟</span> o <span>🛠️</span>." alt="" style={{ width: 18, height: 18 }} />
  <span>Soporte</span>
</button>

{/* Modal Soporte */}
<SupportModal
  open={showSupport}
  onClose={closeSupport}
  defaultNombre={[perfil?.nombre, perfil?.apellido1].filter(Boolean).join(' ')}
  defaultEmail={perfil?.email || ''}
/>

      
      {/* BLOQUE DE SIMULACIÓN — DESACTIVADO (solo para debug futuro)/*
      {import.meta.env.MODE === 'development' && (
        <button
          onClick={() => {
            setNivelesEstado([
              { completado: true, aprobado: true },
              { completado: true, aprobado: false },
              { completado: false, aprobado: false },
              { completado: false, aprobado: false },
            ]);
          }}
          style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 1000,
            padding: '10px 20px',
            background: '#9b2d30',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Simular nivel 2 no aprobado
        </button>
      )}
      */ }

    </div>
  );
};

export default FormacionOnline;
