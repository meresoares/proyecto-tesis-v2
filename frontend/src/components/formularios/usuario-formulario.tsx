// export default UsuarioFormulario;
// usuarioFormulario.tsx

import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../services/auth-service';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { universidades, carrerasPorUniversidad } from '../universidades-opciones';
import { differenceInYears } from 'date-fns';


const UsuarioFormulario: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState<Date | null>(null);
    const API_BASE_URL = 'http://localhost:3001/api';
    const [sexo, setSexo] = useState<string>('');
    const [universidad, setUniversidad] = useState<string>('');
    const [carrera, setCarrera] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState('');

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
            const age = differenceInYears(today, startDate || new Date());
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
        const formattedDate = format(startDate, 'yyyy-MM-dd');

        // Definir la fecha mínima y máxima permitida
        const minDate = new Date(1989, 0, 1);
        const maxDate = new Date(2006, 11, 31);
        if (startDate && (startDate < minDate || startDate > maxDate)) {
            setError('Debes tener entre 18 y 35 años para registrarte.');
            setLoading(false);
            return;
        }

        setError('');
        setLoading(true);

        try {
            // Enviar los datos del formulario
            const response = await axios.post(`${API_BASE_URL}/persons`, {
                id: user.uid,
                sexo,
                fecha_nacimiento: formattedDate,
                universidad,
                carrera,
                tipo_persona_role: 'Usuario',
            });

            if (response.data) {
                navigate('/test');
            } else {
                setError('No se pudo registrar al paciente.');
            }
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

        <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: 'auto' }}>
            <h1 className="h3 mt-5 mb-5 font-weight-normal text-center">Formulario de Usuario</h1>
            <p className="text-center mb-4">Te damos la bienvenida a nuestra plataforma de evaluación de ansiedad social. Utilizamos el Inventario de Ansiedad y Fobia Social (SPAI) para ayudarte a comprender mejor tus niveles de ansiedad en situaciones sociales. Antes de comenzar, por favor proporciona algunos datos personales que serán tratados con absoluta confidencialidad, al igual que los resultados finales de la evaluación.</p>
            <h4 className="text-center mb-4">Comencemos</h4>

            {error && <div className="alert alert-danger mb-3">{error}</div>}

            <div className="mb-3">
                <label htmlFor="sexo" className="form-label">Sexo</label>
                <select id="sexo" className="form-select" value={sexo} onChange={(e) => setSexo(e.target.value)}>
                    <option value="" disabled selected hidden>Seleccione una opción</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Masculino">Masculino</option>
                </select>
            </div>

            <div className="mb-3 d-flex align-items-center">
                <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento</label>
                <div className="input-group">
                    <DatePicker
                        id="fechaNacimiento"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={18}
                        dateFormat="dd/MM/yyyy"
                        maxDate={new Date("2006-12-31")}
                        minDate={new Date("1989-01-01")}
                        className="form-control"
                    />
                    <span className="input-group-text" style={{ cursor: 'pointer' }}>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                    </span>
                </div>

            </div>

            <div className="mb-3">
                <label htmlFor="universidad" className="form-label">Universidad</label>
                <select
                    id="universidad"
                    className="form-select"
                    value={universidad}
                    onChange={(e) => {
                        const selectedUniversidad = e.target.value;
                        setUniversidad(selectedUniversidad);
                        setCarrera('');

                    }}
                >
                    <option value="" disabled selected hidden>Seleccione una opción</option>
                    {/* Generar opciones de universidades */}
                    {universidades.map((universidad) => (
                        <option key={universidad.value} value={universidad.value}>{universidad.label}</option>
                    ))}
                </select>
            </div>

            {/* Opciones de carrera */}
            <div className="mb-3">
                <label htmlFor="carrera" className="form-label">Carrera</label>
                <select
                    id="carrera"
                    className="form-select"
                    value={carrera}
                    onChange={(e) => setCarrera(e.target.value)}
                    // Deshabilitar si no se ha seleccionado una universidad
                    disabled={!universidad}
                >
                    <option value="" disabled selected hidden>Seleccione una opción</option>
                    {/* Generar opciones de carrera basadas en la universidad seleccionada */}
                    {carrerasPorUniversidad[universidad as keyof typeof carrerasPorUniversidad]?.map((carrera) => (
                        <option key={carrera.value} value={carrera.value}>{carrera.label}</option>
                    ))}
                </select>
            </div>


            <div className="text-center">
                <button className="btn btn-dark btn-lg" type="submit" disabled={loading}>
                    {loading ? 'Cargando...' : 'Empezar test'}
                </button>
            </div>
        </form>
    );
};

export default UsuarioFormulario;