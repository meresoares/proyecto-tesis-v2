import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/config';

export class Pregunta extends Model {
  public id!: number;
  public descripcion!: string;
}

Pregunta.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  descripcion: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'preguntas',
  timestamps: false,
});

export default Pregunta;
