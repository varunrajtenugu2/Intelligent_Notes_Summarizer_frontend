'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "@/components/sidebar/Sidebar";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUserName] = useState("User");
  const [stats, setStats] = useState({
    totalDocuments: 12,
    summariesGenerated: 8,
    flashcardSets: 5,
    studyHours: 24,
  });
  const [recentDocuments, setRecentDocuments] = useState([
    { id: 1, name: "Math Notes - Chapter 5", date: "Today", icon: "📄" },
    { id: 2, name: "Biology Study Guide", date: "Yesterday", icon: "📚" },
    { id: 3, name: "History Timeline", date: "2 days ago", icon: "📖" },
  ]);

  useEffect(() => {
    // Load user data from auth
    const userData = localStorage.getItem('userEmail');
    if (userData) {
      setUserName(userData.split('@')[0]);
    }
  }, []);

  return (
    <div className="flex h-full">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 md:ml-64 overflow-y-auto">
        {/* Main Content */}
        <div className="p-6 lg:p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome back, {userName}! 👋
            </h1>
            <p className="text-gray-600">
              Here's what you've been working on lately
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Documents Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Documents</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.totalDocuments}
                  </p>
                </div>
                <div className="text-4xl">📄</div>
              </div>
              <p className="text-gray-500 text-xs mt-4">
                Documents uploaded this month
              </p>
            </div>

            {/* Summaries Generated Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Summaries Generated</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.summariesGenerated}
                  </p>
                </div>
                <div className="text-4xl">✨</div>
              </div>
              <p className="text-gray-500 text-xs mt-4">
                AI-generated summaries
              </p>
            </div>

            {/* Flashcard Sets Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Flashcard Sets</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.flashcardSets}
                  </p>
                </div>
                <div className="text-4xl">🎴</div>
              </div>
              <p className="text-gray-500 text-xs mt-4">
                Active study sets
              </p>
            </div>

            {/* Study Hours Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Study Hours</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.studyHours}h
                  </p>
                </div>
                <div className="text-4xl">⏱️</div>
              </div>
              <p className="text-gray-500 text-xs mt-4">
                Time spent studying
              </p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Quick Actions */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  href="/upload"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition flex items-center gap-3 group"
                >
                  <span className="text-xl group-hover:scale-110 transition">📤</span>
                  <div className="text-left">
                    <div>Upload Notes</div>
                    <div className="text-xs opacity-90">Add new documents</div>
                  </div>
                </Link>

                <Link
                  href="/flashcards"
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-4 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition flex items-center gap-3 group"
                >
                  <span className="text-xl group-hover:scale-110 transition">🎴</span>
                  <div className="text-left">
                    <div>Create Flashcards</div>
                    <div className="text-xs opacity-90">Study tools</div>
                  </div>
                </Link>

                <Link
                  href="/documents"
                  className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition flex items-center gap-3 group"
                >
                  <span className="text-xl group-hover:scale-110 transition">📚</span>
                  <div className="text-left">
                    <div>View Documents</div>
                    <div className="text-xs opacity-90">All uploaded files</div>
                  </div>
                </Link>

                <button className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-6 py-4 rounded-lg font-semibold hover:from-orange-700 hover:to-orange-800 transition flex items-center gap-3 group">
                  <span className="text-xl group-hover:scale-110 transition">📊</span>
                  <div className="text-left">
                    <div>View Statistics</div>
                    <div className="text-xs opacity-90">Detailed analytics</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Study Tips / Help */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg shadow-sm border border-indigo-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">💡 Study Tips</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span className="text-sm text-gray-700">Create summaries from your notes for quick review</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span className="text-sm text-gray-700">Generate flashcards to practice key concepts</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span className="text-sm text-gray-700">Review your documents regularly for better retention</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Recent Documents */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Recent Documents</h2>
              <Link
                href="/documents"
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                View All →
              </Link>
            </div>

            <div className="divide-y divide-gray-200">
              {recentDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 sm:p-6 hover:bg-gray-50 transition flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <span className="text-3xl">{doc.icon}</span>
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {doc.name}
                      </p>
                      <p className="text-sm text-gray-500">{doc.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition opacity-0 group-hover:opacity-100">
                      View
                    </button>
                    <button className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition opacity-0 group-hover:opacity-100">
                      More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
