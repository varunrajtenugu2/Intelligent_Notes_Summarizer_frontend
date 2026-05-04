'use client';

import { useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import DocumentCard from "@/components/upload/DocumentCard";
import DocumentPreviewModal from "@/components/upload/DocumentPreviewModal";
import ProcessingStatusBadge from "@/components/ui/ProcessingStatusBadge";

interface Document {
  id: number;
  name: string;
  date: string;
  pages: number;
  size: string;
  status: "completed" | "processing" | "pending";
  fileName: string;
  summary?: string;
  flashcards?: number;
}

export default function Documents() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "processing" | "pending">("all");
  const [sortBy, setSortBy] = useState<"date" | "name" | "size">("date");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  const documents: Document[] = [
    {
      id: 1,
      name: "Math Notes - Chapter 5",
      date: "2025-04-25",
      pages: 12,
      size: "2.5 MB",
      status: "completed",
      fileName: "math-ch5.pdf",
      summary:
        "Comprehensive notes on calculus concepts including derivatives, integrals, and applications to real-world problems.",
      flashcards: 24,
    },
    {
      id: 2,
      name: "Biology Study Guide",
      date: "2025-04-24",
      pages: 8,
      size: "1.8 MB",
      status: "completed",
      fileName: "bio-guide.pdf",
      summary:
        "Study guide covering cell biology, photosynthesis, and cellular respiration with diagrams.",
      flashcards: 18,
    },
    {
      id: 3,
      name: "History Timeline",
      date: "2025-04-23",
      pages: 5,
      size: "1.2 MB",
      status: "processing",
      fileName: "history-timeline.pdf",
      summary: "Timeline of major historical events from ancient civilizations to modern times.",
      flashcards: 15,
    },
    {
      id: 4,
      name: "Chemistry Reactions",
      date: "2025-04-22",
      pages: 15,
      size: "3.1 MB",
      status: "completed",
      fileName: "chem-reactions.pdf",
      summary:
        "Detailed guide on chemical reactions, balancing equations, and stoichiometry principles.",
      flashcards: 32,
    },
    {
      id: 5,
      name: "Physics Laws Summary",
      date: "2025-04-21",
      pages: 9,
      size: "2.0 MB",
      status: "pending",
      fileName: "physics-laws.pdf",
      summary: "Summary of Newton's laws, motion, forces, and energy concepts.",
    },
    {
      id: 6,
      name: "Literature Analysis",
      date: "2025-04-20",
      pages: 7,
      size: "1.5 MB",
      status: "completed",
      fileName: "literature-analysis.pdf",
      summary:
        "Analysis of classic literature themes, character development, and literary devices.",
      flashcards: 21,
    },
  ];

  // Filter documents
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || doc.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Sort documents
  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "size") {
      return parseFloat(b.size) - parseFloat(a.size);
    }
    return 0;
  });

  const handleViewDocument = (id: number) => {
    const doc = documents.find((d) => d.id === id);
    if (doc) {
      setSelectedDocument(doc);
    }
  };

  const handleDeleteDocument = (id: number) => {
    console.log("Delete document:", id);
    setSelectedDocument(null);
  };

  const handleDownloadDocument = (id: number) => {
    console.log("Download document:", id);
  };

  return (
    <div className="flex h-full">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 md:ml-64 overflow-y-auto">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              My Documents
            </h1>
            <p className="text-gray-600">
              Manage and organize your uploaded documents
            </p>
          </div>

          {/* Controls Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            {/* Search and View Toggle */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <span className="absolute right-3 top-2.5 text-gray-400">
                  🔍
                </span>
              </div>

              {/* View Toggle */}
              <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-2 rounded font-medium text-sm transition ${
                    viewMode === "grid"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  ⊞ Grid
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-2 rounded font-medium text-sm transition ${
                    viewMode === "list"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  📋 List
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Status Filter */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) =>
                    setFilterStatus(
                      e.target.value as
                        | "all"
                        | "completed"
                        | "processing"
                        | "pending"
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="all">All Documents</option>
                  <option value="completed">✓ Completed</option>
                  <option value="processing">⟳ Processing</option>
                  <option value="pending">⏱ Pending</option>
                </select>
              </div>

              {/* Sort By */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as "date" | "name" | "size")
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="date">Newest First</option>
                  <option value="name">Name (A-Z)</option>
                  <option value="size">Size (Largest)</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-gray-600">
              Showing {sortedDocuments.length} of {documents.length} documents
            </div>
          </div>

          {/* Documents View */}
          {sortedDocuments.length > 0 ? (
            <>
              {viewMode === "grid" ? (
                // Grid View
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedDocuments.map((doc) => (
                    <DocumentCard
                      key={doc.id}
                      {...doc}
                      onView={handleViewDocument}
                      onDelete={handleDeleteDocument}
                      onDownload={handleDownloadDocument}
                    />
                  ))}
                </div>
              ) : (
                // List View
                <div className="space-y-3">
                  {sortedDocuments.map((doc) => (
                    <div
                      key={doc.id}
                      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 min-w-0 flex-1">
                          <span className="text-2xl flex-shrink-0">📄</span>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-gray-900 truncate">
                              {doc.name}
                            </h3>
                            <p className="text-xs text-gray-600 mt-1">
                              {doc.fileName} • {doc.size} • {doc.pages} pages
                            </p>
                            {doc.summary && (
                              <p className="text-sm text-gray-600 mt-2 line-clamp-1">
                                {doc.summary}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-3 flex-shrink-0">
                          <ProcessingStatusBadge status={doc.status} size="sm" />

                          <button
                            onClick={() => handleViewDocument(doc.id)}
                            className="px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg font-medium text-sm"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            // Empty State
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <div className="text-5xl mb-4">📭</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No documents found
              </h3>
              <p className="text-gray-600 mb-6">
                {searchQuery
                  ? "Try adjusting your search or filters"
                  : "Upload your first document to get started"}
              </p>
              <a
                href="/upload"
                className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Upload Document
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Document Preview Modal */}
      {selectedDocument && (
        <DocumentPreviewModal
          {...selectedDocument}
          isOpen={selectedDocument !== null}
          onClose={() => setSelectedDocument(null)}
          onDownload={() => handleDownloadDocument(selectedDocument.id)}
          onDelete={() => handleDeleteDocument(selectedDocument.id)}
        />
      )}
    </div>
  );
}
