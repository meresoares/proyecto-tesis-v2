// src/models/Person.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/config';


/**
 * Modelo para representar una persona en la base de datos.
 */
export class Person extends Model {
    public id!: string; 
    public fecha_nacimiento!: Date;
    public universidad!: string; 
    public carrera!: string; 
    public datos_personales?: string; 
    public tipo_persona_role!: string; 
    public sexo!: string; 
}

// Definición de la estructura y restricciones del modelo
Person.init({
    id: {
        type: DataTypes.STRING(255), // String para poder utilizar el uid de Firebase
        allowNull: false,
        primaryKey: true,
    },
    fecha_nacimiento: {
        type: DataTypes.DATEONLY, // Solo fecha sin tiempo
        allowNull: false,
    },
    universidad: {
        type: DataTypes.STRING(255), // No enum porque Sequelize no soporta check constraint
        allowNull: false,
        /* validate: {
            isIn: [['FP-UNE', 'FAFI-UNE', 'FCE-UNE', 'FDCS-UNE', 'Otro']], // Validación de valores permitidos
        } */
    },
    carrera: {
        type: DataTypes.STRING(255), // No enum por la misma razón
        allowNull: false,
       /* validate: {
            isIn: [['Lic. en Análisis de Sistemas', 'Lic. en Turismo', 'Ingeniería de Sistemas', 'Ingeniería Eléctrica', 'Otro']],
        } */
    },
    datos_personales: {
        type: DataTypes.TEXT, // Texto largo
        allowNull: true, // Permitir nulos
    },
    tipo_persona_role: {
        type: DataTypes.STRING(50), // No enum pero limitado a 50 caracteres
        allowNull: false,
    },
    sexo: {
        type: DataTypes.STRING(10), // No enum pero limitado a 10 caracteres
        allowNull: false,
        validate: {
            isIn: [['Femenino', 'Masculino']], // Validación de valores permitidos
        }
    }
}, {
    tableName: 'personas', // Nombre de la tabla en la base de datos
    sequelize,
    timestamps: false, // Confirmado que no queremos timestamps
});

export default Person;
