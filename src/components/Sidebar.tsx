import React from 'react';
import { Home, Calculator, Calendar, History, User, Trophy } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, color: 'bg-blue-500' },
    { id: 'solver', label: 'Problem Solver', icon: Calculator, color: 'bg-green-500' },
    { id: 'daily', label: 'Daily Challenge', icon: Calendar, color: 'bg-orange-500' },
    { id: 'history', label: 'My Progress', icon: History, color: 'bg-purple-500' },
    { id: 'profile', label: 'Profile', icon: User, color: 'bg-pink-500' },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg border-r border-gray-200">
      <div className="p-6">
        <nav className="space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? `${item.color} text-white shadow-lg transform scale-105`
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <Trophy className="w-4 h-4 ml-auto animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};