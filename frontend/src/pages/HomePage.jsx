import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext'; 
import Button from '../components/Button';
import PropTypes from 'prop-types';

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
    <div className='home-container'>
      <h1 className='home-title'> 
        Bem-vindo(a), {user ? user.username : 'Visitante'}! 
      </h1>
      <p className='home-text'>
        Esta é a home. Você {user ? 'fez o login com sucesso!!' : 'não está logado.'}
      </p>

      {deletionError && <p className='auth-error'>{deletionError}</p>}

      { user && ( // Mostra o botão de logout apenas se houve um usuário logado
        <>
          <Button onClick={handleLogout}>
            Logout
          </Button>
          <Button
            onClick={handleDeleteAccount}
            style={{ backgroundColor: '#dc3545', marginTop: '10px' }}
            disabled={deletionLoading} // Desabilita enquanto a exclusão está em andamento.
          >
            {deletionLoading ? 'Excluindo...' : 'Exluir Conta'}
          </Button>
        </>
      )}
    </div>
  );
};

HomePage.propTypes = {
};

export default HomePage;