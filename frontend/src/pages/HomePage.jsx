import React from 'react'
import { useAuth } from '../contexts/AuthContext'; 
import Button from '../components/Button';

const HomePage = () => {
  const { user, logout } = useAuth(); // Obtem usuário e a função de logout

  const handleLogout = () => {
    logout(); // Chama a função de logout
  }


  return (
    <div className='home-container'>
      <h1 className='home-title'> 
        Bem-vindo(a), {user ? user.username : 'Visitante'}! 
      </h1>
      <p className='home-text'>
        Esta é a home. Você {user ? 'fez o login com sucesso!!' : 'não está logado.'}
      </p>

      { user && ( // Mostra o botão de logout apenas se houve um usuário logado
        <Button onClick={handleLogout}>
          Logout
        </Button>
      )}
    </div>
  );
};

export default HomePage;