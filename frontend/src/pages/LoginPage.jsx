import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import MuiButton from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

const LoginPage = () => {
  // Inicializa o hook
  const navigate = useNavigate();
  const { login } = useAuth();

  // Lidar com erros ou mensagens de carregamento
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  // Inicializa o useForm
  const { register, handleSubmit, formState: { errors } } =  useForm();

  // Recebe os dados validados do formulário
  const onSubmit = async (data) => {
    setAuthError('');
    setLoading(true);

    try {
      await login(data.email, data.password);
      console.log('Login bem-sucedido!');
      navigate('/');
    } catch (err) {
      setAuthError(err.message || 'Erro ao tentar fazer login. Tente novamente.');
      console.error('Erro de login: ', err);
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
        alignItems: 'center',
        color: 'white',
      }}
    >
      <Typography variant='h5' component='h2' sx={{ marginBottom: '10px', color: 'white', fontWeight: 'bold'}}>
        Login
      </Typography>
      {authError && <Alert severity='error' sx={{ width: '100%' }}> {authError} </Alert>}

      <Box 
        component='form' 
        onSubmit={handleSubmit(onSubmit)} 
        sx={{ 
          width: '100%', 
          display: 'flex',
          flexDirection: 'column',
      }}>
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
          error={!!errors.email}
          helperText={errors.email ? errors.email.message: ''}
        />

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
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ''}
        />

        <MuiButton type='submit' disabled={loading} style={{ backgroundColor: 'var(--secondary)', margin: '14px 0'}}>
          {loading ? 'Entrando...' : 'Entrar'} {/* Texto que altera com o estado do botão */}
        </MuiButton>
      </Box>

      <Typography variant='body2' sx={{ marginTop: '5px' }}>
        Não tem uma conta? 
        <Link to='/register' style={{ color: 'var(--secondary', textDecoration: 'none', fontWeight: 'bold'}}>
          &nbsp;Cadastre-se
        </Link>
      </Typography>
    </Box>  
  );
};

LoginPage.PropTypes = {
}

export default LoginPage