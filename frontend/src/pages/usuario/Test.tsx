// Test.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../services/auth-service';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';

const Test: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const API_BASE_URL = 'http://localhost:3001/api';
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [respuestas, setRespuestas] = useState<string[]>(new Array(10).fill(''));
  const [registrado, setRegistrado] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const response = await axios.get(`${API_BASE_URL}/persons/${user.uid}`);
          if (response.data && response.data.formularioPacienteCompleto) {
            setRegistrado(true);
          }
        } catch (error) {
          console.error('Error al obtener la información del usuario:', error);
        }
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    if (registrado) {
      navigate('/test');
    }
  }, [registrado, navigate]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (!user) {
      setError('No hay un usuario autenticado.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const payload = {
        persona_id: user.uid,
        pregunta_1: respuestas[0],
        pregunta_2: respuestas[1],
        pregunta_3: respuestas[2],
        pregunta_4: respuestas[3],
        pregunta_5: respuestas[4],
        pregunta_6: respuestas[5],
        pregunta_7: respuestas[6],
        pregunta_8: respuestas[7],
        pregunta_9: respuestas[8],
        pregunta_10: respuestas[9],
      };

      const response = await axios.post(`${API_BASE_URL}/respuestas-ev`, payload);
      console.log(response.data);
      // Aquí puedes manejar la respuesta, por ejemplo, mostrar la evaluación al usuario
      // o guardar la respuesta en el estado.
    } catch (error) {
      console.error('Error al enviar las respuestas:', error);
      setError('Error al enviar las respuestas. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleChangeRespuesta = (index: number, respuesta: string) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[index] = respuesta;
    setRespuestas(nuevasRespuestas);
  };

  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-lg-9 my-5">
          <h1 className="text-black mb-4">Inventario de Ansiedad y Fobia Social (SPAI)</h1>
          <div className="card">
            <div className="card-body px-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Preguntas</th>
                        <th scope="col">Nunca</th>
                        <th scope="col">Muy poco</th>
                        <th scope="col">Un poco</th>
                        <th scope="col">Mucho</th>
                        <th scope="col">Demasiado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {respuestas.map((_, index) => (
                        <tr key={index}>
                          <td>Pregunta {index + 1}</td>
                          {['Nunca', 'Muy poco', 'Un poco', 'Mucho', 'Demasiado'].map((opcion, opcionIndex) => (
                            <td key={opcionIndex}>
                              <input
                                type="radio"
                                name={`respuesta${index + 1}`}
                                value={opcion}
                                checked={respuestas[index] === opcion}
                                onChange={(e) => handleChangeRespuesta(index, e.target.value)}
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="align-items-center pt-4">
                  <div className="text-center">
                    <button type="submit" className="btn btn-lg btn-primary my-4" disabled={loading}>
                      {loading ? 'Enviando...' : 'Enviar respuestas'}
                    </button>
                  </div>
                </div>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Test;
