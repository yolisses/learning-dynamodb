import admin from 'firebase-admin';

admin.initializeApp();

export async function verifyGoogleToken(token) {
  try {
    if (!token) {
      return false;
    }
    const payload = await admin.auth().verifyIdToken(token);
    console.error(payload);
    return payload !== null;
  } catch (err) {
    console.error(err);
    return false;
  }
}
