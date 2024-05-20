// src/pages/TestPage.tsx

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../services/auth-service';
import axios from 'axios';
import Questions from '../../components/questions-component';
import Layout from '../../components/layout-component';
import { useNavigate } from 'react-router-dom';
import '../../styles/estilo.css';

interface Pregunta {
  id: number;
  descripcion: string;
}

const TestPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate(); 
  const API_BASE_URL = 'http://localhost:3001/api';
  const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
  // Estado para almacenar las respuestas del cuestionario
  const [respuestas, setRespuestas] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPreguntas = async () => {
      setLoading(true);
      try {
        // Obtener preguntas desde la API
        const response = await axios.get(`${API_BASE_URL}/preguntas`);
        setPreguntas(response.data);
      } catch (error) {
        console.error('Error al obtener las preguntas:', error);
        // Manejar el error
      } finally {
        setLoading(false);
      }
    };

    const fetchUserDetails = async () => {
      try {
        const resultResponse = await axios.get(`${API_BASE_URL}/respuestas/${user?.uid}`);
        if (resultResponse.status === 200) {
          navigate('/result-page');
        } else {
          navigate('/test-page');
        }
      } catch (error) {
        console.error('Error al obtener los detalles del usuario:', error);
      }
    }

    // Verificar si el usuario ha completado el formulario de usuario al cargar la página
    if (user) {
      fetchUserDetails();
    }

    fetchPreguntas();
  }, [user, navigate]);
  
  // Función para manejar el cambio de respuesta
  const handleChangeRespuesta = (preguntaId: number, respuesta: string) => {
    setRespuestas(prevRespuestas => ({
      ...prevRespuestas,
      [preguntaId]: respuesta,
    }));
  };

  // Función para enviar las respuestas al backend
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true); // Activa el indicador de carga
    try {
      const personaId = user?.uid;
      const data = {
        persona_id: personaId,
        respuestas: Object.keys(respuestas).map(preguntaId => ({
          pregunta_id: parseInt(preguntaId),
          respuesta: respuestas[parseInt(preguntaId)],
        })),
      };
      // Envía las respuestas al backend para su evaluación
      const response = await axios.post(`${API_BASE_URL}/respuestas`, data);
      
      const resultadoEvaluacion = response.data.resultado;
      
      // Redirige a la página de resultados después de enviar las respuestas
      navigate('/result-page', { state: {resultado: resultadoEvaluacion}});
      console.log('Respuesta enviada:', response.data);
      // Realiza cualquier acción adicional después de enviar las respuestas, como mostrar un mensaje de éxito o redirigir a otra página
    } catch (error) {
      console.error('Error al enviar las respuestas:', error);
      // Maneja el error de acuerdo a tus necesidades, como mostrar un mensaje de error al usuario
    } finally {
      // Desactiva el indicador de carga
      setLoading(false);
    }
  };

  return (
    <Layout user={user} handleLogout={logout} title='Cuestionario de Ansiedad Social para Adultos (CASO A-30)'
      subtitle='A continuación se presenta una serie de situaciones sociales que le pueden producir malestar, tensión o nerviosismo. Por favor seleccione la opción que mejor refleje según la escala que se presenta más abajo'>
      <p>En el caso que no haber vivido algunas de las situaciones, imagínese cuál sería el grado de malestar, tensión o nerviosismo que le ocasionaría y seleccione el numero correspondiente. </p>
      <p>Por favor hágalo de manera sincera, no se preocupe porque no existen respuestas correctas o incorrectas. </p>
      <div>
        <form onSubmit={handleSubmit}>
          <Questions preguntas={preguntas} onChangeRespuesta={handleChangeRespuesta} />

          <div className="text-center">
            <button className="btn btn-dark btn-lg" type="submit" disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar y Evaluar'}
            </button>
          </div>        
        </form>
      </div>
    </Layout>

  );
};

export default TestPage;