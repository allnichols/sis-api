import * as schoolSchema from  "./schemas/school.schema.ts";
import * as userSchema from "./schemas/users.schema.ts";

export const schema = {
    ...schoolSchema,
    ...userSchema,
};


export * from './schemas/school.schema.ts';
export * from './schemas/users.schema.ts';