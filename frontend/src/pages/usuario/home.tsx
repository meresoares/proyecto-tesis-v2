// export default Home;
// home.tsx

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../services/auth-service';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/nav-bar';
import { Login } from '@mui/icons-material';
import UsuarioPage from './usuario-page';

const Home: React.FC = () => {
    const authService = useAuth();
    const user = authService?.user ?? null;
    const logout = authService?.logout ?? (() => console.error("La función de cierre de sesión no está disponible"));

    const navigate = useNavigate();
    // Obtiene el objeto de historial de navegación

    const [rol] = useState<string>('Usuario');

    useEffect(() => {
        // Verificar si el usuario no está autenticado y redirigir a la página de inicio de sesión
        if (!user) {
            navigate('/', { replace: true });
        }
    }, [user, navigate]);

    const handleLogout = async () => {
        try {
            await logout();
            // Cerrar sesión
            navigate('/', { replace: true });
            // Redirigir al usuario a la página de inicio de sesión y reemplazar la entrada actual en el historial
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <div>
            <Navbar user={user} handleLogout={handleLogout} />

            {rol === 'Usuario' ? (
                <UsuarioPage />
            ) : (
                <Login />
            )}
        </div>
    );
};

export default Home;
