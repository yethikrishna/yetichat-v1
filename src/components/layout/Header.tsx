/**
 * Header Component - Top navigation bar
 */
import React from 'react';
import { cn } from '../../lib/utils';
import { APP_CONSTANTS } from '../../utils/constants';
import useAuth from '../../hooks/useAuth';

interface HeaderProps {
  className?: string;
  onMenuToggle?: () => void;
  isSidebarOpen?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  className, 
  onMenuToggle,
  isSidebarOpen = false 
}) => {
  const { user, logout, isAuthenticated } = useAuth(); // Added isAuthenticated

  const handleLogout = async () => {
    try {
      await logout();
      // Logout success will trigger AuthWrapper to re-render and show LoginForm
      // No explicit navigation needed here.
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally, display a toast or message to the user about logout failure
    }
  };

  return (
    <header className={cn(
      "bg-white border-b border-gray-200 shadow-sm",
      className
    )} style={{ height: APP_CONSTANTS.HEADER_HEIGHT }}>
      <div className="flex items-center justify-between h-full px-4">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Toggle sidebar"
          >
            <svg
              className={cn("h-6 w-6 transition-transform duration-200", {
                "rotate-90": isSidebarOpen
              })}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-indigo-600 rounded-lg">
              <svg
                className="w-5 h-5 text-white"
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
            <h1 className="text-xl font-bold text-gray-900">
              {APP_CONSTANTS.APP_NAME}
            </h1>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* User Info */}
          {user && (
            <div className="hidden sm:flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user.getName() || user.getUid()}
                </p>
                <p className="text-xs text-gray-500">
                  {user.getUid()}
                </p>
              </div>
              
              {/* Avatar */}
              <div className="flex items-center justify-center w-10 h-10 bg-indigo-100 rounded-full">
                {user.getAvatar() ? (
                  <img
                    src={user.getAvatar()}
                    alt={user.getName() || user.getUid()}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-indigo-600 font-medium text-sm">
                    {(user.getName() || user.getUid()).charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Settings Button */}
            <button
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Settings"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>

            {/* Logout Button - Conditionally rendered */}
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="p-2 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                aria-label="Logout"
                title="Logout"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
