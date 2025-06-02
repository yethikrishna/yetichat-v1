/**
 * LoginForm Component - User authentication form
 */
import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { TEST_USERS } from '../../utils/constants';
import LoadingSpinner from '../ui/LoadingSpinner';
import useAuth from '../../hooks/useAuth';

interface LoginFormProps {
  className?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ className }) => {
  const [uid, setUid] = useState('');
  const [showTestUsers, setShowTestUsers] = useState(false);
  const { login, isLoading, error, clearError, validateUID } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("🔄 Login form submitted with UID:", uid);
    
    if (!uid.trim()) {
      console.log("❌ Login failed: UID is empty");
      return;
    }

    // Clear any previous errors
    clearError();
    
    console.log("🚀 Attempting login with UID:", uid);
    
    // Attempt login
    try {
      const result = await login(uid);
      console.log("📊 Login result:", result);
    } catch (error) {
      console.error("💥 Login error caught in form:", error);
    }
  };

  const handleUidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUid = e.target.value;
    setUid(newUid);
    
    // Clear errors when user starts typing
    if (error) {
      clearError();
    }
  };

  const handleTestUserSelect = (testUid: string) => {
    setUid(testUid);
    setShowTestUsers(false);
    clearError();
  };

  const validation = uid ? validateUID(uid) : { valid: true };

  return (
    <div className={cn("w-full max-w-md", className)}>
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-indigo-600"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome to Yetichat</h2>
          <p className="text-sm text-gray-600 mt-2">
            Enter your User ID to start chatting
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="uid" className="block text-sm font-medium text-gray-700 mb-2">
              User ID (UID)
            </label>
            <input
              id="uid"
              type="text"
              value={uid}
              onChange={handleUidChange}
              placeholder="Enter your UID"
              className={cn(
                "w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500",
                (!validation.valid && uid) || error
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300"
              )}
              disabled={isLoading}
              autoComplete="username"
            />
            
            {/* UID Validation Error */}
            {!validation.valid && uid && (
              <p className="mt-1 text-sm text-red-600">
                {validation.error}
              </p>
            )}
          </div>

          {/* Test Users Toggle */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => setShowTestUsers(!showTestUsers)}
              className="text-sm text-indigo-600 hover:text-indigo-800 focus:outline-none"
              disabled={isLoading}
            >
              {showTestUsers ? 'Hide' : 'Show'} test users
            </button>
          </div>

          {/* Test Users List */}
          {showTestUsers && (
            <div className="bg-gray-50 rounded-md p-4">
              <p className="text-xs text-gray-600 mb-3">
                Click on any test user to use their UID:
              </p>
              <div className="grid grid-cols-1 gap-2">
                {TEST_USERS.map((testUid) => (
                  <button
                    key={testUid}
                    type="button"
                    onClick={() => handleTestUserSelect(testUid)}
                    className="text-left text-sm bg-white border border-gray-200 rounded px-3 py-2 hover:bg-indigo-50 hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                    disabled={isLoading}
                  >
                    {testUid}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Login Failed
                  </h3>
                  <div className="mt-1 text-sm text-red-700">
                    {error}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !uid.trim() || !validation.valid}
            className={cn(
              "w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors",
              isLoading || !uid.trim() || !validation.valid
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500"
            )}
          >
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" color="white" className="mr-2" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            New to CometChat? Users are created automatically on first login.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
