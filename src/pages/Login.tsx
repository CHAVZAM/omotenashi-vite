import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Error al iniciar sesión.");
      }

      const userData = await response.json();
      localStorage.setItem("usuario", JSON.stringify(userData));
      localStorage.setItem("loginVisible", JSON.stringify(false));

      // 🔁 Disparo evento personalizado para que el Header lo escuche
      window.dispatchEvent(new Event("storage"));

      setError("");
      navigate(-1); // ← Te lleva a la página anterior
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Iniciar Sesión</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa tu correo"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
            required
          />
        </div>
        <button onClick={handleLogin}>Iniciar Sesión</button>
        <p className="register-link">
          ¿No tienes una cuenta? <a href="/register">Regístrate aquí</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
