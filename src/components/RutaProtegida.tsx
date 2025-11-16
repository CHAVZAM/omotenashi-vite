import React from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

const RutaProtegida: React.FC<Props> = ({ children }) => {
  const usuario = localStorage.getItem('usuario');

  return usuario ? <>{children}</> : <Navigate to="/login" />;
};

export default RutaProtegida;
