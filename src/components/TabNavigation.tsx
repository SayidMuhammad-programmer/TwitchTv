'use client';

import { useState } from 'react';

const tabs = [
  { id: 'about', label: 'About' },
  { id: 'clips', label: 'Clips' },
  { id: 'videos', label: 'Videos' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'chat', label: 'Chat' },
];

interface TabNavigationProps {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

export default function TabNavigation({ 
  activeTab = 'chat', 
  onTabChange 
}: TabNavigationProps) {
  const [currentTab, setCurrentTab] = useState(activeTab);

  const handleTabClick = (tabId: string) => {
    setCurrentTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <div className="bg-black border-b border-[var(--ui-border)]">
      <div className="flex items-center px-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`
              flex-1 text-center py-3 text-base font-medium transition-colors duration-200
              relative border-b-2 border-transparent
              ${currentTab === tab.id
                ? 'text-[var(--accent-purple)] border-b-[var(--accent-purple)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }
            `}
          >
            {tab.label}
            {currentTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent-purple)]" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

