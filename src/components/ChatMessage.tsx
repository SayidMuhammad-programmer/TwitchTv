'use client';

interface ChatMessageProps {
  username: string;
  message: string;
  timestamp?: string;
  isStreamer?: boolean;
  userIcon?: string;
}

export default function ChatMessage({ 
  username, 
  message, 
  timestamp,
  isStreamer = false,
  userIcon
}: ChatMessageProps) {
  return (
    <div className="flex items-start px-4 py-2 hover:bg-[var(--bg-secondary)] hover:bg-opacity-50 transition-colors duration-150">
      {/* User avatar/icon */}
      <div className="flex-shrink-0 mr-2 mt-0.5">
        <div className="w-5 h-5 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center text-[10px]">
          {userIcon ?? '👤'}
        </div>
      </div>
      
      {/* Message content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline space-x-2">
          {/* Username */}
          <span className={`font-semibold text-sm ${
            isStreamer 
              ? 'text-[var(--accent-purple)]' 
              : 'text-[var(--text-primary)]'
          }`}>
            {username}:
          </span>
          
          {/* Timestamp */}
          {timestamp && (
            <span className="text-xs text-[var(--text-muted)] flex-shrink-0">
              {timestamp}
            </span>
          )}
        </div>
        
        {/* Message text */}
        <div className="text-sm text-[var(--text-primary)] leading-relaxed mt-0.5 break-words">
          {message}
        </div>
      </div>
    </div>
  );
}

