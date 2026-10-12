'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search, ExternalLink, Wrench, Filter, Code2, ChevronDown, ChevronUp, Sparkles
} from 'lucide-react';
import { tools } from '@/lib/tools-data';
import Sidebar from '@/components/Sidebar';
import CodeBlock from '@/components/CodeBlock';

const categories = [
  { id: 'all', label: 'All Tools' },
  { id: 'framework', label: 'Frameworks' },
  { id: 'vector-db', label: 'Vector Databases' },
  { id: 'orchestration', label: 'Orchestration & UI' },
  { id: 'model-runner', label: 'Model Runners' },
  { id: 'embeddings', label: 'Embeddings' },
];

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedTool, setExpandedTool] = useState<string | null>(null);

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesCategory =
        selectedCategory === 'all' || tool.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.ragComponent.toLowerCase().includes(q) ||
        tool.tags.some(t => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 min-w-0 px-4 sm:px-8 py-8 max-w-6xl mx-auto">
        {/* Header banner */}
        <header className="mb-10 pb-8 border-b border-[var(--color-border-primary)]">
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-accent-purple)] uppercase tracking-wider mb-2">
            <Wrench size={14} />
            Ecosystem Directory
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text-primary)] tracking-tight mb-4">
            RAG Tools & Frameworks
          </h1>
          <p className="text-base sm:text-lg text-[var(--color-text-secondary)] max-w-3xl leading-relaxed">
            Explore industry-standard frameworks, vector databases, local model runners, and orchestration tools. Filter by role in the RAG pipeline and view real code examples.
          </p>

          {/* Search & Filter Controls */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search tools by name, tag, or role..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[var(--color-border-primary)] bg-[var(--color-bg-card)] text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-purple)]"
              />
            </div>

            {/* Category tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-[var(--color-accent-purple)] text-white shadow-sm'
                      : 'bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border border-[var(--color-border-primary)] hover:text-[var(--color-text-primary)]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Tools Count */}
        <div className="mb-6 flex items-center justify-between text-xs text-[var(--color-text-muted)]">
          <span>
            Showing <strong className="text-[var(--color-text-primary)]">{filteredTools.length}</strong> {filteredTools.length === 1 ? 'tool' : 'tools'}
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

        {/* Tools Grid */}
        {filteredTools.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl border border-[var(--color-border-primary)] bg-[var(--color-bg-card)]">
            <Filter size={36} className="mx-auto text-[var(--color-text-muted)] mb-3" />
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-1">
              No matching tools found
            </h3>
            <p className="text-sm text-[var(--color-text-muted)]">
              Try adjusting your search query or selecting a different category.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredTools.map(tool => {
              const isExpanded = expandedTool === tool.slug;

              return (
                <div
                  key={tool.slug}
                  className="rounded-xl border border-[var(--color-border-primary)] bg-[var(--color-bg-card)] p-6 flex flex-col justify-between hover:border-[var(--color-border-focus)] transition-all group"
                >
                  <div>
                    {/* Header: Icon, Name & Doc link */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl p-2 rounded-lg bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)]">
                          {tool.icon || '🛠️'}
                        </span>
                        <div>
                          <h3 className="text-lg font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-yellow)] transition-colors">
                            {tool.name}
                          </h3>
                          <span className="text-xs text-[var(--color-accent-purple)] font-medium">
                            {tool.ragComponent}
                          </span>
                        </div>
                      </div>

                      <a
                        href={tool.docsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] p-1.5 rounded-lg hover:bg-[var(--color-bg-primary)] transition-colors"
                        title={`Open official ${tool.name} documentation`}
                      >
                        <ExternalLink size={16} />
                      </a>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">
                      {tool.description}
                    </p>

                    {/* When to use callout */}
                    <div className="p-3 rounded-lg bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] text-xs text-[var(--color-text-secondary)] mb-4">
                      <strong className="text-[var(--color-text-primary)] block mb-1">
                        When to use:
                      </strong>
                      {tool.whenToUse}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {tool.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-[var(--color-bg-primary)] text-[var(--color-text-muted)] border border-[var(--color-border-primary)]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Code toggle */}
                  <div>
                    <button
                      onClick={() => setExpandedTool(isExpanded ? null : tool.slug)}
                      className="w-full flex items-center justify-between text-xs font-semibold text-[var(--color-accent-purple)] py-2 px-3 rounded-lg hover:bg-[var(--color-accent-purple)]/10 transition-colors"
                    >
                      <span className="flex items-center gap-1.5">
                        <Code2 size={14} />
                        {isExpanded ? 'Hide Code Example' : 'View Code Example'}
                      </span>
                      {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>

                    {isExpanded && (
                      <div className="mt-3">
                        <CodeBlock
                          code={tool.example}
                          language="python"
                          filename={`${tool.slug}_example.py`}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
