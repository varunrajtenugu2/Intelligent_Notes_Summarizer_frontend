'use client';

import Sidebar from "@/components/sidebar/Sidebar";
import { useState } from "react";

export default function Upload() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  return (
    <div className="flex h-full">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 md:ml-64 p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Upload Notes</h1>
        
        <div className="bg-white rounded-lg shadow p-12">
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center transition ${
              dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
            onDragEnter={() => setDragActive(true)}
            onDragLeave={() => setDragActive(false)}
          >
            <div className="text-5xl mb-4">📄</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Drag and drop your files here
            </h2>
            <p className="text-gray-600 mb-6">
              Supported formats: PDF, DOCX, TXT, PNG, JPG
            </p>
            
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              Browse Files
            </button>
          </div>

          <div className="mt-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Uploads</h3>
            <div className="space-y-2">
              <p className="text-gray-500 text-center py-8">No files uploaded yet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
