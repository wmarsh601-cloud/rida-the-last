import { useState } from 'react';
import { signIn } from '../lib/auth';

export default function useLoginLogic() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError(null);
    const { data, error } = await signIn(email, password);
    if (error) setError(error.message);
    setLoading(false);
    return { data, error };
  };

  return { handleLogin, loading, error };
}
