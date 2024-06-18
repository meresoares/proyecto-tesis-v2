// export default Login;
// login-page.tsx

import loginImage from '../../images/img-login.webp';
import '../../styles/estilo.css'
import Login from '../../components/login-component';
import { useLocation } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const location = useLocation();

  // Determinar si estamos en la página de login de administrador
  const isAdminPage = location.pathname === '/login-admin';

  return (
    <section className="login-container vh-100">
      <div className="container py-4 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: '1rem' }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img src={loginImage} alt="login form" className="img-fluid" style={{ borderRadius: '1rem 0 0 1rem' }} />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <Login isAdmin={isAdminPage}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
