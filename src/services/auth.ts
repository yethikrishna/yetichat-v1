/**
 * Authentication Service - Handle user authentication flow
 */
import CometChatService from "./cometchat";
import UserCreationService from "./userCreation";
import type { AuthState, LoginCredentials, ApiResponse } from "../types";

class AuthService {
  private static instance: AuthService;
  private authListeners: Array<(state: AuthState) => void> = [];
  
  private constructor() {}
  
  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  /**
   * Initialize authentication service
   */
  public async initialize(): Promise<void> {
    try {
      // Initialize CometChat first
      await CometChatService.initialize();
      
      // Check if user is already logged in
      const userResponse = await CometChatService.getCurrentUser();
      if (userResponse.success && userResponse.data) {
        this.notifyListeners({
          isAuthenticated: true,
          user: userResponse.data,
          isLoading: false,
          error: null
        });
      }
    } catch (error: any) {
      console.error("Auth service initialization failed:", error);
    }
  }

  /**
   * Login user with credentials
   */
  public async login(credentials: LoginCredentials): Promise<ApiResponse<CometChat.User>> {
    try {
      console.log("🔐 Starting login process for UID:", credentials.uid);
      
      this.notifyListeners({
        isAuthenticated: false,
        user: null,
        isLoading: true,
        error: null
      });

      // First, ensure user exists by creating them if needed
      console.log("👤 Ensuring user exists...");
      const userCreationResult = await UserCreationService.ensureUserExists(credentials.uid);
      console.log("👤 User creation result:", userCreationResult);

      // Attempt login
      console.log("🚀 Attempting CometChat login...");
      const response = await CometChatService.loginUser(credentials.uid);
      console.log("📊 Login response:", response);
      
      if (response.success && response.data) {
        console.log("✅ Login successful!");
        this.notifyListeners({
          isAuthenticated: true,
          user: response.data,
          isLoading: false,
          error: null
        });
        
        return response;
      } else {
        console.log("❌ Login failed:", response.error);
        this.notifyListeners({
          isAuthenticated: false,
          user: null,
          isLoading: false,
          error: response.error || "Login failed"
        });
        
        return response;
      }
    } catch (error: any) {
      const errorMessage = error?.message || "Unexpected login error";
      console.error("💥 Login error in auth service:", error);
      
      this.notifyListeners({
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: errorMessage
      });
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }

  /**
   * Logout current user
   */
  public async logout(): Promise<ApiResponse<boolean>> {
    try {
      this.notifyListeners({
        isAuthenticated: false,
        user: null,
        isLoading: true,
        error: null
      });

      const response = await CometChatService.logoutUser();
      
      this.notifyListeners({
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: response.success ? null : response.error || "Logout failed"
      });
      
      return response;
    } catch (error: any) {
      const errorMessage = error?.message || "Unexpected logout error";
      
      this.notifyListeners({
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: errorMessage
      });
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }

  /**
   * Get current authentication state
   */
  public async getCurrentAuthState(): Promise<AuthState> {
    try {
      const userResponse = await CometChatService.getCurrentUser();
      
      return {
        isAuthenticated: userResponse.success && !!userResponse.data,
        user: userResponse.data || null,
        isLoading: false,
        error: userResponse.success ? null : userResponse.error || null
      };
    } catch (error: any) {
      return {
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: error?.message || "Failed to get auth state"
      };
    }
  }

  /**
   * Subscribe to authentication state changes
   */
  public subscribe(listener: (state: AuthState) => void): () => void {
    this.authListeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      const index = this.authListeners.indexOf(listener);
      if (index > -1) {
        this.authListeners.splice(index, 1);
      }
    };
  }

  /**
   * Notify all listeners of auth state changes
   */
  private notifyListeners(state: AuthState): void {
    this.authListeners.forEach(listener => {
      try {
        listener(state);
      } catch (error) {
        console.error("Error in auth state listener:", error);
      }
    });
  }

  /**
   * Validate UID format
   */
  public validateUID(uid: string): { valid: boolean; error?: string } {
    if (!uid || uid.trim().length === 0) {
      return { valid: false, error: "UID cannot be empty" };
    }
    
    if (uid.length < 3) {
      return { valid: false, error: "UID must be at least 3 characters long" };
    }
    
    if (uid.length > 100) {
      return { valid: false, error: "UID cannot exceed 100 characters" };
    }
    
    // Check for valid characters (alphanumeric, hyphens, underscores)
    const validPattern = /^[a-zA-Z0-9_-]+$/;
    if (!validPattern.test(uid)) {
      return { valid: false, error: "UID can only contain letters, numbers, hyphens, and underscores" };
    }
    
    return { valid: true };
  }

  /**
   * Register a new user
   */
  public async register(uid: string, name: string): Promise<ApiResponse<CometChat.User>> {
    try {
      console.log("🚀 Starting registration process for UID:", uid, "Name:", name);
      this.notifyListeners({
        isAuthenticated: false,
        user: null,
        isLoading: true,
        error: null,
      });

      // Attempt to create the user
      const createUserResponse = await UserCreationService.createUser({ uid, name });

      // Check if user creation indicated UID already exists
      // UserCreationService.createUser returns success:true even if ERR_UID_ALREADY_EXISTS
      // We need to inspect the actual response from the API, not just createUserResponse.success
      // The actual API response is in createUserResponse.data if it's a successful creation,
      // or it's part of the error structure if the API call itself failed before parsing JSON (less likely here)
      // or createUserResponse.error if UserCreationService itself caught an issue.

      // A more robust way to check for ERR_UID_ALREADY_EXISTS would be if UserCreationService exposed the raw API error code.
      // Given the current UserCreationService, if createUserResponse.data.message === 'User already exists',
      // it means the API returned ERR_UID_ALREADY_EXISTS.
      if (createUserResponse.success && createUserResponse.data?.message === 'User already exists') {
        const errorMessage = "User ID already taken. Please choose a different User ID.";
        console.warn("⚠️ Registration failed:", errorMessage);
        this.notifyListeners({
          isAuthenticated: false,
          user: null,
          isLoading: false,
          error: errorMessage,
        });
        return { success: false, error: errorMessage };
      }

      // Handle other user creation failures
      if (!createUserResponse.success) {
        const errorMessage = createUserResponse.error || "Failed to create user.";
        console.error("❌ User creation failed during registration:", errorMessage);
        this.notifyListeners({
          isAuthenticated: false,
          user: null,
          isLoading: false,
          error: errorMessage,
        });
        return { success: false, error: errorMessage };
      }

      // If user creation was truly successful (not pre-existing), proceed to login
      console.log("✅ User created successfully, now attempting login for:", uid);
      const loginResponse = await CometChatService.loginUser(uid);

      if (loginResponse.success && loginResponse.data) {
        console.log("✅ Login after registration successful!");
        this.notifyListeners({
          isAuthenticated: true,
          user: loginResponse.data,
          isLoading: false,
          error: null,
        });
        return loginResponse;
      } else {
        // This case should ideally not happen if user creation was successful
        // and login logic is robust. But handle it just in case.
        const loginError = loginResponse.error || "Login failed after registration.";
        console.error("❌ Login after registration failed:", loginError);
        this.notifyListeners({
          isAuthenticated: false,
          user: null,
          isLoading: false,
          error: loginError,
        });
        return { success: false, error: loginError };
      }
    } catch (error: any) {
      const errorMessage = error?.message || "Unexpected registration error";
      console.error("💥 Registration error in auth service:", error);
      this.notifyListeners({
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: errorMessage,
      });
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Clear authentication error
   */
  public clearError(): void {
    // Get current state and clear error
    this.getCurrentAuthState().then(currentState => {
      if (currentState.error) {
        this.notifyListeners({
          ...currentState,
          error: null
        });
      }
    });
  }
}

export default AuthService.getInstance();
