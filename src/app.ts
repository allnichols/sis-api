import fastify from 'fastify';



export async function startServer() {
  const app = fastify({ logger: true });


  // global plugins 
  // error handling 
  // middleware/hooks
  // domain routes

  return app;
}