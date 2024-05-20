import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/config';
import Pregunta from './pregunta.model';

export class Respuesta extends Model {
  public id!: number; // Asume que es un número autoincrementable y único
  public persona_id!: string; // El ID de la persona a la que pertenece esta respuesta
  public pregunta_id!: number;
  public respuesta!: string;
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

  pregunta_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Pregunta,
      key: 'id',
    },
  },

  respuesta: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },

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

Respuesta.belongsTo(Pregunta, { foreignKey: 'pregunta_id' });

export default Respuesta;
