
// user-component.tsx
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { universidades, carrerasPorUniversidad } from './universities-options-component';

const SexoSelect: React.FC<{ sexo: string; onChange: (value: string) => void }> = ({ sexo, onChange }) => {
    return (
        <div className="mb-3">
            <label htmlFor="sexo" className="form-label">
                Sexo
            </label>
            <select
                id="sexo"
                className="form-select"
                value={sexo}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="" disabled hidden>
                    Seleccione una opción
                </option>
                <option value="Femenino">Femenino</option>
                <option value="Masculino">Masculino</option>
            </select>
        </div>
    );
};

const FechaNacimientoPicker: React.FC<{ startDate: Date | null; onChange: (date: Date | null) => void; datePickerRef: React.RefObject<DatePicker> }> = ({ startDate, onChange, datePickerRef }) => {
    const focusDatePicker = () => {
        if (datePickerRef.current) {
            datePickerRef.current.setFocus();
        }
    };

    return (
        <div className="mb-3 d-flex align-items-center">
            <label htmlFor="fechaNacimiento" className="form-label">
                Fecha de Nacimiento
            </label>
            <div className="input-group">
                <DatePicker
                    id="fechaNacimiento"
                    selected={startDate}
                    onChange={onChange}
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={18}
                    dateFormat="dd/MM/yyyy"
                    maxDate={new Date("2006-12-31")}
                    minDate={new Date("1989-01-01")}
                    className="form-control"
                    ref={datePickerRef}
                />
                <span className="input-group-text" style={{ cursor: 'pointer' }} onClick={focusDatePicker}>
                    <FontAwesomeIcon icon={faCalendarAlt} />
                </span>
            </div>
        </div>
    );
};

const UniversidadCarreraSelect: React.FC<{ universidad: string; carrera: string; onChangeUniversidad: (value: string) => void; onChangeCarrera: (value: string) => void }> = ({ universidad, carrera, onChangeUniversidad, onChangeCarrera }) => {
    return (
        <>
            <div className="mb-3">
                <label htmlFor="universidad" className="form-label">
                    Universidad
                </label>
                <select
                    id="universidad"
                    className="form-select"
                    value={universidad}
                    onChange={(e) => {
                        const selectedUniversidad = e.target.value;
                        onChangeUniversidad(selectedUniversidad);
                        onChangeCarrera('');
                    }}
                >
                    <option value="" disabled hidden>
                        Seleccione una opción
                    </option>
                    {/* Generar opciones de universidades */}
                    {universidades.map((universidad) => (
                        <option key={universidad.value} value={universidad.value}>{universidad.label}</option>
                    ))}
                </select>
            </div>

            {/* Opciones de carrera */}
            <div className="mb-3">
                <label htmlFor="carrera" className="form-label">
                    Carrera
                </label>
                <select
                    id="carrera"
                    className="form-select"
                    value={carrera}
                    onChange={(e) => onChangeCarrera(e.target.value)}
                    // Deshabilitar si no se ha seleccionado una universidad
                    disabled={!universidad}
                >
                    <option value="" disabled hidden>
                        Seleccione una opción
                    </option>
                    {/* Generar opciones de carrera basadas en la universidad seleccionada */}
                    {carrerasPorUniversidad[universidad as keyof typeof carrerasPorUniversidad]?.map((carrera) => (
                        <option key={carrera.value} value={carrera.value}>{carrera.label}</option>
                    ))}
                </select>
            </div>
        </>
    );
}

export { SexoSelect, FechaNacimientoPicker, UniversidadCarreraSelect };
