import { sql } from 'drizzle-orm';
import { db } from '../../db/db.ts';
import { schools } from "../../db/schemas/school.schema.ts";
import { users } from "../../db/schemas/users.schema.ts";
import { hashPassword } from './utils.ts';
import type { InitialRegister} from './types.ts';


export async function schoolRegistration(input: InitialRegister) {

    return await db.transaction(async (context) => {

        const doesAdminExist = await context.execute(
             sql`SELECT 1 FROM ${users} WHERE ${users.email} = ${input.adminEmail} LIMIT 1`
        );
        
        if(doesAdminExist?.rows?.length > 0) {
             throw new Error('An account aleady exists with this email address');
        }

        
        const school = await context.execute(
            sql`
                INSERT INTO ${schools} 
                (
                    name, 
                    street_address, 
                    city, 
                    state, 
                    zip_code, 
                    country, 
                    created_at
                )
                VALUES (
                    ${input.schoolInfo.name},
                    ${input.schoolInfo.streetAddress},
                    ${input.schoolInfo.city},
                    ${input.schoolInfo.state},
                    ${input.schoolInfo.zipCode},
                    ${input.schoolInfo.country || 'USA'},
                    NOW()
                )
                RETURNING id
            `);
        
        const hashedPassword = hashPassword(input.adminPassword);

        const schoolId = String(school.rows[0]?.id ?? "");

        const initialAdmin = await context.execute(
            sql`
                INSERT INTO ${users} 
                (
                    school_id, 
                    first_name,
                    last_name,
                    email,
                    role,
                    password_hash,
                    created_at
                )
                VALUES (
                    ${schoolId},
                    ${input.adminFirstName},
                    ${input.adminLastName},
                    ${input.adminEmail},
                    'admin',
                    ${hashedPassword},
                    NOW()
                )
                RETURNING id
            `);  

            const adminId = String(initialAdmin.rows[0]?.id ?? "");

            if(!schoolId || !adminId) {
                throw new Error("Unable to create school or admin record");
            }
    
        return {
            schoolId,
            adminId,
        }
    });
}