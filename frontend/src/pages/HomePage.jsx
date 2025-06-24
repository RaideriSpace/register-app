import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext'; 
import MuiButton from '../components/Button';
import PropTypes from 'prop-types';

import Box from '@mui/material/box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

const HomePage = () => {
  // Obtem usuário, a função de logout e a função de delete
  const { user, logout, deleteAccount } = useAuth(); 

  // Gerenciar erros e loading durante exclusão
  const [deletionError, setDeletionError] = useState('');
  const [deletionLoading, setDeletionLoading] = useState(false);


  const handleLogout = () => {
    logout(); // Chama a função de logout
  }

  const handleDeleteAccount = async () => {
    // Confirmação para evitar exclusão acidental
    if (window.confirm('Tem certeza que deseja excluir sua conta? Esta ação é irreversível.')) {
      setDeletionError('');
      setDeletionLoading(true);

      try {
        await deleteAccount(); // Faz o logout e redireciona para /login
        console.log('Conta excluída com sucesso!');
      } catch (error) {
        setDeletionError(error.message || 'Erro ao excluir a conta.');
        console.error('Erro na exclusão da conta: ', error);
      } finally {
        setDeletionLoading(false); // Desativa o estado de loading
      }
    }
  }

  return (
    <Box
      sx={{
        backgroundColor: 'var(--auxiliary2-ex-dark)',
        padding: { xs: '30px 20px', sm: '50px' },
        borderRadius: '10px',
        boxShadow: '0 4px 15px var(--tertiary-ex-dark-opacity)',
        width: '100%',
        maxWidth: '600px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        alignItems: 'center',
        color: 'white',
      }}
    >
      <Typography
        variant='h4'
        component='h1'
        sx={{ marginBottom: '10px', color: 'var(--secondary)' }}
      >
        Bem-vindo(a), {user ? user.username : 'Visitante'}!
      </Typography>

      <Typography
        variant='body1'
        sx={{
          marginBottom: '20px',
          color: 'white',
        }}
      >
        Esta é a home. Você {user ? 'fez login com sucesso!' : 'Não está logado.'}
      </Typography>
      {deletionError && 
        <Alert severity='error' sx={{ width: '100%', marginBottom: '15px'}}>
          {deletionError}
        </Alert>
      }

      { user && (
        <>
          <MuiButton onClick={handleLogout} style={{ backgroundColor: 'var(--primary)' }}>
            Logout
          </MuiButton>
          <MuiButton
            onClick={handleDeleteAccount}
            style={{ backgroundColor: '#dc3545', marginTop: '10px' }}
            disabled={deletionLoading} // Desabilita enquanto a exclusão está em andamento.
          >
            {deletionLoading ? 'Excluindo...' : 'Exluir Conta'}
          </MuiButton>
        </>
      )}
    </Box>
  );
};

HomePage.propTypes = {
};

export default HomePage;