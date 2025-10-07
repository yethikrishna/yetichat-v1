# 🐾 Yetichat

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3.1-blue)](https://reactjs.org/)
[![CometChat](https://img.shields.io/badge/CometChat-6.0.6-orange)](https://www.cometchat.com/)
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://msu7m21i7f.space.minimax.io)

A modern, **enterprise-grade** chat application built with **CometChat React UI Kit**. Yetichat provides real-time messaging, user management, and group conversations with a beautiful, accessible, and responsive interface.

> **🎉 NEW:** Now with 10+ enterprise features including dark mode, emoji picker, typing indicators, notifications, and more!

## ✨ Core Features

- 🔐 **Secure Authentication** - User login and session management
- 💬 **Real-time Messaging** - Instant chat with other users
- 👥 **Group Conversations** - Create and manage group chats
- 👤 **User Management** - Browse and connect with users
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🎨 **Modern UI/UX** - Clean, professional interface with Tailwind CSS
- ⚡ **High Performance** - Built with Vite for fast development and builds
- 🔧 **TypeScript Support** - Full type safety and better developer experience

## 🚀 Enterprise Features (NEW!)

- 🌙 **Dark Mode** - Beautiful dark theme with system preference support
- 😊 **Emoji Picker** - 100+ categorized emojis with keyboard navigation
- 💬 **Typing Indicators** - Real-time typing status with animations
- 🟢 **Presence Status** - Online, offline, away, and busy indicators
- 🔔 **Smart Notifications** - Browser notifications with sound alerts
- 🔍 **Message Search** - Quick search through conversation history
- 📎 **File Attachments** - Drag & drop file upload with preview
- ♿ **Full Accessibility** - WCAG 2.1 AA compliant with ARIA support
- ⚡ **Optimized Performance** - Message virtualization and React.memo
- 📱 **Read Receipts** - Message status tracking (sent/delivered/read)

> 📖 **[View Complete Feature Documentation](FEATURES.md)**

## 🚀 Live Demo

Experience Yetichat in action: [**Live Demo**](https://msu7m21i7f.space.minimax.io)

## 📸 Screenshots

### Login Screen
![Login Screen](docs/screenshots/yetichat_login_screen.png)

### Main Application
![Main Application](docs/screenshots/yetichat_final_functional_app.png)

### Conversations Tab
![Conversations](docs/screenshots/conversations_tab.png)

### Users Tab
![Users](docs/screenshots/users_tab.png)

### Groups Tab
![Groups](docs/screenshots/groups_tab.png)

### Settings Tab
![Settings](docs/screenshots/settings_tab.png)

## 🛠️ Technology Stack

- **Frontend Framework**: React 18.3.1 with TypeScript
- **Chat SDK**: CometChat React UI Kit 6.0.6
- **Styling**: Tailwind CSS with custom components
- **UI Components**: Radix UI primitives
- **Build Tool**: Vite 6.0.1
- **Package Manager**: pnpm
- **Development**: ESLint, TypeScript ESLint

## 🏗️ Project Structure

```
yetichat/
├── docs/                     # Documentation and screenshots
│   ├── screenshots/          # Application screenshots
│   ├── SETUP.md             # Detailed setup guide
│   └── DEPLOYMENT.md        # Deployment instructions
├── src/
│   ├── components/          # React components
│   │   ├── auth/           # Authentication components
│   │   ├── chat/           # Chat-related components
│   │   ├── layout/         # Layout components
│   │   └── ui/             # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility libraries
│   ├── services/           # API and service layers
│   ├── styles/             # Global styles
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Helper functions
├── .env.example            # Environment variables template
├── package.json            # Project dependencies and scripts
└── README.md              # Project documentation
```

## ⚡ Quick Start

### Prerequisites

- Node.js 18.0.0 or higher
- pnpm (recommended) or npm
- CometChat account ([Sign up here](https://app.cometchat.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/username/yetichat.git
   cd yetichat
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your CometChat credentials:
   ```env
   VITE_COMETCHAT_APP_ID=your_app_id_here
   VITE_COMETCHAT_REGION=your_region_here
   VITE_COMETCHAT_AUTH_KEY=your_auth_key_here
   VITE_COMETCHAT_REST_API_KEY=your_rest_api_key_here
   ```

4. **Start the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to see the application.

## 🔧 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## Environment Variables

Yetichat requires API keys from CometChat to function. These keys should be stored in a `.env` file in the project root for local development.

Create a `.env` file in the root of the project with the following content:

```env
VITE_COMETCHAT_APP_ID=YOUR_APP_ID
VITE_COMETCHAT_REGION=YOUR_REGION
VITE_COMETCHAT_AUTH_KEY=YOUR_AUTH_KEY
VITE_COMETCHAT_REST_API_KEY=YOUR_REST_API_KEY
```

To obtain these keys:

1. **Create a CometChat Account**
   - Visit [CometChat Dashboard](https://app.cometchat.com/)
   - Sign up for a free account or log in.

2. **Create a New App or Use an Existing One**
   - In the CometChat Dashboard, either create a new app by clicking "Add New App" or select an existing app.
   - Choose your preferred region when creating a new app.

3. **Find Your Credentials**
   - Navigate to the "API & Auth Keys" section for your app within the CometChat Dashboard.
   - Note down your App ID, Region, Auth Key, and REST API Key.

4. **Populate your `.env` file**
   - Copy these keys into your `.env` file, replacing the placeholders.

For more detailed setup instructions, including CometChat configuration, see [SETUP.md](docs/SETUP.md).

## 🚀 Deployment

This project is configured for deployment on **Netlify** via the `netlify.toml` file.

For the deployed application to function correctly, the CometChat API keys (as defined in the "Environment Variables" section) **must be set in the Netlify UI** for your site. Do not commit your `.env` file with sensitive keys to your repository.

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for more detailed deployment instructions, including:

- Vercel deployment
- Netlify deployment (including setting environment variables in the UI)
- Docker deployment
- Custom server deployment

## 📦 New Component Library

Yetichat now includes a rich component library for building enterprise chat experiences:

### Chat Components
- **`MessageList`** - Virtualized message list with auto-scroll and infinite loading
- **`EnhancedMessageInput`** - Advanced input with emoji picker and file attachments
- **`TypingIndicator`** - Animated typing status indicator
- **`MessageSearch`** - Real-time message search with keyboard shortcuts
- **`EmojiPicker`** - Categorized emoji selector with accessibility

### UI Components
- **`ThemeToggle`** - Dark/light/system theme switcher
- **`PresenceIndicator`** - User status badge (online/offline/away/busy)
- **`NotificationManager`** - Notification center with sound alerts

### Demo
- **`FeaturesShowcase`** - Interactive demo of all enterprise features

See [FEATURES.md](FEATURES.md) for usage examples and detailed documentation.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

When contributing:
- Ensure accessibility with ARIA labels and keyboard navigation
- Add dark mode support to new components
- Use TypeScript for type safety
- Follow existing code patterns
- Include documentation

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [CometChat](https://www.cometchat.com/) for the excellent React UI Kit
- [Radix UI](https://www.radix-ui.com/) for accessible UI primitives
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS framework
- [Vite](https://vitejs.dev/) for the fast build tool

## 📞 Support

- 📧 **Email**: your-email@example.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/username/yetichat/issues)
- 📖 **Documentation**: [docs/](docs/)
- 💬 **CometChat Support**: [CometChat Documentation](https://www.cometchat.com/docs/)

---

**Built with ❤️ using CometChat React UI Kit**
