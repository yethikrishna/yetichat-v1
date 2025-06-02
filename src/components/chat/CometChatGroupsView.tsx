/**
 * CometChatGroupsView - Integrates CometChat Groups component
 */
import React from 'react';
import { CometChatGroups } from '@cometchat/chat-uikit-react';
import { cn } from '../../lib/utils';

interface CometChatGroupsViewProps {
  className?: string;
  onGroupSelect?: (group: CometChat.Group) => void;
}

const CometChatGroupsView: React.FC<CometChatGroupsViewProps> = ({
  className,
  onGroupSelect
}) => {
  return (
    <div className={cn("h-full", className)}>
      <CometChatGroups
        onItemClick={(group: CometChat.Group) => {
          console.log('Group selected:', group);
          if (onGroupSelect) {
            onGroupSelect(group);
          }
        }}
      />
    </div>
  );
};

export default CometChatGroupsView;
