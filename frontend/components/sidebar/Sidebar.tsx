'use client';

import Link from 'next/link';
import { useState } from 'react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };

  const menuItems = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: '📊',
    },
    {
      label: 'Upload Notes',
      href: '/upload',
      icon: '📤',
    },
    {
      label: 'Documents',
      href: '/documents',
      icon: '📄',
    },
    {
      label: 'Flashcards',
      href: '/flashcards',
      icon: '🎴',
    },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-64 md:bg-gray-900 md:text-white md:fixed md:left-0 md:top-16 md:h-[calc(100vh-64px)] md:overflow-y-auto">
        <div className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="px-4 py-6 border-t border-gray-700 space-y-2">
          <Link href="/profile" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200">
            <span className="text-xl">👤</span>
            <span className="font-medium">Profile</span>
          </Link>
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-left">
            <span className="text-xl">🚪</span>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />

          {/* Mobile Menu */}
          <aside className="md:hidden fixed left-0 top-16 w-64 h-[calc(100vh-64px)] bg-gray-900 text-white z-50 overflow-y-auto">
            <div className="flex-1 px-4 py-6 space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                  onClick={onClose}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>

            <div className="px-4 py-6 border-t border-gray-700 space-y-2">
              <Link href="/profile" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200">
                <span className="text-xl">👤</span>
                <span className="font-medium">Profile</span>
              </Link>
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-left">
                <span className="text-xl">🚪</span>
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
