import http from 'node:http';
import { createDatabaseConnection } from './db.js';

const PORT = process.env.PORT || 3000;

async function main() {
    // Create database connection and ensure database migration
    const connection = await createDatabaseConnection();
    await connection.end();

    // Create HTTP server
    const server = http.createServer(async (req, res) => {
        if (req.url !== '/') {
            res.writeHead(404);
            res.end();
            return;
        }

        const connection = await createDatabaseConnection();

        try {
            const randomName = crypto.randomUUID();
            await connection.query('INSERT INTO people (name) VALUES (?)', [randomName]);

            const [rows] = await connection.query('SELECT * FROM people');

            const names = rows.map(row => `<li>${row.name}</li>`).join('');
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`<h1>Full Cycle Rocks!</h1><ul>${names}</ul>`);
        } catch (error) {
            console.error("Database query error:", error);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        } finally {
            await connection.end();
        }
    });

    server.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}/`);
    });

    process.on('SIGINT', () => {
        server.close(() => {
            console.log(`Server stopped at ${new Date().toISOString()}`);
            process.exit(0);
        });
    });
}

main().catch(console.error);
