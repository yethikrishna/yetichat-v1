/**
 * CometChatConversationView - Integrates CometChat Conversations component
 */
import React from 'react';
import { CometChatConversations } from '@cometchat/chat-uikit-react';
import { cn } from '../../lib/utils';

interface CometChatConversationViewProps {
  className?: string;
  onConversationSelect?: (conversation: CometChat.Conversation) => void;
}

const CometChatConversationView: React.FC<CometChatConversationViewProps> = ({
  className,
  onConversationSelect
}) => {
  return (
    <div className={cn("h-full", className)}>
      <CometChatConversations 
        onItemClick={(conversation: CometChat.Conversation) => {
          console.log('Conversation selected:', conversation);
          if (onConversationSelect) {
            onConversationSelect(conversation);
          }
        }}
      />
    </div>
  );
};

export default CometChatConversationView;
