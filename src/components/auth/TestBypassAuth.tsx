/**
 * TestBypassAuth - Temporary bypass for authentication testing
 */
import React, { useEffect, useState } from 'react';
import CometChatService from '../../services/cometchat';
import LoadingSpinner from '../ui/LoadingSpinner';

interface TestBypassAuthProps {
  children: React.ReactNode;
}

const TestBypassAuth: React.FC<TestBypassAuthProps> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeWithTestUser = async () => {
      try {
        console.log("🧪 Test Mode: Bypassing authentication for development");
        
        // Initialize CometChat
        const initResult = await CometChatService.initialize();
        if (!initResult.success) {
          throw new Error(initResult.error);
        }

        // Try to login with test user
        console.log("🔐 Attempting test login...");
        const loginResult = await CometChatService.loginUser('cometchat-uid-1');
        
        if (loginResult.success) {
          console.log("✅ Test login successful");
        } else {
          console.log("⚠️ Test login failed, but continuing...", loginResult.error);
        }
        
        setIsReady(true);
      } catch (error: any) {
        console.error("❌ Test initialization failed:", error);
        setError(error.message);
      }
    };

    initializeWithTestUser();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Test Mode Error</h3>
            <p className="text-sm text-gray-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!isReady) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" color="primary" />
          <p className="mt-4 text-gray-600">🧪 Test Mode: Initializing Yetichat...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default TestBypassAuth;
