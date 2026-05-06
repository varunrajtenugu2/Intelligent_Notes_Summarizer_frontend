'use client';

import { useState } from 'react';
import SummaryDisplay from './SummaryDisplay';
import SummaryList from './SummaryList';

interface Summary {
  documentId: string;
  documentName: string;
  summary: string;
  status: 'completed' | 'processing' | 'pending';
  flashcardsCount?: number;
  date?: string;
}

interface SummarySectionProps {
  title?: string;
  description?: string;
  summaries: Summary[];
  isLoading?: boolean;
  columns?: 1 | 2 | 3;
}

export default function SummarySection({
  title = 'Document Summaries',
  description = 'View and manage your document summaries',
  summaries,
  isLoading = false,
  columns = 2,
}: SummarySectionProps) {
  const [selectedSummary, setSelectedSummary] = useState<Summary | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');

  const handleSelectSummary = (summary: Summary) => {
    setSelectedSummary(summary);
    setViewMode('detail');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedSummary(null);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              📋 List
            </button>
            <button
              onClick={() => setViewMode('detail')}
              disabled={!selectedSummary}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                viewMode === 'detail'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed'
              }`}
            >
              📖 Detail
            </button>
          </div>
        </div>
        <p className="text-gray-600">{description}</p>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        {viewMode === 'list' ? (
          <SummaryList
            summaries={summaries}
            onSelectSummary={handleSelectSummary}
            isLoading={isLoading}
            columns={columns}
          />
        ) : selectedSummary ? (
          <div>
            <button
              onClick={handleBackToList}
              className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
            >
              ← Back to List
            </button>
            <SummaryDisplay
              documentId={selectedSummary.documentId}
              documentName={selectedSummary.documentName}
              summary={selectedSummary.summary}
              status={selectedSummary.status}
              flashcardsCount={selectedSummary.flashcardsCount}
              onClose={handleBackToList}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
