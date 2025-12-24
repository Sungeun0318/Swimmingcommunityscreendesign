import React from 'react';
import { Home, Users, Calendar, Waves, User } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: 'home', icon: Home, label: '홈' },
    { id: 'community', icon: Users, label: '커뮤니티' },
    { id: 'scheduler', icon: Calendar, label: '스케줄러' },
    { id: 'training', icon: Waves, label: '훈련' },
    { id: 'profile', icon: User, label: '프로필' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-card border-t border-gray-200 dark:border-gray-700 pb-safe z-20 transition-all duration-300">
      <div className="max-w-md mx-auto px-2 py-1">
        <div className="flex justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center justify-center p-2 rounded-lg transition-all ${
                  isActive 
                    ? 'text-blue-600 dark:text-cyan-400' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}