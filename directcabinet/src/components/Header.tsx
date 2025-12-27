'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">DC</span>
            </div>
            <span className="text-xl font-bold text-gray-900">DirectCabinet</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/#comment-ca-marche" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">
              Comment ca marche
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">
              Tarifs
            </Link>
            <Link href="/#temoignages" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">
              Temoignages
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/inscription"
              className="px-6 py-2.5 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Rejoindre
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <Link href="/#comment-ca-marche" className="text-gray-600 hover:text-emerald-600 font-medium">
                Comment ca marche
              </Link>
              <Link href="/pricing" className="text-gray-600 hover:text-emerald-600 font-medium">
                Tarifs
              </Link>
              <Link href="/#temoignages" className="text-gray-600 hover:text-emerald-600 font-medium">
                Temoignages
              </Link>
              <hr className="border-gray-200" />
              <Link
                href="/inscription"
                className="px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg text-center"
              >
                Rejoindre
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
