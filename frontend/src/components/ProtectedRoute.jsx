import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-cyber-neon">Loading...</div>;

  if (!user) {
    const redirect = `${window.location.pathname}${window.location.search}`;
    if (adminOnly) {
      return <Navigate to={`/login?redirect=${encodeURIComponent(redirect)}`} replace />;
    }
    return <Navigate to={`/signup?redirect=${encodeURIComponent(redirect)}`} replace />;
  }

  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/dashboard" replace />; // Redirect non-admins to student dashboard
  }

  return children;
};

export default ProtectedRoute;
