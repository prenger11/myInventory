import { Model, DataTypes } from 'sequelize';
import sequelize from './database';  // Import your Sequelize instance
import Order from './orders'; // Assuming this is the path to your Order model
import Notification from './notification'; // Assuming this is the path to your Notification model

class User extends Model {
  public id!: number;       // The '!' denotes that this attribute is always present
  public username!: string;
  public email!: string;
  public password!: string;
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  email: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  password: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
}, {
  tableName: 'users',
  sequelize: sequelize, // passing the `sequelize` instance is required
});

// Associations
User.hasMany(Order, { foreignKey: 'userId' });
User.hasMany(Notification, { foreignKey: 'userId' });

export default User;
