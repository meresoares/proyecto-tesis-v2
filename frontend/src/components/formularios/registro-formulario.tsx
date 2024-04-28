// export default RegistroFormulario;
// registroFormulario.tsx

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../../services/auth-service';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const RegistroFormulario: React.FC = () => {
    const auth = useAuth();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false); // Estado para controlar el envío del formulario
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    // Función para alternar la visibilidad de la contraseña
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Interfaz para definir el formato de los errores de autenticación
    interface AuthError {
        code: string;
        message: string;
    }

    // Función para manejar el envío del formulario de registro
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        // Evita que el formulario se envíe automáticamente
        event.preventDefault();
        // Deshabilita el botón de registro mientras se procesa la solicitud
        setSubmitting(true);

        // Validación de campos vacíos
        if (!username || !email || !password || !repeatPassword) {
            setError('Por favor, completa todos los campos obligatorios.');
            // Habilita el botón de registro nuevamente
            setSubmitting(false);
            // Sale temprano de la función
            return;
        }

        // Validación de longitud de la contraseña
        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.');
            // Habilitar el botón de registro nuevamente
            setSubmitting(false);
            return; // Retorno temprano
        }

        try {
            if (password !== repeatPassword) {
                setError('Las contraseñas no coinciden.');
                return;
            }

            if (auth) {
                // Llamada al servicio de autenticación para registrar al usuario
                await auth.register(email, password);
                setSuccessMessage('¡Cuenta creada exitosamente!');
                setTimeout(() => {
                    // Redirige al usuario al inicio de sesión después de 3 segundos
                    navigate("/");
                }, 2000);
            }
            else {
                console.error("El servicio de autenticación no está disponible");
            }

            // Limpiar campos después del registro exitoso
            setUsername('');
            setEmail('');
            setPassword('');
            setRepeatPassword('');
            setError('');

        } catch (error) {
            // Manejo de errores
            const authError = error as AuthError;
            if (authError.code === 'auth/weak-password') {
                setError('La contraseña debe tener al menos 6 caracteres.');
            } else if (authError.code === 'auth/invalid-email') {
                setError('Por favor, introduce una dirección de correo electrónico válida.');
            } else {
                setError('Error al registrar usuario. Por favor, inténtalo de nuevo.');
            }
        } finally {
            // Habilita el botón de registro nuevamente
            setSubmitting(false);
        }
    };

    // Función para manejar el inicio de sesión con Google
    const handleGoogleLogin = async () => {
        if (auth) {
            try {
                await auth.loginWithGoogle();
                // Redirige al usuario al inicio de sesión después de un registro exitoso con Google                setSuccessMessage('¡Registrado exitosamente con Google!');
                setTimeout(() => {
                    // Redirige al usuario al inicio de sesión después de 3 segundos
                    navigate("/");
                }, 2000);
            } catch (error) {
                console.error('Error al iniciar sesión con Google:', error);
                setError('Error al iniciar sesión con Google. Por favor, inténtalo de nuevo.');
            }
        } else {
            console.error("El servicio de autenticación no está disponible");
            setError('Error al iniciar sesión con Google. Por favor, inténtalo de nuevo.');
        }
    };


    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '350px', margin: 'auto' }}>
            <div className="text-center mb-4">
                <h1 className="h3 mb-3 font-weight-normal">Nuevo registro</h1>
            </div>
            {error && <div className="alert alert-danger mb-3">{error}</div>}
            <div className="form-outline mb-4">
                <input type="text" id="username" className="form-control form-control-lg" placeholder='Nombre de usuario' value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="form-outline mb-4">
                <input type="email" id="email" className="form-control form-control-lg" placeholder='Correo electrónico' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="input-group mb-3">
                <input type={showPassword ? 'text' : 'password'} id="password" className="form-control form-control-lg" placeholder='Contraseña' value={password} onChange={(e) => setPassword(e.target.value)} />
                <label className="form-label" htmlFor="password"></label>
                <span className="input-group-text" style={{ cursor: 'pointer' }} onClick={togglePasswordVisibility}>
                    <i className="fas fa-eye" style={{ color: '#666' }}></i>
                </span>
            </div>
            <div className="input-group mb-3">
                <input type={showPassword ? 'text' : 'password'} id="repeatPassword" className="form-control form-control-lg" placeholder='Repetir contraseña' value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
                <label className="form-label" htmlFor="repeatPassword"></label>
                <span className="input-group-text" style={{ cursor: 'pointer' }} onClick={togglePasswordVisibility}>
                    <i className="fas fa-eye" style={{ color: '#666' }}></i>
                </span>
            </div>
            <div className="pt-1 mb-3">
                <button className="btn btn-primary btn-lg btn-block" type="submit" disabled={submitting}>
                    {submitting ? 'Registrando...' : 'Crear cuenta'}
                </button>
            </div>
            {successMessage && !error && <div className="alert alert-success mb-3">{successMessage}</div>}

            <div className="text-center">
                <p>O Regístrate con:</p>
                <button type="button" className="btn btn-link btn-floating mx-4" onClick={handleGoogleLogin}>
                    <i className="fab fa-google"></i>
                </button>
            </div>

            <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>¿Ya tienes una cuenta? <Link to="/" style={{ color: '#393f81' }}>Ingresa aquí</Link></p>
        </form>
    );
};

export default RegistroFormulario;
