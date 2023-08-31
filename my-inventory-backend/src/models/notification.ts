import { Model, DataTypes } from 'sequelize';
import sequelize from './database';  // Adjust the path to your Sequelize instance

class Notification extends Model {
  public id!: number;
  public userId!: number;  // Foreign key linking to the User model
  public type!: string;  // Type of the notification
  public message!: string;  // Content or message of the notification
  public status!: string;  // Status of the notification (e.g., "Sent", "Failed")
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Notification.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  type: {
    type: new DataTypes.STRING(255),
    allowNull: false,
  },
  message: {
    type: new DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: new DataTypes.STRING(255),
    allowNull: false,
    defaultValue: 'Sent'
  },
}, {
  tableName: 'notifications',
  sequelize: sequelize,
});

export default Notification;
