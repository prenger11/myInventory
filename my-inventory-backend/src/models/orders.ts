import { Model, DataTypes } from 'sequelize';
import sequelize from './database';  // Adjust the path to your Sequelize instance
import User from './users'; // Import the User model
import OrderItem from './orderItem'; // Assuming this is the path to your OrderItem model

class Order extends Model {
  public id!: number;
  public userId!: number;  // This will be a foreign key linking to the User model
  public total!: number;
  public status!: string;
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {           // This establishes a foreign key relationship with the User table
      model: 'users',      // Name of the referenced table
      key: 'id'            // Column name of the referenced table
    }
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: new DataTypes.STRING(128),
    allowNull: false,
    defaultValue: 'Pending'
  },
}, {
  tableName: 'orders',
  sequelize: sequelize,
});

// Associations
Order.belongsTo(User, { foreignKey: 'userId' }); 
Order.belongsToMany(OrderItem, { through: 'orderItems', foreignKey: 'orderId' }); // Assuming you have a junction table named 'orderItems'

export default Order;
