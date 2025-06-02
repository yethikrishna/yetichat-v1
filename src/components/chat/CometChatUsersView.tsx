/**
 * CometChatUsersView - Integrates CometChat Users component
 */
import React from 'react';
import { CometChatUsers } from '@cometchat/chat-uikit-react';
import { cn } from '../../lib/utils';

interface CometChatUsersViewProps {
  className?: string;
  onUserSelect?: (user: CometChat.User) => void;
}

const CometChatUsersView: React.FC<CometChatUsersViewProps> = ({
  className,
  onUserSelect
}) => {
  return (
    <div className={cn("h-full", className)}>
      <CometChatUsers
        onItemClick={(user: CometChat.User) => {
          console.log('User selected:', user);
          if (onUserSelect) {
            onUserSelect(user);
          }
        }}
      />
    </div>
  );
};

export default CometChatUsersView;
