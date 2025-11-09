import { useState, useEffect } from 'react';
import { findRoommateMatches, getUserProfile } from '../lib/firebase';
import { auth } from '../lib/firebase';
import { Roommate } from '../components/RoommateCard';

export function useMatchedRoommates() {
  const [matches, setMatches] = useState<Roommate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        setError(null);

        const currentUser = auth.currentUser;
        
        if (!currentUser) {
          setMatches([]);
          setLoading(false);
          return;
        }

        // Get current user's profile
        const profileResult = await getUserProfile(currentUser.uid);
        
        if (!profileResult.success) {
          setMatches([]);
          setLoading(false);
          return;
        }

        // Find matches
        const matchResult = await findRoommateMatches(currentUser.uid, profileResult.data as any);
        
        if (matchResult.success) {
          setMatches(matchResult.matches);
        } else {
          setMatches([]);
        }
      } catch (err: any) {
        console.error('Error fetching matches:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const refetch = () => {
    setLoading(true);
  };

  return { matches, loading, error, refetch };
}
