import "@fastify/jwt";

declare module "@fastify/jwt" {
    interface FastifyJWT {
        payload: {
            schoolId: string;
            userId: string;
            role: 'admin' | 'teacher' | 'staff';
        }

        user: {
            schoolId: string;
            userId: string;
            role: string;
        }
    }
}