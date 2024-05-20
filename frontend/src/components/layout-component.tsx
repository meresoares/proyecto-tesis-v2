// Layout.tsx
import React, { ReactNode } from 'react';
import Navbar from './navbar-component';
import { useNavigate } from 'react-router-dom';
import '../styles/estilo.css'

interface LayoutProps {
    user: any;
    handleLogout: () => void;
    children: ReactNode;
    title: string;
    subtitle?: string;
}

const Layout: React.FC<LayoutProps> = ({ user, handleLogout, title, subtitle, children, }) => {

    const navigate = useNavigate();

    const handleLogoutAndRedirect = () => {
      handleLogout();
      navigate('/');
    };

    return (
        <div className="layout-container">
            <Navbar user={user} handleLogout={handleLogoutAndRedirect} />
            <div className="color-principal">
                <div className="row justify-content-center align-items-center">
                    <div className="col-lg-9">
                        <div className="card" style={{ maxWidth: '100%', overflow: 'hidden' }}>
                            <div className="card-body-desktop my-3">
                                {title && <h1 className="text-black mb-4 center">{title}</h1>}
                                {subtitle && <p className="text-black mb-4">{subtitle}</p>}
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
