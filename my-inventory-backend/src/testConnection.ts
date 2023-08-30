import pool from './models/database';

async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log("Successfully connected to the database!");
        connection.release();
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error connecting to the database:", error.message);
        } else {
            console.error("An unknown error occurred while connecting to the database.");
        }
    }
}

testConnection();
