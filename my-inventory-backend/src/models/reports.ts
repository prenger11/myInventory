import { Model, DataTypes } from 'sequelize';
import sequelize from './database';  // Adjust the path to your Sequelize instance

class Report extends Model {
  public id!: number;
  public title!: string;  // Type or focus of the report
  public description!: string;  // Description or summary of the report
  public content!: string;  // JSON content or link to the actual report file
  public date!: Date;  // Date the report pertains to
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Report.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: new DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: new DataTypes.TEXT,
    allowNull: true,  // Assuming the description is optional
  },
  content: {
    type: new DataTypes.TEXT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
}, {
  tableName: 'reports',
  sequelize: sequelize,
});

export default Report;
