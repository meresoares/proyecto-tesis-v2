import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login-register/login-page';
import Registro from './pages/login-register/register-page';
import Home from './pages/user/home-page'
import UsuarioPage from './pages/user/user-page';
import TestPage from './pages/user/test-page';
import { AuthProvider } from './services/auth-service'; // Importa el proveedor de contexto de autenticación
import '@fortawesome/fontawesome-free/css/all.css';

function App() {
  return (
    <AuthProvider> {
      /* Envuelve la aplicación con el proveedor de contexto de autenticación */
    }
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register-page" element={<Registro />} />
            <Route path="/home" element={<Home />} />
            <Route path="/user-page" element={< UsuarioPage/>} />
            <Route path="/test-page" element={< TestPage/>} />
          </Routes>

        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;