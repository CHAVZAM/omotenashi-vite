import React from 'react';
import './Sidebar.css';

interface Nivel {
  titulo: string;
}

interface SidebarProps {
  niveles: Nivel[];
  expandedNivel: number;
  nivelesCompletados: boolean[];
  toggleNivel: (index: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ niveles, expandedNivel, nivelesCompletados, toggleNivel }) => {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Niveles del Curso</h2>
      <ul className="sidebar-list">
        {niveles.map((nivel, index) => (
          <li
            key={index}
            className={`sidebar-item ${expandedNivel === index ? 'active' : ''} ${nivelesCompletados[index] ? 'completed' : ''}`}
            onClick={() => toggleNivel(index)}
          >
            <span>{nivel.titulo}</span>
            <span className="sidebar-item-arrow">{expandedNivel === index ? '▴' : '▾'}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;