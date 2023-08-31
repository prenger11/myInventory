import { Model, DataTypes } from 'sequelize';
import sequelize from './database';  // Adjust the path to point to your Sequelize instance

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

export default Product;
