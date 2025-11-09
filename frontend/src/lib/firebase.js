import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3ugBSZBm-FVfaCA7qYl-gvz1EUHJqJWs",
  authDomain: "zothomes-zothacks.firebaseapp.com",
  projectId: "zothomes-zothacks",
  storageBucket: "zothomes-zothacks.firebasestorage.app",
  messagingSenderId: "915821496682",
  appId: "1:915821496682:web:876fcea2a6c6117bad7d13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Configure Google Provider
export const googleProvider = new GoogleAuthProvider();

// Force account selection and restrict to UCI domain
googleProvider.setCustomParameters({
  prompt: 'select_account',
  hd: 'uci.edu'  // Hosted domain - restricts to UCI emails
});

/**
 * Sign in with Google popup
 * Returns user object and ID token
 */
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Double-check it's a UCI email
    if (!user.email.endsWith('@uci.edu')) {
      await signOut(auth);
      throw new Error('Please use your UCI email address (@uci.edu)');
    }
    
    // Get ID token to send to backend
    const idToken = await user.getIdToken();
    
    return {
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      },
      idToken
    };
  } catch (error) {
    console.error('Google sign-in error:', error);
    
    // Handle specific error cases
    if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('Sign-in cancelled');
    } else if (error.code === 'auth/popup-blocked') {
      throw new Error('Popup blocked. Please allow popups for this site.');
    }
    
    throw error;
  }
};

/**
 * Sign out current user
 */
export const signOutUser = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem('id_token');
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
};
