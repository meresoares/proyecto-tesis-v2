// export default AuthProvider;
// auth-provider.tsx

import React from 'react';
import { useAuth } from './auth-service';
import { useNavigate } from 'react-router-dom';

const AuthProvider: React.FC = () => {
    // Obtiene el servicio de autenticación del contexto
    const authService = useAuth();
    
    // Obtiene el usuario autenticado y la función de cierre de sesión del servicio de autenticación
    const user = authService?.user ?? null;
    const logout = authService?.logout ?? null;

    // Obtiene el objeto de historial de navegación de React Router
    const navigate = useNavigate(); 

    // Función para manejar el cierre de sesión del usuario
    const handleLogout = () => {
        if (logout) {
            logout().then(() => {
                navigate('/');
                // Redirige al usuario a la pagina de login luego de cerrar sesión
            });
        } else {
            console.error("La función de cierre de sesión no está disponible");
        }
    };


    return (
        <div>
            {/* Muestra el estado de autenticación del usuario */}
            {user ? (
                <div>
                    <p>Usuario autenticado como: {user.email}</p>
                    <button onClick={handleLogout}>Cerrar sesión</button>
                </div>
            ) : (
                <p>No hay usuario autenticado</p>
            )}
        </div>
    );
};

export default AuthProvider;
