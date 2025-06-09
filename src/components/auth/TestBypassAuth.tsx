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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Test/Bypass Authentication Setup Error</h3>
            <p className="text-sm text-red-700 bg-red-100 p-3 rounded-md mb-4">
              <strong>Error details:</strong> {error}
            </p>
            <div className="text-sm text-gray-700 space-y-2 text-left">
              <p className="font-semibold">Troubleshooting suggestions:</p>
              {error && (
                <>
                  { (error.includes('APP_ID') || error.toLowerCase().includes('app not found') || error.includes('ERR_CC_APP_NOT_FOUND')) && (
                    <p>• Check if <code className="bg-gray-200 p-1 rounded text-xs">VITE_COMETCHAT_APP_ID</code> in your <code>.env</code> file is correct and matches the App ID in your CometChat dashboard.</p>
                  )}
                  { (error.includes('AUTH_KEY') || error.toLowerCase().includes('invalid credentials') || error.includes('ERR_CC_AUTH_KEY_NOT_FOUND')) && (
                    <p>• Verify that <code className="bg-gray-200 p-1 rounded text-xs">VITE_COMETCHAT_AUTH_KEY</code> in your <code>.env</code> file is correct.</p>
                  )}
                  { (error.toLowerCase().includes('uid_not_found') || error.toLowerCase().includes('user not found') || error.includes('ERR_CC_UID_NOT_FOUND')) && (
                    <p>• Ensure the test user (e.g., <code className="bg-gray-200 p-1 rounded text-xs">cometchat-uid-1</code>) exists in your CometChat dashboard for the specified region.</p>
                  )}
                  { (error.toLowerCase().includes('region') || error.includes('ERR_CC_REGION_NOT_FOUND')) && (
                     <p>• Confirm that <code className="bg-gray-200 p-1 rounded text-xs">VITE_COMETCHAT_REGION</code> in your <code>.env</code> file is correct (e.g., "us", "eu", "in").</p>
                  )}
                </>
              )}
              <p>• Double-check all <code className="bg-gray-200 p-1 rounded text-xs">VITE_COMETCHAT_*</code> environment variables in your <code>.env</code> file.</p>
              <p>• If deploying to Netlify (or another platform), ensure these environment variables are correctly set in the hosting provider's UI.</p>
              <p>• Make sure you have run <code className="bg-gray-200 p-1 rounded text-xs">pnpm install</code> (or <code className="bg-gray-200 p-1 rounded text-xs">npm install</code>) recently.</p>
              <p>• Consult the <code className="bg-gray-200 p-1 rounded text-xs">README.md</code> and <code className="bg-gray-200 p-1 rounded text-xs">docs/SETUP.md</code> for more details.</p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 w-full"
            >
              Retry Initialization
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
