import mysql from 'mysql2/promise';

export async function createDatabaseConnection() {
    const connection = await mysql.createConnection({
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'docker',
        password: process.env.MYSQL_PASSWORD || 'docker',
        database: process.env.MYSQL_DATABASE || 'docker'
    });

    return connection;
}

export async function ensureDatabaseMigration(connection) {
    await connection.query(`
        CREATE TABLE IF NOT EXISTS people (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        );
    `);
}
