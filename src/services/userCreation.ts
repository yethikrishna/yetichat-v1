/**
 * User Creation Service - Create CometChat users via REST API
 */
import { COMETCHAT_CONSTANTS } from '../utils/constants';

export interface CreateUserRequest {
  uid: string;
  name: string;
  avatar?: string;
  link?: string;
  statusMessage?: string;
  tags?: string[];
}

export interface CreateUserResponse {
  success: boolean;
  data?: any;
  error?: string;
}

class UserCreationService {
  private static instance: UserCreationService;
  
  private constructor() {}
  
  public static getInstance(): UserCreationService {
    if (!UserCreationService.instance) {
      UserCreationService.instance = new UserCreationService();
    }
    return UserCreationService.instance;
  }

  /**
   * Create a user using CometChat REST API
   */
  public async createUser(userRequest: CreateUserRequest): Promise<CreateUserResponse> {
    try {
      console.log("🔨 Creating user via REST API:", userRequest.uid);
      
      const response = await fetch(`https://api-${COMETCHAT_CONSTANTS.REGION}.cometchat.io/v3/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'appId': COMETCHAT_CONSTANTS.APP_ID,
          'apiKey': COMETCHAT_CONSTANTS.REST_API_KEY,
        },
        body: JSON.stringify({
          uid: userRequest.uid,
          name: userRequest.name || userRequest.uid,
          avatar: userRequest.avatar || '',
          link: userRequest.link || '',
          statusMessage: userRequest.statusMessage || 'Available',
          tags: userRequest.tags || [],
        })
      });

      const result = await response.json();
      
      if (response.ok) {
        console.log("✅ User created successfully:", result);
        return {
          success: true,
          data: result.data
        };
      } else {
        console.log("⚠️ User creation response:", result);
        // User might already exist, which is okay
        if (result.error?.code === 'ERR_UID_ALREADY_EXISTS') {
          return {
            success: true,
            data: { message: 'User already exists' }
          };
        }
        
        return {
          success: false,
          error: result.error?.message || 'Failed to create user'
        };
      }
    } catch (error: any) {
      console.error("❌ User creation failed:", error);
      return {
        success: false,
        error: error.message || 'Network error during user creation'
      };
    }
  }

  /**
   * Create multiple test users
   */
  public async createTestUsers(): Promise<CreateUserResponse[]> {
    const testUsers = [
      { uid: 'cometchat-uid-1', name: 'John Doe' },
      { uid: 'cometchat-uid-2', name: 'Jane Smith' },
      { uid: 'cometchat-uid-3', name: 'Bob Wilson' },
      { uid: 'cometchat-uid-4', name: 'Alice Brown' },
      { uid: 'cometchat-uid-5', name: 'Charlie Davis' },
    ];

    console.log("🏭 Creating test users...");
    
    const results: CreateUserResponse[] = [];
    
    for (const user of testUsers) {
      const result = await this.createUser(user);
      results.push(result);
      
      // Add small delay between requests
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    console.log("✅ Test users creation completed");
    return results;
  }

  /**
   * Ensure user exists (create if not exists, then return success)
   */
  public async ensureUserExists(uid: string, name?: string): Promise<CreateUserResponse> {
    return this.createUser({
      uid,
      name: name || uid
    });
  }
}

export default UserCreationService.getInstance();
