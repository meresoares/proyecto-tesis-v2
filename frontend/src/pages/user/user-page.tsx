// export default UsuarioPage;
// user-page.tsx

import React, { useState, useRef } from 'react';
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
      if (age < 18 || age > 35) {
        // Establece un error si la edad está fuera del rango permitido
        setError('Debes tener entre 18 y 35 años para registrarte.');
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
    <Layout user={user} handleLogout={logout} title='Bienvenido a xx'
      subtitle='Utilizamos el Cuestionario de Ansiedad Social para Adultos (CASO-A30) para ayudarte a comprender mejor tus niveles de ansiedad en situaciones sociales. Antes de comenzar, por favor proporciona algunos datos personales que serán tratados con absoluta confidencialidad, al igual que los resultados finales de la evaluación.'>
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: 'auto' }}>
        <h4 className="text-center mb-4">Formulario del usuario</h4>

        {error && <div className="alert alert-danger mb-3">{error}</div>}

        <SexoSelect sexo={sexo} onChange={setSexo} />

        <FechaNacimientoPicker startDate={startDate} onChange={setStartDate} datePickerRef={datePickerRef} />

        <UniversidadCarreraSelect universidad={universidad} carrera={carrera} onChangeUniversidad={setUniversidad} onChangeCarrera={setCarrera} />

        <div className="text-center">
          <button className="btn btn-dark btn-lg" type="submit" disabled={loading}>
            {loading ? 'Cargando...' : 'Empezar test'}
          </button>
        </div>
      </form>
    </Layout>

  );
};

export default UserPage;
