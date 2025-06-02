/**
 * UserProfile Component - User profile display
 */
import React from 'react';
import { cn } from '../../lib/utils';

interface UserProfileProps {
  className?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ className }) => {
  return (
    <div className={cn("p-4", className)}>
      {/* This component will be fully implemented with CometChat SDK integration */}
      <p className="text-gray-500">User profile - to be integrated with CometChat SDK</p>
    </div>
  );
};

export default UserProfile;
