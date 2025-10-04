'use client';

interface StatusBarProps {
  time?: string;
  battery?: number;
  signal?: number;
}

export default function StatusBar({ 
  time = "8:27", 
  battery = 40, 
  signal = 3 
}: StatusBarProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2 h-[44px] bg-gradient-to-b from-[#8B4513] via-[#654321] to-[#3E2723] text-white text-sm font-semibold">
      {/* Left side - Time */}
      <div className="flex-1">
        <span className="text-white font-semibold">{time}</span>
      </div>
      
      {/* Center - App Name */}
      <div className="flex-1 flex justify-center">
        <span className="text-white font-semibold text-base">YNBFAM</span>
      </div>
      
      {/* Right side - Icons and Battery */}
      <div className="flex-1 flex items-center justify-end space-x-1">
        {/* Signal bars */}
        <div className="flex items-end space-x-[1px] mr-1">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`w-[3px] bg-white rounded-sm ${
                i < signal 
                  ? 'opacity-100' 
                  : 'opacity-30'
              }`}
              style={{
                height: `${4 + i * 2}px`
              }}
            />
          ))}
        </div>
        
        {/* WiFi icon */}
        <div className="mr-1">
          <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
            <path 
              d="M7.5 0C11.5 0 15 3.5 15 7.5L13.5 9C13.5 5.5 10.5 2.5 7.5 2.5S1.5 5.5 1.5 9L0 7.5C0 3.5 3.5 0 7.5 0Z" 
              fill="white"
            />
          </svg>
        </div>
        
        {/* Battery */}
        <div className="flex items-center">
          <div className="relative">
            <div className="w-6 h-3 border border-white rounded-sm opacity-60">
              <div 
                className="h-full bg-white rounded-sm"
                style={{ width: `${battery}%` }}
              />
            </div>
            <div className="absolute -right-[2px] top-[3px] w-[1px] h-[6px] bg-white opacity-60 rounded-r-sm" />
          </div>
        </div>
        
        {/* Edit Profile Button */}
        <button className="ml-2 px-3 py-1 bg-black bg-opacity-40 rounded-full text-xs font-medium">
          Edit Profile
        </button>
      </div>
    </div>
  );
}

