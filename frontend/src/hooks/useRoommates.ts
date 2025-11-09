import { useState, useEffect } from 'react';
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { Roommate } from '../components/RoommateCard';

export function useRoommates() {
  const [roommates, setRoommates] = useState<Roommate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // ✅ Wait for auth to be ready
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (!user) {
        console.log('❌ No user signed in');
        setRoommates([]);
        setLoading(false);
        return;
      }

      console.log('👤 Current user:', user.email);

      // Now fetch roommates
      const fetchRoommates = async () => {
        try {
          setLoading(true);
          setError(null);

          // Get current user's profile
          const currentUserDoc = await getDoc(doc(db, 'users', user.uid));
          const currentUserData = currentUserDoc.data();
          console.log('📝 Current user profile:', currentUserData);

          if (!currentUserData) {
            console.log('❌ Current user has no profile');
            setRoommates([]);
            setLoading(false);
            return;
          }

          // Listen to real-time updates
          const usersRef = collection(db, 'users');
          console.log('🔍 Listening to users collection...');
          
          const unsubscribeSnapshot = onSnapshot(usersRef, (snapshot) => {
            console.log('📊 Snapshot received, total docs:', snapshot.size);
            
            const roommatesList: Roommate[] = [];

            snapshot.forEach((docSnap) => {
              console.log('🔎 Checking doc:', docSnap.id, docSnap.data().name);
              
              if (docSnap.id === user.uid) {
                console.log('⏭️ Skipping current user');
                return;
              }

              const data = docSnap.data();
              
              if (!data.name || !data.major || !data.year) {
                console.log('⚠️ Skipping incomplete profile:', docSnap.id);
                return;
              }

              console.log('✅ Adding roommate:', data.name);

              const matchScore = calculateMatchScore(currentUserData, data);
              const matchReasons = getMatchReasons(currentUserData, data);
              const sharedInterests = getSharedInterests(
                currentUserData.interests || [],
                data.interests || []
              );

              roommatesList.push({
                id: docSnap.id,
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

            roommatesList.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
            
            console.log('✅ Found', roommatesList.length, 'potential roommates');
            setRoommates(roommatesList);
            setLoading(false);
          });

          // Return cleanup for snapshot listener
          return unsubscribeSnapshot;
        } catch (err) {
          console.error('❌ Error fetching roommates:', err);
          setError(err instanceof Error ? err.message : 'Failed to fetch roommates');
          setLoading(false);
        }
      };

      fetchRoommates();
    });

    // Cleanup auth listener
    return () => unsubscribeAuth();
  }, []);

  return { roommates, loading, error };
}

// Helper functions (keep them exactly as they are)
function calculateMatchScore(user1: any, user2: any): number {
  let score = 0;
  let maxScore = 0;

  maxScore += 20;
  if (user1.budgetMin && user2.budgetMin && user1.budgetMax && user2.budgetMax) {
    const overlap = Math.min(user1.budgetMax, user2.budgetMax) - Math.max(user1.budgetMin, user2.budgetMin);
    if (overlap > 0) score += 20;
    else if (overlap > -200) score += 10;
  }

  maxScore += 15;
  if (user1.sleepSchedule && user2.sleepSchedule) {
    if (user1.sleepSchedule === user2.sleepSchedule) score += 15;
    else if (user1.sleepSchedule === 'flexible' || user2.sleepSchedule === 'flexible') score += 10;
  }

  maxScore += 15;
  if (user1.cleanliness && user2.cleanliness) {
    const diff = Math.abs(user1.cleanliness[0] - user2.cleanliness[0]);
    if (diff === 0) score += 15;
    else if (diff === 1) score += 10;
    else if (diff === 2) score += 5;
  }

  maxScore += 25;
  const sharedInterests = getSharedInterests(user1.interests || [], user2.interests || []);
  if (sharedInterests.length > 0) score += Math.min(25, sharedInterests.length * 5);

  maxScore += 25;
  const sharedPrefs = countSharedPreferences(user1.preferences || {}, user2.preferences || {});
  score += Math.min(25, sharedPrefs * 5);

  return Math.round((score / maxScore) * 100);
}

function getMatchReasons(user1: any, user2: any): string[] {
  const reasons: string[] = [];
  
  if (user1.budgetMin && user2.budgetMin && user1.budgetMax && user2.budgetMax) {
    const overlap = Math.min(user1.budgetMax, user2.budgetMax) - Math.max(user1.budgetMin, user2.budgetMin);
    if (overlap > 0) reasons.push('Similar budget');
  }
  
  if (user1.sleepSchedule === user2.sleepSchedule) reasons.push('Same sleep schedule');
  
  if (user1.cleanliness && user2.cleanliness) {
    const diff = Math.abs(user1.cleanliness[0] - user2.cleanliness[0]);
    if (diff <= 1) reasons.push('Similar cleanliness level');
  }
  
  const sharedInterests = getSharedInterests(user1.interests || [], user2.interests || []);
  if (sharedInterests.length >= 3) reasons.push(`${sharedInterests.length} shared interests`);
  
  const prefs = countSharedPreferences(user1.preferences || {}, user2.preferences || {});
  if (prefs >= 2) reasons.push(`${prefs} matching preferences`);
  
  return reasons;
}

function getSharedInterests(interests1: string[], interests2: string[]): string[] {
  return interests1.filter((interest) => interests2.includes(interest));
}

function countSharedPreferences(prefs1: any, prefs2: any): number {
  let count = 0;
  const keys = ['cleanOrganized', 'quietHours', 'nonSmoker', 'petsAllowed', 'guestsOk'];
  keys.forEach((key) => {
    if (prefs1[key] && prefs2[key]) count++;
  });
  return count;
}
