import { type FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "@fastify/type-provider-zod";
import { initialRegisterSchema } from "./types.ts";
import { initialSchoolRegistartion } from "./onboarding.service.ts";



export async function onboardingRoutes(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post(
        '/register',
         {
            schema: {
                body: initialRegisterSchema
            },
        }, 
        async (request, reply) => {
        const body = request.body;

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