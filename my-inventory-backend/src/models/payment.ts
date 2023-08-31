import { Model, DataTypes } from 'sequelize';
import sequelize from './database';  // Adjust the path to your Sequelize instance

class Payment extends Model {
  public id!: number;
  public orderId!: number;  // Foreign key linking to the Order model
  public method!: string;  // Payment method used
  public amount!: number;  // Total payment amount
  public status!: string;  // Payment status (e.g., "Completed", "Failed")
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Payment.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  orderId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: 'orders',
      key: 'id'
    }
  },
  method: {
    type: new DataTypes.STRING(255),
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: new DataTypes.STRING(255),
    allowNull: false,
    defaultValue: 'Completed'
  },
}, {
  tableName: 'payments',
  sequelize: sequelize,
});

export default Payment;
