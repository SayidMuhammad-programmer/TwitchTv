'use client';

import { useState } from 'react';
import SmileyIcon from './SmileyIcon';

interface ChatInputProps {
  onSendMessage?: (message: string) => void;
  placeholder?: string;
}

export default function ChatInput({ 
  onSendMessage,
  placeholder = "Send chat" 
}: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage?.(message.trim());
      setMessage('');
    }
  };

  return (
    <div className="bg-black border-t border-[var(--ui-border)] px-4 py-3 h-[56px]">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholder}
          className="
            w-full 
            h-10
            bg-[var(--bg-tertiary)] 
            text-[var(--text-primary)] 
            placeholder-[var(--text-muted)]
            border border-[var(--ui-border)]
            rounded-[10px]
            pl-6 pr-16 indent-4
            text-base
            outline-none
            focus:border-[var(--ui-border-active)]
            transition-colors duration-200
          "
        />
        
        {/* Emoji/Send button */}
        <button
          type="submit"
          className="
            absolute right-3 top-1/2 transform -translate-y-1/2
            w-7 h-7
            flex items-center justify-center
            text-[var(--text-muted)]
            hover:text-[var(--text-secondary)]
            transition-colors duration-200
          "
          disabled={!message.trim()}
        >
          {message.trim() ? (
            // Send arrow
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path 
                d="M22 2L11 13" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M22 2L15 22L11 13L2 9L22 2Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            // Emoji/Smiley face
            <SmileyIcon className="text-white" />
          )}
        </button>
        
        {/* More options button */}
        <button
          type="button"
          className="
            absolute right-12 top-1/2 transform -translate-y-1/2
            w-6 h-6
            flex items-center justify-center
            text-[var(--text-muted)]
            hover:text-[var(--text-secondary)]
            transition-colors duration-200
          "
        >
          <svg width="4" height="16" viewBox="0 0 4 16" fill="none">
            <circle cx="2" cy="2" r="2" fill="currentColor"/>
            <circle cx="2" cy="8" r="2" fill="currentColor"/>
            <circle cx="2" cy="14" r="2" fill="currentColor"/>
          </svg>
        </button>
      </form>
    </div>
  );
}

