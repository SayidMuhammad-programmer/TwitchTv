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

export default function ChatArea({ 
  messages, 
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
          {messages?.map((message) => (
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