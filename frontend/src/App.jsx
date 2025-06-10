import react, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  return (
    <div className='app-container'> {/* Container para estilos globais */}
      
      <nav className='main-nav'>
        <Link to='/login' className='nav-link'> Login </Link>
        <Link to='/register' className='nav-link'> Cadastro </Link>
        <Link to='/' className='nav-link'> Home </Link>
      </nav>

      <Routes> {/* Rotas de navegação */}

        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />}/>

        {/* Para proteger a home */}
        <Route 
          path='/' 
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } 
        />

        <Route path='*' element={<h1> 404 - Página Não Encontrada </h1>}/>

      </Routes>

    </div>
  )
}

export default App
