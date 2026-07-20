import { type FastifyInstance } from "fastify";
import { initialSchoolRegistartion } from "./onboarding.service.ts";
import jwt from '@fastify/jwt';


type RegisterBody = {
  adminFirstName: string;
  adminLastName: string;
  adminEmail: string;
  adminPassword: string;
  schoolInfo: {
    name: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
  };
};

export async function onboardingRoutes(app: FastifyInstance) {

    app.post('/register', async (request, reply) => {
        const body = request.body as RegisterBody;

        try {
            const initial = await initialSchoolRegistartion(body);
            console.log('initial creation: ',initial)
            return reply.code(201).send({
                message: 'Complete'
            })
        } catch (error) {
            console.log('register error: ',error)
            return reply.code(400).send({ error: (error as Error).message })
        }

        // const token = app.jwt.sign({ sub: })
    })

}