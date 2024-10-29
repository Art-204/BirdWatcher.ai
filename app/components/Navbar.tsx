'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Bird } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Bird className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-blue-600">Birdwatcher.ai</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md">
              About
            </Link>
            <Link href="/gallery" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md">
              Gallery
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md">
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/gallery"
              className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Gallery
            </Link>
            <Link
              href="/contact"
              className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}