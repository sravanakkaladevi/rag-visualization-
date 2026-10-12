'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  BookA, Search, Filter, Tag, ArrowRight, ChevronRight, Hash
} from 'lucide-react';
import { glossary } from '@/lib/glossary-data';
import Sidebar from '@/components/Sidebar';

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    const cats = new Set(glossary.map(g => g.category));
    return ['All', ...Array.from(cats)];
  }, []);

  const filteredEntries = useMemo(() => {
    return glossary
      .filter(entry => {
        const matchesCategory =
          selectedCategory === 'All' || entry.category === selectedCategory;

        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          entry.term.toLowerCase().includes(q) ||
          entry.definition.toLowerCase().includes(q) ||
          entry.relatedTerms?.some(t => t.toLowerCase().includes(q));

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => a.term.localeCompare(b.term));
  }, [searchQuery, selectedCategory]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 min-w-0 px-4 sm:px-8 py-8 max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] mb-6">
          <Link href="/" className="hover:text-[var(--color-text-primary)] transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <span className="text-[var(--color-accent-purple)] font-medium">
            Glossary
          </span>
        </nav>

        {/* Header */}
        <header className="mb-10 pb-8 border-b border-[var(--color-border-primary)]">
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-accent-purple)] uppercase tracking-wider mb-2">
            <BookA size={14} />
            Terminology & Definitions
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text-primary)] tracking-tight mb-4">
            RAG Glossary
          </h1>
          <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-3xl">
            Clear, authoritative definitions for essential Retrieval-Augmented Generation terminology, from vector embeddings to grounding and cross-encoders.
          </p>

          {/* Search & Categories */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search glossary terms..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[var(--color-border-primary)] bg-[var(--color-bg-card)] text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-purple)]"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[var(--color-accent-purple)] text-white'
                      : 'bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border border-[var(--color-border-primary)] hover:text-[var(--color-text-primary)]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between text-xs text-[var(--color-text-muted)]">
          <span>
            Showing <strong className="text-[var(--color-text-primary)]">{filteredEntries.length}</strong> terms
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[var(--color-accent-purple)] hover:underline"
            >
              Clear search
            </button>
          )}
        </div>

        {/* Glossary Entries */}
        {filteredEntries.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl border border-[var(--color-border-primary)] bg-[var(--color-bg-card)]">
            <BookA size={36} className="mx-auto text-[var(--color-text-muted)] mb-3" />
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-1">
              No matching terms found
            </h3>
            <p className="text-sm text-[var(--color-text-muted)]">
              Try searching for "embeddings", "chunking", or "reranking".
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEntries.map(entry => (
              <div
                key={entry.slug}
                id={entry.slug}
                className="p-6 rounded-xl border border-[var(--color-border-primary)] bg-[var(--color-bg-card)] scroll-mt-20 hover:border-[var(--color-border-focus)] transition-colors group"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <h2 className="text-xl font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-yellow)] transition-colors flex items-center gap-2">
                    {entry.term}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[var(--color-bg-primary)] text-[var(--color-accent-purple)] border border-[var(--color-border-primary)]">
                    {entry.category}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed mb-4">
                  {entry.definition}
                </p>

                {entry.relatedTerms && entry.relatedTerms.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-[var(--color-border-primary)]/40 text-xs">
                    <span className="text-[var(--color-text-muted)] mr-1 flex items-center gap-1">
                      <Tag size={12} /> Related:
                    </span>
                    {entry.relatedTerms.map(rt => (
                      <button
                        key={rt}
                        onClick={() => setSearchQuery(rt)}
                        className="px-2 py-0.5 rounded text-[11px] bg-[var(--color-bg-primary)] text-[var(--color-accent-cyan)] border border-[var(--color-border-primary)] hover:border-[var(--color-accent-cyan)] transition-colors"
                      >
                        {rt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
