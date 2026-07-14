import { eq, sql } from 'drizzle-orm';
import { db } from '../../db/db.ts';
import { schools } from "../../db/schemas/school.schema.ts";
import { users } from "../../db/schemas/users.schema.ts";
import { hashPassword } from './utils.ts';

type SchoolAddress = {
    name: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
}

export async function initialSchoolRegistartion(input: {
    adminFirstName: string;
    adminLastName: string;
    adminEmail: string;
    adminPassword: string;
    schoolInfo: SchoolAddress;
}) {
    const { adminFirstName, adminLastName, adminEmail, adminPassword, schoolInfo } = input;

    if(!adminFirstName || !adminLastName || !adminEmail || !adminPassword || !schoolInfo.name || !schoolInfo.streetAddress || !schoolInfo.city || !schoolInfo.state || !schoolInfo.zipCode) {
        throw new Error('missing required fields');
    }

   const onboarding = () => db.transaction(async (context) => {

        const doesAdminExist = await context.execute(
             sql`SELECT 1 FROM ${users} WHERE ${users.email} = ${adminEmail} LIMIT 1`
        );

        if(doesAdminExist.rowCount > 0) {
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
                    ${schoolInfo.name},
                    ${schoolInfo.streetAddress},
                    ${schoolInfo.city},
                    ${schoolInfo.state},
                    ${schoolInfo.zipCode},
                    ${schoolInfo.country || 'USA'},
                    NOW()
                )
                RETURNING id
            `);
            
        
        const hashedPassword =  hashPassword(adminPassword);

        const intialAdmin = await context.execute(
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
                    ${school.rows[0].id},
                    ${adminFirstName},
                    ${adminLastName},
                    ${adminEmail},
                    'admin',
                    ${hashPassword},
                    NOW()
                )
                RETURNING id
            `);   
    
        return {
            schoolId: school.rows[0].id,
            adminId: intialAdmin.rows[0].id
        }
    });
    

    

};