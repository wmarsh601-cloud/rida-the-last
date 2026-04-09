import { useState } from 'react';
import { signUp } from '../lib/auth';

export default function useRegisterLogic() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRegister = async (name, email, password, role) => {
    setLoading(true);
    setError(null);
    const { data, error } = await signUp(email, password, role, name);
    if (error) setError(error.message);
    setLoading(false);
    return { data, error };
  };

  return { handleRegister, loading, error };
}
