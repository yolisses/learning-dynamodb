import { verifyGoogleToken } from './verifyGoogleToken.js';

export function authenticateWithGoogle({ token }) {
  return verifyGoogleToken(token);
}
