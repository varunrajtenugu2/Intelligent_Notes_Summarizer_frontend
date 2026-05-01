'use client';

import { useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import UploadZone from "@/components/upload/UploadZone";

export default function Upload() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-full">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 md:ml-64 overflow-y-auto">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Upload Your Notes
            </h1>
            <p className="text-gray-600">
              Upload documents to create AI-powered summaries and flashcards
            </p>
          </div>

          {/* Upload Zone */}
          <div className="max-w-4xl">
            <UploadZone />
          </div>

          {/* Info Cards */}
          <div className="mt-12 max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Processing Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="text-3xl mb-3">⚙️</div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Smart Processing
              </h3>
              <p className="text-sm text-gray-600">
                Our AI automatically extracts and organizes content from your documents
              </p>
            </div>

            {/* Summary Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="text-3xl mb-3">✨</div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Generate Summaries
              </h3>
              <p className="text-sm text-gray-600">
                Get concise summaries of your notes in seconds
              </p>
            </div>

            {/* Flashcards Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="text-3xl mb-3">🎴</div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Create Flashcards
              </h3>
              <p className="text-sm text-gray-600">
                Instantly create study flashcards from your documents
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-12 max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {/* FAQ Item 1 */}
              <details className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 group">
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-gray-900 hover:text-blue-600 transition">
                  <span>What file formats are supported?</span>
                  <span className="text-xl group-open:rotate-180 transition">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-gray-600">
                  We support PDF, Word documents (DOCX), text files (TXT), and images (PNG, JPG). Make sure your documents are in English for best results.
                </p>
              </details>

              {/* FAQ Item 2 */}
              <details className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 group">
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-gray-900 hover:text-blue-600 transition">
                  <span>What is the maximum file size?</span>
                  <span className="text-xl group-open:rotate-180 transition">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-gray-600">
                  Each file can be up to 50MB. If your document is larger, consider splitting it into multiple files.
                </p>
              </details>

              {/* FAQ Item 3 */}
              <details className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 group">
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-gray-900 hover:text-blue-600 transition">
                  <span>How many files can I upload at once?</span>
                  <span className="text-xl group-open:rotate-180 transition">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-gray-600">
                  You can upload up to 5 files at a time. Each file will be processed individually.
                </p>
              </details>

              {/* FAQ Item 4 */}
              <details className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 group">
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-gray-900 hover:text-blue-600 transition">
                  <span>How long does processing take?</span>
                  <span className="text-xl group-open:rotate-180 transition">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-gray-600">
                  Processing time depends on file size and content. Most documents are processed within 1-5 minutes.
                </p>
              </details>

              {/* FAQ Item 5 */}
              <details className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 group">
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-gray-900 hover:text-blue-600 transition">
                  <span>Are my documents secure?</span>
                  <span className="text-xl group-open:rotate-180 transition">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-gray-600">
                  Yes! All documents are encrypted during transfer and storage. Only you have access to your files and generated content.
                </p>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
