import React from 'react';
import { Crown, Sparkles } from 'lucide-react';
import logo from 'figma:asset/8dfb1fcc657ed6b91f860fad74c74ddf8dc27a3d.png';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenPremium?: () => void;
  onLogoClick?: () => void;
}

export function Header({ isDarkMode, onToggleDarkMode, onOpenPremium, onLogoClick }: HeaderProps) {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-card border-b border-gray-200 dark:border-gray-800 z-10 transition-all duration-300">
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src={logo} 
              alt="Swimming Starter" 
              className="h-12 object-contain drop-shadow-lg dark:drop-shadow-[0_4px_8px_rgba(59,130,246,0.3)] hover:scale-105 transition-transform cursor-pointer"
              onClick={onLogoClick}
            />
          </div>
          
          <button 
            onClick={onOpenPremium}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 dark:from-amber-500 dark:via-yellow-500 dark:to-amber-600 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
          >
            <Crown className="w-4 h-4 text-amber-900 dark:text-amber-950 group-hover:rotate-12 transition-transform" />
            <span className="text-amber-900 dark:text-amber-950 font-semibold text-sm">프리미엄</span>
            <Sparkles className="w-3 h-3 text-amber-900 dark:text-amber-950 animate-pulse" />
          </button>
        </div>
      </div>
    </div>
  );
}