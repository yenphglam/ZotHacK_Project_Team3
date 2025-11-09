import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';

export function useRoommates() {
  const [roommates, setRoommates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoommates = async () => {
      try {
        setLoading(true);
        setError(null);

        const currentUser = auth.currentUser;
        
        // Get all users from Firestore
        const usersRef = collection(db, 'users');
        const querySnapshot = await getDocs(usersRef);
        
        const roommatesList = [];
        querySnapshot.forEach((doc) => {
          // Don't include the current user
          if (!currentUser || doc.id !== currentUser.uid) {
            roommatesList.push({
              id: doc.id,
              ...doc.data()
            });
          }
        });

        setRoommates(roommatesList);
      } catch (err) {
        console.error('Error fetching roommates:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoommates();
  }, []);

  return { roommates, loading, error };
}
