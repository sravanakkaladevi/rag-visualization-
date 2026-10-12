import { SearchResult } from './types';
import { tools } from './tools-data';
import { glossary } from './glossary-data';
import { lessonOrder } from './navigation';

const lessonMeta: Record<string, { title: string; description: string; category: string }> = {
  'rag-fundamentals': {
    title: 'RAG Fundamentals',
    description: 'Learn what Retrieval-Augmented Generation is, why it matters, and how RAG systems work step by step.',
    category: 'Fundamentals',
  },
  'basic-rag': {
    title: 'Basic / Naive RAG',
    description: 'The simplest RAG pattern: load documents, chunk, embed, retrieve, and generate answers.',
    category: 'RAG Approaches',
  },
  'conversational-rag': {
    title: 'Conversational RAG',
    description: 'Extend RAG with chat history and follow-up question handling for multi-turn conversations.',
    category: 'RAG Approaches',
  },
  'hybrid-rag': {
    title: 'Hybrid RAG',
    description: 'Combine keyword search (BM25) with dense vector search for more accurate retrieval.',
    category: 'RAG Approaches',
  },
  'agentic-rag': {
    title: 'Agentic RAG',
    description: 'Build AI agents that can decide when to retrieve, rewrite queries, and use tools for complex tasks.',
    category: 'RAG Approaches',
  },
  'corrective-rag': {
    title: 'Corrective RAG (CRAG)',
    description: 'Evaluate retrieved documents and take corrective actions when retrieval quality is insufficient.',
    category: 'RAG Approaches',
  },
  'self-rag': {
    title: 'Self-RAG',
    description: 'A self-reflective approach that evaluates its own retrieval and generation decisions.',
    category: 'RAG Approaches',
  },
  'graphrag': {
    title: 'GraphRAG',
    description: 'Use knowledge graphs to capture entity relationships for richer, relationship-aware retrieval.',
    category: 'RAG Approaches',
  },
  'multimodal-rag': {
    title: 'Multimodal RAG',
    description: 'Extend RAG beyond text to handle images, tables, charts, and mixed-media documents.',
    category: 'RAG Approaches',
  },
};

const projectMeta: Record<string, { title: string; description: string }> = {
  'chat-with-pdf': { title: 'Chat with PDF', description: 'Build a RAG application that answers questions from uploaded PDF documents.' },
  'conversational-rag': { title: 'Conversational RAG Project', description: 'Add chat history and follow-up handling to a RAG application.' },
  'hybrid-rag': { title: 'Hybrid Search Project', description: 'Combine BM25 and vector search for improved retrieval accuracy.' },
  'agentic-rag': { title: 'Agentic RAG Project', description: 'Build a conditional retrieval workflow using LangGraph.' },
  'local-rag': { title: 'Local RAG Project', description: 'Run a complete RAG system locally with Ollama.' },
};

export function searchAll(query: string): SearchResult[] {
  if (!query || query.trim().length < 2) return [];
  const q = query.toLowerCase().trim();
  const results: SearchResult[] = [];

  // Search lessons
  for (const slug of lessonOrder) {
    const meta = lessonMeta[slug];
    if (!meta) continue;
    if (meta.title.toLowerCase().includes(q) || meta.description.toLowerCase().includes(q)) {
      results.push({
        title: meta.title,
        description: meta.description,
        href: `/learn/${slug}`,
        category: meta.category,
        type: 'lesson',
      });
    }
  }

  // Search tools
  for (const tool of tools) {
    if (
      tool.name.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q) ||
      tool.tags.some(t => t.toLowerCase().includes(q))
    ) {
      results.push({
        title: tool.name,
        description: tool.description.slice(0, 120) + '...',
        href: '/tools',
        category: 'Tools & Frameworks',
        type: 'tool',
      });
    }
  }

  // Search projects
  for (const [slug, meta] of Object.entries(projectMeta)) {
    if (meta.title.toLowerCase().includes(q) || meta.description.toLowerCase().includes(q)) {
      results.push({
        title: meta.title,
        description: meta.description,
        href: `/projects/${slug}`,
        category: 'Projects',
        type: 'project',
      });
    }
  }

  // Search glossary
  for (const entry of glossary) {
    if (entry.term.toLowerCase().includes(q) || entry.definition.toLowerCase().includes(q)) {
      results.push({
        title: entry.term,
        description: entry.definition.slice(0, 120) + '...',
        href: '/glossary',
        category: 'Glossary',
        type: 'glossary',
      });
    }
  }

  return results.slice(0, 20);
}
