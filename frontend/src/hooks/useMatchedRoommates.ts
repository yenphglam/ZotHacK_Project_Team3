import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { Roommate } from '../components/RoommateCard';

export function useMatchedRoommates() {
  const [matches, setMatches] = useState<Roommate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoommates = async () => {
      try {
        setLoading(true);
        setError(null);

        const user = auth.currentUser;
        
        if (!user) {
          console.log('No user signed in');
          setMatches([]);
          setLoading(false);
          return;
        }

        console.log('🔍 Fetching roommates for user:', user.email);

        // Get current user's profile
        const currentUserDoc = await getDoc(doc(db, 'users', user.uid));
        const currentUserData = currentUserDoc.data();

        if (!currentUserData) {
          console.log('Current user has no profile');
          setMatches([]);
          setLoading(false);
          return;
        }

        // Get all users EXCEPT current user
        const usersRef = collection(db, 'users');
        const usersSnapshot = await getDocs(usersRef);

        const roommates: Roommate[] = [];

        usersSnapshot.forEach((doc) => {
          // Skip current user
          if (doc.id === user.uid) {
            return;
          }

          const data = doc.data();
          
          // Make sure user has required fields
          if (!data.name || !data.major || !data.year) {
            return;
          }

          // Calculate match score
          const matchScore = calculateMatchScore(currentUserData, data);
          const matchReasons = getMatchReasons(currentUserData, data);
          const sharedInterests = getSharedInterests(
            currentUserData.interests || [],
            data.interests || []
          );

          roommates.push({
            id: doc.id,
            name: data.name,
            email: data.email,
            photoURL: data.photoURL,
            major: data.major,
            year: data.year,
            bio: data.bio || '',
            budgetMin: data.budgetMin || 0,
            budgetMax: data.budgetMax || 0,
            moveInDate: data.moveInDate || '',
            preferences: data.preferences || {
              cleanOrganized: false,
              quietHours: false,
              nonSmoker: false,
              petsAllowed: false,
              guestsOk: false,
            },
            interests: data.interests || [],
            sleepSchedule: data.sleepSchedule || '',
            cleanliness: data.cleanliness || [3],
            matchScore,
            matchReasons,
            sharedInterests,
          });
        });

        // Sort by match score (highest first)
        roommates.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));

        console.log('✅ Found', roommates.length, 'potential roommates');
        setMatches(roommates);
      } catch (err) {
        console.error('Error fetching roommates:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch roommates');
      } finally {
        setLoading(false);
      }
    };

    fetchRoommates();
  }, []);

  return { matches, loading, error };
}

// Calculate match score between two users
function calculateMatchScore(user1: any, user2: any): number {
  let score = 0;
  let maxScore = 0;

  // Budget compatibility (20 points)
  maxScore += 20;
  if (user1.budgetMin && user2.budgetMin && user1.budgetMax && user2.budgetMax) {
    const overlap =
      Math.min(user1.budgetMax, user2.budgetMax) -
      Math.max(user1.budgetMin, user2.budgetMin);
    if (overlap > 0) {
      score += 20;
    } else if (overlap > -200) {
      score += 10;
    }
  }

  // Sleep schedule compatibility (15 points)
  maxScore += 15;
  if (user1.sleepSchedule && user2.sleepSchedule) {
    if (user1.sleepSchedule === user2.sleepSchedule) {
      score += 15;
    } else if (
      user1.sleepSchedule === 'flexible' ||
      user2.sleepSchedule === 'flexible'
    ) {
      score += 10;
    }
  }

  // Cleanliness compatibility (15 points)
  maxScore += 15;
  if (user1.cleanliness && user2.cleanliness) {
    const diff = Math.abs(user1.cleanliness[0] - user2.cleanliness[0]);
    if (diff === 0) {
      score += 15;
    } else if (diff === 1) {
      score += 10;
    } else if (diff === 2) {
      score += 5;
    }
  }

  // Shared interests (25 points)
  maxScore += 25;
  const sharedInterests = getSharedInterests(
    user1.interests || [],
    user2.interests || []
  );
  if (sharedInterests.length > 0) {
    score += Math.min(25, sharedInterests.length * 5);
  }

  // Shared preferences (25 points)
  maxScore += 25;
  const sharedPrefs = countSharedPreferences(
    user1.preferences || {},
    user2.preferences || {}
  );
  score += Math.min(25, sharedPrefs * 5);

  return Math.round((score / maxScore) * 100);
}

// Get reasons why two users match
function getMatchReasons(user1: any, user2: any): string[] {
  const reasons: string[] = [];

  // Budget
  if (user1.budgetMin && user2.budgetMin && user1.budgetMax && user2.budgetMax) {
    const overlap =
      Math.min(user1.budgetMax, user2.budgetMax) -
      Math.max(user1.budgetMin, user2.budgetMin);
    if (overlap > 0) {
      reasons.push('Similar budget');
    }
  }

  // Sleep schedule
  if (user1.sleepSchedule === user2.sleepSchedule) {
    reasons.push('Same sleep schedule');
  }

  // Cleanliness
  if (user1.cleanliness && user2.cleanliness) {
    const diff = Math.abs(user1.cleanliness[0] - user2.cleanliness[0]);
    if (diff <= 1) {
      reasons.push('Similar cleanliness level');
    }
  }

  // Shared interests
  const sharedInterests = getSharedInterests(
    user1.interests || [],
    user2.interests || []
  );
  if (sharedInterests.length >= 3) {
    reasons.push(`${sharedInterests.length} shared interests`);
  }

  // Shared preferences
  const prefs = countSharedPreferences(user1.preferences || {}, user2.preferences || {});
  if (prefs >= 2) {
    reasons.push(`${prefs} matching preferences`);
  }

  return reasons;
}

// Get shared interests between two users
function getSharedInterests(interests1: string[], interests2: string[]): string[] {
  return interests1.filter((interest) => interests2.includes(interest));
}

// Count shared preferences
function countSharedPreferences(prefs1: any, prefs2: any): number {
  let count = 0;
  const keys = ['cleanOrganized', 'quietHours', 'nonSmoker', 'petsAllowed', 'guestsOk'];
  
  keys.forEach((key) => {
    if (prefs1[key] && prefs2[key]) {
      count++;
    }
  });
  
  return count;
}
