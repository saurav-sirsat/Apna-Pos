import React from 'react';
import { ShoppingCart } from 'lucide-react';

const ApnaPosLogo3D = ({ size = 'large', className = "" }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12', 
    large: 'w-16 h-16',
    xlarge: 'w-20 h-20'
  };

  const iconSizes = {
    small: 'w-5 h-5',
    medium: 'w-7 h-7',
    large: 'w-9 h-9', 
    xlarge: 'w-11 h-11'
  };

  const dotSizes = {
    small: 'w-3 h-3',
    medium: 'w-4 h-4',
    large: 'w-6 h-6',
    xlarge: 'w-8 h-8'
  };

  const glowSizes = {
    small: 'w-2 h-2',
    medium: 'w-2.5 h-2.5',
    large: 'w-3 h-3',
    xlarge: 'w-4 h-4'
  };

  return (
    <div className={`relative group ${className}`}>
      <div className={`
        ${sizeClasses[size]} 
        bg-gradient-to-br from-primary via-primary/80 to-primary/60 
        rounded-3xl flex items-center justify-center 
        shadow-2xl hover:shadow-3xl 
        transition-all duration-300 
        transform hover:scale-110 hover:rotate-6 
        relative overflow-hidden
      `}>
        {/* 3D gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/30 rounded-3xl"></div>
        
        {/* Main icon */}
        <ShoppingCart className={`
          ${iconSizes[size]} 
          text-primary-foreground 
          relative z-10 
          drop-shadow-lg
        `} />
        
        {/* Animated accent dot */}
        <div className={`
          absolute -bottom-2 -right-2 
          ${dotSizes[size]} 
          bg-gradient-to-br from-yellow-400 to-orange-500 
          rounded-full shadow-xl 
          animate-bounce
        `}></div>
        
        {/* Glow effect */}
        <div className={`
          absolute top-1 left-1 
          ${glowSizes[size]} 
          bg-white/60 rounded-full blur-sm animate-pulse
        `}></div>
        
        {/* Additional 3D depth effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10 rounded-3xl"></div>
      </div>
    </div>
  );
};

export default ApnaPosLogo3D;
