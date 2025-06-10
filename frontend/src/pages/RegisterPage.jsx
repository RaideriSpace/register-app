import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';

const RegisterPage = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        if(!username || !email || !password || !confirmPassword) {
            setError('Por favor, preencha todos os campos.');
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('A senha deve ter no mínimo 6 caracteres.');
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError ('As senhas não coincidem.');
            setLoading (false);
            return;
        }

        try {
            // Registo da API
            console.log('Tentando registrar com: ', {username, email, password });
            await new Promise(resolve => setTimeout(resolve, 2000));

            setSuccess('Cadastro realizado com sucesso! Você pode fazer login agora.');
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');

        } catch (err) {
            setError ('Ocorreu um erro ao tentar se cadastrar. Tente novamente.');
            console.error('Erro de cadastro: ', err);
        } finally {
            setLoading(false);
        }
    };

  return (
    <div className='auth-container'>
        <h2 className='auth-title'> Cadastro </h2>
        <form>
            {error && <p className='auth-error'> {error} </p>}
            {success && <p className='auth-success'> {success} </p>}

            <InputField
                label='Nome de Usuário'
                type='text'
                id='usename'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='Seu nome'
                required
            />

            <InputField
                label = 'Email'
                type = 'email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='seuemail@example.com'
                required
            />

            <InputField
                label='Senha'
                type='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='•••••••'
                required
            />

            <InputField
                label='Confirmar Senha'
                type='password'
                id='confirmPassword'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder='•••••••'
                required
            />

            <Button type='submit' disabled={loading}>
                {loading ? 'Cadastrando...' : 'Cadastrar'}
            </Button>         
        </form>

        <p className='auth-switch-text'>
            Já tem uma conta? <Link to='/login' className='auth-switch-link'> Fazer Login</Link>
        </p>

    </div>
  )
}

export default RegisterPage