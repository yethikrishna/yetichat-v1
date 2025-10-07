/**
 * TypingIndicator - Shows when someone is typing
 */
import React from 'react';
import { cn } from '../../lib/utils';

interface TypingIndicatorProps {
  className?: string;
  username?: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ className, username }) => {
  return (
    <div 
      className={cn("flex items-center space-x-2 text-sm text-gray-500 px-4 py-2", className)}
      role="status"
      aria-live="polite"
      aria-label={username ? `${username} is typing` : 'Someone is typing'}
    >
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
      <span>{username ? `${username} is typing...` : 'Someone is typing...'}</span>
    </div>
  );
};

export default React.memo(TypingIndicator);
