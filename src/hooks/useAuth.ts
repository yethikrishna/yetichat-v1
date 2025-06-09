/**
 * useAuth Hook - React hook for authentication management
 */
import { useState, useEffect, useCallback } from 'react';
import AuthService from '../services/auth';
import type { AuthState, LoginCredentials, ApiResponse } from '../types';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true,
    error: null
  });

  // Initialize auth service and subscribe to changes
  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    const initAuth = async () => {
      try {
        // Subscribe to auth state changes
        unsubscribe = AuthService.subscribe(setAuthState);
        
        // Initialize auth service
        await AuthService.initialize();
        
        // Get initial auth state
        const initialState = await AuthService.getCurrentAuthState();
        setAuthState(initialState);
      } catch (error: any) {
        console.error('Failed to initialize auth:', error);
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: error?.message || 'Failed to initialize authentication'
        }));
      }
    };

    initAuth();

    // Cleanup subscription on unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  /**
   * Login function
   */
  const login = useCallback(async (uid: string): Promise<ApiResponse<CometChat.User>> => {
    // Validate UID
    const validation = AuthService.validateUID(uid);
    if (!validation.valid) {
      const errorResponse: ApiResponse<CometChat.User> = {
        success: false,
        error: validation.error
      };
      
      setAuthState(prev => ({
        ...prev,
        error: validation.error || "Invalid UID",
        isLoading: false
      }));
      
      return errorResponse;
    }

    // Clear any existing errors
    AuthService.clearError();
    
    // Attempt login
    const credentials: LoginCredentials = { uid: uid.trim() };
    return await AuthService.login(credentials);
  }, []);

  /**
   * Logout function
   */
  const logout = useCallback(async (): Promise<ApiResponse<boolean>> => {
    return await AuthService.logout();
  }, []);

  /**
   * Clear authentication error
   */
  const clearError = useCallback(() => {
    AuthService.clearError();
  }, []);

  /**
   * Refresh authentication state
   */
  const refreshAuth = useCallback(async () => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    const currentState = await AuthService.getCurrentAuthState();
    setAuthState(currentState);
  }, []);

  return {
    // State
    isAuthenticated: authState.isAuthenticated,
    user: authState.user,
    isLoading: authState.isLoading,
    error: authState.error,
    
    // Actions
    login,
    logout,
    clearError,
    refreshAuth,
    
    // Utilities
    validateUID: AuthService.validateUID.bind(AuthService),

    // Registration
    register: useCallback(async (uid: string, name: string): Promise<ApiResponse<CometChat.User>> => {
      // Client-side validation for UID
      const uidValidation = AuthService.validateUID(uid);
      if (!uidValidation.valid) {
        const errorMsg = uidValidation.error || "Invalid User ID format.";
        setAuthState(prev => ({ ...prev, error: errorMsg, isLoading: false }));
        return { success: false, error: errorMsg };
      }

      // Client-side validation for name (e.g., not empty, reasonable length)
      if (!name || name.trim().length === 0) {
        const errorMsg = "Name cannot be empty.";
        setAuthState(prev => ({ ...prev, error: errorMsg, isLoading: false }));
        return { success: false, error: errorMsg };
      }
      if (name.trim().length > 100) { // Example length limit
        const errorMsg = "Name is too long (maximum 100 characters).";
        setAuthState(prev => ({ ...prev, error: errorMsg, isLoading: false }));
        return { success: false, error: errorMsg };
      }

      AuthService.clearError(); // Clear any previous errors
      return await AuthService.register(uid.trim(), name.trim());
    }, []),
  };
};

export default useAuth;
