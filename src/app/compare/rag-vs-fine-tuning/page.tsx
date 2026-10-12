'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Scale, Check, X, Sparkles, HelpCircle, ArrowRight, Lightbulb, CheckCircle2, ChevronRight
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';

interface ComparisonRow {
  dimension: string;
  rag: string;
  fineTuning: string;
  verdict: 'rag' | 'finetuning' | 'both';
  notes: string;
}

const comparisonData: ComparisonRow[] = [
  {
    dimension: 'Primary Purpose',
    rag: 'Inject external, factual knowledge dynamically at query time.',
    fineTuning: 'Adapt style, format, domain vocabulary, or specialize model behavior.',
    verdict: 'both',
    notes: 'RAG gives the model an open book to read; Fine-tuning teaches the model how to write or think in a specific style.',
  },
  {
    dimension: 'Data Freshness & Updates',
    rag: 'Instant. Update documents in the vector database with zero retraining downtime.',
    fineTuning: 'Static. Requires collecting datasets and executing full retraining cycles.',
    verdict: 'rag',
    notes: 'RAG is vastly superior for rapidly changing corporate documentation, news, or inventory.',
  },
  {
    dimension: 'Training Requirements',
    rag: 'Zero model weights retraining. Requires document chunking and vector indexing.',
    fineTuning: 'Requires curated pairs of prompts and completions, validation splits, and epochs.',
    verdict: 'rag',
    notes: 'RAG requires lower ML engineering barrier to entry.',
  },
  {
    dimension: 'Citations & Traceability',
    rag: 'Direct source attribution. Returns exact chunk IDs, page numbers, and URLs.',
    fineTuning: 'Black box. Cannot reliably cite which training row influenced a token.',
    verdict: 'rag',
    notes: 'Critical for compliance, legal, medical, and auditing requirements.',
  },
  {
    dimension: 'Output Style & Formatting',
    rag: 'Controlled via prompt engineering and few-shot examples in system prompt.',
    fineTuning: 'High fidelity. Consistently adheres to strict JSON schemas, tone, or dialect.',
    verdict: 'finetuning',
    notes: 'Fine-tuning is exceptional at teaching complex domain formatting without wasting token budget.',
  },
  {
    dimension: 'Hallucination Mitigation',
    rag: 'Greatly reduced when prompt instructs LLM to ground answers strictly on context.',
    fineTuning: 'Can still hallucinate facts convincingly if knowledge wasn’t internalized.',
    verdict: 'rag',
    notes: 'Fine-tuning alone does not reliably prevent hallucination on factual questions.',
  },
  {
    dimension: 'Infrastructure & Latency',
    rag: 'Requires vector database, embedding pipeline, and adds retrieval latency overhead.',
    fineTuning: 'Requires GPU compute for training; inference latency remains identical to base LLM.',
    verdict: 'both',
    notes: 'RAG adds 50-300ms retrieval overhead; fine-tuned models run at normal generation speed.',
  },
  {
    dimension: 'Cost Considerations',
    rag: 'Low upfront development cost; operational cost includes vector DB queries + prompt tokens.',
    fineTuning: 'Higher upfront training compute cost; lower inference token costs if prompts are shorter.',
    verdict: 'both',
    notes: 'Long context prompts in RAG consume more input tokens per query than a fine-tuned model.',
  },
];

export default function ComparePage() {
  const [filter, setFilter] = useState<'all' | 'rag' | 'finetuning'>('all');

  // Interactive decision helper state
  const [qNeedCitations, setQNeedCitations] = useState<boolean | null>(null);
  const [qRapidUpdates, setQRapidUpdates] = useState<boolean | null>(null);
  const [qStrictStyle, setQStrictStyle] = useState<boolean | null>(null);

  const getRecommendation = () => {
    if (qNeedCitations === null && qRapidUpdates === null && qStrictStyle === null) {
      return null;
    }
    if (qNeedCitations === true || qRapidUpdates === true) {
      if (qStrictStyle === true) {
        return {
          title: 'Hybrid: RAG + Fine-Tuning',
          desc: 'Your application needs dynamic knowledge updates and verifiable citations, but also requires rigid adherence to custom syntax/style. Fine-tune a smaller model on formatting, and supply knowledge via RAG.',
          badge: 'Hybrid Architecture',
        };
      }
      return {
        title: 'Retrieval-Augmented Generation (RAG)',
        desc: 'RAG is the clear choice! It enables instant data updates without costly retraining and guarantees exact document source citations.',
        badge: 'Recommended: RAG',
      };
    }
    if (qStrictStyle === true) {
      return {
        title: 'Model Fine-Tuning',
        desc: 'Since your knowledge base rarely changes and your primary goal is consistent formatting, voice tone, or specialized task completion, fine-tuning will yield lower inference token costs and higher style fidelity.',
        badge: 'Recommended: Fine-Tuning',
      };
    }
    return {
      title: 'Prompt Engineering with Base Model',
      desc: 'If knowledge is already within the base model and requirements are moderate, begin with prompt engineering before committing to either pipeline.',
      badge: 'Start with Few-Shot Prompting',
    };
  };

  const recommendation = getRecommendation();

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
            RAG vs Fine-Tuning
          </span>
        </nav>

        {/* Page Header */}
        <header className="mb-10 pb-8 border-b border-[var(--color-border-primary)]">
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-accent-purple)] uppercase tracking-wider mb-2">
            <Scale size={14} />
            Architectural Trade-offs
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text-primary)] tracking-tight mb-4">
            RAG vs. Fine-Tuning
          </h1>
          <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-3xl">
            Neither technique is universally superior. Understanding when to retrieve external knowledge versus when to modify model weights is crucial for building cost-effective AI systems.
          </p>
        </header>

        {/* High-Level Analogy */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 rounded-xl border border-[var(--color-accent-blue)]/30 bg-blue-950/10">
            <h2 className="text-lg font-bold text-[var(--color-accent-blue)] mb-2">
              📖 RAG: Open-Book Exam
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              The student brings books, manuals, and up-to-date company wikis into the exam. When a question is asked, they look up the exact section, cite the paragraph, and formulate the answer.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-[var(--color-accent-purple)]/30 bg-purple-950/10">
            <h2 className="text-lg font-bold text-[var(--color-accent-purple)] mb-2">
              🧠 Fine-Tuning: Specialized Training
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              The student attends intensive medical residency or legal training. They internalize clinical shorthand, behavioral guidelines, and specialized jargon deep into their muscle memory.
            </p>
          </div>
        </div>

        {/* Interactive Comparison Table */}
        <section className="mb-12 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
              Comprehensive Dimension Comparison
            </h2>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 bg-[var(--color-bg-card)] p-1 rounded-lg border border-[var(--color-border-primary)] text-xs">
              <button
                onClick={() => setFilter('all')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  filter === 'all'
                    ? 'bg-[var(--color-accent-purple)] text-white font-medium'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('rag')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  filter === 'rag'
                    ? 'bg-[var(--color-accent-blue)] text-white font-medium'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                RAG Favored
              </button>
              <button
                onClick={() => setFilter('finetuning')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  filter === 'finetuning'
                    ? 'bg-[var(--color-accent-purple)] text-white font-medium'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                Fine-Tuning Favored
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[var(--color-border-primary)] bg-[var(--color-bg-card)]">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border-primary)] bg-[var(--color-bg-primary)]">
                  <th className="py-3.5 px-4 font-bold text-[var(--color-text-primary)] w-1/4">
                    Dimension
                  </th>
                  <th className="py-3.5 px-4 font-bold text-[var(--color-accent-blue)] w-3/8">
                    Retrieval-Augmented Generation (RAG)
                  </th>
                  <th className="py-3.5 px-4 font-bold text-[var(--color-accent-purple)] w-3/8">
                    Fine-Tuning (FT)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border-primary)] text-[var(--color-text-secondary)]">
                {comparisonData
                  .filter(
                    row =>
                      filter === 'all' ||
                      row.verdict === filter ||
                      row.verdict === 'both'
                  )
                  .map(row => (
                    <tr key={row.dimension} className="hover:bg-[var(--color-bg-primary)]/40 transition-colors">
                      <td className="py-4 px-4 font-semibold text-[var(--color-text-primary)] align-top">
                        {row.dimension}
                      </td>
                      <td className="py-4 px-4 align-top leading-relaxed">
                        {row.rag}
                      </td>
                      <td className="py-4 px-4 align-top leading-relaxed">
                        {row.fineTuning}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Interactive Decision Helper */}
        <section className="mb-12 p-6 sm:p-8 rounded-2xl border border-[var(--color-border-primary)] bg-[var(--color-bg-card)] space-y-6">
          <div className="flex items-center gap-2">
            <Sparkles className="text-[var(--color-accent-yellow)]" size={20} />
            <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
              Interactive Architectural Decision Helper
            </h2>
          </div>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Answer 3 quick questions about your project requirements to find the ideal pattern:
          </p>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-sm font-medium text-[var(--color-text-primary)]">
                1. Does your application require verifiable citations & source page attribution?
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQNeedCitations(true)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    qNeedCitations === true
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] text-[var(--color-text-secondary)]'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => setQNeedCitations(false)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    qNeedCitations === false
                      ? 'bg-rose-600 text-white'
                      : 'bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] text-[var(--color-text-secondary)]'
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-sm font-medium text-[var(--color-text-primary)]">
                2. Does your knowledge base update frequently (daily, weekly, or monthly)?
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQRapidUpdates(true)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    qRapidUpdates === true
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] text-[var(--color-text-secondary)]'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => setQRapidUpdates(false)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    qRapidUpdates === false
                      ? 'bg-rose-600 text-white'
                      : 'bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] text-[var(--color-text-secondary)]'
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-sm font-medium text-[var(--color-text-primary)]">
                3. Do you need strict formatting or behavioral compliance (e.g. specialized JSON / dialect)?
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQStrictStyle(true)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    qStrictStyle === true
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] text-[var(--color-text-secondary)]'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => setQStrictStyle(false)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    qStrictStyle === false
                      ? 'bg-rose-600 text-white'
                      : 'bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] text-[var(--color-text-secondary)]'
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          </div>

          {recommendation && (
            <div className="p-5 rounded-xl border border-[var(--color-accent-purple)]/40 bg-purple-950/20 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent-yellow)]">
                {recommendation.badge}
              </span>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                {recommendation.title}
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {recommendation.desc}
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
