import { randomUUID, pbkdf2Sync, randomBytes } from 'node:crypto';

export function hashPassword(password: string): string {
    const salt = randomUUID(); // Generate a random salt
    const hash = pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return `${salt}:${hash}`;
}

export function generateSchoolSlug(schoolName: string): string {
    const base = schoolName.toLowerCase().replace(/\s+/g, '-');
    const randomSuffix = randomUUID().substring(0, 6);
    return `${base}-${randomSuffix}`;
}