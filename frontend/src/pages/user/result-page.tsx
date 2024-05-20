import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/auth-service';
import ResultadoEvaluacion from '../../components/result-evaluation-component';
import '../../components/layout-component'
import Layout from '../../components/layout-component';

const ResultPage: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    if (!location.state || !location.state.resultado) {
      // Si location.state es null, redirige al usuario a la página de inicio de sesión
      navigate('/');
    }
  }, [location, navigate]);

  // Si location.state es null, no renderices nada o muestra un mensaje de carga
  if (!location.state || !location.state.resultado) {
    return null; // O puedes retornar un mensaje de carga, por ejemplo, <p>Loading...</p>
  }

  const { resultado } = location.state;
  return (
    <Layout user={user} handleLogout={logout} title='Resultado de la evaluación'
      subtitle=''>
      <div>
        <ResultadoEvaluacion resultado={resultado} />
      </div>
    </Layout>

  );
};

export default ResultPage;
