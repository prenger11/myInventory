import { Model, DataTypes } from 'sequelize';
import sequelize from './database';
import Product from './products';  // Import the Product model

class Inventory extends Model {
  public id!: number;
  public productId!: number;  // Foreign key linking to the Product model
  public stockLevel!: number;
  public minThreshold!: number;  // Minimum stock level before restocking is required
  public location!: string;  // Optional: Warehouse or shelf location
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Inventory.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  productId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {           
      model: 'products',    
      key: 'id'            
    }
  },
  stockLevel: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  minThreshold: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  location: {
    type: new DataTypes.STRING(255),
    allowNull: true,  // Assuming location is optional
  },
}, {
  tableName: 'inventories',
  sequelize: sequelize,
});

// Associations
Inventory.belongsTo(Product, { foreignKey: 'productId' }); 

export default Inventory;
