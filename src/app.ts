import fastify from 'fastify';
import jwtPlugin from './plugins/jwt.ts';
import { serializerCompiler, validatorCompiler } from '@fastify/type-provider-zod';
import { onboardingRoutes } from './domains/onboarding/onboarding.route.ts';


export async function startServer() {
  const app = fastify({ 
      logger: process.env.NODE_ENV === 'development' 
      ? { transport: { target: 'pino-pretty' } } 
      : true
    });

    // Zod setup
   app.setValidatorCompiler(validatorCompiler);
   app.setSerializerCompiler(serializerCompiler);


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