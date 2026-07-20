import fastify from 'fastify';
import jwtPlugin from './plugins/jwt.ts';
import { onboardingRoutes } from './domains/onboarding/onboarding.route.ts';


export async function startServer() {
  const app = fastify({ logger: true });


  // global plugins 
   app.register(jwtPlugin);
  // error handling 
  // middleware/hooks
  // domain routes
  app.get('/ping', async function handler (request, reply) {
    return 'pong';
  })
  app.register(onboardingRoutes, { prefix: '/onboarding' })

  return app;
}