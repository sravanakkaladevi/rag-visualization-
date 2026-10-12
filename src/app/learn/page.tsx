import Link from 'next/link';
import type { Metadata } from 'next';
import {
  BookOpen, FileText, MessageSquare, GitMerge, Bot, ShieldCheck, Brain,
  Network, Image, ArrowRight, Lightbulb,
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';

export const metadata: Metadata = {
  title: 'Learn RAG — RAG Learning Hub',
  description: 'Explore lessons on Retrieval-Augmented Generation from fundamentals to advanced architectures.',
};

const lessons = [
  {
    slug: 'rag-fundamentals',
    title: 'RAG Fundamentals',
    icon: Lightbulb,
    color: '#fbbf24',
    difficulty: 'Beginner',
    desc: 'What RAG is, why it matters, and how it works step by step. Start here.',
    minutes: 25,
  },
  {
    slug: 'basic-rag',
    title: 'Basic / Naive RAG',
    icon: FileText,
    color: '#3b82f6',
    difficulty: 'Beginner',
    desc: 'The simplest RAG pipeline: load documents, chunk, embed, retrieve, and generate answers.',
    minutes: 30,
  },
  {
    slug: 'conversational-rag',
    title: 'Conversational RAG',
    icon: MessageSquare,
    color: '#22c55e',
    difficulty: 'Intermediate',
    desc: 'Add chat history and follow-up question resolution to RAG systems.',
    minutes: 25,
  },
  {
    slug: 'hybrid-rag',
    title: 'Hybrid RAG',
    icon: GitMerge,
    color: '#f59e0b',
    difficulty: 'Intermediate',
    desc: 'Combine keyword search (BM25) with dense vector search for more accurate retrieval.',
    minutes: 30,
  },
  {
    slug: 'agentic-rag',
    title: 'Agentic RAG',
    icon: Bot,
    color: '#a855f7',
    difficulty: 'Advanced',
    desc: 'Build AI agents that decide when and how to retrieve, using tools and conditional workflows.',
    minutes: 35,
  },
  {
    slug: 'corrective-rag',
    title: 'Corrective RAG (CRAG)',
    icon: ShieldCheck,
    color: '#06b6d4',
    difficulty: 'Advanced',
    desc: 'Evaluate retrieval quality and take corrective actions when results are insufficient.',
    minutes: 30,
  },
  {
    slug: 'self-rag',
    title: 'Self-RAG',
    icon: Brain,
    color: '#ec4899',
    difficulty: 'Advanced',
    desc: 'Self-reflective retrieval and generation with answer quality evaluation.',
    minutes: 35,
  },
  {
    slug: 'graphrag',
    title: 'GraphRAG',
    icon: Network,
    color: '#8b5cf6',
    difficulty: 'Advanced',
    desc: 'Use knowledge graphs to capture entity relationships for relationship-aware retrieval.',
    minutes: 35,
  },
  {
    slug: 'multimodal-rag',
    title: 'Multimodal RAG',
    icon: Image,
    color: '#ef4444',
    difficulty: 'Advanced',
    desc: 'Handle text, images, tables, and charts from mixed-media documents.',
    minutes: 30,
  },
];

export default function LearnPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-w-0 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen size={24} className="text-[var(--color-accent-purple)]" />
              <h1 className="text-3xl font-bold">Learn RAG</h1>
            </div>
            <p className="text-[var(--color-text-secondary)] text-lg">
              A structured learning path from RAG fundamentals to advanced architectures.
              Start with the basics and progressively build your understanding.
            </p>
          </div>

          {/* Learning Roadmap */}
          <div className="mb-10 p-6 rounded-xl bg-gradient-to-br from-[var(--color-bg-card)] to-[var(--color-accent-purple-dim)]/10 border border-[var(--color-border-primary)]">
            <h2 className="text-lg font-bold mb-3">📍 Suggested Learning Path</h2>
            <div className="flex flex-wrap gap-2">
              {['RAG Fundamentals', 'Basic RAG', 'Conversational', 'Hybrid', 'Agentic', 'CRAG', 'Self-RAG', 'GraphRAG', 'Multimodal'].map((step, i) => (
                <span key={i} className="flex items-center gap-1.5 text-xs">
                  <span className="w-5 h-5 rounded-full bg-[var(--color-accent-purple)]/20 text-[var(--color-accent-purple)] flex items-center justify-center font-bold text-[10px]">
                    {i + 1}
                  </span>
                  <span className="text-[var(--color-text-secondary)]">{step}</span>
                  {i < 8 && <span className="text-[var(--color-text-muted)] mx-1">→</span>}
                </span>
              ))}
            </div>
          </div>

          {/* Lesson Cards */}
          <div className="space-y-3">
            {lessons.map((lesson) => {
              const Icon = lesson.icon;
              const badgeClass = lesson.difficulty === 'Beginner' ? 'badge-beginner' :
                lesson.difficulty === 'Intermediate' ? 'badge-intermediate' : 'badge-advanced';
              return (
                <Link
                  key={lesson.slug}
                  href={`/learn/${lesson.slug}`}
                  className="card group flex items-start gap-4"
                >
                  <div
                    className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: `color-mix(in srgb, ${lesson.color} 15%, transparent)` }}
                  >
                    <Icon size={22} style={{ color: lesson.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold group-hover:text-[var(--color-accent-purple)] transition-colors">
                        {lesson.title}
                      </h3>
                      <span className={`badge ${badgeClass}`}>{lesson.difficulty}</span>
                    </div>
                    <p className="text-sm text-[var(--color-text-muted)]">{lesson.desc}</p>
                    <span className="text-xs text-[var(--color-text-muted)] mt-1 block">~{lesson.minutes} min read</span>
                  </div>
                  <ArrowRight size={18} className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent-purple)] shrink-0 mt-2 transition-colors" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
