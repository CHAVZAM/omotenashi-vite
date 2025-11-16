// src/components/FormacionOnline/InfografiaNivel.tsx
import React, { Suspense, lazy } from "react";
import "./InfografiaNivel.css";

interface InfografiaProps {
  nivel: number;
}

const L1 = lazy(() => import("./InfografiaNivel1"));
const L2 = lazy(() => import("./InfografiaNivel2"));
const L3 = lazy(() => import("./InfografiaNivel3"));
const L4 = lazy(() => import("./InfografiaNivel4"));

const InfografiaNivel: React.FC<InfografiaProps> = ({ nivel }) => {
  const renderNivel = () => {
    switch (nivel) {
      case 1: return <L1 />;
      case 2: return <L2 />;
      case 3: return <L3 />;
      case 4: return <L4 />;
      default: return <p>Infografía no disponible para este nivel.</p>;
    }
  };

  return (
    <div className="infografia-page-container">
      <header className="infografia-header text-center py-4">
        <img
          src="/images/omotenashilogo.png"
          alt="Logo Rank Omotenashi"
          className="infografia-logo"
        />
        <h1 className="text-2xl font-bold" style={{ color: "#9b2d30" }}>
          Infografía Nivel {nivel}
        </h1>
      </header>

      <Suspense fallback={<div className="p-4 text-center">Cargando infografía…</div>}>
        <div className="infografia-body">{renderNivel()}</div>
      </Suspense>
    </div>
  );
};

export default InfografiaNivel;
