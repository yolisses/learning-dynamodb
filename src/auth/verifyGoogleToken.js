import admin from 'firebase-admin';

admin.initializeApp();

export async function verifyGoogleToken(token) {
  try {
    if (!token) {
      return false;
    }
    return await admin.auth().verifyIdToken(token);
  } catch (err) {
    return false;
  }
}
