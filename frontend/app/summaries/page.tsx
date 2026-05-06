'use client';

import { useState } from 'react';
import Sidebar from '@/components/sidebar/Sidebar';
import { SummarySection } from '@/components/summary';
import { useSummaries } from '@/hooks';

export default function Summaries() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { summaries, loading, error } = useSummaries({ autoFetch: true, status: 'all' });

  return (
    <div className="flex h-full bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 md:ml-64 overflow-auto">
        <div className="p-8 max-w-7xl mx-auto">
          {error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <div className="text-4xl mb-4">⚠️</div>
              <h2 className="text-xl font-bold text-red-900 mb-2">Failed to Load Summaries</h2>
              <p className="text-red-700 mb-4">{error.message}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition"
              >
                Try Again
              </button>
            </div>
          ) : (
            <SummarySection summaries={summaries} isLoading={loading} columns={2} />
          )}
        </div>
      </div>
    </div>
  );
}
