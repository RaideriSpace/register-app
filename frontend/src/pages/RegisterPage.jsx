import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import MuiButton from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';

import PropTypes from 'prop-types';

import Box from '@mui/material/box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

const RegisterPage = () => {

  const navigate = useNavigate();
  const { register: authRegister } = useAuth();
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  // Inicializa o useForm
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const password = watch('password', ''); // Observa o campo password

  // Recebe os dados validados
  const onSubmit = async (data) => {
    setAuthError('');
    setLoading(true);

    try {
      await authRegister(data.username, data.email, data.password); 
      console.log('Registro bem-sucedido!');
      navigate('/');
    } catch (err) {
      setAuthError(err.message || 'Houve um erro no registro. Tente novamente.');
      console.error('Erro de registro: ', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: 'var(--auxiliary2-ex-dark)',
        padding: {xs: '18px 20px', sm: '18px 40px'},
        borderRadius: '10px',
        boxShadow: '0 4px 15px var(--tertiary-ex-dark-opacity)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        alignItems: 'center',
        color: 'white',
      }}
    >
      <Typography
        variant='h5'
        component='h2'
        sx={{ 
          marginBottom: '10px',
          color: 'white'
        }}
      >
        Cadastro
      </Typography>
      {authError && <Alert severity='error' sx={{ width: '100%' }}> {authError} </Alert>}

      <Box
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        sx={{ 
          width: '100%', 
          display: 'flex',
          flexDirection: 'Column',
          gap: '20px',
        }}
      >
        <InputField
          label='Nome de Usuário'
          type='text'
          id='username'
          placeholder='Seu nome'
          {...register('username', { 
            required: 'Por favor, digite um nome de usuário.', 
            minLength: {
              value: 3,
              message: 'O nome de usuário deve ter no mínimo 3 caracteres'
            }
          })}
          error={!!errors.username}
          helperText={errors.username ? errors.username.message : ''}
        />

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
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ''}
        />

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
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ''}
        />

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
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
        />

        <MuiButton type='submit' disabled={loading} style={{ backgroundColor: 'var(--secondary)'}}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </MuiButton>    
      </Box>

      <Typography variant='body2' sx={{ marginTop: '5px'}}>
        Já tem uma conta? 
        <Link to='/login' style={{ color: 'var(--secondary)', textDecoration: 'none'}}>
          &nbsp;Fazer Login
        </Link>
      </Typography>
    </Box>
  )
}

RegisterPage.propTypes = {}

export default RegisterPage