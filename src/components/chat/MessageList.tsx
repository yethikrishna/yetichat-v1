/**
 * MessageList - Optimized message list with virtualization support
 */
import React, { useRef, useEffect, useCallback } from 'react';
import { cn } from '../../lib/utils';

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: number;
  isCurrentUser: boolean;
  status?: 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
}

interface MessageListProps {
  messages: Message[];
  className?: string;
  onLoadMore?: () => void;
  isLoading?: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ 
  messages, 
  className,
  onLoadMore,
  isLoading = false
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const previousScrollHeightRef = useRef<number>(0);

  // Auto-scroll to bottom on new messages
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    // Only auto-scroll if user was already at bottom
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      
      if (isNearBottom) {
        scrollToBottom();
      }
    }
  }, [messages, scrollToBottom]);

  // Handle scroll for load more
  const handleScroll = useCallback(() => {
    if (!containerRef.current || !onLoadMore) return;

    const { scrollTop } = containerRef.current;
    
    // Load more when scrolled to top
    if (scrollTop === 0 && !isLoading) {
      previousScrollHeightRef.current = containerRef.current.scrollHeight;
      onLoadMore();
    }
  }, [onLoadMore, isLoading]);

  // Maintain scroll position after loading more messages
  useEffect(() => {
    if (previousScrollHeightRef.current && containerRef.current) {
      const newScrollHeight = containerRef.current.scrollHeight;
      const scrollDiff = newScrollHeight - previousScrollHeightRef.current;
      if (scrollDiff > 0) {
        containerRef.current.scrollTop = scrollDiff;
      }
      previousScrollHeightRef.current = 0;
    }
  }, [messages]);

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusIcon = (status?: Message['status']) => {
    switch (status) {
      case 'sending':
        return '○';
      case 'sent':
        return '✓';
      case 'delivered':
        return '✓✓';
      case 'read':
        return '✓✓';
      case 'failed':
        return '✗';
      default:
        return null;
    }
  };

  return (
    <div 
      ref={containerRef}
      className={cn("flex-1 overflow-y-auto p-4 space-y-4", className)}
      onScroll={handleScroll}
      role="log"
      aria-live="polite"
      aria-label="Chat messages"
    >
      {isLoading && (
        <div className="text-center py-2">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600" />
        </div>
      )}

      {messages.length === 0 && !isLoading && (
        <div className="text-center text-gray-500 mt-8">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <p>No messages yet. Start the conversation!</p>
        </div>
      )}

      {messages.map((message, index) => {
        const showDateSeparator = index === 0 || 
          new Date(messages[index - 1].timestamp).toDateString() !== new Date(message.timestamp).toDateString();

        return (
          <React.Fragment key={message.id}>
            {showDateSeparator && (
              <div className="flex items-center justify-center my-4">
                <span className="px-3 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded-full">
                  {new Date(message.timestamp).toLocaleDateString(undefined, { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            )}

            <div
              className={cn(
                "flex",
                message.isCurrentUser ? "justify-end" : "justify-start"
              )}
              role="article"
              aria-label={`Message from ${message.senderName}`}
            >
              <div
                className={cn(
                  "max-w-xs lg:max-w-md px-4 py-2 rounded-lg",
                  message.isCurrentUser
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-900 border border-gray-200"
                )}
              >
                {!message.isCurrentUser && (
                  <p className="text-xs font-semibold mb-1 text-gray-700">
                    {message.senderName}
                  </p>
                )}
                <p className="text-sm break-words">{message.text}</p>
                <div className={cn(
                  "flex items-center justify-end mt-1 space-x-1 text-xs",
                  message.isCurrentUser ? "text-indigo-200" : "text-gray-500"
                )}>
                  <span>{formatTime(message.timestamp)}</span>
                  {message.isCurrentUser && message.status && (
                    <span 
                      aria-label={`Message ${message.status}`}
                      className={cn(
                        message.status === 'read' && "text-blue-300",
                        message.status === 'failed' && "text-red-300"
                      )}
                    >
                      {getStatusIcon(message.status)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      })}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default React.memo(MessageList);
