'use client';

import { useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";

interface Document {
  id: number;
  name: string;
  date: string;
  pages: number;
  size: string;
  status: "completed" | "processing" | "pending";
  hasFilename: string;
}

export default function Documents() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "processing" | "pending">("all");
  const [sortBy, setSortBy] = useState<"date" | "name" | "size">("date");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const documents: Document[] = [
    {
      id: 1,
      name: "Math Notes - Chapter 5",
      date: "2025-04-25",
      pages: 12,
      size: "2.5 MB",
      status: "completed",
      hasFilename: "math-ch5.pdf",
    },
    {
      id: 2,
      name: "Biology Study Guide",
      date: "2025-04-24",
      pages: 8,
      size: "1.8 MB",
      status: "completed",
      hasFilename: "bio-guide.pdf",
    },
    {
      id: 3,
      name: "History Timeline",
      date: "2025-04-23",
      pages: 5,
      size: "1.2 MB",
      status: "processing",
      hasFilename: "history-timeline.pdf",
    },
    {
      id: 4,
      name: "Chemistry Reactions",
      date: "2025-04-22",
      pages: 15,
      size: "3.1 MB",
      status: "completed",
      hasFilename: "chem-reactions.pdf",
    },
    {
      id: 5,
      name: "Physics Laws Summary",
      date: "2025-04-21",
      pages: 9,
      size: "2.0 MB",
      status: "pending",
      hasFilename: "physics-laws.pdf",
    },
  ];

  // Filter documents
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase());
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return "✓";
      case "processing":
        return "⟳";
      case "pending":
        return "⏱";
      default:
        return "•";
    }
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
                <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
              </div>

              {/* View Toggle */}
              <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
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
              {viewMode === "list" ? (
                // List View
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Document Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Size
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Pages
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {sortedDocuments.map((doc) => (
                          <tr
                            key={doc.id}
                            className="hover:bg-gray-50 transition"
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <span className="text-xl">📄</span>
                                <div className="min-w-0">
                                  <p className="font-medium text-gray-900 truncate">
                                    {doc.name}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {doc.hasFilename}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                              {new Date(doc.date).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                              {doc.size}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                              {doc.pages}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                  doc.status
                                )}`}
                              >
                                {getStatusIcon(doc.status)} {doc.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex gap-2">
                                <button className="text-blue-600 hover:text-blue-900 font-medium text-sm hover:underline">
                                  View
                                </button>
                                <span className="text-gray-300">•</span>
                                <button className="text-red-600 hover:text-red-900 font-medium text-sm hover:underline">
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                // Grid View
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedDocuments.map((doc) => (
                    <div
                      key={doc.id}
                      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition flex flex-col"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <span className="text-4xl">📄</span>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            doc.status
                          )}`}
                        >
                          {getStatusIcon(doc.status)}
                        </span>
                      </div>

                      <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                        {doc.name}
                      </h3>
                      <p className="text-xs text-gray-500 mb-4">
                        {doc.hasFilename}
                      </p>

                      <div className="grid grid-cols-2 gap-4 mb-4 py-4 border-y border-gray-200">
                        <div>
                          <p className="text-xs text-gray-600 font-medium">
                            Size
                          </p>
                          <p className="text-sm font-semibold text-gray-900">
                            {doc.size}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 font-medium">
                            Pages
                          </p>
                          <p className="text-sm font-semibold text-gray-900">
                            {doc.pages}
                          </p>
                        </div>
                      </div>

                      <p className="text-xs text-gray-600 mb-4">
                        {new Date(doc.date).toLocaleDateString()}
                      </p>

                      <div className="flex gap-2 mt-auto">
                        <button className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium text-sm rounded-lg transition">
                          View
                        </button>
                        <button className="flex-1 px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 font-medium text-sm rounded-lg transition">
                          Delete
                        </button>
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
    </div>
  );
}
