import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
    // Inicializa o hook
    const navigate = useNavigate();
    const { login } = useAuth();

    // Armazenar os valores dos campos de input
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Lidar com erros ou mensagens de carregamento
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Lidar com o envio do formulário de login
    const handleSubmit = async (e) => {
        e.preventDefault(); // Impedir o comportamento padrão de recarregar a página
        setError(''); // Limpa mensagens de erro anteriores
        setLoading(true); // Ativa estado de carregamento

        // Validação
        if (!email || !password) {
            setError('Por favor, preencha todos os campos.');
            setLoading(false);
            return;
        }

        try {
            // Chama a função de login do contexto
            await login(email, password);
            console.log('Login bem-sucedido!');
            navigate('/');
        } catch (err) {
            // Capturar erros de requisição
            setError(err.message || 'Ocorreu um erro ao tentar fazer login. Tente novamente.');
            console.error('Erro de login: ', err);
        } finally {
            setLoading(false); // Desativa o estado de carregamento
        }
    };

    return (
        <div className='auth-container'>
            <h2 className='auth-title'> Login </h2>
            <form className='auth-form' onSubmit={handleSubmit}>
                {error && <p className='auth-error'>{error}</p>}

                <InputField
                    label='Email'
                    type='email'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}  // Atualiza o estado
                    placeholder='seuemail@exemple.com'
                    required
                />
                
                <InputField 
                    label='Senha'
                    type='password'
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Atualiza o estado
                    placeholder='•••••••'
                    required
                />

                <Button type='submit' disabled={loading}>
                    {loading ? 'Entrando...' : 'Entrar'} {/* Texto que altera com o estado do botão */}
                </Button>
            </form>

            <p className='auth-switch-text'>
                Não tem uma conta? <Link to='/register' className='auth-switch-link'>Cadastre-se</Link>
            </p>
        </div>
    );
};

export default LoginPage