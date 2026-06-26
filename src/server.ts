import { startServer } from './app.js';

async function start() {
    const app = await startServer();

    try {
        await app.listen({ port: 8080});
        app.log.info(`Server listening on port 8080`)
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    } 
}

start();