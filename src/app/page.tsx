import Link from 'next/link';
import {
  BookOpen, FileText, MessageSquare, GitMerge, Bot, ShieldCheck, Brain,
  Network, Image, Wrench, FolderGit2, ArrowRight, Zap, Shield, Globe,
  ChevronDown,
} from 'lucide-react';
import RAGPipeline from '@/components/RAGPipeline';
import AnimatedArchitectureVisualizer from '@/components/AnimatedArchitectureVisualizer';

const approaches = [
  { slug: 'basic-rag', title: 'Basic / Naive RAG', icon: FileText, color: 'var(--color-accent)', desc: 'The foundational pattern: load, chunk, embed, retrieve, and generate.' },
  { slug: 'conversational-rag', title: 'Conversational RAG', icon: MessageSquare, color: 'var(--color-success)', desc: 'Multi-turn conversations with chat history and follow-up resolution.' },
  { slug: 'hybrid-rag', title: 'Hybrid RAG', icon: GitMerge, color: 'oklch(60% 0.14 72)', desc: 'Combine keyword (BM25) and dense vector search for better retrieval.' },
  { slug: 'agentic-rag', title: 'Agentic RAG', icon: Bot, color: 'var(--color-accent)', desc: 'AI agents that decide when and how to retrieve, using tools and workflows.' },
  { slug: 'corrective-rag', title: 'Corrective RAG', icon: ShieldCheck, color: 'var(--color-accent-2)', desc: 'Evaluate retrieval quality and take corrective actions when needed.' },
  { slug: 'self-rag', title: 'Self-RAG', icon: Brain, color: 'var(--color-accent)', desc: 'Self-reflective generation with retrieval and answer quality evaluation.' },
  { slug: 'graphrag', title: 'GraphRAG', icon: Network, color: 'var(--color-accent-deep)', desc: 'Knowledge graphs for relationship-aware, structured retrieval.' },
  { slug: 'multimodal-rag', title: 'Multimodal RAG', icon: Image, color: 'var(--color-error)', desc: 'Handle text, images, tables, and charts from mixed-media documents.' },
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

const tools = ['LangChain', 'LlamaIndex', 'ChromaDB', 'FAISS', 'Qdrant', 'Weaviate', 'Pinecone', 'Neo4j', 'Elasticsearch', 'Ollama'];

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-paper)' }}>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section
        style={{
          borderBottom: 'var(--rule-hair) solid var(--color-rule)',
          paddingBlock: 'var(--space-4xl) var(--space-3xl)',
        }}
      >
        <div
          className="container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
            gap: 'var(--gap-columns)',
            alignItems: 'center',
          }}
        >
          {/* Text column */}
          <div>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-display)',
                fontWeight: 700,
                letterSpacing: 'var(--tracking-display)',
                color: 'var(--color-ink)',
                marginBottom: 'var(--space-lg)',
                lineHeight: 1.05,
                textWrap: 'balance',
                maxWidth: '14ch',
              }}
            >
              Master RAG{' '}
              <span style={{ color: 'var(--color-accent)' }}>Architecture</span>
            </h1>
            <p
              className="lead"
              style={{
                color: 'var(--color-ink-2)',
                marginBottom: 'var(--space-xl)',
              }}
            >
              Eight patterns, from fundamentals to production. Interactive diagrams included.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
              <Link href="/learn/rag-fundamentals" className="key key--primary">
                Start Learning <ArrowRight size={16} />
              </Link>
              <a href="#architectures" className="key">
                Browse Architectures
              </a>
            </div>
          </div>

          {/* Pipeline visualizer slot */}
          <div
            style={{
              background: 'var(--color-paper-2)',
              border: 'var(--rule-hair) solid var(--color-rule)',
              borderRadius: 'var(--radius-card)',
              padding: 'var(--space-lg)',
              minHeight: '320px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <RAGPipeline />
          </div>
        </div>
      </section>

      {/* ── Course Grid — Eight RAG Patterns ────────────────────── */}
      <section
        id="architectures"
        style={{
          paddingBlock: 'var(--section-gap-s)',
          borderBottom: 'var(--rule-hair) solid var(--color-rule)',
          scrollMarginTop: '64px',
        }}
      >
        <div className="container">
          <div style={{ marginBottom: 'var(--space-xl)', maxWidth: '40ch' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-section)',
                fontWeight: 700,
                letterSpacing: 'var(--tracking-display)',
                color: 'var(--color-ink)',
                marginBottom: 'var(--space-sm)',
              }}
            >
              Eight RAG Patterns
            </h2>
            <p style={{ color: 'var(--color-ink-2)', fontSize: 'var(--text-lead)' }}>
              Watch live simulated queries travel across all eight architectures.
            </p>
          </div>

          <div style={{ marginBottom: 'var(--space-2xl)' }}>
            <AnimatedArchitectureVisualizer initialType="basic-rag" allowSwitching={true} />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 'var(--space-md)',
            }}
          >
            {approaches.map((a) => {
              const Icon = a.icon;
              return (
                <Link
                  key={a.slug}
                  href={`/learn/${a.slug}`}
                  className="card"
                  style={{
                    display: 'flex',
                    gap: 'var(--space-md)',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'var(--color-accent-wash)',
                    }}
                  >
                    <Icon size={18} style={{ color: a.color }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3
                      style={{
                        fontSize: 'var(--text-sm)',
                        fontWeight: 600,
                        color: 'var(--color-ink)',
                        marginBottom: '0.25rem',
                        fontFamily: 'var(--font-display)',
                      }}
                    >
                      {a.title}
                    </h3>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted)', margin: 0 }}>{a.desc}</p>
                  </div>
                  <ArrowRight size={16} style={{ color: 'var(--color-muted)', flexShrink: 0, marginTop: '2px' }} />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────── */}
      <section
        style={{
          paddingBlock: 'var(--section-gap-s)',
          borderBottom: 'var(--rule-hair) solid var(--color-rule)',
        }}
      >
        <div className="container">
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-section)',
              fontWeight: 700,
              letterSpacing: 'var(--tracking-display)',
              color: 'var(--color-ink)',
              marginBottom: 'var(--space-xl)',
            }}
          >
            What&apos;s inside
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 'var(--space-md)',
            }}
          >
            {features.map((f, i) => (
              <div key={i} className="card">
                <f.icon size={22} style={{ color: 'var(--color-accent)', marginBottom: 'var(--space-sm)' }} />
                <h3
                  style={{
                    fontSize: 'var(--text-md)',
                    fontWeight: 600,
                    color: 'var(--color-ink)',
                    marginBottom: 'var(--space-xs)',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  {f.title}
                </h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink-2)', margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tools Rail ───────────────────────────────────────────── */}
      <section
        style={{
          paddingBlock: 'var(--section-gap-s)',
          borderBottom: 'var(--rule-hair) solid var(--color-rule)',
        }}
      >
        <div className="container">
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-section)',
              fontWeight: 700,
              letterSpacing: 'var(--tracking-display)',
              color: 'var(--color-ink)',
              marginBottom: 'var(--space-lg)',
            }}
          >
            Tools &amp; Frameworks
          </h2>
          <p style={{ color: 'var(--color-ink-2)', marginBottom: 'var(--space-lg)' }}>
            Explore the ecosystem of tools that power RAG systems.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)', marginBottom: 'var(--space-xl)' }}>
            {tools.map(tool => (
              <span key={tool} className="key" style={{ fontSize: 'var(--text-xs)' }}>
                {tool}
              </span>
            ))}
          </div>
          <Link href="/tools" className="key">
            View All Tools <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── Projects CTA Band (graphite) ─────────────────────────── */}
      <section
        style={{
          paddingBlock: 'var(--section-gap-s)',
          background: 'var(--color-graphite)',
          borderBottom: 'var(--rule-hair) solid var(--color-graphite-glyph-1)',
        }}
      >
        <div className="container" style={{ textAlign: 'center' }}>
          <FolderGit2 size={32} style={{ color: 'var(--color-accent-2)', marginBottom: 'var(--space-md)', margin: '0 auto var(--space-md)' }} />
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-section)',
              fontWeight: 700,
              letterSpacing: 'var(--tracking-display)',
              color: 'var(--color-graphite-ink)',
              marginBottom: 'var(--space-md)',
            }}
          >
            Build Real Projects
          </h2>
          <p
            style={{
              color: 'var(--color-graphite-muted)',
              marginBottom: 'var(--space-xl)',
              maxWidth: '48ch',
              marginInline: 'auto',
            }}
          >
            Go from theory to practice with step-by-step project tutorials including Chat with PDF, Agentic RAG, Hybrid Search, and more.
          </p>
          <Link href="/projects" className="key key--primary">
            Explore Projects <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section style={{ paddingBlock: 'var(--section-gap-s)', borderBottom: 'var(--rule-hair) solid var(--color-rule)' }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-section)',
              fontWeight: 700,
              letterSpacing: 'var(--tracking-display)',
              color: 'var(--color-ink)',
              marginBottom: 'var(--space-xl)',
            }}
          >
            Frequently Asked Questions
          </h2>
          <div>
            {faqs.map((faq, i) => (
              <details
                key={i}
                style={{
                  borderTop: 'var(--rule-hair) solid var(--color-rule)',
                }}
              >
                <summary
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    padding: 'var(--space-md) 0',
                    fontSize: 'var(--text-md)',
                    fontWeight: 600,
                    color: 'var(--color-ink)',
                    listStyle: 'none',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  <span>{faq.q}</span>
                  <ChevronDown size={16} style={{ color: 'var(--color-muted)', flexShrink: 0 }} />
                </summary>
                <div
                  style={{
                    paddingBottom: 'var(--space-md)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-ink-2)',
                    lineHeight: 1.6,
                  }}
                >
                  {faq.a}
                </div>
              </details>
            ))}
            <div style={{ borderTop: 'var(--rule-hair) solid var(--color-rule)' }} />
          </div>
        </div>
      </section>

      {/* ── Footer (colophon) ────────────────────────────────────── */}
      <footer
        style={{
          paddingBlock: 'var(--space-2xl)',
          background: 'var(--color-paper-2)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 2fr) repeat(3, minmax(0, 1fr))',
              gap: 'var(--space-xl)',
              marginBottom: 'var(--space-xl)',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', marginBottom: 'var(--space-sm)' }}>
                <BookOpen size={18} style={{ color: 'var(--color-accent)' }} />
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-ink)' }}>RAG Learning Hub</span>
              </div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-muted)', maxWidth: '28ch' }}>
                Built for developers learning Retrieval-Augmented Generation.
              </p>
            </div>
            <div>
              <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-ink)', marginBottom: 'var(--space-sm)', fontFamily: 'var(--font-display)' }}>Learn</p>
              {[
                { href: '/learn/rag-fundamentals', label: 'RAG Fundamentals' },
                { href: '/learn/basic-rag', label: 'Basic RAG' },
                { href: '/learn/agentic-rag', label: 'Agentic RAG' },
                { href: '/learn/graphrag', label: 'GraphRAG' },
              ].map(l => (
                <div key={l.href} style={{ marginBottom: '0.25rem' }}>
                  <Link href={l.href} style={{ fontSize: 'var(--text-sm)', color: 'var(--color-muted)' }}>{l.label}</Link>
                </div>
              ))}
            </div>
            <div>
              <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-ink)', marginBottom: 'var(--space-sm)', fontFamily: 'var(--font-display)' }}>Resources</p>
              {[
                { href: '/tools', label: 'Tools' },
                { href: '/projects', label: 'Projects' },
                { href: '/glossary', label: 'Glossary' },
              ].map(l => (
                <div key={l.href} style={{ marginBottom: '0.25rem' }}>
                  <Link href={l.href} style={{ fontSize: 'var(--text-sm)', color: 'var(--color-muted)' }}>{l.label}</Link>
                </div>
              ))}
            </div>
            <div>
              <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-ink)', marginBottom: 'var(--space-sm)', fontFamily: 'var(--font-display)' }}>Compare</p>
              <div style={{ marginBottom: '0.25rem' }}>
                <Link href="/compare/rag-vs-fine-tuning" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-muted)' }}>RAG vs Fine-Tuning</Link>
              </div>
            </div>
          </div>
          <div style={{ borderTop: 'var(--rule-hair) solid var(--color-rule)', paddingTop: 'var(--space-lg)' }}>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted)', margin: 0 }}>
              Free educational resource, no login, no paywalls. All content is open.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
