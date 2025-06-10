import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

// Criando o contexto de autenticação
const AuthContext = createContext(null);

// Criando um hook customizado para facilitar o uso do contexto
export const useAuth = () => useContext(AuthContext);

// URL base do backend
const API_BASE_URL = 'http://localhost:5000/api/auth';

// Criando o provedor de autenticação que envolverá a aplicação
export const AuthProvider = ({ children }) => {
  // Armazenar o usuário logado.
  // Inicializa com o que estiver no localStorage
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const navigate = useNavigate();

  // Efeito para persistir o estado do usuário no localStorage
  // Sempre que 'user' mudar, ele será salvo no localStorage
  useEffect(() => {
    if (user && user.token){
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
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

      // Registro bem-sucedido
      return data;
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

  // O valor provido pelo contexto
  const value = {
    user,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};