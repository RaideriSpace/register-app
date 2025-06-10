import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext';

const RegisterPage = () => {

  const navigate = useNavigate();
  const { register } = useAuth();

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
      await register(username, email, password);

      setSuccess('Cadastro realizado com sucesso! Você será redirecionado para o login.');

      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      setTimeout(() => {
        navigate('/login');
      }, 2000); // Redireciona após 2 segundos

    } catch (err) {
      // Erros lançados pelo contexto são capturados aqui.
      setError (err.message || 'Ocorreu um erro ao tentar se cadastrar. Tente novamente.');
      console.error('Erro de cadastro: ', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='auth-container'>
      <h2 className='auth-title'> Cadastro </h2>
        
      <form onSubmit={handleSubmit} className='auth-form'>
        {error && <p className='auth-error'> {error} </p>}
        {success && <p className='auth-success'> {success} </p>}

        <InputField
          label='Nome de Usuário'
          type='text'
          id='username'
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