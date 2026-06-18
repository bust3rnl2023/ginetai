import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
  withText?: boolean;
  onClick?: () => void;
}

export default function GinetLogo({ size = 36, className = '', withText = false, onClick }: LogoProps) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-3 select-none ${className}`}
    >
      {/* Dynamic Animated G Logo Container */}
      <div 
        className="relative flex items-center justify-center group"
        style={{ width: size, height: size }}
      >
        {/* Ambient background glow */}
        <div className="absolute inset-0 bg-teal-500/15 rounded-full blur-md opacity-75 group-hover:bg-emerald-500/25 transition-all duration-500" />
        
        {/* Exterior tech rings */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite]"
        >
          {/* Segmented Outer Circle */}
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="url(#outerGrad)"
            strokeWidth="2.5"
            strokeDasharray="20 12 40 8 10 15"
            className="opacity-70 group-hover:opacity-100 transition-opacity duration-300"
          />
        </svg>

        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full animate-[spin_8s_linear_infinite_reverse] scale-80"
        >
          {/* Inner Dots and Nodes */}
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="none"
            stroke="url(#innerGrad)"
            strokeWidth="1.5"
            strokeDasharray="4 14"
            className="opacity-60"
          />
        </svg>

        {/* Central "G" Glyph and Hub */}
        <svg
          viewBox="0 0 100 100"
          className="relative z-10 w-[72%] h-[72%]"
        >
          <defs>
            <linearGradient id="logoGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#14b8a6" /> {/* Teal 500 */}
              <stop offset="100%" stopColor="#10b981" /> {/* Emerald 500 */}
            </linearGradient>
            <linearGradient id="outerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2dd4bf" /> {/* Teal 400 */}
              <stop offset="50%" stopColor="#34d399" /> {/* Emerald 400 */}
              <stop offset="100%" stopColor="#60a5fa" /> {/* Blue 400 */}
            </linearGradient>
            <linearGradient id="innerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0d9488" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>

          {/* Central Stylized "G" with integrated node connections */}
          <path
            d="M 72,50 
               A 22,22 0 1,0 50,72
               L 52,72 
               A 2,2 0 0,0 54,70 
               L 54,58 
               A 2,2 0 0,0 52,56 
               L 42,56 
               A 2,2 0 0,0 40,58 
               L 40,62
               A 2,2 0 0,0 42,64
               L 46,64
               A 14,14 0 1,1 66,50
               Z"
            fill="url(#logoGlow)"
            className="drop-shadow-[0_2px_8px_rgba(20,184,166,0.5)] transform-gpu transition-all duration-300 group-hover:scale-[1.03]"
          />

          {/* Glowing communication node points */}
          <circle cx="50" cy="50" r="4.5" fill="#ffffff" className="animate-pulse shadow-sm" />
          <circle cx="72" cy="50" r="3" fill="#2dd4bf" />
          <circle cx="28" cy="50" r="3" fill="#34d399" />
        </svg>
      </div>

      {/* Brand Text */}
      {withText && (
        <div className="flex flex-col tracking-tight leading-none">
          <span className="font-sans font-semibold text-lg text-white select-none tracking-tracking-wide">
            GINET <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 font-bold">AI</span>
          </span>
          <span className="font-mono text-[8.5px] uppercase text-zinc-500 tracking-[0.16em]">
            Netherlands
          </span>
        </div>
      )}
    </div>
  );
}
