import Link from 'next/link';
import {
  BookOpen, FileText, MessageSquare, GitMerge, Bot, ShieldCheck, Brain,
  Network, Image, Wrench, FolderGit2, ArrowRight, Zap, Shield, Globe,
  ChevronDown,
} from 'lucide-react';
import RAGPipeline from '@/components/RAGPipeline';
import AnimatedArchitectureVisualizer from '@/components/AnimatedArchitectureVisualizer';

const approaches = [
  { slug: 'basic-rag', title: 'Basic / Naive RAG', icon: FileText, color: '#3b82f6', desc: 'The foundational pattern: load, chunk, embed, retrieve, and generate.' },
  { slug: 'conversational-rag', title: 'Conversational RAG', icon: MessageSquare, color: '#22c55e', desc: 'Multi-turn conversations with chat history and follow-up resolution.' },
  { slug: 'hybrid-rag', title: 'Hybrid RAG', icon: GitMerge, color: '#f59e0b', desc: 'Combine keyword (BM25) and dense vector search for better retrieval.' },
  { slug: 'agentic-rag', title: 'Agentic RAG', icon: Bot, color: '#a855f7', desc: 'AI agents that decide when and how to retrieve, using tools and workflows.' },
  { slug: 'corrective-rag', title: 'Corrective RAG', icon: ShieldCheck, color: '#06b6d4', desc: 'Evaluate retrieval quality and take corrective actions when needed.' },
  { slug: 'self-rag', title: 'Self-RAG', icon: Brain, color: '#ec4899', desc: 'Self-reflective generation with retrieval and answer quality evaluation.' },
  { slug: 'graphrag', title: 'GraphRAG', icon: Network, color: '#8b5cf6', desc: 'Knowledge graphs for relationship-aware, structured retrieval.' },
  { slug: 'multimodal-rag', title: 'Multimodal RAG', icon: Image, color: '#ef4444', desc: 'Handle text, images, tables, and charts from mixed-media documents.' },
];

const features = [
  { icon: BookOpen, title: 'In-Depth Lessons', desc: 'Detailed explanations with diagrams, code examples, and real-world scenarios.' },
  { icon: Zap, title: 'Interactive Pipeline', desc: 'Click through the RAG pipeline stages to understand each component.' },
  { icon: Wrench, title: '15+ Tools Covered', desc: 'Reference pages for LangChain, ChromaDB, FAISS, Neo4j, Ollama, and more.' },
  { icon: FolderGit2, title: 'Practical Projects', desc: 'Step-by-step tutorials to build Chat with PDF, Agentic RAG, and more.' },
  { icon: Shield, title: 'Accurate Content', desc: 'Technically accurate explanations that distinguish architecture from hype.' },
  { icon: Globe, title: 'No Login Required', desc: 'All educational content is freely available without API keys or accounts.' },
];

const faqs = [
  {
    q: 'What is RAG?',
    a: 'Retrieval-Augmented Generation (RAG) is an architecture pattern that enhances LLM responses by retrieving relevant information from external knowledge sources before generating an answer. This helps reduce hallucination and provides up-to-date, grounded responses.',
  },
  {
    q: 'Do I need programming experience?',
    a: 'Basic Python knowledge is helpful for the code examples and projects. The conceptual explanations are written to be accessible to anyone with an interest in AI and machine learning.',
  },
  {
    q: 'Is RAG better than fine-tuning?',
    a: 'Neither is universally better. RAG excels at providing dynamic, up-to-date knowledge with source citations. Fine-tuning is better for adapting model behavior and style. Many production systems use both approaches together.',
  },
  {
    q: 'What tools do I need to get started?',
    a: 'To start learning, you only need this website. For hands-on projects, you\'ll need Python, a framework like LangChain or LlamaIndex, and a vector database like ChromaDB. All tools are covered in our Tools section.',
  },
  {
    q: 'How is this different from other RAG resources?',
    a: 'This hub covers eight distinct RAG approaches with clear distinctions between them, interactive diagrams, practical projects, and an honest classification that avoids conflating architectures with components.',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-accent-purple)]/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[var(--color-accent-purple)]/5 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-[var(--color-accent-blue)]/5 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent-purple)]/10 border border-[var(--color-accent-purple)]/20 text-[var(--color-accent-purple)] text-xs font-medium mb-6">
            <Zap size={12} />
            <span>Comprehensive RAG Learning Resource</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Understand RAG.{' '}
            <span className="gradient-text">Build Smarter AI.</span>
          </h1>

          <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-8 leading-relaxed">
            Learn how AI retrieves knowledge, searches documents, and generates grounded answers.
            From fundamentals to advanced architectures.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/learn/rag-fundamentals" className="btn-primary text-base px-8 py-3">
              Start Learning <ArrowRight size={18} />
            </Link>
            <a href="#architectures" className="btn-secondary text-base px-8 py-3">
              Explore RAG Architectures
            </a>
          </div>
        </div>
      </section>

      {/* RAG Pipeline Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">How RAG Works</h2>
          <p className="text-[var(--color-text-secondary)]">
            Click each stage to learn how documents become AI-powered answers.
          </p>
        </div>
        <RAGPipeline />
      </section>

      {/* Features Grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">What You&apos;ll Learn</h2>
          <p className="text-[var(--color-text-secondary)]">
            A complete learning roadmap from RAG basics to production architectures.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div key={i} className="card group">
              <f.icon size={24} className="text-[var(--color-accent-purple)] mb-3" />
              <h3 className="font-semibold mb-1.5">{f.title}</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Eight RAG Approaches & Animated Visualizer */}
      <section id="architectures" className="max-w-5xl mx-auto px-4 sm:px-6 py-16 scroll-mt-20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent-purple)]/10 border border-[var(--color-accent-purple)]/20 text-[var(--color-accent-purple)] text-xs font-semibold uppercase tracking-wider mb-3">
            <Zap size={12} />
            <span>Interactive Architecture Simulator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Eight Animated RAG Architectures</h2>
          <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Watch live simulated queries and payloads travel across all 8 architectural patterns. Toggle playback, adjust speed, and inspect intermediate token payloads.
          </p>
        </div>

        {/* The Animated Architecture Visualizer */}
        <div className="mb-12">
          <AnimatedArchitectureVisualizer initialType="basic-rag" allowSwitching={true} />
        </div>

        {/* Deep Dive Lesson Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {approaches.map((a) => {
            const Icon = a.icon;
            return (
              <Link
                key={a.slug}
                href={`/learn/${a.slug}`}
                className="card group flex gap-4"
              >
                <div
                  className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: `color-mix(in srgb, ${a.color} 15%, transparent)` }}
                >
                  <Icon size={20} style={{ color: a.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm mb-1 group-hover:text-[var(--color-accent-purple)] transition-colors">
                    {a.title}
                  </h3>
                  <p className="text-xs text-[var(--color-text-muted)]">{a.desc}</p>
                </div>
                <ArrowRight size={16} className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent-purple)] shrink-0 mt-1 transition-colors" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* Tools Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Tools & Frameworks</h2>
          <p className="text-[var(--color-text-secondary)]">
            Explore the ecosystem of tools that power RAG systems.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {['LangChain', 'LlamaIndex', 'ChromaDB', 'FAISS', 'Qdrant', 'Weaviate', 'Pinecone', 'Neo4j', 'Elasticsearch', 'Ollama'].map(tool => (
            <span key={tool} className="px-3 py-1.5 text-sm bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] rounded-lg text-[var(--color-text-secondary)]">
              {tool}
            </span>
          ))}
        </div>
        <div className="text-center">
          <Link href="/tools" className="btn-secondary">
            View All Tools <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Projects CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="card !p-8 bg-gradient-to-br from-[var(--color-bg-card)] to-[var(--color-accent-purple-dim)]/20 text-center">
          <FolderGit2 size={32} className="text-[var(--color-accent-purple)] mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-3">Build Real Projects</h2>
          <p className="text-[var(--color-text-secondary)] mb-6 max-w-lg mx-auto">
            Go from theory to practice with step-by-step project tutorials including Chat with PDF,
            Agentic RAG, Hybrid Search, and more.
          </p>
          <Link href="/projects" className="btn-primary">
            Explore Projects <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <details key={i} className="group card !p-0 overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer px-5 py-4 text-sm font-medium list-none">
                <span>{faq.q}</span>
                <ChevronDown size={16} className="text-[var(--color-text-muted)] transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-5 pb-4 text-sm text-[var(--color-text-secondary)]">{faq.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border-primary)] py-8 mt-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[var(--color-accent-purple)] to-[var(--color-accent-blue)] flex items-center justify-center">
              <BookOpen size={14} className="text-white" />
            </div>
            <span className="text-sm font-semibold">RAG Learning Hub</span>
          </div>
          <p className="text-xs text-[var(--color-text-muted)]">
            Built for developers learning Retrieval-Augmented Generation.
          </p>
        </div>
      </footer>
    </div>
  );
}
