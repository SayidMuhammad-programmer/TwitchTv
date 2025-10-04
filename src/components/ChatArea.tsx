'use client';

import { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';

interface ChatAreaProps {
  messages?: Array<{
    id: string;
    username: string;
    message: string;
    timestamp?: string;
    isStreamer?: boolean;
    userIcon?: string;
  }>;
  viewerCount?: number;
}

const defaultMessages = [
  {
    id: '1',
    username: 'xX_GamerPro_Xx',
    message: 'W RIZZ',
    isStreamer: false,
  },
  {
    id: '2',
    username: 'MiamiNightz',
    message: 'LMAOOO she was not feeling it',
    isStreamer: false,
  },
  {
    id: '3',
    username: 'WavyVibes88',
    message: 'Bro ask her what her sign is',
    isStreamer: false,
  },
  {
    id: '4',
    username: '305_Player',
    message: 'This stream is fire 🔥',
    isStreamer: false,
  },
  {
    id: '5',
    username: 'SavageSam',
    message: "She's a 10 but she likes pineapple on pizza",
    isStreamer: false,
  },
  {
    id: '6',
    username: 'ClutchKing42',
    message: "He's got that unspoken rizz",
    isStreamer: false,
  },
  {
    id: '7',
    username: 'J-Roc',
    message: 'AYOOO',
    isStreamer: false,
  },
  {
    id: '8',
    username: 'SlickRick',
    message: 'nah he fumbled that one',
    isStreamer: false,
  },
  {
    id: '9',
    username: 'BasedGodflow',
    message: 'Clip it!',
    isStreamer: false,
  },
  {
    id: '10',
    username: 'WRLD_On_DRGS',
    message: 'KEKW',
    isStreamer: false,
  },
  {
    id: '11',
    username: 'VibeMaster',
    message: 'Is that a filter or is she really that...',
    isStreamer: false,
  },
  {
    id: '12',
    username: 'TheRealDeal',
    message: 'Bro is bricked up',
    isStreamer: false,
  },
  {
    id: '13',
    username: 'ChillFactor',
    message: 'the AUDACITY',
    isStreamer: false,
  },
  {
    id: '14',
    username: 'GamerGod',
    message: 'Tell her my boy Bilal wants her number',
    isStreamer: false,
  },
];

export default function ChatArea({ 
  messages = defaultMessages, 
  viewerCount: initialViewerCount = 1000 
}: ChatAreaProps) {
  const [viewerCount, setViewerCount] = useState(initialViewerCount);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Fluctuate viewer count between 1000-1200
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(prev => {
        const min = 1000;
        const max = 1200;
        const variation = Math.random() * 50 - 25; // ±25 viewers
        const newCount = Math.round(prev + variation);
        return Math.max(min, Math.min(max, newCount));
      });
    }, 3000 + Math.random() * 2000); // Random interval between 3-5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full bg-black">
      {/* Chat header */}
      <div className="px-4 py-3 border-b border-[var(--ui-border)]">
        <h2 className="text-lg font-bold text-[var(--text-primary)]">
          CHAT
        </h2>
      </div>

      {/* Welcome message */}
      <div className="px-4 py-4">
        <p className="text-sm text-[var(--text-muted)]">
          Welcome to the chat room!
        </p>
      </div>

      {/* "New" divider line */}
      <div className="relative px-4 mb-2">
        <div className="border-t border-[var(--accent-red)]"></div>
        <span className="absolute right-4 -top-2 text-xs font-semibold text-[var(--accent-red)] bg-black px-1">
          New
        </span>
      </div>

      {/* Messages area */}
      <div 
        ref={scrollAreaRef}
        className="flex-1 overflow-y-auto scrollbar-hide"
      >
        <div className="flex flex-col space-y-0">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              username={message.username}
              message={message.message}
              timestamp={message.timestamp}
              isStreamer={message.isStreamer}
              userIcon={message.userIcon}
            />
          ))}
          
          {/* Viewer count display */}
          <div className="px-4 py-2 text-xs text-[var(--text-muted)] text-center">
            {viewerCount.toLocaleString()} viewers watching
          </div>
        </div>
      </div>
    </div>
  );
}