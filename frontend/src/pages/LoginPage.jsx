import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

const LoginPage = () => {
  // Inicializa o hook
  const navigate = useNavigate();
  const { login } = useAuth();

  // Lidar com erros ou mensagens de carregamento
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Inicializa o useForm
  const { register, handleSubmit, formState: { errors } } =  useForm();

  // Recebe os dados validados do formulário
  const onSubmit = async (data) => {
    setError('');
    setLoading(true);

    try {
      await login(data.email, data.password);
      console.log('Login bem-sucedido!');
      navigate('/');
    } catch (err) {
      setError(err.message || 'Erro ao tentar fazer login. Tente novamente.');
      console.error('Erro de login: ', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='auth-container'>
      <h2 className='auth-title'> Login </h2>
      <form className='auth-form' onSubmit={handleSubmit(onSubmit)}>
        {error && <p className='auth-error'>{error}</p>}

        <InputField
          label='Email'
          type='email'
          id='email'
          placeholder='seuemail@exemple.com'
          {...register('email', { 
            required: 'Por favor, digite um e-mail.', 
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Email inválido'
            }
          })}
        />
        {errors.email && <p className='auth-error'> {errors.email.message} </p>}
                
        <InputField 
          label='Senha'
          type='password'
          id='password'
          placeholder='•••••••'
          {...register('password', { 
            required: 'Por favor, digite uma senha.', 
            minLength: {
              value: 6,
              message: 'A senha deve ter no mínimo 6 caracteres'
            }
          })}
        />
        { errors.password && <p className='auth-error'> {errors.password.message} </p>}

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

LoginPage.PropTypes = {
}

export default LoginPage