/**
 * useCometChat Hook - Enhanced CometChat event management and real-time updates
 */
import { useEffect, useCallback, useRef } from 'react';
import { CometChat } from '@cometchat/chat-sdk-javascript';

interface CometChatEventHandlers {
  onMessageReceived?: (message: CometChat.BaseMessage) => void;
  onMessageRead?: (message: CometChat.BaseMessage) => void;
  onMessageDelivered?: (message: CometChat.BaseMessage) => void;
  onMessageEdited?: (message: CometChat.BaseMessage) => void;
  onMessageDeleted?: (message: CometChat.BaseMessage) => void;
  onTypingStarted?: (typingIndicator: CometChat.TypingIndicator) => void;
  onTypingEnded?: (typingIndicator: CometChat.TypingIndicator) => void;
  onUserOnline?: (user: CometChat.User) => void;
  onUserOffline?: (user: CometChat.User) => void;
  onGroupMemberJoined?: (message: CometChat.Action) => void;
  onGroupMemberLeft?: (message: CometChat.Action) => void;
  onGroupMemberKicked?: (message: CometChat.Action) => void;
  onGroupMemberBanned?: (message: CometChat.Action) => void;
  onGroupMemberUnbanned?: (message: CometChat.Action) => void;
  onGroupMemberScopeChanged?: (message: CometChat.Action) => void;
  onConversationStarter?: (conversation: CometChat.Conversation) => void;
  onError?: (error: CometChat.CometChatException) => void;
}

export const useCometChat = (handlers: CometChatEventHandlers = {}) => {
  const listenersRef = useRef<{ [key: string]: string }>({});

  const addMessageListener = useCallback(() => {
    const listenerID = 'yetichat_message_listener';
    
    CometChat.addMessageListener(
      listenerID,
      new CometChat.MessageListener({
        onTextMessageReceived: (message: CometChat.TextMessage) => {
          console.log('Text message received:', message);
          handlers.onMessageReceived?.(message);
        },
        onMediaMessageReceived: (message: CometChat.MediaMessage) => {
          console.log('Media message received:', message);
          handlers.onMessageReceived?.(message);
        },
        onCustomMessageReceived: (message: CometChat.CustomMessage) => {
          console.log('Custom message received:', message);
          handlers.onMessageReceived?.(message);
        },
        onMessageDelivered: (message: CometChat.BaseMessage) => {
          console.log('Message delivered:', message);
          handlers.onMessageDelivered?.(message);
        },
        onMessageRead: (message: CometChat.BaseMessage) => {
          console.log('Message read:', message);
          handlers.onMessageRead?.(message);
        },
        onMessageEdited: (message: CometChat.BaseMessage) => {
          console.log('Message edited:', message);
          handlers.onMessageEdited?.(message);
        },
        onMessageDeleted: (message: CometChat.BaseMessage) => {
          console.log('Message deleted:', message);
          handlers.onMessageDeleted?.(message);
        },
        onTypingStarted: (typingIndicator: CometChat.TypingIndicator) => {
          console.log('Typing started:', typingIndicator);
          handlers.onTypingStarted?.(typingIndicator);
        },
        onTypingEnded: (typingIndicator: CometChat.TypingIndicator) => {
          console.log('Typing ended:', typingIndicator);
          handlers.onTypingEnded?.(typingIndicator);
        }
      })
    );

    listenersRef.current.messageListener = listenerID;
  }, [handlers]);

  const addUserListener = useCallback(() => {
    const listenerID = 'yetichat_user_listener';

    CometChat.addUserListener(
      listenerID,
      new CometChat.UserListener({
        onUserOnline: (user: CometChat.User) => {
          console.log('User online:', user);
          handlers.onUserOnline?.(user);
        },
        onUserOffline: (user: CometChat.User) => {
          console.log('User offline:', user);
          handlers.onUserOffline?.(user);
        }
      })
    );

    listenersRef.current.userListener = listenerID;
  }, [handlers]);

  const addGroupListener = useCallback(() => {
    const listenerID = 'yetichat_group_listener';

    CometChat.addGroupListener(
      listenerID,
      new CometChat.GroupListener({
        onGroupMemberJoined: (message: CometChat.Action) => {
          console.log('Group member joined:', message);
          handlers.onGroupMemberJoined?.(message);
        },
        onGroupMemberLeft: (message: CometChat.Action) => {
          console.log('Group member left:', message);
          handlers.onGroupMemberLeft?.(message);
        },
        onGroupMemberKicked: (message: CometChat.Action) => {
          console.log('Group member kicked:', message);
          handlers.onGroupMemberKicked?.(message);
        },
        onGroupMemberBanned: (message: CometChat.Action) => {
          console.log('Group member banned:', message);
          handlers.onGroupMemberBanned?.(message);
        },
        onGroupMemberUnbanned: (message: CometChat.Action) => {
          console.log('Group member unbanned:', message);
          handlers.onGroupMemberUnbanned?.(message);
        },
        onGroupMemberScopeChanged: (message: CometChat.Action) => {
          console.log('Group member scope changed:', message);
          handlers.onGroupMemberScopeChanged?.(message);
        }
      })
    );

    listenersRef.current.groupListener = listenerID;
  }, [handlers]);

  const removeAllListeners = useCallback(() => {
    Object.values(listenersRef.current).forEach(listenerID => {
      CometChat.removeMessageListener(listenerID);
      CometChat.removeUserListener(listenerID);
      CometChat.removeGroupListener(listenerID);
    });
    listenersRef.current = {};
  }, []);

  // Setup listeners on mount
  useEffect(() => {
    addMessageListener();
    addUserListener();
    addGroupListener();

    // Cleanup on unmount
    return removeAllListeners;
  }, [addMessageListener, addUserListener, addGroupListener, removeAllListeners]);

  // Utility functions
  const sendTextMessage = useCallback(async (
    receiverID: string, 
    messageText: string, 
    receiverType: string = CometChat.RECEIVER_TYPE.USER
  ) => {
    try {
      const textMessage = new CometChat.TextMessage(
        receiverID,
        messageText,
        receiverType
      );

      const sentMessage = await CometChat.sendMessage(textMessage);
      console.log('Message sent successfully:', sentMessage);
      return { success: true, data: sentMessage };
    } catch (error) {
      console.error('Error sending message:', error);
      handlers.onError?.(error as CometChat.CometChatException);
      return { success: false, error };
    }
  }, [handlers]);

  const sendMediaMessage = useCallback(async (
    receiverID: string,
    file: File,
    messageType: string,
    receiverType: string = CometChat.RECEIVER_TYPE.USER
  ) => {
    try {
      const mediaMessage = new CometChat.MediaMessage(
        receiverID,
        file,
        messageType,
        receiverType
      );

      const sentMessage = await CometChat.sendMessage(mediaMessage);
      console.log('Media message sent successfully:', sentMessage);
      return { success: true, data: sentMessage };
    } catch (error) {
      console.error('Error sending media message:', error);
      handlers.onError?.(error as CometChat.CometChatException);
      return { success: false, error };
    }
  }, [handlers]);

  const markAsRead = useCallback(async (message: CometChat.BaseMessage) => {
    try {
      await CometChat.markAsRead(message);
      console.log('Message marked as read');
      return { success: true };
    } catch (error) {
      console.error('Error marking message as read:', error);
      handlers.onError?.(error as CometChat.CometChatException);
      return { success: false, error };
    }
  }, [handlers]);

  const startTyping = useCallback(async (
    receiverID: string, 
    receiverType: string = CometChat.RECEIVER_TYPE.USER
  ) => {
    try {
      const typingIndicator = new CometChat.TypingIndicator(receiverID, receiverType);
      await CometChat.startTyping(typingIndicator);
      console.log('Started typing indicator');
      return { success: true };
    } catch (error) {
      console.error('Error starting typing indicator:', error);
      handlers.onError?.(error as CometChat.CometChatException);
      return { success: false, error };
    }
  }, [handlers]);

  const endTyping = useCallback(async (
    receiverID: string, 
    receiverType: string = CometChat.RECEIVER_TYPE.USER
  ) => {
    try {
      const typingIndicator = new CometChat.TypingIndicator(receiverID, receiverType);
      await CometChat.endTyping(typingIndicator);
      console.log('Ended typing indicator');
      return { success: true };
    } catch (error) {
      console.error('Error ending typing indicator:', error);
      handlers.onError?.(error as CometChat.CometChatException);
      return { success: false, error };
    }
  }, [handlers]);

  return {
    // Event management
    removeAllListeners,
    
    // Messaging
    sendTextMessage,
    sendMediaMessage,
    markAsRead,
    
    // Typing indicators
    startTyping,
    endTyping,
  };
};

export default useCometChat;
