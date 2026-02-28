import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../lib/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      // Redirect to login if not authenticated
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  // If authenticated, render children
  if (!isAuthenticated()) {
    return null;
  }

  return <>{children}</>;
}
