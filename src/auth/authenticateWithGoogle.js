import { getUser } from '../user/getUser.js';
import { createUser } from '../user/createUser.js';
import { getEmailUser } from '../user/getEmailUser.js';

import { verifyGoogleToken } from './verifyGoogleToken.js';

export async function authenticateWithGoogle({ token }) {
  const { email, name } = await verifyGoogleToken(token);
  const user = await getEmailUser({ email });
  if (!user) {
    return createUser({ email, name });
  }
  return getUser({ id: user.id });
}
