import { useState, useEffect, useCallback } from 'react';
import { getSession, onAuthStateChange, signOut } from './auth';

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSession = useCallback(async () => {
    setLoading(true);
    const { data, error } = await getSession();
    if (error) setError(error.message);
    setUser(data?.session?.user || null);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSession();
    const { data: listener } = onAuthStateChange(() => {
      fetchSession();
    });
    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, [fetchSession]);

  return { user, loading, error, signOut };
}
