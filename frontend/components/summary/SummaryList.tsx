'use client';

import { useState } from 'react';
import SummaryCard from './SummaryCard';

interface Summary {
  documentId: string;
  documentName: string;
  summary: string;
  status: 'completed' | 'processing' | 'pending';
  flashcardsCount?: number;
  date?: string;
}

interface SummaryListProps {
  summaries: Summary[];
  onSelectSummary?: (summary: Summary) => void;
  isLoading?: boolean;
  emptyMessage?: string;
  columns?: 1 | 2 | 3;
}

export default function SummaryList({
  summaries,
  onSelectSummary,
  isLoading = false,
  emptyMessage = 'No summaries available yet',
  columns = 2,
}: SummaryListProps) {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'completed' | 'processing' | 'pending'>('all');

  const filteredSummaries = summaries.filter((s) => {
    if (selectedFilter === 'all') return true;
    return s.status === selectedFilter;
  });

  const gridCols = {
    1: 'grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-100 rounded-lg h-64 animate-pulse" />
        ))}
      </div>
    );
  }

  if (filteredSummaries.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">📭</div>
        <p className="text-gray-500 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {(['all', 'completed', 'processing', 'pending'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setSelectedFilter(status)}
            className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition ${
              selectedFilter === status
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="capitalize">{status}</span>
            <span className="ml-2 text-sm">
              ({summaries.filter((s) => status === 'all' || s.status === status).length})
            </span>
          </button>
        ))}
      </div>

      {/* Summary Cards Grid */}
      <div className={`grid gap-6 ${gridCols[columns]} lg:${gridCols[columns]}`}>
        {filteredSummaries.map((summary) => (
          <SummaryCard
            key={summary.documentId}
            {...summary}
            onViewSummary={() => onSelectSummary?.(summary)}
          />
        ))}
      </div>
    </div>
  );
}
