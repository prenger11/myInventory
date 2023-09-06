import { Model, DataTypes } from 'sequelize';
import sequelize from './database';
import Order from './orders';  // Import the Order model
import OrderItem from './orderItem'; // Import the OrderItem model
import Inventory from './inventory'; // Import the Inventory model

class Product extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public stock_quantity!: number;
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: new DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: new DataTypes.TEXT,
    allowNull: true,  // Assuming a description is optional
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),  // Allowing for a product price with two decimal places
    allowNull: false,
  },
  stock_quantity: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
}, {
  tableName: 'products',
  sequelize: sequelize,
});

// Associations
Product.belongsToMany(Order, { through: OrderItem, foreignKey: 'productId' }); // many-to-many with Order
Order.belongsToMany(Product, { through: OrderItem, foreignKey: 'orderId' }); // the inverse relation
Product.hasOne(Inventory, { foreignKey: 'productId' }); // one-to-one with Inventory

export default Product;
