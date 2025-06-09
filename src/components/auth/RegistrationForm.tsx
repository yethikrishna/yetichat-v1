// src/components/auth/RegistrationForm.tsx
import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import LoadingSpinner from '../ui/LoadingSpinner';
import useAuth from '../../hooks/useAuth';

interface RegistrationFormProps {
  className?: string;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ className }) => {
  const [uid, setUid] = useState('');
  const [name, setName] = useState('');
  // const { register, isLoading, error, clearError, validateUID } = useAuth(); // Anticipate 'register'
  // For now, using a local isLoading and error for UI demonstration as register is not in useAuth
  const {
    register, // Use the actual register function from useAuth
    isLoading,
    error,
    clearError,
    validateUID
  } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Client-side validation is now primarily handled by useAuth's register,
    // but we can keep basic non-empty checks here for immediate UI feedback if desired,
    // or rely on useAuth to set the error state which will be displayed.
    // For this version, we'll let useAuth's register handle detailed validation.
    if (!uid.trim() || !name.trim()) {
        // useAuth().register will set an appropriate error message.
        // Or, we can set a local, immediate error. Let's rely on useAuth for now.
        // For example, if we want to ensure fields are not empty before calling:
        // if (!uid.trim()) { /* set some local error or alert */ return; }
        // if (!name.trim()) { /* set some local error or alert */ return; }
    }

    // clearError(); // This is called within useAuth().register if needed before API call

    // isLoading will be true while useAuth().register is running.
    // error will be set if useAuth().register fails.
    // Successful registration will lead to isAuthenticated=true, and AuthWrapper will switch views.
    await register(uid, name);
    // No need to handle result here directly for error display,
    // as error from useAuth will be picked up by the component's error display logic.
    // Success (isAuthenticated=true) will cause AuthWrapper to render children.
  };

  const handleUidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUid = e.target.value.trim();
    setUid(newUid);
    if (error) clearError(); // Clear error if user starts typing
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    if (error) clearError(); // Clear error if user starts typing
  };

  const uidValidation = uid ? validateUID(uid) : { valid: true, error: null };
  // Basic client-side check for name, more detailed validation can be in useAuth or server-side
  const isNameValid = name.trim().length > 0;
  const nameValidationError = isNameValid ? null : "Name cannot be empty.";

  // isSubmitDisabled relies on isLoading and error from useAuth
  const isSubmitDisabled = isLoading || !uid.trim() || !name.trim() || !uidValidation.valid || !isNameValid;
  // currentError is now directly from useAuth
  const currentError = error;


  return (
    <div className={cn("w-full", className)}>
      {/* Removed redundant bg-white, shadow, p-8 as AuthWrapper provides the card */}
      <div className="text-center mb-6">
         {/* Icon could go here - e.g. UserPlusIcon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
        </svg>
        <h2 className="text-2xl font-bold text-gray-800">Create Your Account</h2>
        <p className="text-sm text-gray-500 mt-1">
          Choose a User ID and Name to get started.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="uid-register" className="block text-sm font-medium text-gray-700 mb-1 sr-only">User ID (UID)</label>
          <input
            id="uid-register"
            type="text"
            value={uid}
            onChange={handleUidChange}
            placeholder="Choose a unique User ID"
            className={cn(
              "w-full px-4 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow",
              "text-sm",
              // Prioritize error from useAuth if it mentions UID, else use local validation for UI feedback
              (currentError && (currentError.includes("UID") || currentError.includes("User ID")))
                ? "border-red-500 ring-red-500"
                : (!uidValidation.valid && uid ? "border-red-500 ring-red-500" : "border-gray-300 hover:border-gray-400")
            )}
            disabled={isLoading} // Use isLoading from useAuth
            aria-describedby="uid-error-register"
          />
          {/* Show local UID validation error only if there's no general auth error */}
          {(!uidValidation.valid && uid && !currentError) && (
            <p id="uid-error-register" className="mt-1.5 text-xs text-red-600">{uidValidation.error}</p>
          )}
        </div>

        <div>
          <label htmlFor="name-register" className="block text-sm font-medium text-gray-700 mb-1 sr-only">Your Name</label>
          <input
            id="name-register"
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter your full name"
            className={cn(
              "w-full px-4 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow",
              "text-sm",
              // Prioritize error from useAuth if it mentions name, else use local validation for UI feedback
              (currentError && currentError.toLowerCase().includes("name"))
                ? "border-red-500 ring-red-500"
                : (!isNameValid && name ? "border-red-500 ring-red-500" : "border-gray-300 hover:border-gray-400")
            )}
            disabled={isLoading} // Use isLoading from useAuth
            aria-describedby="name-error-register"
          />
          {/* Show local name validation error only if there's no general auth error and name field is touched */}
          {(!isNameValid && name && !currentError) && (
            <p id="name-error-register" className="mt-1.5 text-xs text-red-600">{nameValidationError}</p>
          )}
        </div>

        {currentError && (
          <div className="rounded-md bg-red-50 p-3 mt-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm-1-5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-2.5">
                <h3 className="text-xs font-medium text-red-800">Registration Failed</h3>
                <div className="mt-0.5 text-xs text-red-700">{currentError}</div>
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitDisabled}
          className={cn(
            "w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors",
            "mt-6",
            isSubmitDisabled // Use updated isSubmitDisabled
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500"
          )}
        >
          {isLoading ? ( // Use isLoading from useAuth
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              Registering...
            </>
          ) : 'Register & Sign In'}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
