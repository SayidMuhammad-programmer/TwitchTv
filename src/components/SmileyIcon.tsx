import React from 'react';

const SmileyIcon: React.FC<{
  className?: string;
}> = ({ className }) => {
  return (
    <svg 
      width="100%" 
      height="100%" 
      version="1.1" 
      viewBox="0 0 20 20" 
      x="0px" 
      y="0px" 
      role="presentation" 
      aria-hidden="true" 
      focusable="false"
      className={className}
    >
      <g>
        {/* Circle outline */}
        <path 
          d="M10 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        {/* Eyes */}
        <circle cx="7" cy="9" r="1.2" fill="currentColor" />
        <circle cx="13" cy="9" r="1.2" fill="currentColor" />
        {/* Filled smile */}
        <path 
          d="M7.2 11.2a2.8 2.8 0 0 0 5.6 0v0.9a2.8 2.8 0 0 1-5.6 0z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};

export default SmileyIcon;
