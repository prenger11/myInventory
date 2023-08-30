// // # Path for the database connection file
// db_file_path = os.path.join(my_inventory_path, 'my-inventory-backend', 'src', 'models', 'database.ts')

// # Content for the database connection file
// db_content = """
import { createPool } from 'mysql2/promise';

const dbConfig = {
    host: '127.0.0.1',
    user: 'root',
    password: '!QZPM1qzpm',
    database: 'myInventory',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const pool = createPool(dbConfig);

export default pool;
// """

// # Write the content to the file
// with open(db_file_path, 'w') as db_file:
//     db_file.write(db_content)

// db_file_path
