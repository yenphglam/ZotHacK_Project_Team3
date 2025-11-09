import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, getDocs } from 'firebase/firestore';

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
 */
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Double-check it's a UCI email
    if (!user.email?.endsWith('@uci.edu')) {
      await signOut(auth);
      throw new Error('Please use your UCI email address (@uci.edu)');
    }
    
    // Get ID token
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
  } catch (error: any) {
    console.error('Google sign-in error:', error);
    
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
 */
export const saveUserProfile = async (userId: string, profileData: any) => {
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
 */
export const getUserProfile = async (userId: string) => {
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
 * Find potential roommate matches
 */
export const findRoommateMatches = async (currentUserId: string, userProfile: any) => {
  try {
    const usersRef = collection(db, 'users');
    const querySnapshot = await getDocs(usersRef);
    const matches: any[] = [];
    
    querySnapshot.forEach((doc) => {
      if (doc.id !== currentUserId) {
        matches.push({
          id: doc.id,
          ...doc.data()
        });
      }
    });
    
    // Calculate match scores
    const scoredMatches = matches.map(match => {
      let score = 0;
      const reasons: string[] = [];
      
      if (match.year === userProfile.year) {
        score += 20;
        reasons.push("Same year");
      }
      
      if (match.major === userProfile.major) {
        score += 15;
        reasons.push("Same major");
      }
      
      if (match.sleepSchedule === userProfile.sleepSchedule) {
        score += 25;
        reasons.push("Similar sleep schedule");
      }
      
      if (match.cleanliness && userProfile.cleanliness) {
        const cleanDiff = Math.abs(match.cleanliness[0] - userProfile.cleanliness[0]);
        if (cleanDiff === 0) {
          score += 20;
          reasons.push("Same cleanliness level");
        } else if (cleanDiff === 1) {
          score += 10;
          reasons.push("Similar cleanliness");
        }
      }
      
      if (match.budgetMin && match.budgetMax && userProfile.budgetMin && userProfile.budgetMax) {
        const overlap = Math.min(match.budgetMax, userProfile.budgetMax) - 
                       Math.max(match.budgetMin, userProfile.budgetMin);
        if (overlap > 0) {
          score += 30;
          reasons.push("Budget compatible");
        }
      }
      
      if (match.moveInDate === userProfile.moveInDate) {
        score += 15;
        reasons.push("Same move-in date");
      }
      
      if (match.preferences && userProfile.preferences) {
        if (match.preferences.cleanOrganized && userProfile.preferences.cleanOrganized) {
          score += 10;
          reasons.push("Both want clean & organized");
        }
        if (match.preferences.quietHours && userProfile.preferences.quietHours) {
          score += 10;
          reasons.push("Both want quiet hours");
        }
        if (match.preferences.nonSmoker && userProfile.preferences.nonSmoker) {
          score += 10;
          reasons.push("Both non-smokers");
        }
        if (match.preferences.petsAllowed && userProfile.preferences.petsAllowed) {
          score += 5;
          reasons.push("Both okay with pets");
        }
        if (match.preferences.guestsOk && userProfile.preferences.guestsOk) {
          score += 5;
          reasons.push("Both okay with guests");
        }
      }
      
      const sharedInterests = match.interests?.filter(
        (interest: string) => userProfile.interests?.includes(interest)
      ) || [];
      score += sharedInterests.length * 3;
      if (sharedInterests.length > 0) {
        reasons.push(`${sharedInterests.length} shared interests`);
      }
      
      return {
        ...match,
        matchScore: score,
        matchReasons: reasons,
        sharedInterests
      };
    });
    
    scoredMatches.sort((a, b) => b.matchScore - a.matchScore);
    
    return { success: true, matches: scoredMatches };
  } catch (error) {
    console.error('Error finding matches:', error);
    throw error;
  }
};