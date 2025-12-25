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
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">DC</span>
            </div>
            <span className="text-xl font-bold text-gray-900">DirectCabinet</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/entreprises" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Entreprises
            </Link>
            <Link href="/freelances" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Freelances
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Tarifs
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/inscription?type=freelance"
              className="px-4 py-2 text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors"
            >
              Connexion
            </Link>
            <Link
              href="/inscription"
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Inscription
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
              <Link href="/entreprises" className="text-gray-600 hover:text-blue-600 font-medium">
                Entreprises
              </Link>
              <Link href="/freelances" className="text-gray-600 hover:text-blue-600 font-medium">
                Freelances
              </Link>
              <Link href="/pricing" className="text-gray-600 hover:text-blue-600 font-medium">
                Tarifs
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600 font-medium">
                Contact
              </Link>
              <hr className="border-gray-200" />
              <Link href="/inscription?type=freelance" className="text-blue-600 font-medium">
                Connexion
              </Link>
              <Link
                href="/inscription"
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg text-center"
              >
                Inscription
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
