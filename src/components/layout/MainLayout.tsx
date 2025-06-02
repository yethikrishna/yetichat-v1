/**
 * MainLayout Component - Main application layout
 */
import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { APP_CONSTANTS } from '../../utils/constants';
import Header from './Header';
import Sidebar from './Sidebar';
import CometChatContainer from '../chat/CometChatContainer';
import type { SidebarState } from '../../types';

interface MainLayoutProps {
  className?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ className }) => {
  const [sidebarState, setSidebarState] = useState<SidebarState>({
    isOpen: false,
    activeTab: 'conversations'
  });

  const handleMenuToggle = () => {
    setSidebarState(prev => ({
      ...prev,
      isOpen: !prev.isOpen
    }));
  };

  const handleSidebarClose = () => {
    setSidebarState(prev => ({
      ...prev,
      isOpen: false
    }));
  };

  const handleTabChange = (tab: SidebarState['activeTab']) => {
    setSidebarState(prev => ({
      ...prev,
      activeTab: tab
    }));
  };

  return (
    <div className={cn("min-h-screen bg-gray-50", className)}>
      {/* Header */}
      <Header
        onMenuToggle={handleMenuToggle}
        isSidebarOpen={sidebarState.isOpen}
      />

      {/* Main Content Area */}
      <div className="flex h-screen" style={{ paddingTop: APP_CONSTANTS.HEADER_HEIGHT }}>
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarState.isOpen}
          activeTab={sidebarState.activeTab}
          onTabChange={handleTabChange}
          onClose={handleSidebarClose}
        />

        {/* Main Content */}
        <main
          className={cn(
            "flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out",
            "lg:ml-0" // Remove margin on large screens since sidebar is static
          )}
        >
          <div className="flex-1 relative bg-white">
            {/* Content based on active tab */}
            <CometChatContainer activeTab={sidebarState.activeTab} />
          </div>
        </main>
      </div>
    </div>
  );
};



export default MainLayout;
