/**
 * FeaturesShowcase - Demonstrates all new Yetichat features
 */
import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import TypingIndicator from '../chat/TypingIndicator';
import MessageSearch from '../chat/MessageSearch';
import PresenceIndicator, { PresenceStatus } from '../ui/PresenceIndicator';
import EmojiPicker from '../chat/EmojiPicker';
import MessageList, { Message } from '../chat/MessageList';
import EnhancedMessageInput from '../chat/EnhancedMessageInput';
import ThemeToggle from '../ui/ThemeToggle';

const FeaturesShowcase: React.FC = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: 'user1',
      senderName: 'Alice',
      text: 'Hey! Check out these new features! 🎉',
      timestamp: Date.now() - 3600000,
      isCurrentUser: false,
      status: 'read'
    },
    {
      id: '2',
      senderId: 'current',
      senderName: 'You',
      text: 'Wow! The emoji picker is amazing! 😍',
      timestamp: Date.now() - 3000000,
      isCurrentUser: true,
      status: 'read'
    },
    {
      id: '3',
      senderId: 'user1',
      senderName: 'Alice',
      text: 'And look at the typing indicator and presence status!',
      timestamp: Date.now() - 2400000,
      isCurrentUser: false,
      status: 'read'
    },
    {
      id: '4',
      senderId: 'current',
      senderName: 'You',
      text: 'The dark mode is sleek too! Try the theme toggle in the header. 🌙',
      timestamp: Date.now() - 1800000,
      isCurrentUser: true,
      status: 'delivered'
    }
  ]);

  const handleSendMessage = (text: string, files?: File[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'current',
      senderName: 'You',
      text: text || (files ? `Sent ${files.length} file(s)` : ''),
      timestamp: Date.now(),
      isCurrentUser: true,
      status: 'sending'
    };

    setMessages(prev => [...prev, newMessage]);

    // Simulate message delivery
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
      ));
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Yetichat Features Showcase
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Enterprise-grade chat features demonstration
            </p>
          </div>
          <ThemeToggle />
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Component Demos */}
          <div className="lg:col-span-1 space-y-6">
            {/* Presence Indicators */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Presence Indicators
              </h2>
              <div className="space-y-3">
                {(['online', 'offline', 'away', 'busy'] as PresenceStatus[]).map(status => (
                  <div key={status} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                      {status}
                    </span>
                    <PresenceIndicator status={status} showLabel />
                  </div>
                ))}
              </div>
            </div>

            {/* Typing Indicator */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Typing Indicator
              </h2>
              <button
                onClick={() => setShowTypingIndicator(!showTypingIndicator)}
                className="mb-3 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
              >
                {showTypingIndicator ? 'Hide' : 'Show'} Typing
              </button>
              {showTypingIndicator && (
                <TypingIndicator username="Alice" />
              )}
            </div>

            {/* Emoji Picker */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Emoji Picker
              </h2>
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="mb-3 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
              >
                {showEmojiPicker ? 'Hide' : 'Show'} Emoji Picker
              </button>
              {showEmojiPicker && (
                <EmojiPicker
                  onEmojiSelect={(emoji) => {
                    console.log('Selected emoji:', emoji);
                    alert(`Selected: ${emoji}`);
                  }}
                />
              )}
            </div>
          </div>

          {/* Right Column - Chat Demo */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden h-[calc(100vh-200px)] flex flex-col">
              {/* Chat Header */}
              <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                      <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                        A
                      </span>
                    </div>
                    <div className="absolute bottom-0 right-0">
                      <PresenceIndicator status="online" size="sm" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Alice</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Online</p>
                  </div>
                </div>
                <MessageSearch
                  onSearch={(query) => console.log('Search:', query)}
                  onClose={() => {}}
                />
              </div>

              {/* Message List */}
              <MessageList
                messages={messages}
                className="flex-1"
                isLoading={false}
              />

              {/* Typing Indicator in Chat */}
              {showTypingIndicator && (
                <TypingIndicator username="Alice" className="border-t dark:border-gray-700" />
              )}

              {/* Message Input */}
              <EnhancedMessageInput
                onSendMessage={handleSendMessage}
                placeholder="Type a message... (Shift+Enter for new line)"
                maxLength={5000}
                onTyping={() => console.log('User is typing...')}
              />
            </div>
          </div>
        </div>

        {/* Features List */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            ✨ New Enterprise Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: '🎨', title: 'Dark Mode', desc: 'Beautiful dark theme with system preference support' },
              { icon: '😊', title: 'Emoji Picker', desc: 'Categorized emoji picker with 100+ emojis' },
              { icon: '💬', title: 'Typing Indicator', desc: 'Real-time typing status with animations' },
              { icon: '🟢', title: 'Presence Status', desc: 'Online, offline, away, and busy indicators' },
              { icon: '🔔', title: 'Notifications', desc: 'Accessible notification system with sound' },
              { icon: '🔍', title: 'Message Search', desc: 'Quick search through conversation history' },
              { icon: '📎', title: 'File Upload', desc: 'Attach and preview files before sending' },
              { icon: '♿', title: 'Accessibility', desc: 'Full ARIA support and keyboard navigation' },
              { icon: '⚡', title: 'Performance', desc: 'Optimized with virtualization and memoization' },
            ].map((feature, idx) => (
              <div key={idx} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div className="text-2xl mb-2">{feature.icon}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Code Quality Improvements */}
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            🛠️ Code Quality Improvements
          </h2>
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>Fixed React Hooks rules violation in AuthWrapper</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>Fixed TypeScript linting errors in type definitions</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>Added React.memo for performance optimization</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>Implemented proper accessibility with ARIA labels</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>Enhanced .gitignore for better artifact management</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesShowcase;
