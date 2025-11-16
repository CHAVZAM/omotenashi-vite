import React, { useState, useEffect } from "react";
import "./SiteStats.css"; // Asegúrate de que esta ruta sea correcta

interface SiteStatsProps {
  initialHomePageVisits?: number;
  initialCalculaOmotenashiInteractions?: number;
  initialCertificates?: number;
}

const SiteStats: React.FC<SiteStatsProps> = ({
  initialHomePageVisits = 0,
  initialCalculaOmotenashiInteractions = 0,
  initialCertificates = 0,
}) => {
  // Estados para los contadores, inicializados desde localStorage o valores por defecto
  const [homePageVisits, setHomePageVisits] = useState(() => {
    const storedVisits = localStorage.getItem("omotenashi_homeVisits");
    return storedVisits ? parseInt(storedVisits, 10) : initialHomePageVisits;
  });

  const [calculaOmotenashiInteractions, setCalculaOmotenashiInteractions] =
    useState(() => {
      const storedInteractions = localStorage.getItem(
        "omotenashi_calculaInteractions"
      );
      return storedInteractions
        ? parseInt(storedInteractions, 10)
        : initialCalculaOmotenashiInteractions;
    });

  const [certificates, setCertificates] = useState(() => {
    const storedCertificates = localStorage.getItem("omotenashi_certificates");
    return storedCertificates
      ? parseInt(storedCertificates, 10)
      : initialCertificates;
  });

  // Efecto para incrementar el contador de visitas a la Home Page (persistente)
  useEffect(() => {
    // Incrementa las visitas y guarda el nuevo valor en localStorage
    setHomePageVisits((prevVisits) => {
      const newVisits = prevVisits + 1;
      localStorage.setItem("omotenashi_homeVisits", newVisits.toString());
      return newVisits;
    });
  }, []); // El array vacío asegura que se ejecuta solo una vez al montar el componente

  // Efectos para guardar los contadores principales en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem("omotenashi_homeVisits", homePageVisits.toString());
  }, [homePageVisits]);

  useEffect(() => {
    localStorage.setItem(
      "omotenashi_calculaInteractions",
      calculaOmotenashiInteractions.toString()
    );
  }, [calculaOmotenashiInteractions]);

  useEffect(() => {
    localStorage.setItem("omotenashi_certificates", certificates.toString());
  }, [certificates]);

  return (
    <div className="site-stats-container">
      <h3 className="stats-title">Omotenashi en Números</h3>
      <div className="stats-grid">
        <div className="stat-card">
          <p className="stat-value">{homePageVisits}</p>
          <p className="stat-label">Visitas a la Página Principal</p>
        </div>

        <div className="stat-card">
          <p className="stat-value">{calculaOmotenashiInteractions}</p>
          <p className="stat-label">Interacciones en "Calcula tu Omotenashi"</p>
        </div>

        <div className="stat-card">
          <p className="stat-value">{certificates}</p>
          <p className="stat-label">Certificados Entregados</p>
        </div>
      </div>
      {/* Mensaje para el público */}
      <p className="stats-note">
        Los datos de nuestro contador son actualizados semanalmente.
      </p>
    </div>
  );
};

export default SiteStats;
