import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IAuthRouteProps {
  children: React.ReactNode; // Agrega esta definición de tipo para evitar errores
}

export const AuthRoute = ({children}: IAuthRouteProps): React.ReactNode => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoading(false);
            } else {
                console.log('Unauthorized');
                navigate('/');
            }
        });

        return () => unsubscribe();
    }, [auth, navigate]);

    if (loading) return null; // Devuelve null mientras se carga la autenticación

};
