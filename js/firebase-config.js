/* Firebase web app config for Google sign-in and saved history.
   Leave as null to run without accounts (the sign-in UI stays hidden).
   Fill in from Firebase console → Project settings → Your apps → Web app (see FIREBASE_SETUP.md).
   These values are public identifiers, not secrets; access is enforced by firestore.rules. */
export const FIREBASE_CONFIG = {
  apiKey: "PASTE_API_KEY_HERE",
  authDomain: "smash-lab-6c0c4.firebaseapp.com",
  projectId: "smash-lab-6c0c4",
  storageBucket: "smash-lab-6c0c4.firebasestorage.app",
  messagingSenderId: "810302084061",
  appId: "1:810302084061:web:843d58b5622ede4cc01c34"
};
/* Example:
export const FIREBASE_CONFIG = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef"
};
*/
