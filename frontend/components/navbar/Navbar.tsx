'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Notes Summarizer
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition">
              Dashboard
            </Link>
            <Link href="/upload" className="text-gray-600 hover:text-gray-900 transition">
              Upload
            </Link>
            <Link href="/documents" className="text-gray-600 hover:text-gray-900 transition">
              Documents
            </Link>
            <Link href="/flashcards" className="text-gray-600 hover:text-gray-900 transition">
              Flashcards
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-600 hover:text-gray-900 transition">
                Login
              </Link>
              <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Sign Up
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:bg-gray-100"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/dashboard" className="block px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100">
              Dashboard
            </Link>
            <Link href="/upload" className="block px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100">
              Upload
            </Link>
            <Link href="/documents" className="block px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100">
              Documents
            </Link>
            <Link href="/flashcards" className="block px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100">
              Flashcards
            </Link>
            <Link href="/login" className="block px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100">
              Login
            </Link>
            <Link href="/register" className="block px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100">
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
