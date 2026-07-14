import fp from 'fastify-plugin';
import fastifyjwt from '@fastify/jwt';

export default fp(async (fastify) => {
    fastify.register(fastifyjwt,  {
        secret: process.env.JWT_SECRET || 'supersecret',
        sign: {
            expiresIn: '25m'
        }
    });
});