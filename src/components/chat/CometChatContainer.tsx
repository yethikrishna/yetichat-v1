/**
 * CometChatContainer - Main container that manages CometChat state and views
 */
import React, { useState, useCallback } from 'react';
import { cn } from '../../lib/utils';
import CometChatConversationView from './CometChatConversationView';
import CometChatMessageView from './CometChatMessageView';
import CometChatUsersView from './CometChatUsersView';
import CometChatGroupsView from './CometChatGroupsView';
import type { SidebarState } from '../../types';

interface CometChatContainerProps {
  className?: string;
  activeTab: SidebarState['activeTab'];
}

interface ChatState {
  activeUser: CometChat.User | null;
  activeGroup: CometChat.Group | null;
  activeConversation: CometChat.Conversation | null;
  chatType: 'user' | 'group' | null;
}

const CometChatContainer: React.FC<CometChatContainerProps> = ({
  className,
  activeTab
}) => {
  const [chatState, setChatState] = useState<ChatState>({
    activeUser: null,
    activeGroup: null,
    activeConversation: null,
    chatType: null
  });

  // Handle conversation selection from conversations list
  const handleConversationSelect = useCallback((conversation: CometChat.Conversation) => {
    const conversationWith = conversation.getConversationWith();
    
    if (conversation.getConversationType() === 'user') {
      setChatState({
        activeUser: conversationWith as CometChat.User,
        activeGroup: null,
        activeConversation: conversation,
        chatType: 'user'
      });
    } else if (conversation.getConversationType() === 'group') {
      setChatState({
        activeUser: null,
        activeGroup: conversationWith as CometChat.Group,
        activeConversation: conversation,
        chatType: 'group'
      });
    }
  }, []);

  // Handle user selection from users list
  const handleUserSelect = useCallback((user: CometChat.User) => {
    setChatState({
      activeUser: user,
      activeGroup: null,
      activeConversation: null,
      chatType: 'user'
    });
  }, []);

  // Handle group selection from groups list
  const handleGroupSelect = useCallback((group: CometChat.Group) => {
    setChatState({
      activeUser: null,
      activeGroup: group,
      activeConversation: null,
      chatType: 'group'
    });
  }, []);

  // Clear chat state when switching tabs
  const clearChatState = useCallback(() => {
    setChatState({
      activeUser: null,
      activeGroup: null,
      activeConversation: null,
      chatType: null
    });
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'conversations':
        return (
          <div className="h-full flex">
            {/* Conversations List */}
            <div className="w-80 border-r border-gray-200 bg-gray-50">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Conversations</h2>
              </div>
              <CometChatConversationView
                onConversationSelect={handleConversationSelect}
                className="h-full"
              />
            </div>

            {/* Chat Area */}
            <div className="flex-1">
              <CometChatMessageView
                user={chatState.activeUser}
                group={chatState.activeGroup}
                className="h-full"
              />
            </div>
          </div>
        );

      case 'users':
        return (
          <div className="h-full flex">
            {/* Users List */}
            <div className="w-80 border-r border-gray-200 bg-gray-50">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Users</h2>
              </div>
              <CometChatUsersView
                onUserSelect={handleUserSelect}
                className="h-full"
              />
            </div>

            {/* Chat Area */}
            <div className="flex-1">
              <CometChatMessageView
                user={chatState.activeUser}
                group={null}
                className="h-full"
              />
            </div>
          </div>
        );

      case 'groups':
        return (
          <div className="h-full flex">
            {/* Groups List */}
            <div className="w-80 border-r border-gray-200 bg-gray-50">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Groups</h2>
              </div>
              <CometChatGroupsView
                onGroupSelect={handleGroupSelect}
                className="h-full"
              />
            </div>

            {/* Chat Area */}
            <div className="flex-1">
              <CometChatMessageView
                user={null}
                group={chatState.activeGroup}
                className="h-full"
              />
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="space-y-6">
                {/* Notification Settings */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
                    <p className="text-sm text-gray-500">Manage your notification preferences</p>
                  </div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">Enable push notifications</span>
                  </label>
                </div>

                {/* Sound Settings */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Sound</h3>
                    <p className="text-sm text-gray-500">Control sound notifications</p>
                  </div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">Enable sound notifications</span>
                  </label>
                </div>

                {/* Theme Settings */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Theme</h3>
                    <p className="text-sm text-gray-500">Choose your preferred theme</p>
                  </div>
                  <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>

                {/* Privacy Settings */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Privacy</h3>
                    <p className="text-sm text-gray-500">Control who can contact you</p>
                  </div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">Show online status</span>
                  </label>
                </div>

                {/* Chat State Debug Info (Development Only) */}
                {process.env.NODE_ENV === 'development' && (
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Debug Info</h3>
                    <div className="bg-gray-50 rounded-md p-3">
                      <pre className="text-xs text-gray-600">
                        {JSON.stringify(chatState, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Unknown Tab</h3>
              <p className="text-gray-500">This tab is not implemented yet.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={cn("h-full", className)}>
      {renderTabContent()}
    </div>
  );
};

export default CometChatContainer;
