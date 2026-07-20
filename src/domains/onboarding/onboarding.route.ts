import { type FastifyInstance } from "fastify";
import { initialSchoolRegistartion } from "./onboarding.service.ts";
import type { InitialRegister } from "./types.ts";
import jwt from '@fastify/jwt';

export async function onboardingRoutes(app: FastifyInstance) {

    app.post('/register', async (request, reply) => {
        const body = request.body as InitialRegister;

        try {
            const result = await initialSchoolRegistartion(body);

            const token = app.jwt.sign({
                userId: result.adminId,
                role: 'admin',
                schoolId: result.schoolId
            })

            return reply.code(201).send({
                message: "School registered successfully",
                token
            })

        } catch (error) {
            return reply.code(400).send({ error: (error as Error).message })
        }
    })

}