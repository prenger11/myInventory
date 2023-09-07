"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var sequelize = new sequelize_1.Sequelize(process.env.DB_NAME || 'myInventory', process.env.DB_USER || 'root', process.env.DB_PASS || '!QZPM1qzpm', {
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql'
});
// Test DB connection
// sequelize.authenticate()
//   .then(() => {
//     console.log('Connection to the database has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });
exports.default = sequelize;
