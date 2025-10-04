'use client';

import { useState } from 'react';
import Image from 'next/image';

const navigationItems = [
  { id: 'home', label: 'Home', hasNotification: false },
  { id: 'browse', label: 'Browse', hasNotification: false },
  { id: 'create', label: '+', hasNotification: false, isSpecial: true },
  { id: 'activity', label: 'Activity', hasNotification: true, notificationCount: 1 },
  { id: 'profile', label: 'Profile', hasNotification: false },
];

interface BottomNavigationProps {
  activeItem?: string;
  onItemChange?: (itemId: string) => void;
}

export default function BottomNavigation({ 
  activeItem = 'home', 
  onItemChange 
}: BottomNavigationProps) {
  const [currentItem, setCurrentItem] = useState(activeItem);

  const handleItemClick = (itemId: string) => {
    setCurrentItem(itemId);
    onItemChange?.(itemId);
  };

  const renderIcon = (item: typeof navigationItems[0]) => {
    const isActive = currentItem === item.id;
    const iconColor = isActive ? 'var(--accent-purple)' : 'var(--text-disabled)';

    switch (item.id) {
      case 'home':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path 
              d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" 
              stroke={iconColor} 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              fill={isActive ? iconColor : 'none'}
            />
          </svg>
        );
      case 'browse':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke={iconColor} strokeWidth="2" fill="none"/>
            <path d="M21 21L16.65 16.65" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'create':
        return (
          <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[var(--bg-tertiary)] shadow-md border border-[var(--ui-border)]">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M12 5V19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        );
      case 'activity':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path 
              d="M18 8A6 6 0 0 0 6 8C6 15 3 19 3 19H21S18 15 18 8Z" 
              stroke={iconColor} 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              fill={isActive ? iconColor : 'none'}
            />
          </svg>
        );
      case 'profile':
        return (
          <div className="relative">
            <div className={`w-7 h-7 rounded-full overflow-hidden ${isActive ? 'ring-2 ring-[var(--accent-purple)]' : ''}`}>
              <Image
                src="/profile.jpeg"
                alt="Profile"
                width={28}
                height={28}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-black border-t border-[var(--ui-border)] px-4 py-2 h-[83px] relative">
      <div className="flex items-center justify-between h-full">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className={`flex flex-col items-center justify-center relative h-full ${item.id === 'create' ? 'min-w-[72px]' : 'min-w-[60px]'}`}
          >
            <div className="relative mb-1">
              {renderIcon(item)}
              {item.hasNotification && item.notificationCount && (
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-[var(--accent-red)] rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-[10px] font-semibold text-white">
                    {item.notificationCount}
                  </span>
                </div>
              )}
            </div>
            {!item.isSpecial && (
              <span 
                className={`text-[10px] ${
                  currentItem === item.id 
                    ? 'text-[var(--accent-purple)]' 
                    : 'text-[var(--text-disabled)]'
                }`}
              >
                {item.label}
              </span>
            )}
          </button>
        ))}
      </div>
      {/* iOS home indicator */}
      <div className="pointer-events-none absolute left-0 right-0 bottom-[calc(env(safe-area-inset-bottom)/2)] flex justify-center">
        <div className="w-32 h-1.5 bg-white/90 rounded-full" />
      </div>

      {/* Safe area padding for modern mobile devices */}
      <div className="h-[env(safe-area-inset-bottom)] bg-black" />
    </div>
  );
}

