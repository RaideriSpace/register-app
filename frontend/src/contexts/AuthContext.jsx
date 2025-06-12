import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

// Criando o contexto de autenticação
const AuthContext = createContext(null);

// Criando um hook customizado para facilitar o uso do contexto
export const useAuth = () => useContext(AuthContext);

// URL base do backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/auth';

// Criando o provedor de autenticação que envolverá a aplicação
export const AuthProvider = ({ children }) => {
  // Armazenar o usuário logado.
  // Inicializa com o que estiver no localStorage
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
      if (storedUser && storedToken) {
        return { ...JSON.parse(storedUser), token: storedToken };
      }
    } catch (error) {
      console.error("Erro ao paresear dados do localStorage, limpando...", error);
      localStorage.clear();
    }
    return null;
  });

  const navigate = useNavigate();

  // Efeito para persistir o estado do usuário no localStorage
  // Sempre que 'user' mudar, ele será salvo no localStorage
  useEffect(() => {
    if (user && user.token){
      localStorage.setItem('user', JSON.stringify({
        _id: user._id,
        username: user.username,
        email: user.email
      }));
      localStorage.setItem('token', user.token);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }, [user]);

  // Função de Login
  const login = async (email, password) => {
    try { 
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), 
      });

      const data = await response.json();

      if (!response.ok) {
        // Se a resposta não for OK (status 4xx, 5xx), lança um erro com a mensagem do backend
        throw new Error(data.message || 'Erro ao fazer login.');
      }

      // Login bem-sucedido: define o usuário (incluindo o token) no estado
      setUser(data);
      return true;
    } catch (error) {
      console.error('Erro no login: ', error.message);
      throw error; // Propaga o erro para o componente que chamou login (LoginPage)
    }
  };

  // Função de registro
  const register = async (username, email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/register`, { // Endpoint de registro
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }), // Envia os dados do registro
      });

      const data = await response.json();

      if (!response.ok) {
        // Lança um erro se a reposta não for OK
        throw new Error(data.message || 'Erro ao registrar usuário.');
      }

      // Registro bem-sucedido e logar automaticamente.
      setUser(data);
      return true;
    } catch (error) {
      console.error('Erro no registro: ', error.message);
      throw error;
    }
  };

  // Função de logout
  const logout = () => {
    setUser(null); // Limpa o usuário do estado
    navigate('/login'); // Redireciona para a página de login
  };

  // Função de exclusão de conta
  const deleteAccount = async () => {
    if (!user || !user.token) {
      console.warn('Tentativa de excluir conta sem autenticação.');
      throw new Error ('Você não está autenticado para excluir a conta.');
    } 

    try {
      const response = await fetch(`${API_BASE_URL}/delete-account`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Falha ao excluir a conta.');
      }

      logout();
      return true;
    } catch (error) {
      console.error('Erro ao excluir a conta:', error.message);
      throw error; 
    }
  };

  // O valor provido pelo contexto
  const value = {
    user,
    login,
    register,
    logout,
    deleteAccount
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};