import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'myInventory',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || '!QZPM1qzpm',
  {
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql'
  }
);

// Test DB connection
// sequelize.authenticate()
//   .then(() => {
//     console.log('Connection to the database has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });


export default sequelize;
