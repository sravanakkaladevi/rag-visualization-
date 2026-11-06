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
    difficulty: 'Beginner',
    desc: 'What RAG is, why it matters, and how it works step by step. Start here.',
    minutes: 25,
  },
  {
    slug: 'basic-rag',
    title: 'Basic / Naive RAG',
    icon: FileText,
    difficulty: 'Beginner',
    desc: 'The simplest RAG pipeline: load documents, chunk, embed, retrieve, and generate answers.',
    minutes: 30,
  },
  {
    slug: 'conversational-rag',
    title: 'Conversational RAG',
    icon: MessageSquare,
    difficulty: 'Intermediate',
    desc: 'Add chat history and follow-up question resolution to RAG systems.',
    minutes: 25,
  },
  {
    slug: 'hybrid-rag',
    title: 'Hybrid RAG',
    icon: GitMerge,
    difficulty: 'Intermediate',
    desc: 'Combine keyword search (BM25) with dense vector search for more accurate retrieval.',
    minutes: 30,
  },
  {
    slug: 'agentic-rag',
    title: 'Agentic RAG',
    icon: Bot,
    difficulty: 'Advanced',
    desc: 'Build AI agents that decide when and how to retrieve, using tools and conditional workflows.',
    minutes: 35,
  },
  {
    slug: 'corrective-rag',
    title: 'Corrective RAG (CRAG)',
    icon: ShieldCheck,
    difficulty: 'Advanced',
    desc: 'Evaluate retrieval quality and take corrective actions when results are insufficient.',
    minutes: 30,
  },
  {
    slug: 'self-rag',
    title: 'Self-RAG',
    icon: Brain,
    difficulty: 'Advanced',
    desc: 'Self-reflective retrieval and generation with answer quality evaluation.',
    minutes: 35,
  },
  {
    slug: 'graphrag',
    title: 'GraphRAG',
    icon: Network,
    difficulty: 'Advanced',
    desc: 'Use knowledge graphs to capture entity relationships for relationship-aware retrieval.',
    minutes: 35,
  },
  {
    slug: 'multimodal-rag',
    title: 'Multimodal RAG',
    icon: Image,
    difficulty: 'Advanced',
    desc: 'Handle text, images, tables, and charts from mixed-media documents.',
    minutes: 30,
  },
];

const learningPath = ['RAG Fundamentals', 'Basic RAG', 'Conversational', 'Hybrid', 'Agentic', 'CRAG', 'Self-RAG', 'GraphRAG', 'Multimodal'];

export default function LearnPage() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0, minHeight: '100vh' }}>
        {/* Banner hero */}
        <div
          style={{
            borderBottom: 'var(--rule-hair) solid var(--color-rule)',
            padding: 'var(--space-3xl) var(--space-xl) var(--space-2xl)',
            background: 'var(--color-paper)',
          }}
        >
          <div style={{ maxWidth: '640px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
              <BookOpen size={22} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-display-s)',
                  fontWeight: 700,
                  letterSpacing: 'var(--tracking-display)',
                  color: 'var(--color-ink)',
                  margin: 0,
                }}
              >
                Learn RAG
              </h1>
            </div>
            <p
              style={{
                fontSize: 'var(--text-lead)',
                color: 'var(--color-ink-2)',
                margin: 0,
              }}
            >
              Start from the beginning: a structured path from RAG fundamentals to advanced architectures.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: '900px', padding: 'var(--space-xl)' }}>

          {/* Suggested path */}
          <div
            style={{
              marginBottom: 'var(--space-xl)',
              padding: 'var(--space-lg)',
              background: 'var(--color-accent-wash)',
              border: 'var(--rule-hair) solid color-mix(in oklab, var(--color-accent) 20%, transparent)',
              borderRadius: 'var(--radius-card)',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-md)',
                fontWeight: 600,
                color: 'var(--color-ink)',
                marginBottom: 'var(--space-sm)',
              }}
            >
              Suggested Learning Path
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-xs)', alignItems: 'center' }}>
              {learningPath.map((step, i) => (
                <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', fontSize: 'var(--text-sm)' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: 'var(--color-accent)',
                      color: 'var(--color-accent-ink)',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '10px',
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ color: 'var(--color-ink-2)' }}>{step}</span>
                  {i < learningPath.length - 1 && (
                    <span style={{ color: 'var(--color-muted)', marginInline: '2px' }}>→</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Lesson cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            {lessons.map((lesson) => {
              const Icon = lesson.icon;
              const badgeClass = lesson.difficulty === 'Beginner' ? 'badge-beginner' :
                lesson.difficulty === 'Intermediate' ? 'badge-intermediate' : 'badge-advanced';
              return (
                <Link
                  key={lesson.slug}
                  href={`/learn/${lesson.slug}`}
                  className="card"
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 'var(--space-md)',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      width: '48px',
                      height: '48px',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'var(--color-accent-wash)',
                    }}
                  >
                    <Icon size={22} style={{ color: 'var(--color-accent)' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 600,
                          fontSize: 'var(--text-md)',
                          color: 'var(--color-ink)',
                          margin: 0,
                        }}
                      >
                        {lesson.title}
                      </h3>
                      <span className={`badge ${badgeClass}`}>{lesson.difficulty}</span>
                    </div>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-muted)', margin: 0 }}>{lesson.desc}</p>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted)', marginTop: '0.25rem', display: 'block' }}>
                      ~{lesson.minutes} min read
                    </span>
                  </div>
                  <ArrowRight size={18} style={{ color: 'var(--color-muted)', flexShrink: 0, marginTop: '4px' }} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
