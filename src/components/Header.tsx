// src/components/Header.tsx
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import "./Header.css";

/** === Helpers seguros para localStorage === */
function readLoginVisible(): boolean {
  const saved = localStorage.getItem("loginVisible");
  // si existe y es "true" → el modal está visible ⇒ usuario NO logueado
  // por eso devolvemos !JSON.parse(saved)
  try {
    return saved ? !JSON.parse(saved) : false;
  } catch {
    return false;
  }
}

type UsuarioLS =
  | null
  | string
  | {
      username?: string;
      email?: string;
      avatar_url?: string;
    };

function readUsuario(): UsuarioLS {
  const raw = localStorage.getItem("usuario");
  if (!raw) return null;
  // A veces guardas un email simple; a veces un JSON
  try {
    return JSON.parse(raw);
  } catch {
    return raw; // email/usuario plano
  }
}

function usernameFromUsuario(u: UsuarioLS): string {
  if (!u) return "";
  if (typeof u === "string") {
    // si viene como email, saca la parte local
    return u.includes("@") ? u.split("@")[0] : u;
  }
  return u.username || (u.email ? u.email.split("@")[0] : "");
}

function avatarFromUsuario(u: UsuarioLS): string {
  if (!u) return "/images/icons/login.svg";
  if (typeof u === "string") return "/images/icons/login.svg";
  return u.avatar_url || "/images/icons/login.svg";
}

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => readLoginVisible());
  const [usuario, setUsuario] = useState<UsuarioLS>(() => readUsuario());

  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(readLoginVisible());
      setUsuario(readUsuario());
    };

    // Comprobación periódica (simple y efectiva para tu caso actual)
    const interval = setInterval(checkLoginStatus, 1000);

    // Reacciona a cambios en localStorage (si hay múltiples tabs)
    const onStorage = (e: StorageEvent) => {
      if (e.key === "loginVisible" || e.key === "usuario") {
        checkLoginStatus();
      }
    };
    window.addEventListener("storage", onStorage);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen((v) => !v);

  const handleNavLinkClick = () => {
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const manejarLogout = () => {
    localStorage.setItem("loginVisible", JSON.stringify(true));
    localStorage.removeItem("usuario");
    setIsLoggedIn(false);
    setUsuario(null);
    navigate("/");
    handleNavLinkClick();
  };

  const userName = usernameFromUsuario(usuario);
  const avatarUrl = avatarFromUsuario(usuario);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink to="/" onClick={handleNavLinkClick}>
          <img
            src="/images/omotenashilogo.png"
            alt="Omotenashi Logo"
            className="navbar-logo"
          />
        </NavLink>
      </div>

      <button
        className={`menu-toggle ${isMenuOpen ? "active" : ""}`}
        onClick={toggleMenu}
        aria-label="Abrir menú"
      >
        <span className="menu-toggle-line menu-toggle-line--top" />
        <span className="menu-toggle-line menu-toggle-line--middle" />
        <span className="menu-toggle-line menu-toggle-line--bottom" />
      </button>

      <ul className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
        <li>
          <button className="nav-button">
            <NavLink
              to="/"
              onClick={handleNavLinkClick}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <img src="/images/icons/inicioicon.svg" alt="Inicio" /> Inicio
            </NavLink>
          </button>
        </li>

        <li>
          <button className="nav-button">
            <NavLink
              to="/donde-comprar"
              onClick={handleNavLinkClick}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <img src="/images/icons/compras.svg" alt="Dónde comprar" /> Dónde
              comprar
            </NavLink>
          </button>
        </li>

        <li>
          <button className="nav-button">
            <NavLink
              to="/formacion-online"
              onClick={handleNavLinkClick}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <img
                src="/images/icons/formaciononline.svg"
                alt="Formación Online"
              />{" "}
              Formación Online
            </NavLink>
          </button>
        </li>

        <li>
          <button className="nav-button">
            <NavLink
              to="/calcula-omotenashi"
              onClick={handleNavLinkClick}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <img
                src="/images/icons/calculatuomotenashi.svg"
                alt="Calcula tu Omotenashi"
              />{" "}
              Calcula tu Omotenashi
            </NavLink>
          </button>
        </li>

        <li>
          <button className="nav-button">
            <NavLink
              to="/mapa-percepcion"
              onClick={handleNavLinkClick}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <img src="/images/icons/climamundial.svg" alt="Mapa" /> Percepción
              en el Mundo
            </NavLink>
          </button>
        </li>

        {/* === PATCH: reemplazo de Podcast por Charlas === */}
        <li>
          <button className="nav-button">
            <NavLink
              to="/charlas-omotenashi"
              onClick={handleNavLinkClick}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {/* Si no tienes aún el icono charlas.svg, deja temporalmente podcast.svg */}
              <img src="/images/icons/charlas.svg" onError={(e) => {
                  // fallback al viejo icono si no existe charlas.svg
                  (e.currentTarget as HTMLImageElement).src = "/images/icons/mic-svgrepo-com.svg";
                }}
                alt="Charlas"
              />{" "}
              Programa tu Charla
            </NavLink>
          </button>
        </li>

        <li>
          <button className="nav-button">
            <NavLink
              to="/comunidad-omotenashi"
              onClick={handleNavLinkClick}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <img src="/images/icons/blogcomunidad.svg" alt="Blog" /> Blog &
              Experiencias
            </NavLink>
          </button>
        </li>

        {isLoggedIn && userName ? (
          <li className="nav-avatar-menu">
            <img
              src={avatarUrl}
              alt="Avatar"
              className="avatar-img"
              data-tooltip-id="logout-tooltip"
              data-tooltip-content={`Cerrar sesión de ${userName}`}
              onClick={manejarLogout}
              style={{ cursor: "pointer" }}
            />
            <span className="username-text">{userName}</span>
            <Tooltip
              id="logout-tooltip"
              place="bottom"
              className="glassmorphic-tooltip"
            />
          </li>
        ) : (
          <li>
            <button className="nav-button">
              <NavLink
                to="/login"
                onClick={handleNavLinkClick}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <img src="/images/icons/login.svg" alt="Iniciar sesión" />{" "}
                Iniciar Sesión
              </NavLink>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Header;
