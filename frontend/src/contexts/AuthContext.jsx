import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

// Criando o contexto de autenticação
const AuthContext = createContext(null);

// Criando um hook customizado para facilitar o uso do contexto
export const useAuth = () => useContext(AuthContext);

// Criando o provedor de autenticação que envolverá a aplicação
export const AuthProvider = ({ children }) => {
    // Armazenar o usuário logado.
    // Inicializa com o que estiver no localStorage
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const navigate = useNavigate();

    // Efeito para persistir o estado do usuário no localStorage
    // Sempre que 'user' mudar, ele será salvo no localStorage
    useEffect(() => {
        if (user){
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    // Função de Login (simulada)
    const login = async (email, password) => {
        // Simula uma chamada de API
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (email === 'teste@exemple.com' && password === 'senha123') {
            // Receberia dados do usuário e um token do backend
            const loggedInUser = { email: email, name: 'Usuário Teste' } // Dados do usuário
            setUser(loggedInUser); // Define o usuário no estado do contexto
            return true; 
        } else {
            throw new Error('Email ou senha inválidos.'); // Lança o erro em caso de falha.
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
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};