import fastify from 'fastify';
import jwtPlugin from './plugins/jwt.ts';



export async function startServer() {
  const app = fastify({ logger: true });


  // global plugins 
   app.register(jwtPlugin);
  // error handling 
  // middleware/hooks
  // domain routes

  return app;
}