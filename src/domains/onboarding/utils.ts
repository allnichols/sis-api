import { randomUUID, pbkdf2Sync } from 'node:crypto';

export function hashPassword(password: string): string {
    const salt = randomUUID(); // Generate a random salt
    const hash = pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return `${salt}:${hash}`;
}