/**
 * AuthWrapper Component - Handles authentication flow and routing
 */
import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm'; // Import RegistrationForm
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
  const [showRegistration, setShowRegistration] = useState(false); // State for toggling
  const toggleShowRegistration = () => setShowRegistration(!showRegistration);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
          {showRegistration ? (
            <>
              <RegistrationForm />
              <button
                onClick={toggleShowRegistration}
                className="mt-8 w-full text-center text-sm text-indigo-600 hover:text-indigo-500 hover:underline"
              >
                Already have an account? Login
              </button>
            </>
          ) : (
            <>
              <LoginForm />
              <button
                onClick={toggleShowRegistration}
                className="mt-6 w-full text-center text-sm text-indigo-600 hover:text-indigo-500 hover:underline"
              >
                Don't have an account? Register
              </button>
            </>
          )}
        </div>
        <p className="mt-8 text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Yetichat. All rights reserved.
        </p>
      </div>
    );
  }

  // User is authenticated, render the main app
  return <>{children}</>;
};

export default AuthWrapper;
