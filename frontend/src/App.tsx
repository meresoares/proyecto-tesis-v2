import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login/login-page';
import Registro from './pages/login/registro-page';
import Home from '../src/pages/usuario/home'
import UsuarioPage from './pages/usuario/usuario-page';
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
            <Route path="/registro" element={<Registro />} />
            <Route path="/home" element={<Home />} />
            <Route path="/usuario-page" element={< UsuarioPage/>} />
          </Routes>

        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
