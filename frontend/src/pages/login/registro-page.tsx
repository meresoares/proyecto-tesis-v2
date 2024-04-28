// export default Registro;
// registro-page.tsx

import registroImage from '../../images/img-registro.webp';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/login.css';
import RegistroFormulario from '../../components/formularios/registro-formulario'


const Registro: React.FC = () => {
    return (
        <section className="text-center text-lg-start">

            <div className="container py-5 h-100">
                <div className="row g-0 align-items-center">
                    <div className="col-lg-6 mb-5 mb-lg-0">
                        <div className="card cascading-right" style={{
                            background: 'hsla(0, 0%, 100%, 0.55)',
                            backdropFilter: 'blur(30px)'
                        }}>
                            <div className="card-body p-5 shadow-5 text-center">
                                <RegistroFormulario />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                        <img src={registroImage} className="w-100 rounded-4 shadow-4" alt="" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Registro;
