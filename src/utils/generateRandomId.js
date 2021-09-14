import { randomBytes } from 'crypto';

export function generateRandomId(amount = 10) {
  return randomBytes(amount).toString('hex');
}
