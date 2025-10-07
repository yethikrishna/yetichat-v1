# 🚀 Quick Start Guide - Enterprise Features

This guide will help you quickly integrate Yetichat's new enterprise features into your chat application.

## Table of Contents
- [Installation](#installation)
- [Basic Setup](#basic-setup)
- [Component Examples](#component-examples)
- [Customization](#customization)
- [Best Practices](#best-practices)

## Installation

Yetichat is already set up with all dependencies. If you're starting fresh:

```bash
npm install
# or
pnpm install
```

## Basic Setup

### 1. Dark Mode Setup

Add the theme toggle to your header:

```tsx
import ThemeToggle from './components/ui/ThemeToggle';

function Header() {
  return (
    <header className="flex items-center justify-between p-4">
      <h1>My Chat App</h1>
      <ThemeToggle />
    </header>
  );
}
```

### 2. Chat Interface with New Components

Create a complete chat interface using the new components:

```tsx
import { useState } from 'react';
import MessageList, { Message } from './components/chat/MessageList';
import EnhancedMessageInput from './components/chat/EnhancedMessageInput';
import TypingIndicator from './components/chat/TypingIndicator';
import MessageSearch from './components/chat/MessageSearch';

function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const handleSendMessage = (text: string, files?: File[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'current-user',
      senderName: 'You',
      text: text,
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
    <div className="flex flex-col h-screen">
      {/* Search Bar */}
      {showSearch && (
        <MessageSearch
          onSearch={(query) => console.log('Searching:', query)}
          onClose={() => setShowSearch(false)}
        />
      )}

      {/* Messages */}
      <MessageList
        messages={messages}
        isLoading={false}
        onLoadMore={() => console.log('Load more messages')}
      />

      {/* Typing Indicator */}
      {isTyping && <TypingIndicator username="Alice" />}

      {/* Input */}
      <EnhancedMessageInput
        onSendMessage={handleSendMessage}
        onTyping={() => setIsTyping(true)}
        placeholder="Type a message..."
      />
    </div>
  );
}
```

### 3. Add Notifications

Integrate the notification system:

```tsx
import NotificationManager from './components/ui/NotificationManager';

function App() {
  return (
    <div>
      <Header>
        {/* Notifications in header */}
        <NotificationManager
          soundEnabled={true}
          maxNotifications={10}
        />
      </Header>
      
      <ChatInterface />
    </div>
  );
}
```

## Component Examples

### Presence Indicator

Show user online status:

```tsx
import PresenceIndicator from './components/ui/PresenceIndicator';

function UserProfile({ status }) {
  return (
    <div className="flex items-center space-x-2">
      <img src="avatar.jpg" alt="User" className="w-10 h-10 rounded-full" />
      <div>
        <h3>John Doe</h3>
        <PresenceIndicator status={status} showLabel />
      </div>
    </div>
  );
}
```

### Emoji Picker

Add emoji selection to any input:

```tsx
import { useState } from 'react';
import EmojiPicker from './components/chat/EmojiPicker';

function CustomInput() {
  const [showEmoji, setShowEmoji] = useState(false);
  const [text, setText] = useState('');

  return (
    <div className="relative">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type here..."
      />
      
      <button onClick={() => setShowEmoji(!showEmoji)}>
        😊
      </button>

      {showEmoji && (
        <div className="absolute bottom-full mb-2">
          <EmojiPicker
            onEmojiSelect={(emoji) => {
              setText(prev => prev + emoji);
              setShowEmoji(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
```

### Message List with Virtualization

Handle large message lists efficiently:

```tsx
import MessageList from './components/chat/MessageList';

function ChatView({ conversationId }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreMessages = async () => {
    setIsLoading(true);
    // Fetch older messages
    const olderMessages = await fetchMessages(conversationId, messages.length);
    setMessages(prev => [...olderMessages, ...prev]);
    setIsLoading(false);
  };

  return (
    <MessageList
      messages={messages}
      isLoading={isLoading}
      onLoadMore={loadMoreMessages}
      className="flex-1"
    />
  );
}
```

## Customization

### Theme Colors

Customize dark mode colors in your Tailwind config:

```js
// tailwind.config.js
module.exports = {
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        // Your custom colors
        primary: { /* ... */ },
        dark: {
          bg: '#1a1a1a',
          surface: '#2d2d2d',
          text: '#ffffff',
        }
      }
    }
  }
}
```

### Component Styling

All components accept a `className` prop for customization:

```tsx
<MessageList
  messages={messages}
  className="bg-gray-50 dark:bg-gray-900 rounded-lg"
/>

<EnhancedMessageInput
  onSendMessage={handleSend}
  className="border-t-2 border-indigo-500"
/>
```

### Emoji Categories

Customize emoji categories in `EmojiPicker.tsx`:

```tsx
const EMOJI_CATEGORIES = {
  smileys: {
    name: '😊 Smileys',
    emojis: ['😀', '😃', /* add more */]
  },
  // Add your own categories
  custom: {
    name: '🎨 Custom',
    emojis: ['🎨', '🚀', '💡']
  }
};
```

## Best Practices

### 1. Performance

Always use React.memo for components that render frequently:

```tsx
import React from 'react';

const MessageItem = React.memo(({ message }) => {
  return <div>{message.text}</div>;
});
```

### 2. Accessibility

Include ARIA labels for all interactive elements:

```tsx
<button
  onClick={handleClick}
  aria-label="Send message"
  aria-pressed={isActive}
>
  Send
</button>
```

### 3. Error Handling

Wrap components in error boundaries:

```tsx
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <ChatInterface />
    </ErrorBoundary>
  );
}
```

### 4. TypeScript

Use proper types for all props:

```tsx
interface ChatProps {
  userId: string;
  onMessageSent?: (message: Message) => void;
  className?: string;
}

const Chat: React.FC<ChatProps> = ({ userId, onMessageSent, className }) => {
  // Implementation
};
```

### 5. Loading States

Always handle loading states gracefully:

```tsx
function ChatView() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return <MessageList messages={messages} />;
}
```

## Advanced Usage

### Custom Message Renderer

Customize how messages are displayed:

```tsx
import MessageList from './components/chat/MessageList';

function CustomMessageList() {
  const renderMessage = (message: Message) => {
    // Custom rendering logic
    if (message.type === 'image') {
      return <ImageMessage message={message} />;
    }
    return <TextMessage message={message} />;
  };

  return (
    <MessageList
      messages={messages}
      renderItem={renderMessage}
    />
  );
}
```

### Real-time Typing Events

Connect typing indicators to WebSocket events:

```tsx
function ChatWithTyping() {
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  useEffect(() => {
    // Subscribe to typing events
    socket.on('typing', (username) => {
      setTypingUsers(prev => [...prev, username]);
      
      // Remove after 3 seconds
      setTimeout(() => {
        setTypingUsers(prev => prev.filter(u => u !== username));
      }, 3000);
    });

    return () => socket.off('typing');
  }, []);

  return (
    <>
      <MessageList messages={messages} />
      {typingUsers.map(user => (
        <TypingIndicator key={user} username={user} />
      ))}
    </>
  );
}
```

### Integration with CometChat

Use with existing CometChat integration:

```tsx
import { CometChat } from '@cometchat/chat-sdk-javascript';
import MessageList from './components/chat/MessageList';

function CometChatMessageView() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const listenerID = "MESSAGE_LISTENER";
    
    CometChat.addMessageListener(
      listenerID,
      new CometChat.MessageListener({
        onTextMessageReceived: (message) => {
          // Convert CometChat message to our format
          const formattedMessage = {
            id: message.getId(),
            senderId: message.getSender().getUid(),
            senderName: message.getSender().getName(),
            text: message.getText(),
            timestamp: message.getSentAt() * 1000,
            isCurrentUser: false,
            status: 'delivered'
          };
          
          setMessages(prev => [...prev, formattedMessage]);
        }
      })
    );

    return () => CometChat.removeMessageListener(listenerID);
  }, []);

  return <MessageList messages={messages} />;
}
```

## Testing

Test your components:

```tsx
import { render, screen } from '@testing-library/react';
import TypingIndicator from './components/chat/TypingIndicator';

test('renders typing indicator with username', () => {
  render(<TypingIndicator username="Alice" />);
  expect(screen.getByText(/Alice is typing/i)).toBeInTheDocument();
});
```

## Troubleshooting

### Dark mode not working?
- Ensure `darkMode: ['class']` is in `tailwind.config.js`
- Check that the `<html>` element gets the `dark` class

### Components not showing?
- Verify all imports are correct
- Check console for TypeScript errors
- Ensure parent containers have proper height

### Performance issues?
- Use React.memo on all list items
- Implement virtualization for long lists
- Avoid inline function definitions in render

## Next Steps

1. Check out [FEATURES.md](FEATURES.md) for complete documentation
2. View the demo at [FeaturesShowcase.tsx](src/components/demo/FeaturesShowcase.tsx)
3. Read the [CHANGELOG.md](CHANGELOG.md) for version history
4. Join our community for support

## Support

- 📧 Email: support@yetichat.com
- 🐛 Issues: [GitHub Issues](https://github.com/username/yetichat/issues)
- 📖 Docs: [Full Documentation](docs/)

---

Happy coding! 🚀
