/**
 * PresenceIndicator - Shows user online/offline/away status
 */
import React from 'react';
import { cn } from '../../lib/utils';

export type PresenceStatus = 'online' | 'offline' | 'away' | 'busy';

interface PresenceIndicatorProps {
  status: PresenceStatus;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const PresenceIndicator: React.FC<PresenceIndicatorProps> = ({ 
  status, 
  className,
  size = 'md',
  showLabel = false
}) => {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  const statusConfig = {
    online: {
      color: 'bg-green-500',
      label: 'Online',
      ring: 'ring-green-100'
    },
    offline: {
      color: 'bg-gray-400',
      label: 'Offline',
      ring: 'ring-gray-100'
    },
    away: {
      color: 'bg-yellow-500',
      label: 'Away',
      ring: 'ring-yellow-100'
    },
    busy: {
      color: 'bg-red-500',
      label: 'Busy',
      ring: 'ring-red-100'
    }
  };

  const config = statusConfig[status];

  return (
    <div 
      className={cn("inline-flex items-center", className)}
      role="status"
      aria-label={`Status: ${config.label}`}
    >
      <span 
        className={cn(
          sizeClasses[size],
          config.color,
          config.ring,
          "rounded-full ring-2"
        )}
        aria-hidden="true"
      />
      {showLabel && (
        <span className="ml-2 text-sm text-gray-600">
          {config.label}
        </span>
      )}
    </div>
  );
};

export default React.memo(PresenceIndicator);
