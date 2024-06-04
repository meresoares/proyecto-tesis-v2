// export default RegisterPage;
// register-page.tsx

import { useEffect } from 'react'; 
import registroImage from '../../images/img-registro.webp';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/estilo.css';
import Register from '../../components/register-component'


const RegisterPage: React.FC = () => {

    useEffect(() => {
        // Al montar el componente, ocultamos la barra de desplazamiento vertical
        document.body.style.overflowY = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        // Al desmontar el componente, restauramos el comportamiento normal de la barra de desplazamiento
        return () => {
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
        };
    }, []);

    return (
        <section className="login-container d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
            <div className="container py-5" >
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col col-md-10">
                        <div className="card" style={{ borderRadius: '1rem'}}>    
                            <div className="row g-0">
                            <div className="col-md-6 col-lg-7 align-items-center">
                                    <div className="card-body text-black">
                                        <Register />
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img src={registroImage} alt="registre form" style={{ height: '100%', width: '100%', borderRadius: '0 1rem 1rem 0', objectFit: 'cover' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegisterPage;
