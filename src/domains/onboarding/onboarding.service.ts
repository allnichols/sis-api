import { initialRegisterSchema } from './types.ts';
import { z } from 'zod/v4';
import { schoolRegistration } from './onboarding.repo.ts';


export async function initialSchoolRegistartion(input: z.infer<typeof initialRegisterSchema>) {
    const { adminFirstName, adminLastName, adminEmail, adminPassword, schoolInfo } = input;
 
    if(!adminFirstName || !adminLastName || !adminEmail || !adminPassword || !schoolInfo.name || !schoolInfo.streetAddress || !schoolInfo.city || !schoolInfo.state || !schoolInfo.zipCode) {
        throw new Error('missing required fields');
    }

    try {
        const initialRegistration = await schoolRegistration(input);
        return initialRegistration;

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'oops';
        throw new Error(`Error occured creating admin or school ${errorMessage}`);
    }

};