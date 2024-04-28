// export default UsuarioPage;
// usuario-page.tsx

import React, { useEffect } from 'react';
import Navbar from '../../components/nav-bar';
import UsuarioFormulario from '../../components/formularios/usuario-formulario';
import '../../styles/login.css'
import { useAuth } from '../../services/auth-service';
import { useNavigate } from 'react-router-dom';

const UsuarioPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { logout } = useAuth();


  // Efecto secundario que se ejecuta cuando el valor de "user" cambia
  useEffect(() => {
    // Verifica si no hay usuario autenticado
    if (!user) {
      // Redirige al usuario a la página de inicio si no está autenticado
      navigate('/', { replace: true });
    }
  },
    // Se ejecuta cada vez que el valor de "user" o "navigate" cambia
    [user, navigate]);



  return (

    <div className="usuario-container">
      <Navbar user={user} handleLogout={logout} />
      <div className="container">
        <div className="row justify-content-center align-items-center vh-100">
          <div className="col-lg-9 my-5">
            <div className="card" style={{ maxWidth: '100%' }}>
              <div className="card-body px-4">
                <UsuarioFormulario />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsuarioPage;
