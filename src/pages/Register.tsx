import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async () => {
    if (!username || !email || !password) {
      setError('Por favor, completa todos los campos obligatorios.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          email,
          password,
          avatar_url: avatarUrl || null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al registrar.');
      }

      setSuccess('Usuario registrado con éxito. Redirigiendo...');
      setError('');
      setTimeout(() => navigate(-1), 1500);
    } catch (err: any) {
      setError(err.message);
      setSuccess('');
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Crear Cuenta</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <div className="form-group">
          <label>Nombre de Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="ej: demo"
          />
        </div>
        <div className="form-group">
          <label>Correo Electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ej: demo@example.com"
          />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mínimo 6 caracteres"
          />
        </div>
        <div className="form-group">
          <label>Avatar (URL opcional)</label>
          <input
            type="text"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            placeholder="https://i.pravatar.cc/150?img=3"
          />
        </div>
        <button onClick={handleRegister}>Registrarse</button>
        <p className="login-link">
          ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
