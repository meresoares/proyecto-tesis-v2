// export default Navbar;
// Navbar.tsx

import React from 'react';
import '../styles/estilo.css';


interface NavbarProps {
  user: any; // Puedes definir el tipo de usuario aquí
  handleLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, handleLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom" >
      <div className="container-fluid">
        <a className="navbar-brand text-white mx-auto" href="/home">ANSIEDAD - SISTEMA EXPERTO</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <div className="d-flex align-items-center">
            {user ? (
              <div className="d-flex align-items-center">
                <button className="btn btn-outline-light" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i>
                </button>
              </div>
            ) : (
              <p className="mb-0 text-white">No hay usuario autenticado</p>
            )}
          </div>
        </div>
      </div>
    </nav>
  );

};

export default Navbar;
