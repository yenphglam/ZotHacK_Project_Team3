import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

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

// Initialize Firestore
export const db = getFirestore(app);

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

/**
 * Save user profile to Firestore
 * @param {string} userId - The user's UID
 * @param {object} profileData - The profile data to save
 */
export const saveUserProfile = async (userId, profileData) => {
  try {
    const userRef = doc(db, 'users', userId);
    
    const dataToSave = {
      ...profileData,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    
    await setDoc(userRef, dataToSave, { merge: true });
    
    console.log('Profile saved successfully!');
    return { success: true };
  } catch (error) {
    console.error('Error saving profile:', error);
    throw error;
  }
};

/**
 * Get user profile from Firestore
 * @param {string} userId - The user's UID
 */
export const getUserProfile = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return { success: true, data: userSnap.data() };
    } else {
      return { success: false, error: 'Profile not found' };
    }
  } catch (error) {
    console.error('Error getting profile:', error);
    throw error;
  }
};

/**
 * Find potential roommate matches based on profile
 * @param {string} currentUserId - Current user's UID
 * @param {object} userProfile - Current user's profile data
 */
export const findRoommateMatches = async (currentUserId, userProfile) => {
  try {
    const usersRef = collection(db, 'users');
    
    // Query for users with similar year
    const q = query(
      usersRef,
      where('year', '==', userProfile.year)
    );
    
    const querySnapshot = await getDocs(q);
    const matches = [];
    
    querySnapshot.forEach((doc) => {
      // Don't include current user
      if (doc.id !== currentUserId) {
        matches.push({
          id: doc.id,
          ...doc.data()
        });
      }
    });
    
    // Calculate match scores (simple algorithm)
    const scoredMatches = matches.map(match => {
      let score = 0;
      
      // Same sleep schedule: +30 points
      if (match.sleepSchedule === userProfile.sleepSchedule) {
        score += 30;
      }
      
      // Similar cleanliness (within 1 level): +20 points
      if (Math.abs(match.cleanliness[0] - userProfile.cleanliness[0]) <= 1) {
        score += 20;
      }
      
      // Shared interests: +5 points per interest
      const sharedInterests = match.interests?.filter(
        interest => userProfile.interests?.includes(interest)
      ) || [];
      score += sharedInterests.length * 5;
      
      return {
        ...match,
        matchScore: score,
        sharedInterests
      };
    });
    
    // Sort by match score (highest first)
    scoredMatches.sort((a, b) => b.matchScore - a.matchScore);
    
    return { success: true, matches: scoredMatches };
  } catch (error) {
    console.error('Error finding matches:', error);
    throw error;
  }
};
