import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || (allowedRoles && !allowedRoles.includes(user?.user_metadata?.role)))) {
      navigate('/login');
    }
  }, [user, loading, allowedRoles, navigate]);

  if (loading) return <div>Cargando...</div>;
  return children;
}
