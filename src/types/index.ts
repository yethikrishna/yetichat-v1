/**
 * Yetichat Type Definitions
 */

// Auth related types
export interface AuthState {
  isAuthenticated: boolean;
  user: CometChat.User | null;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  uid: string;
}

// Chat related types
export interface ChatState {
  activeConversation: CometChat.Conversation | null;
  conversations: CometChat.Conversation[];
  messages: CometChat.BaseMessage[];
  isLoading: boolean;
  error: string | null;
}

// UI related types
export interface SidebarState {
  isOpen: boolean;
  activeTab: 'conversations' | 'users' | 'groups' | 'settings';
}

export interface Theme {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  border: string;
}

// Component props types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface LoadingSpinnerProps extends BaseComponentProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

// Navigation types
export interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  path?: string;
  badge?: number;
  onClick?: () => void;
}

// CometChat User extensions
export interface YetichatUser extends CometChat.User {
  // Add any custom user properties here
  lastSeen?: number;
  isOnline?: boolean;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: any;
}

// Route types
export type RouteParams = {
  userId?: string;
  groupId?: string;
  conversationId?: string;
};

// Event types
export interface ChatEvent {
  type: 'message' | 'typing' | 'presence' | 'notification';
  data: any;
  timestamp: number;
}

// Settings types
export interface UserSettings {
  notifications: boolean;
  soundEnabled: boolean;
  theme: 'light' | 'dark' | 'auto';
  language: string;
}

// Global CometChat type declarations
declare global {
  namespace CometChat {
    interface User {
      // Extend CometChat User interface if needed
    }
    
    interface BaseMessage {
      // Extend CometChat BaseMessage interface if needed
    }
    
    interface Conversation {
      // Extend CometChat Conversation interface if needed
    }
  }
}

export {};
