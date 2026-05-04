"use client";

import { useState } from "react";
import ProcessingStatusBadge from "@/components/ui/ProcessingStatusBadge";

export interface DocumentPreviewModalProps {
  id: number;
  name: string;
  fileName: string;
  date: string;
  pages: number;
  size: string;
  status: "completed" | "processing" | "pending";
  summary?: string;
  flashcards?: number;
  isOpen: boolean;
  onClose: () => void;
  onDownload?: () => void;
  onDelete?: () => void;
}

export default function DocumentPreviewModal({
  id,
  name,
  fileName,
  date,
  pages,
  size,
  status,
  summary,
  flashcards,
  isOpen,
  onClose,
  onDownload,
  onDelete,
}: DocumentPreviewModalProps) {
  const [activeTab, setActiveTab] = useState<"details" | "summary" | "flashcards">(
    "details"
  );

  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-6 flex items-start justify-between">
            <div className="flex items-start gap-4 min-w-0 flex-1">
              <span className="text-5xl flex-shrink-0">📄</span>
              <div className="min-w-0 flex-1">
                <h2 className="text-2xl font-bold text-white truncate">
                  {name}
                </h2>
                <p className="text-blue-100 text-sm mt-1 truncate">
                  {fileName}
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="flex-shrink-0 text-white hover:bg-white/20 rounded-lg p-2 transition"
            >
              ✕
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 bg-gray-50 px-6">
            <button
              onClick={() => setActiveTab("details")}
              className={`px-4 py-3 font-medium text-sm border-b-2 transition ${
                activeTab === "details"
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-600 border-transparent hover:text-gray-900"
              }`}
            >
              📋 Details
            </button>
            {summary && (
              <button
                onClick={() => setActiveTab("summary")}
                className={`px-4 py-3 font-medium text-sm border-b-2 transition ${
                  activeTab === "summary"
                    ? "text-blue-600 border-blue-600"
                    : "text-gray-600 border-transparent hover:text-gray-900"
                }`}
              >
                📝 Summary
              </button>
            )}
            {flashcards !== undefined && flashcards > 0 && (
              <button
                onClick={() => setActiveTab("flashcards")}
                className={`px-4 py-3 font-medium text-sm border-b-2 transition ${
                  activeTab === "flashcards"
                    ? "text-blue-600 border-blue-600"
                    : "text-gray-600 border-transparent hover:text-gray-900"
                }`}
              >
                🎴 Flashcards
              </button>
            )}
          </div>

          {/* Modal Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {/* Details Tab */}
            {activeTab === "details" && (
              <div className="space-y-6">
                {/* Status Badge */}
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-2">
                    Status
                  </p>
                  <ProcessingStatusBadge status={status} size="md" />
                </div>

                {/* Document Info Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-gray-600 mb-2">
                      File Size
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {size}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-600 mb-2">
                      Pages
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {pages}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-600 mb-2">
                      Upload Date
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatDate(date)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-600 mb-2">
                      File Name
                    </p>
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {fileName}
                    </p>
                  </div>
                </div>

                {/* Summary Preview */}
                {summary && (
                  <div className="border-t pt-6">
                    <p className="text-xs font-medium text-gray-600 mb-3">
                      Summary Preview
                    </p>
                    <p className="text-sm text-gray-700 line-clamp-4 bg-blue-50 rounded-lg p-4">
                      {summary}
                    </p>
                  </div>
                )}

                {/* Features */}
                {flashcards !== undefined && (
                  <div className="border-t pt-6">
                    <p className="text-xs font-medium text-gray-600 mb-3">
                      Features
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-2xl">🎴</span>
                        <span className="text-gray-700">
                          <span className="font-semibold">{flashcards}</span>{" "}
                          flashcard{flashcards !== 1 ? "s" : ""} generated
                        </span>
                      </div>
                      {summary && (
                        <div className="flex items-center gap-3 text-sm">
                          <span className="text-2xl">✨</span>
                          <span className="text-gray-700">Summary available</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Summary Tab */}
            {activeTab === "summary" && summary && (
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <span className="text-2xl">📝</span>
                    <h3 className="text-lg font-semibold text-gray-900">
                      AI-Generated Summary
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-justify">
                    {summary}
                  </p>
                </div>

                {/* Summary Stats */}
                <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 font-medium mb-1">
                      Word Count
                    </p>
                    <p className="text-xl font-semibold text-gray-900">
                      {summary.split(/\s+/).length}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-medium mb-1">
                      Read Time
                    </p>
                    <p className="text-xl font-semibold text-gray-900">
                      {Math.ceil(summary.split(/\s+/).length / 200)} min
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Flashcards Tab */}
            {activeTab === "flashcards" && flashcards !== undefined && (
              <div className="space-y-4">
                <div className="bg-indigo-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🎴</span>
                    <div>
                      <p className="text-sm text-indigo-600 font-medium">
                        Study Set
                      </p>
                      <p className="text-2xl font-bold text-indigo-900">
                        {flashcards} Cards
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-sm text-gray-600 mb-4">
                    Ready to study? Start learning with this flashcard set.
                  </div>
                  <button className="w-full px-4 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition">
                    🎓 Start Studying
                  </button>
                  <button className="w-full px-4 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition">
                    👁️ Preview Cards
                  </button>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mt-6 text-sm text-gray-600">
                  <p className="font-medium mb-2">💡 Study Tips:</p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Review cards daily for better retention</li>
                    <li>Focus on cards marked as difficult</li>
                    <li>Use spaced repetition for optimal learning</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex gap-3">
            <button
              onClick={() => onDownload?.()}
              className="flex-1 px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              ⬇️ Download
            </button>
            <button
              onClick={() => onDelete?.()}
              className="flex-1 px-4 py-3 bg-red-100 text-red-600 font-semibold rounded-lg hover:bg-red-200 transition"
            >
              🗑️ Delete
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition"
            >
              ✕ Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
