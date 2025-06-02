/**
 * CometChat Service - Initialize and configure CometChat UI Kit
 */
import { CometChatUIKit, UIKitSettingsBuilder } from "@cometchat/chat-uikit-react";
import { COMETCHAT_CONSTANTS } from "../utils/constants";
import type { ApiResponse, AppError } from "../types";

class CometChatService {
  private static instance: CometChatService;
  private isInitialized: boolean = false;
  
  private constructor() {}
  
  public static getInstance(): CometChatService {
    if (!CometChatService.instance) {
      CometChatService.instance = new CometChatService();
    }
    return CometChatService.instance;
  }

  /**
   * Initialize CometChat UI Kit with configuration
   */
  public async initialize(): Promise<ApiResponse<boolean>> {
    try {
      if (this.isInitialized) {
        return { success: true, data: true, message: "CometChat already initialized" };
      }

      console.log("🚀 Initializing CometChat UI Kit...");
      console.log("📋 Using credentials:", {
        APP_ID: COMETCHAT_CONSTANTS.APP_ID,
        REGION: COMETCHAT_CONSTANTS.REGION,
        AUTH_KEY: COMETCHAT_CONSTANTS.AUTH_KEY ? "***PROVIDED***" : "NOT_PROVIDED",
        REST_API_KEY: COMETCHAT_CONSTANTS.REST_API_KEY ? "***PROVIDED***" : "NOT_PROVIDED"
      });
      
      // Validate credentials
      if (!COMETCHAT_CONSTANTS.APP_ID || !COMETCHAT_CONSTANTS.REGION) {
        throw new Error("Missing required CometChat credentials");
      }

      // Configure UI Kit settings
      const UIKitSettings = new UIKitSettingsBuilder()
        .setAppId(COMETCHAT_CONSTANTS.APP_ID)
        .setRegion(COMETCHAT_CONSTANTS.REGION)
        .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
        .subscribePresenceForAllUsers() // Enable real-time presence updates
        .build();

      // Initialize the UI Kit
      await CometChatUIKit.init(UIKitSettings);
      
      this.isInitialized = true;
      console.log("✅ CometChat UI Kit initialized successfully");
      
      return { 
        success: true, 
        data: true, 
        message: "CometChat UI Kit initialized successfully" 
      };
    } catch (error: any) {
      console.error("❌ CometChat UI Kit initialization failed:", error);
      
      const appError: AppError = {
        code: error?.code || "INIT_ERROR",
        message: error?.message || "Failed to initialize CometChat",
        details: error
      };
      
      return { 
        success: false, 
        error: appError.message,
        data: false 
      };
    }
  }

  /**
   * Get the current initialization status
   */
  public getInitializationStatus(): boolean {
    return this.isInitialized;
  }

  /**
   * Login a user with UID
   */
  public async loginUser(uid: string): Promise<ApiResponse<CometChat.User>> {
    try {
      if (!this.isInitialized) {
        throw new Error("CometChat not initialized. Call initialize() first.");
      }

      console.log(`🔐 Logging in user: ${uid}`);

      // Check if user is already logged in
      const loggedInUser = await CometChatUIKit.getLoggedinUser();
      if (loggedInUser?.getUid() === uid) {
        console.log("✅ User already logged in");
        return { 
          success: true, 
          data: loggedInUser,
          message: "User already logged in"
        };
      }

      // Logout current user if different user is trying to login
      if (loggedInUser) {
        console.log("🔄 Logging out current user before new login");
        await CometChatUIKit.logout();
      }

      // Login the user
      const user = await CometChatUIKit.login(uid);
      console.log("✅ User login successful:", user.getName() || user.getUid());
      
      return { 
        success: true, 
        data: user,
        message: "User login successful"
      };
    } catch (error: any) {
      console.error("❌ User login failed:", error);
      console.error("❌ Error details:", JSON.stringify(error, null, 2));
      console.error("❌ Error code:", error?.code);
      console.error("❌ Error message:", error?.message);
      console.error("❌ Error name:", error?.name);
      
      // Handle specific CometChat error codes
      let errorMessage = "Failed to login user";
      if (error?.code) {
        switch (error.code) {
          case "ERR_UID_NOT_FOUND":
            errorMessage = "User not found. The user might need to be created first.";
            break;
          case "ERR_WRONG_CREDENTIALS":
            errorMessage = "Invalid credentials. Please check your authentication key.";
            break;
          case "ERR_INTERNET_UNAVAILABLE":
            errorMessage = "No internet connection. Please check your network.";
            break;
          case "ERR_AUTH_TOKEN_NOT_FOUND":
            errorMessage = "Authentication token not found. Please check your configuration.";
            break;
          case "ERR_APP_NOT_FOUND":
            errorMessage = "App not found. Please check your App ID.";
            break;
          default:
            errorMessage = error.message || `CometChat error: ${error.code}` || "Failed to login user";
        }
      } else {
        errorMessage = error.message || error.toString() || "Failed to login user";
      }
      
      const appError: AppError = {
        code: error?.code || "LOGIN_ERROR",
        message: errorMessage,
        details: error
      };
      
      return { 
        success: false, 
        error: appError.message 
      };
    }
  }

  /**
   * Logout the current user
   */
  public async logoutUser(): Promise<ApiResponse<boolean>> {
    try {
      console.log("🔓 Logging out user...");
      await CometChatUIKit.logout();
      console.log("✅ User logout successful");
      
      return { 
        success: true, 
        data: true,
        message: "User logout successful" 
      };
    } catch (error: any) {
      console.error("❌ User logout failed:", error);
      
      return { 
        success: false, 
        error: error?.message || "Failed to logout user" 
      };
    }
  }

  /**
   * Get the currently logged in user
   */
  public async getCurrentUser(): Promise<ApiResponse<CometChat.User | null>> {
    try {
      const user = await CometChatUIKit.getLoggedinUser();
      return { 
        success: true, 
        data: user,
        message: user ? "User found" : "No user logged in"
      };
    } catch (error: any) {
      console.error("❌ Failed to get current user:", error);
      
      return { 
        success: false, 
        error: error?.message || "Failed to get current user",
        data: null
      };
    }
  }

  /**
   * Create a new user (for development/testing purposes)
   * Note: In production, users should be created via REST API or Dashboard
   */
  public async createUser(uid: string, name: string): Promise<ApiResponse<CometChat.User>> {
    try {
      // For now, we'll return a mock response since createUser method
      // may not be available in the UI Kit. In production, use REST API.
      console.log("📝 User creation not implemented - use CometChat Dashboard or REST API");
      
      return { 
        success: false, 
        error: "User creation not implemented. Please use CometChat Dashboard or REST API to create users."
      };
    } catch (error: any) {
      console.error("❌ User creation failed:", error);
      
      return { 
        success: false, 
        error: error?.message || "Failed to create user" 
      };
    }
  }
}

export default CometChatService.getInstance();
