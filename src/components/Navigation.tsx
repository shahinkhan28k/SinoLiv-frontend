import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Video, Radio, PlusCircle, Settings, HelpCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const navItems = [
  { icon: Home, label: 'Home', path: '/dashboard' },
  { icon: PlusCircle, label: 'Stream', path: '/stream' },
  { icon: Radio, label: 'Live', path: '/live' },
  { icon: Video, label: 'Videos', path: '/videos' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-100 h-screen sticky top-0 p-6">
      <div className="mb-10">
        <h1 className="font-['Caveat'] text-3xl font-bold text-blue-600">SinoLiv</h1>
      </div>
      
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
              isActive 
                ? "bg-blue-50 text-blue-600 font-medium" 
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            )}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-gray-50">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-gray-500 hover:text-gray-700 transition-colors">
          <HelpCircle size={20} />
          <span>Support</span>
        </button>
      </div>
    </aside>
  );
}

export function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around items-center h-16 px-2 z-50">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => cn(
            "flex flex-col items-center gap-1 flex-1 py-1 transition-colors",
            isActive ? "text-blue-600" : "text-gray-400"
          )}
        >
          <item.icon size={22} />
          <span className="text-[10px] font-medium">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
