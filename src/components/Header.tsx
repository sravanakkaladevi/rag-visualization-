'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, Menu, X, Moon, Sun, BookOpen, PanelLeft } from 'lucide-react';
import { searchAll } from '@/lib/search';
import { SearchResult } from '@/lib/types';

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Read and apply saved theme
    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light') {
        setDarkMode(false);
        document.documentElement.classList.add('light');
        document.documentElement.setAttribute('data-theme', 'light');
      } else {
        setDarkMode(true);
        document.documentElement.classList.remove('light');
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    } catch {
      // fallback
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(prev => {
      const nextMode = !prev;
      if (nextMode) {
        document.documentElement.classList.remove('light');
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      }
      return nextMode;
    });
  };

  useEffect(() => {
    const results = searchAll(searchQuery);
    setSearchResults(results);
  }, [searchQuery]);

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setSearchQuery('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setSearchQuery('');
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-border-primary)] bg-[var(--color-bg-primary)]/95 backdrop-blur-sm">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {/* Sidebar Toggle Button */}
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('toggle-rag-sidebar'));
                }
              }}
              className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors"
              title="Toggle Sidebar (Open/Close)"
              aria-label="Toggle Sidebar Navigation"
            >
              <PanelLeft size={18} />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-accent-purple)] to-[var(--color-accent-blue)] flex items-center justify-center">
                <BookOpen size={18} className="text-white" />
              </div>
              <span className="font-bold text-lg hidden sm:block">
                <span className="text-[var(--color-text-primary)]">RAG</span>
                <span className="text-[var(--color-accent-purple)]"> Learning Hub</span>
              </span>
            </Link>
          </div>

          {/* Nav links - desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link href="/learn" className="px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-all">
              Learn
            </Link>
            <Link href="/tools" className="px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-all">
              Tools
            </Link>
            <Link href="/projects" className="px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-all">
              Projects
            </Link>
            <Link href="/compare/rag-vs-fine-tuning" className="px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-all">
              Compare
            </Link>
            <Link href="/glossary" className="px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-all">
              Glossary
            </Link>
          </nav>

          {/* Right section */}
          <div className="flex items-center gap-2">
            {/* Search button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-[var(--color-text-muted)] bg-[var(--color-bg-secondary)] border border-[var(--color-border-primary)] rounded-lg hover:border-[var(--color-border-hover)] transition-colors"
              aria-label="Search"
            >
              <Search size={14} />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden md:inline text-xs px-1.5 py-0.5 bg-[var(--color-bg-tertiary)] rounded border border-[var(--color-border-primary)]">⌘K</kbd>
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors"
              aria-label="Toggle theme"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* GitHub link */}
            <a
              href="https://github.com/sravanakkaladevi/rag-visualization-"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors"
              aria-label="GitHub Repository"
              title="View on GitHub"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[20vh]">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { setSearchOpen(false); setSearchQuery(''); }} />
          <div ref={searchRef} className="relative w-full max-w-xl mx-4 bg-[var(--color-bg-secondary)] border border-[var(--color-border-primary)] rounded-xl shadow-2xl overflow-hidden animate-fade-in">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--color-border-primary)]">
              <Search size={18} className="text-[var(--color-text-muted)]" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search lessons, tools, glossary..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] outline-none text-sm"
              />
              <kbd className="text-xs px-1.5 py-0.5 text-[var(--color-text-muted)] bg-[var(--color-bg-tertiary)] rounded border border-[var(--color-border-primary)]">ESC</kbd>
            </div>
            {searchResults.length > 0 && (
              <div className="max-h-80 overflow-y-auto py-2">
                {searchResults.map((result, i) => (
                  <Link
                    key={i}
                    href={result.href}
                    onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                    className="block px-4 py-3 hover:bg-[var(--color-bg-tertiary)] transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-[var(--color-accent-purple)] uppercase">{result.category}</span>
                      <span className="text-xs text-[var(--color-text-muted)]">·</span>
                      <span className="text-xs text-[var(--color-text-muted)] capitalize">{result.type}</span>
                    </div>
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">{result.title}</p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5 line-clamp-1">{result.description}</p>
                  </Link>
                ))}
              </div>
            )}
            {searchQuery.length >= 2 && searchResults.length === 0 && (
              <div className="px-4 py-8 text-center text-sm text-[var(--color-text-muted)]">
                No results found for &quot;{searchQuery}&quot;
              </div>
            )}
            {searchQuery.length < 2 && (
              <div className="px-4 py-6 text-center text-sm text-[var(--color-text-muted)]">
                Type at least 2 characters to search
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile menu drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <nav className="absolute top-16 left-0 right-0 bg-[var(--color-bg-secondary)] border-b border-[var(--color-border-primary)] p-4 space-y-1 animate-slide-up">
            {[
              { href: '/learn', label: 'Learn' },
              { href: '/learn/rag-fundamentals', label: 'RAG Fundamentals' },
              { href: '/learn/basic-rag', label: 'Basic RAG' },
              { href: '/learn/conversational-rag', label: 'Conversational RAG' },
              { href: '/learn/hybrid-rag', label: 'Hybrid RAG' },
              { href: '/learn/agentic-rag', label: 'Agentic RAG' },
              { href: '/learn/corrective-rag', label: 'Corrective RAG' },
              { href: '/learn/self-rag', label: 'Self-RAG' },
              { href: '/learn/graphrag', label: 'GraphRAG' },
              { href: '/learn/multimodal-rag', label: 'Multimodal RAG' },
              { href: '/tools', label: 'Tools & Frameworks' },
              { href: '/projects', label: 'Projects' },
              { href: '/compare/rag-vs-fine-tuning', label: 'RAG vs Fine-Tuning' },
              { href: '/glossary', label: 'Glossary' },
            ].map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
