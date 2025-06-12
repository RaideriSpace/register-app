import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';

import PropTypes from 'prop-types';

const RegisterPage = () => {

  const navigate = useNavigate();
  const { register: authRegister } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Inicializa o useForm
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const password = watch('password', ''); // Observa o campo password

  // Recebe os dados validados
  const onSubmit = async (data) => {
    setError('');
    setLoading(true);

    try {
      await authRegister(data.username, data.email, data.password); 
      console.log('Registro bem-sucedido!');
      navigate('/');
    } catch (err) {
      setError(err.message || 'Houve um erro no registro. Tente novamente.');
      console.error('Erro de registro: ', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='auth-container'>
      <h2 className='auth-title'> Cadastro </h2>
        
      <form className='auth-form' onSubmit={handleSubmit(onSubmit)}>
        {error && <p className='auth-error'> {error} </p>}

        <InputField
          label='Nome de Usuário'
          type='text'
          id='username'
          placeholder='Seu nome'
          {...register('username', { 
            required: 'Por favor, digite um nome de usuário.', 
            minLength: {
              value: 2,
              message: 'O nome de usuário deve ter no mínimo 2 caracteres'
            }
          })}
        />
        {errors.username && <p className='auth-error'> {errors.username.message} </p>}

        <InputField
          label = 'Email'
          type = 'email'
          id='email'
          placeholder='seuemail@example.com'
          {...register('email', { 
            required: 'Por favor, digite um email.', 
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
            required: 'Digite uma senha', 
            minLength: {
              value: 6,
              message: 'A senha deve ter no mínimo 6 caracteres'
            }
          })}
        />
        {errors.password && <p className='auth-error'> {errors.password.message} </p>}

        <InputField
          label='Confirmar Senha'
          type='password'
          id='confirmPassword'
          placeholder='•••••••'
          {...register('confirmPassword', {
            required: 'Por favor, confirme sua senha.',
            validate: value =>
              value === password || 'As senhas não coincidem'
          })}
        />
        {errors.confirmPassword && <p className='auth-error'>{errors.confirmPassword.message}</p>}

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

RegisterPage.propTypes = {}

export default RegisterPage