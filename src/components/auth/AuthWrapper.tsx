/**
 * AuthWrapper Component - Handles authentication flow and routing
 */
import React from 'react';
import useAuth from '../../hooks/useAuth';
import LoginForm from './LoginForm';
import LoadingSpinner from '../ui/LoadingSpinner';

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" color="primary" />
          <p className="mt-4 text-gray-600">Initializing Yetichat...</p>
        </div>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
        <LoginForm />
      </div>
    );
  }

  // User is authenticated, render the main app
  return <>{children}</>;
};

export default AuthWrapper;
