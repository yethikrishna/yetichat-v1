/**
 * CometChatMessageView - Integrates CometChat Message components
 */
import React from 'react';
import { 
  CometChatMessageList, 
  CometChatMessageComposer, 
  CometChatMessageHeader 
} from '@cometchat/chat-uikit-react';
import { cn } from '../../lib/utils';

interface CometChatMessageViewProps {
  className?: string;
  user?: CometChat.User;
  group?: CometChat.Group;
  hideMessageComposer?: boolean;
  hideMessageHeader?: boolean;
}

const CometChatMessageView: React.FC<CometChatMessageViewProps> = ({
  className,
  user,
  group,
  hideMessageComposer = false,
  hideMessageHeader = false
}) => {
  if (!user && !group) {
    return (
      <div className={cn("flex items-center justify-center h-full bg-gray-50", className)}>
        <div className="text-center">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-indigo-600"
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
          <h3 className="text-lg font-medium text-gray-900 mb-2">Welcome to Yetichat</h3>
          <p className="text-gray-500">Select a conversation to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col h-full bg-white", className)}>
      {/* Message Header */}
      {!hideMessageHeader && (
        <div className="border-b border-gray-200">
          <CometChatMessageHeader
            user={user}
            group={group}
          />
        </div>
      )}

      {/* Message List */}
      <div className="flex-1 overflow-hidden">
        <CometChatMessageList
          user={user}
          group={group}
        />
      </div>

      {/* Message Composer */}
      {!hideMessageComposer && (
        <div className="border-t border-gray-200">
          <CometChatMessageComposer
            user={user}
            group={group}
          />
        </div>
      )}
    </div>
  );
};

export default CometChatMessageView;
