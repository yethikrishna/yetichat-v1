/**
 * MessageArea Component - Message display area
 */
import React from 'react';
import { cn } from '../../lib/utils';

interface MessageAreaProps {
  className?: string;
}

const MessageArea: React.FC<MessageAreaProps> = ({ className }) => {
  return (
    <div className={cn("flex-1 flex flex-col", className)}>
      {/* This component will be fully implemented with CometChat SDK integration */}
      <div className="flex-1 p-4">
        <p className="text-gray-500">Message area - to be integrated with CometChat SDK</p>
      </div>
    </div>
  );
};

export default MessageArea;
