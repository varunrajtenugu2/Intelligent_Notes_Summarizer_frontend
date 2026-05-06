'use client';

import { useState } from 'react';

interface SummaryCardProps {
  documentId: string;
  documentName: string;
  summary: string;
  status?: 'completed' | 'processing' | 'pending';
  flashcardsCount?: number;
  date?: string;
  onClick?: () => void;
  onViewSummary?: () => void;
}

export default function SummaryCard({
  documentId,
  documentName,
  summary,
  status = 'completed',
  flashcardsCount = 0,
  date,
  onClick,
  onViewSummary,
}: SummaryCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'processing':
        return 'text-yellow-600';
      case 'pending':
        return 'text-gray-600';
      default:
        return 'text-blue-600';
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50';
      case 'processing':
        return 'bg-yellow-50';
      case 'pending':
        return 'bg-gray-50';
      default:
        return 'bg-blue-50';
    }
  };

  const truncatedSummary = summary.substring(0, 150) + (summary.length > 150 ? '...' : '');
  const wordCount = summary.split(' ').length;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`rounded-lg border border-gray-200 overflow-hidden transition-all cursor-pointer ${
        isHovered ? 'shadow-lg border-blue-300' : 'shadow'
      }`}
    >
      {/* Header with Status */}
      <div className={`p-4 border-b border-gray-100 ${getStatusBgColor(status)}`}>
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 flex-1 line-clamp-2">{documentName}</h3>
          <span className={`text-xs font-semibold uppercase tracking-wide ${getStatusColor(status)}`}>
            {status}
          </span>
        </div>
        {date && <p className="text-xs text-gray-500">{date}</p>}
      </div>

      {/* Summary Preview */}
      <div className="p-4">
        <p className="text-sm text-gray-600 line-clamp-3 mb-4">{truncatedSummary}</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4 py-3 border-t border-b border-gray-100">
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">Words</div>
            <div className="text-sm font-semibold text-gray-900">{wordCount}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">Read Time</div>
            <div className="text-sm font-semibold text-gray-900">{Math.ceil(wordCount / 200)} min</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">Flashcards</div>
            <div className="text-sm font-semibold text-gray-900">{flashcardsCount}</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewSummary?.();
            }}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded transition text-sm"
          >
            View Summary
          </button>
          <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-2 px-3 rounded transition text-sm">
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
