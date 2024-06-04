// export default UsuarioPage;
// user-page.tsx

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../services/auth-service';
import Layout from '../../components/layout-component'
import { useNavigate } from 'react-router-dom';
import { SexoSelect, FechaNacimientoPicker, UniversidadCarreraSelect } from '../../components/user-component';
import '../../styles/estilo.css'
import DatePicker from 'react-datepicker';
import { differenceInYears, format } from 'date-fns';

const UserPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const datePickerRef = useRef<DatePicker>(null);
  const API_BASE_URL = 'http://localhost:3001/api';
  const [sexo, setSexo] = useState<string>('');
  const [universidad, setUniversidad] = useState<string>('');
  const [carrera, setCarrera] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
        try {
            const userResponse = await axios.get(`${API_BASE_URL}/persons/${user?.uid}`);
            if (userResponse.status === 200) {
                // El usuario ya completó el formulario, redirige a test-page
                navigate('/test-page');
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
}, [user, navigate, validated]);


  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (!user) {
      setError('No hay un usuario autenticado.');
      return;
    }


    // Validar que todos los campos estén llenos
    if (!sexo || !universidad || !carrera || !startDate) {
      setError('Por favor, completa todos los campos.');
      setLoading(false);
      return;
    }

    // Obtener la fecha actual
    const today = new Date();

    // Verificar la edad del usuario
    if (startDate) {
      // Calcula la edad del usuario
      const age = differenceInYears(today, startDate);
      if (age < 20 || age > 35) {
        // Establece un error si la edad está fuera del rango permitido
        setError('Debes tener entre 20 y 35 años para registrarte.');
        return;
      }
    }

    // Reiniciar los errores
    setError('');
    setLoading(true);

    // Formatear la fecha de nacimiento
    const formattedDate = format(startDate!, 'yyyy-MM-dd');


    try {
      // Enviar los datos del formulario
      await axios.post(`${API_BASE_URL}/persons`, {
        id: user.uid,
        sexo,
        fecha_nacimiento: formattedDate,
        universidad,
        carrera,
        tipo_persona_role: 'Usuario',
      });

      navigate('/test-page');

    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(`Error al enviar los datos: ${error.response?.status} ${error.response?.data?.message}`);
      } else {
        setError('Error al enviar los datos del formulario.');
      }
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }

  };

  return (
    <Layout user={user} handleLogout={logout} title='Bienvenido a AnxieSense'
      subtitle='AnxieSense es un sistema experto diseñado para ayudarte a comprender mejor tus niveles de ansiedad social. Antes de comenzar, por favor completa el siguiente formulario con tus datos personales. Te garantizamos que toda la información proporcionada será tratada con absoluta confidencialidad, al igual que los resultados de tu evaluación.'>
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: 'auto' }}>
        <h4 className="text-md-center mb-3">Formulario de Información Personal</h4>

        {error && <div className="alert alert-danger mb-3">{error}</div>}

        <SexoSelect sexo={sexo} onChange={setSexo} />

        <FechaNacimientoPicker startDate={startDate} onChange={setStartDate} datePickerRef={datePickerRef} />

        <UniversidadCarreraSelect universidad={universidad} carrera={carrera} onChangeUniversidad={setUniversidad} onChangeCarrera={setCarrera} />

        <div className="text-center">
          <button className="btn btn-primary btn-lg" type="submit" disabled={loading}>
            {loading ? 'Cargando...' : 'Empezar test'}
          </button>
        </div>
      </form>
    </Layout>

  );
};

export default UserPage;
