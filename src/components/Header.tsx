'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, Menu, X, BookOpen, Sun, Moon } from 'lucide-react';
import { searchAll } from '@/lib/search';
import { SearchResult } from '@/lib/types';

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsDark(document.documentElement.dataset.mode === 'dark');
  }, []);

  const toggleTheme = () => {
    const next = isDark ? 'light' : 'dark';
    document.documentElement.dataset.mode = next;
    try {
      localStorage.setItem('mode', next);
    } catch {}
    setIsDark(!isDark);
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

  const navLinks = [
    { href: '/learn', label: 'Learn' },
    { href: '/tools', label: 'Tools' },
    { href: '/projects', label: 'Projects' },
    { href: '/compare/rag-vs-fine-tuning', label: 'Compare' },
    { href: '/glossary', label: 'Glossary' },
  ];

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 'var(--z-sticky-nav)' as never,
          borderBottom: 'var(--rule-hair) solid var(--color-rule)',
          background: 'color-mix(in oklab, var(--color-paper) 95%, transparent)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--container)',
            marginInline: 'auto',
            paddingInline: 'var(--gutter)',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-md)',
          }}
        >
          {/* Wordmark left */}
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-xs)',
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            <BookOpen
              size={20}
              style={{ color: 'var(--color-accent)', flexShrink: 0 }}
            />
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'var(--text-md)',
                color: 'var(--color-ink)',
                letterSpacing: 'var(--tracking-display)',
                whiteSpace: 'nowrap',
              }}
            >
              RAG Learning Hub
            </span>
          </Link>

          {/* Nav links centre */}
          <nav
            aria-label="Main navigation"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3xs)',
            }}
            className="hidden lg:flex"
          >
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: '0.4rem 0.75rem',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-ink-2)',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  transition: 'color var(--dur-short) var(--ease-out), background-color var(--dur-short) var(--ease-out)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = 'var(--color-ink)';
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-paper-2)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = 'var(--color-ink-2)';
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: search + CTA + mobile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-xs)',
                padding: '0.375rem 0.75rem',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-muted)',
                background: 'var(--color-paper-2)',
                border: 'var(--rule-hair) solid var(--color-rule)',
                borderRadius: 'var(--radius-input)',
                cursor: 'pointer',
                transition: 'border-color var(--dur-short) var(--ease-out)',
              }}
              aria-label="Search"
            >
              <Search size={14} />
              <span className="hidden sm:inline">Search</span>
              <kbd
                style={{
                  display: 'inline-block',
                  fontSize: 'var(--text-xs)',
                  padding: '0.1rem 0.4rem',
                  background: 'var(--color-paper-3)',
                  borderRadius: '3px',
                  border: 'var(--rule-hair) solid var(--color-rule-2)',
                }}
                className="hidden md:inline"
              >
                ⌘K
              </kbd>
            </button>

            {/* CTA keycap */}
            <Link
              href="/learn/rag-fundamentals"
              className="key key--primary hidden sm:inline-flex"
            >
              Start Learning
            </Link>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.4rem',
                color: 'var(--color-muted)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '6px',
                transition: 'color var(--dur-short) var(--ease-out)',
              }}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* GitHub */}
            <a
              href="https://github.com/sravanakkaladevi/rag-visualization-"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                padding: '0.4rem',
                color: 'var(--color-muted)',
                borderRadius: '6px',
                transition: 'color var(--dur-short) var(--ease-out)',
              }}
              aria-label="GitHub Repository"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden"
              style={{
                display: 'flex',
                padding: '0.4rem',
                color: 'var(--color-muted)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '6px',
              }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      {searchOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 'var(--z-modal)' as never,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '20vh',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'oklch(21% 0.028 262 / 0.4)',
            }}
            onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
          />
          <div
            ref={searchRef}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '560px',
              marginInline: 'var(--space-md)',
              background: 'var(--color-paper)',
              border: 'var(--rule-hair) solid var(--color-rule)',
              borderRadius: 'var(--radius-card)',
              overflow: 'hidden',
            }}
            className="animate-fade-in"
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-sm)',
                padding: '0.75rem 1rem',
                borderBottom: 'var(--rule-hair) solid var(--color-rule)',
              }}
            >
              <Search size={18} style={{ color: 'var(--color-muted)', flexShrink: 0 }} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search lessons, tools, glossary..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  background: 'transparent',
                  color: 'var(--color-ink)',
                  outline: 'none',
                  border: 'none',
                  fontSize: 'var(--text-sm)',
                  fontFamily: 'var(--font-body)',
                }}
              />
              <kbd
                style={{
                  fontSize: 'var(--text-xs)',
                  padding: '0.1rem 0.4rem',
                  color: 'var(--color-muted)',
                  background: 'var(--color-paper-2)',
                  borderRadius: '3px',
                  border: 'var(--rule-hair) solid var(--color-rule)',
                }}
              >
                ESC
              </kbd>
            </div>
            {searchResults.length > 0 && (
              <div style={{ maxHeight: '320px', overflowY: 'auto', padding: '0.5rem 0' }}>
                {searchResults.map((result, i) => (
                  <Link
                    key={i}
                    href={result.href}
                    onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                    style={{
                      display: 'block',
                      padding: '0.75rem 1rem',
                      textDecoration: 'none',
                      transition: 'background-color var(--dur-short) var(--ease-out)',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-paper-2)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent)', fontWeight: 500 }}>{result.category}</span>
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted)' }}>·</span>
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted)' }}>{result.type}</span>
                    </div>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink)', fontWeight: 500, margin: 0 }}>{result.title}</p>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted)', margin: 0 }}>{result.description}</p>
                  </Link>
                ))}
              </div>
            )}
            {searchQuery.length >= 2 && searchResults.length === 0 && (
              <div style={{ padding: '2rem 1rem', textAlign: 'center', fontSize: 'var(--text-sm)', color: 'var(--color-muted)' }}>
                No results found for &quot;{searchQuery}&quot;
              </div>
            )}
            {searchQuery.length < 2 && (
              <div style={{ padding: '1.5rem 1rem', textAlign: 'center', fontSize: 'var(--text-sm)', color: 'var(--color-muted)' }}>
                Type at least 2 characters to search
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile menu drawer */}
      {mobileMenuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 'var(--z-dropdown)' as never }} className="lg:hidden">
          <div
            style={{ position: 'absolute', inset: 0, background: 'oklch(21% 0.028 262 / 0.3)' }}
            onClick={() => setMobileMenuOpen(false)}
          />
          <nav
            style={{
              position: 'absolute',
              top: '64px',
              left: 0,
              right: 0,
              background: 'var(--color-paper)',
              borderBottom: 'var(--rule-hair) solid var(--color-rule)',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
            }}
            className="animate-slide-up"
          >
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
                style={{
                  display: 'block',
                  padding: '0.5rem 0.75rem',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-ink-2)',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  transition: 'background-color var(--dur-short) var(--ease-out), color var(--dur-short) var(--ease-out)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = 'var(--color-ink)';
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-paper-2)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = 'var(--color-ink-2)';
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                }}
              >
                {item.label}
              </Link>
            ))}
            <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: 'var(--rule-hair) solid var(--color-rule)' }}>
              <Link href="/learn/rag-fundamentals" className="key key--primary" style={{ width: '100%', justifyContent: 'center' }}>
                Start Learning
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
