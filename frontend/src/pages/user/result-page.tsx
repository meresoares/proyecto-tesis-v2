import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/auth-service';
import ResultadoEvaluacion from '../../components/result-evaluation-component';
import axios from 'axios';
import '../../components/layout-component'
import Layout from '../../components/layout-component';

const ResultPage: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const API_BASE_URL = 'http://localhost:3001/api';
  const [validated, setValidated] = useState(false);


 useEffect(() => {
    const fetchUserDetails = async () => {
      try {
          const userResponse = await axios.get(`${API_BASE_URL}/persons/${user?.uid}`);
          if (userResponse.status !== 200) {
              // Si el usuario no tiene UID, redirige a user-page
              navigate('/user-page');
          } else {
              const resultResponse = await axios.get(`${API_BASE_URL}/respuestas/${user?.uid}`);
              if (resultResponse.status !== 200) {
                  // Si el usuario no ha completado el test, redirige a test-page
                  navigate('/test-page');
              }
          }
      } catch (error) {
          console.error('Error al obtener los detalles del usuario:', error);
      } finally {
        setValidated(true);
      }
  };

  if (!validated && user) {
      fetchUserDetails();
  }

  }, [location, navigate, user, validated]);

  // Si location.state es null, no renderices nada o muestra un mensaje de carga
  if (!location.state || !location.state.resultado) {
    return null; // O puedes retornar un mensaje de carga, por ejemplo, <p>Loading...</p>
  }  

  

  const { resultado } = location.state;
  return (
    <Layout user={user} handleLogout={logout} title='¡Gracias por completar la evaluación!'
      subtitle=''>
      <div>
        <ResultadoEvaluacion resultado={resultado} />
      </div>
    </Layout>

  );
};

export default ResultPage;
