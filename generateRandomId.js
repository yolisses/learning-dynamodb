import { randomBytes } from 'crypto';

export function generateRandomId() {
  return randomBytes(10).toString('hex');
}
