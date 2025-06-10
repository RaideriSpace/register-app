import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Obtem o estado do usuário do AuthContext

  // Se não houver usuário logado, redireciona para a página de login.
  if (!user) {

    // 'replace' garante que a entrada atual no histórico de navegação seja substituída, assim o usuário não pode simplesmente voltar para a página protegida.
    return <Navigate to='/login' replace />; 
  }

  return children;
};

export default ProtectedRoute;