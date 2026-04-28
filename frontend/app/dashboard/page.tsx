'use client';

import Sidebar from "@/components/sidebar/Sidebar";
import { useState } from "react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-full">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 md:ml-64 p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Stats Cards */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Total Documents</div>
            <div className="text-4xl font-bold text-gray-900 mt-2">12</div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Summaries Generated</div>
            <div className="text-4xl font-bold text-gray-900 mt-2">8</div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Flashcard Sets</div>
            <div className="text-4xl font-bold text-gray-900 mt-2">5</div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Study Hours</div>
            <div className="text-4xl font-bold text-gray-900 mt-2">24</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition text-left">
              📤 Upload New Notes
            </button>
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition text-left">
              🎴 Create Flashcards
            </button>
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition text-left">
              📚 View Documents
            </button>
            <button className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition text-left">
              📊 View Statistics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
