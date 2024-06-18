// AdminHomePage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/auth-service';
import Layout from '../../components/layout-component';

interface Test {
    id: string;
    userId: string;
    date: string;
}

const AdminHomePage: React.FC = () => {
    const [tests, setTests] = useState<Test[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const API_BASE_URL = 'http://localhost:3001/api';

    useEffect(() => {
        const fetchTests = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/respuestas`);
                setTests(response.data);
            } catch (error) {
                setError('Error al obtener los tests.');
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTests();
    }, []);

    const handleTestClick = (testId: string) => {
        navigate(`/admin/test/${testId}`);
    };

    return (
        <Layout user={user} handleLogout={logout} title="Panel de Administrador" subtitle="Revisa todos los tests realizados por los usuarios.">
            {error && <div className="alert alert-danger">{error}</div>}
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID del Test</th>
                                <th>ID del Usuario</th>
                                <th>Fecha</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tests.map((test) => (
                                <tr key={test.id}>
                                    <td>{test.id}</td>
                                    <td>{test.userId}</td>
                                    <td>{test.date}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => handleTestClick(test.id)}>Ver Detalles</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </Layout>
    );
};

export default AdminHomePage;
