import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export async function createDatabaseConnection() {
  const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '!QZPM1qzpm',
    database: 'myInventory'
  });

  return db;
}
