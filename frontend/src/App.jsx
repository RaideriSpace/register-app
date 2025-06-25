import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { user } = useAuth ();
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className='app-container'> {/* Container para estilos globais */}
      
      <nav className='main-nav'>
        { !user && !isAuthPage && (
          <>
            <Link to='/login' className='nav-link'> Login </Link>
            <Link to='/register' className='nav-link'> Cadastro </Link>
          </>
        )}
        {isAuthPage && (
          <>
            {location.pathname !== '/login' && <Link to='/login' className='nav-link'> Login </Link>}
            {location.pathname !== '/register' && <Link to='/register' className='nav-link'> Cadastro </Link>}
          </>
        )}

        {user && (
          <Link to='/' className='nav-link'> Home </Link>
        )}
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
