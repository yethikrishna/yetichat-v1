<!--
SEO Keywords: yetichat, CometChat, React chat, real-time messaging, chat UI kit, video calls, voice calls, TypeScript chat app, Vite React chat, professional chat platform, CometChat React UI Kit, team communication
-->

<div align="center">

# yetichat-v1

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![CometChat](https://img.shields.io/badge/CometChat-6.0-FF6B35?style=for-the-badge&logo=cometchat&logoColor=white)](https://www.cometchat.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**A professional, real-time chat application built with CometChat React UI Kit - modern messaging, voice & video calls, and team collaboration.**

[Report Bug](https://github.com/yethikrishna/yetichat-v1/issues) · [Request Feature](https://github.com/yethikrishna/yetichat-v1/issues)

</div>

---

## Overview

**yetichat-v1** is a production-ready chat application powered by the CometChat React UI Kit. It delivers a complete real-time messaging experience including one-on-one conversations, group chats, voice and video calling, file sharing, and rich media support. Built with React 18, TypeScript, Vite, and Tailwind CSS, it provides a polished, responsive interface backed by the shadcn/ui component library and Radix UI primitives.

## Features

- **Real-Time Messaging** - Instant message delivery with typing indicators and read receipts
- **Voice & Video Calls** - Integrated calling via CometChat Calls SDK
- **Group Chats** - Create and manage group conversations with multiple participants
- **Rich Media** - Share images, files, and attachments in conversations
- **User Presence** - Online/offline status indicators and presence tracking
- **Message Reactions** - React to messages with emojis
- **Threaded Replies** - Organize conversations with message threads
- **Push Notifications** - Stay updated with real-time notifications
- **Modern UI** - Beautiful interface with shadcn/ui components and Tailwind CSS
- **Dark/Light Theme** - Theme switching support via next-themes
- **Form Validation** - React Hook Form with Zod schema validation
- **Data Visualization** - Recharts for chat analytics dashboards
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Accessibility** - Built on Radix UI accessible primitives

## Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| Framework | React | 18.3.x |
| Build Tool | Vite | 6.x |
| Chat SDK | CometChat Chat SDK | 4.0.x |
| UI Kit | CometChat React UI Kit | 6.0.x |
| Calling | CometChat Calls SDK | 4.0.x |
| Styling | Tailwind CSS | 3.4.x |
| UI Components | shadcn/ui, Radix UI | Latest |
| Routing | React Router DOM | 6.x |
| Forms | React Hook Form + Zod | 7.x, 3.x |
| Charts | Recharts | 2.x |
| Toasts | Sonner | 1.x |
| Icons | Lucide React | 0.364.x |
| Language | TypeScript | 5.6.x |
| Package Manager | pnpm | Latest |

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm
- A CometChat account (free trial available at [cometchat.com](https://www.cometchat.com/))

### Installation

```bash
# Clone the repository
git clone https://github.com/yethikrishna/yetichat-v1.git
cd yetichat-v1

# Install dependencies
pnpm install
```

### Environment Variables

Create a `.env.local` file:

```env
# CometChat
VITE_COMETCHAT_APP_ID=your_app_id
VITE_COMETCHAT_REGION=your_region
VITE_COMETCHAT_AUTH_KEY=your_auth_key
VITE_COMETCHAT_WEBSOCKET_URL=your_websocket_url
```

### Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Lint code
pnpm lint
```

## Project Structure

```
yetichat-v1/
├── src/
│   ├── components/       # React components
│   │   └── ui/          # shadcn/ui components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── pages/           # Page components
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Application entry
│   └── index.css        # Global styles
├── docs/                # Documentation
├── scripts/             # Build and deployment scripts
├── public/              # Static assets
├── netlify.toml         # Netlify deployment config
├── components.json      # shadcn/ui configuration
├── tailwind.config.js   # Tailwind configuration
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies
```

## Deployment

### Netlify Deployment

The project includes a `netlify.toml` for one-click deployment:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yethikrishna/yetichat-v1)

### Vercel Deployment

```bash
vercel --prod
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Related Projects

- [yetisai](https://github.com/yethikrishna/yetisai) - Yeti AI main platform
- [ai-browser-chat](https://github.com/yethikrishna/ai-browser-chat) - AI browser chat
- [compyle](https://github.com/yethikrishna/compyle) - App building platform

---

<div align="center">

Built with passion by [Yethikrishna R](https://github.com/yethikrishna)

</div>
