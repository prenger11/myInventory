import { Model, DataTypes } from 'sequelize';
import sequelize from './database';  // Adjust the path to your Sequelize instance

class OrderItem extends Model {
  public id!: number;
  public orderId!: number;  // Foreign key linking to the Order model
  public productId!: number;  // Foreign key linking to the Product model
  public quantity!: number;
  public price!: number;  // The price at which the product was sold in this specific order
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

OrderItem.init({
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
  productId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {           
      model: 'products',    
      key: 'id'            
    }
  },
  quantity: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  tableName: 'orderItems',
  sequelize: sequelize,
});

export default OrderItem;
