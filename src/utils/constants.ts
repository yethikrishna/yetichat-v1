/**
 * CometChat Constants - Configuration for Yetichat
 */
export const COMETCHAT_CONSTANTS = {
  APP_ID: import.meta.env.VITE_COMETCHAT_APP_ID || "26e10d1e21615f14",
  REGION: import.meta.env.VITE_COMETCHAT_REGION || "us",
  AUTH_KEY: import.meta.env.VITE_COMETCHAT_AUTH_KEY || "6191dc2b6c28c2c5074f1bb42b97d757a63cf246",
  REST_API_KEY: import.meta.env.VITE_COMETCHAT_REST_API_KEY || "679d760de8ff1f249650ff9e5595471d824e0b3a",
};

/**
 * Application Constants
 */
export const APP_CONSTANTS = {
  APP_NAME: import.meta.env.VITE_APP_NAME || "Yetichat",
  APP_VERSION: import.meta.env.VITE_APP_VERSION || "1.0.0",
  DEFAULT_AVATAR: "/images/default-avatar.png",
  BRAND_COLOR: "#6366f1", // Indigo brand color
  SIDEBAR_WIDTH: "280px",
  HEADER_HEIGHT: "64px",
};

/**
 * Test Users - Use these UIDs for testing
 */
export const TEST_USERS = [
  "cometchat-uid-1",
  "cometchat-uid-2", 
  "cometchat-uid-3",
  "cometchat-uid-4",
  "cometchat-uid-5",
];

/**
 * UI Constants
 */
export const UI_CONSTANTS = {
  COLORS: {
    PRIMARY: "#6366f1",
    SECONDARY: "#8b5cf6", 
    SUCCESS: "#10b981",
    WARNING: "#f59e0b",
    ERROR: "#ef4444",
    NEUTRAL: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
    }
  },
  BREAKPOINTS: {
    SM: "640px",
    MD: "768px", 
    LG: "1024px",
    XL: "1280px",
  }
};
