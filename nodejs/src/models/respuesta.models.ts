import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/config';

export class Respuesta extends Model {
  public id!: number; // Asume que es un número autoincrementable y único
  public persona_id!: string; // El ID de la persona a la que pertenece esta respuesta
  public pregunta_1!: string;
  public pregunta_2!: string;
  public pregunta_3!: string;
  public pregunta_4!: string;
  public pregunta_5!: string;
  public pregunta_6!: string;
  public pregunta_7!: string;
  public pregunta_8!: string;
  public pregunta_9!: string;
  public pregunta_10!: string;
  public evaluacion?: string; // Campo opcional para la evaluación del sistema experto
  public fecha_respuesta!: Date; // La fecha en que se registró la respuesta
}

Respuesta.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  persona_id: {
    type: DataTypes.STRING(255),
    allowNull: false,
    references: {
      model: 'persona',
      key: 'id',
    },
  },
  pregunta_1: DataTypes.STRING(255),
  pregunta_2: DataTypes.STRING(255),
  pregunta_3: DataTypes.STRING(255),
  pregunta_4: DataTypes.STRING(255),
  pregunta_5: DataTypes.STRING(255),
  pregunta_6: DataTypes.STRING(255),
  pregunta_7: DataTypes.STRING(255),
  pregunta_8: DataTypes.STRING(255),
  pregunta_9: DataTypes.STRING(255),
  pregunta_10: DataTypes.STRING(255),
  evaluacion: {
    type: DataTypes.STRING, // Asume que la evaluación es un string como 'Baja Ansiedad'
    allowNull: true, // Hace el campo opcional
  },
  fecha_respuesta: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  tableName: 'respuestas',
  timestamps: false,
});

export default Respuesta;
