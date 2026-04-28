'use client';

import Sidebar from "@/components/sidebar/Sidebar";
import { useState } from "react";

export default function Documents() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const documents = [
    { id: 1, name: "Math Notes - Chapter 5", date: "2025-04-25", pages: 12 },
    { id: 2, name: "Biology Study Guide", date: "2025-04-24", pages: 8 },
    { id: 3, name: "History Timeline", date: "2025-04-23", pages: 5 },
  ];

  return (
    <div className="flex h-full">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 md:ml-64 p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My Documents</h1>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Document Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pages
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {documents.map((doc) => (
                <tr key={doc.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">
                    📄 {doc.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {doc.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {doc.pages}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-900 font-medium text-sm">
                      View
                    </button>
                    <button className="ml-4 text-red-600 hover:text-red-900 font-medium text-sm">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
