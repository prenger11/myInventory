// models/user.model.ts

import { RowDataPacket } from 'mysql2/promise';

export interface User {
  id: number;
  username: string;
  email: string;
}

// Define the shape of database rows for the User table
// Modify the UserRow type to match the expected result of pool.execute
export type UserRow = {
  id: number;
  username: string;
  email: string;
  // Add any other fields you have in your database table
};
