import { eq } from 'drizzle-orm';
import { db } from '../../db/db.ts';
import { schools } from "../../db/schemas/school.schema.ts";
import { users } from "../../db/schemas/users.schema.ts";
import { hashPassword } from './utils.ts';

type SchoolAddress = {
    name: string;
    
}

export async function initialSchoolSignUp(input: {
    schoolName: string;
    schoolAddress: string;
    adminFirstName: string;
    adminLastName: string;
    adminEmail: string;
    adminPassword: string;
}) {
    const { schoolName, adminFirstName, adminLastName, adminEmail, adminPassword } = input;
    if(!schoolName || !adminFirstName || !adminLastName || !adminEmail || !adminPassword) {
        throw new Error('missing required fields');
    }

    const doesSchoolExist = await db.select().from(schools).where(eq())
 

};