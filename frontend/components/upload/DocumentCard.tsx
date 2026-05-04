"use client";

import { useState } from "react";
import Link from "next/link";
import ProcessingStatusBadge from "@/components/ui/ProcessingStatusBadge";
import ProcessingStatusBadge from "@/components/ui/ProcessingStatusBadge";

export interface DocumentCardProps {
  id: number;
  name: string;
  date: string;
  pages: number;
  size: string;
  status: "completed" | "processing" | "pending";
  fileName: string;
  summary?: string;
  flashcards?: number;
  onView?: (id: number) => void;
  onDelete?: (id: number) => void;
  onDownload?: (id: number) => void;
}

export default function DocumentCard({
  id,
  name,
  date,
  pages,
  size,
  status,
  fileName,
  summary,
  flashcards,
  onView,
  onDelete,
  onDownload,
}: DocumentCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 flex items-start justify-between border-b border-gray-200">
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <span className="text-4xl flex-shrink-0">📄</span>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-gray-900 truncate text-lg">
              {name}
            </h3>
            <p className="text-xs text-gray-600 truncate mt-1">{fileName}</p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex-shrink-0 ml-2">
          <ProcessingStatusBadge status={status} size="sm" />
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6">
        {/* Metadata Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Size */}
          <div>
            <p className="text-xs text-gray-600 font-medium mb-1">Size</p>
            <p className="text-sm font-semibold text-gray-900">{size}</p>
          </div>

          {/* Pages */}
          <div>
            <p className="text-xs text-gray-600 font-medium mb-1">Pages</p>
            <p className="text-sm font-semibold text-gray-900">{pages}</p>
          </div>

          {/* Date */}
          <div>
            <p className="text-xs text-gray-600 font-medium mb-1">Uploaded</p>
            <p className="text-sm font-semibold text-gray-900">
              {formatDate(date)}
            </p>
          </div>
        </div>

        {/* Summary */}
        {summary && (
          <div className="mb-6">
            <p className="text-xs text-gray-600 font-medium mb-2">Summary</p>
            <p className="text-sm text-gray-700 line-clamp-2 bg-gray-50 rounded p-3">
              {summary}
            </p>
          </div>
        )}

        {/* Features */}
        {flashcards !== undefined && (
          <div className="mb-6 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-blue-600">🎴</span>
              <span className="text-gray-700">
                {flashcards} flashcard{flashcards !== 1 ? "s" : ""} generated
              </span>
            </div>
            {summary && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-600">✨</span>
                <span className="text-gray-700">Summary available</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Card Footer - Actions */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-2">
        <button
          onClick={() => onView?.(id)}
          className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition"
        >
          👁️ View
        </button>

        <button
          onClick={() => onDownload?.(id)}
          className="flex-1 px-3 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium text-sm hover:bg-gray-300 transition"
        >
          ⬇️ Download
        </button>

        <div className="relative">
          <button
            onClick={() => setShowActions(!showActions)}
            className="px-3 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium text-sm hover:bg-gray-300 transition"
          >
            ⋮
          </button>

          {showActions && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
              <button
                onClick={() => {
                  onDelete?.(id);
                  setShowActions(false);
                }}
                className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 font-medium text-sm border-b border-gray-200"
              >
                🗑️ Delete
              </button>
              <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 font-medium text-sm border-b border-gray-200">
                📋 Copy Summary
              </button>
              <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 font-medium text-sm">
                📤 Share
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
