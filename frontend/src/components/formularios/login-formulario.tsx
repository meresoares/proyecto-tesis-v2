// export default LoginFormulario;
// loginFormulario.tsx

import React, { useState } from 'react';
import { useAuth } from '../../services/auth-service';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const LoginFormulario: React.FC = () => {
    // Obtiene la función de inicio de sesión del servicio de autenticación
    const { login } = useAuth() as { login: (email: string, password: string) => Promise<void> };

    // Estados locales para el correo electrónico, contraseña, visibilidad de la contraseña y mensajes de error
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string>('');

    // Obtiene el objeto de historial de navegación
    const navigate = useNavigate();

    // Función para alternar la visibilidad de la contraseña
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Función para manejar el inicio de sesión
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        // Evita que el formulario se envíe automáticamente

        e.preventDefault();
        try {
            // Reinicia el mensaje de error
            setError('');
            // Validación del correo electrónico y contraseña
            if (!isEmailValid(email)) {
                throw new Error('Por favor, introduce una dirección de correo electrónico válida.');
            }
            if (!isPasswordValid(password)) {
                throw new Error('Por favor introduce una contraseña válida.');
            }
            // Intenta iniciar sesión con el correo electrónico y la contraseña proporcionados
            await login(email, password);
            // Redirige al usuario a la página de inicio después de iniciar sesión correctamente
            navigate('/usuario-page');

        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Un error desconocido ocurrió.');
            }
        }
    };

    // Función para validar si una cadena de texto cumple con el formato de un correo electrónico válido.
    const isEmailValid = (email: string) => {
        // Verifica si la cadena contiene un formato de correo electrónico válido.
        // El formato debe tener al menos un carácter antes y después del símbolo '@', seguido de un punto y al menos un carácter más después del punto.
        return /\S+@\S+\.\S+/.test(email);
    };

    // Valida que la contraseña tenga al menos 6 caracteres
    const isPasswordValid = (password: string) => {
        return password.length >= 6;
    };

    return (
        <form onSubmit={handleLogin} style={{ maxWidth: '400px', margin: 'auto' }}>
            <div className="text-center mb-4">
                <h1 className="h3 mb-3 font-weight-normal">¡Bienvenido a Ansiedad!</h1>
                <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px', color: '#666' }}>Iniciar sesión</h5>
            </div>
            {error && <div className="alert alert-danger mb-3">{error}</div>}
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
            <div className="pt-1 mb-4 d-flex justify-content-center">
                <button className="btn btn-dark btn-lg btn-block" type="submit">Acceder</button>
            </div>

            <p className="mb-4 d-flex justify-content-center" style={{ color: '#666' }}>¿No tienes una cuenta? <Link to="/registro" style={{ color: '#508bfc' }}>Regístrate aquí</Link></p>
            <p className="mb-4 d-flex justify-content-center" style={{ color: '#666' }}>¿Eres administrador? <Link to="/login-admin" style={{ color: '#508bfc' }}>Ingresa aquí</Link></p>
        </form>
    );

};

export default LoginFormulario;