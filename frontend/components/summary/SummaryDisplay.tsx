'use client';

import { useState } from 'react';

interface SummaryDisplayProps {
  documentId: string;
  documentName: string;
  summary: string;
  status?: 'completed' | 'processing' | 'pending';
  flashcardsCount?: number;
  onClose?: () => void;
}

export default function SummaryDisplay({
  documentId,
  documentName,
  summary,
  status = 'completed',
  flashcardsCount = 0,
  onClose,
}: SummaryDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return '✓';
      case 'processing':
        return '⟳';
      case 'pending':
        return '⋯';
      default:
        return '○';
    }
  };

  const truncatedSummary = isExpanded ? summary : summary.substring(0, 300) + (summary.length > 300 ? '...' : '');
  const hasMore = summary.length > 300;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{documentName}</h2>
            <div className="flex items-center gap-4">
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(status)}`}>
                <span>{getStatusIcon(status)}</span>
                <span className="capitalize">{status}</span>
              </span>
              {flashcardsCount > 0 && (
                <span className="text-sm text-gray-600 flex items-center gap-1">
                  <span className="text-lg">🎴</span>
                  <span>{flashcardsCount} flashcards</span>
                </span>
              )}
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Summary Content Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Summary Title */}
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <span className="text-xl">📋</span>
            Summary
          </h3>
        </div>

        {/* Summary Text */}
        <div className="p-6">
          <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
            {truncatedSummary}
          </div>

          {/* Expand/Collapse Button */}
          {hasMore && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-4 text-blue-600 hover:text-blue-700 font-semibold transition"
            >
              {isExpanded ? '← Show less' : 'Read more →'}
            </button>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={handleCopySummary}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                copied
                  ? 'bg-green-100 text-green-700'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              <span>{copied ? '✓' : '📋'}</span>
              {copied ? 'Copied!' : 'Copy Summary'}
            </button>

            <button className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold bg-purple-100 text-purple-700 hover:bg-purple-200 transition">
              <span>🎴</span>
              View Flashcards
            </button>

            <button className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition">
              <span>📥</span>
              Download
            </button>

            <button className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition">
              <span>🔄</span>
              Regenerate
            </button>
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
          <div className="text-2xl mb-2">📄</div>
          <div className="text-sm text-gray-600">Document ID</div>
          <div className="text-xs font-mono text-gray-800 mt-1 truncate">{documentId}</div>
        </div>
        <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
          <div className="text-2xl mb-2">📊</div>
          <div className="text-sm text-gray-600">Word Count</div>
          <div className="text-lg font-semibold text-gray-900 mt-1">{summary.split(' ').length}</div>
        </div>
        <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
          <div className="text-2xl mb-2">✂️</div>
          <div className="text-sm text-gray-600">Read Time</div>
          <div className="text-lg font-semibold text-gray-900 mt-1">
            {Math.ceil(summary.split(' ').length / 200)} min
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
          <div className="text-2xl mb-2">🎯</div>
          <div className="text-sm text-gray-600">Topics</div>
          <div className="text-lg font-semibold text-gray-900 mt-1">5+</div>
        </div>
      </div>
    </div>
  );
}
