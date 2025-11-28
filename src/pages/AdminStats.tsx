import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./AdminStats.css";

type Stats = {
  home_page_visits: number;
  calcula_omotenashi_interactions: number;
  certificates_delivered: number;
};

const AdminStats: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const API_URL =
    import.meta.env.VITE_API_URL || "https://omotenashi-vite.vercel.app";

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`${API_URL}/api/stats`);
        const j = await r.json();
        if (j?.ok && j?.data) setStats(j.data);
      } catch (e) {
        console.error("No se pudo cargar stats:", e);
      }
    })();
  }, []);

  return (
    <section className="admin-stats-container" data-page="admin-stats">
      {/* Sello / marca interna visible arriba-derecha */}
      <div className="admin-brand-badge" data-test="brand-badge">
        <img src="/images/omotenashilogo.png" alt="Rank Omotenashi" />
        <span>Panel Interno</span>
      </div>

      <motion.h2
        className="admin-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        📊 Panel de Estadísticas Omotenashi
      </motion.h2>

      <div className="admin-cards">
        <div className="admin-card">
          <h3>Visitas Home</h3>
          <p>{stats?.home_page_visits ?? "—"}</p>
        </div>
        <div className="admin-card">
          <h3>Interacciones Calcula</h3>
          <p>{stats?.calcula_omotenashi_interactions ?? "—"}</p>
        </div>
        <div className="admin-card">
          <h3>Certificados</h3>
          <p>{stats?.certificates_delivered ?? "—"}</p>
        </div>
      </div>
    </section>
  );
};

export default AdminStats;
