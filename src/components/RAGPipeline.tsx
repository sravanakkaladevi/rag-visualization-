'use client';

import { useState } from 'react';
import { FileText, Scissors, Binary, Database, Search, Brain, MessageSquare, ChevronRight } from 'lucide-react';

const stages = [
  {
    id: 'documents',
    label: 'Documents',
    icon: FileText,
    color: 'var(--color-accent-blue)',
    description: 'Raw source documents such as PDFs, web pages, databases, or APIs. These contain the knowledge your RAG system will draw from.',
    details: 'Document loading is the first step. You might ingest PDFs, HTML pages, database records, or API responses. Each source needs a specific loader that extracts the text content while preserving relevant metadata like page numbers, titles, or timestamps.',
  },
  {
    id: 'chunking',
    label: 'Chunking',
    icon: Scissors,
    color: 'var(--color-accent-yellow)',
    description: 'Split documents into smaller, semantically meaningful pieces. Chunk size and overlap affect retrieval quality.',
    details: 'Large documents must be broken into smaller chunks that can fit within embedding model limits and provide focused context. Common strategies include fixed-size splitting (e.g., 500 tokens with 50-token overlap), recursive character splitting, sentence-based splitting, or semantic chunking that respects topic boundaries.',
  },
  {
    id: 'embeddings',
    label: 'Embeddings',
    icon: Binary,
    color: 'var(--color-accent-green)',
    description: 'Convert text chunks into dense numerical vectors that capture semantic meaning. Similar texts produce similar vectors.',
    details: 'Each chunk is passed through an embedding model (like OpenAI\'s text-embedding-ada-002 or open-source models from Sentence Transformers) to produce a dense vector representation. These vectors encode the semantic meaning of the text, enabling similarity-based retrieval later.',
  },
  {
    id: 'vectorstore',
    label: 'Vector Store',
    icon: Database,
    color: 'var(--color-accent-purple)',
    description: 'Store embeddings in a specialized database optimized for fast similarity search over high-dimensional vectors.',
    details: 'The embedding vectors are stored in a vector database (such as ChromaDB, Pinecone, Qdrant, or FAISS) along with the original text and metadata. These databases use algorithms like HNSW or IVF for efficient approximate nearest neighbor search.',
  },
  {
    id: 'retrieval',
    label: 'Retrieval',
    icon: Search,
    color: 'var(--color-accent-cyan)',
    description: 'When a query arrives, embed it and find the most similar document chunks from the vector store.',
    details: 'The user\'s query is embedded using the same model, then compared against stored vectors using cosine similarity or other distance metrics. The top-k most similar chunks are retrieved. Additional steps like reranking or filtering may be applied to improve relevance.',
  },
  {
    id: 'llm',
    label: 'LLM',
    icon: Brain,
    color: 'var(--color-accent-red)',
    description: 'Pass the retrieved context along with the user question to a language model to generate a grounded answer.',
    details: 'A prompt is constructed containing the user\'s question and the retrieved context chunks. This is sent to an LLM (like GPT-4, Claude, or Llama) which generates an answer based on the provided context. The model is instructed to only use the given context, reducing hallucination.',
  },
  {
    id: 'answer',
    label: 'Answer',
    icon: MessageSquare,
    color: 'var(--color-accent-yellow)',
    description: 'The final generated answer, grounded in retrieved evidence, often with source citations.',
    details: 'The LLM\'s response is returned to the user, ideally with citations pointing back to the source documents. The answer is grounded in the retrieved evidence, making it more accurate and verifiable than a response generated purely from the model\'s training data.',
  },
];

export default function RAGPipeline() {
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const active = stages.find(s => s.id === activeStage);

  return (
    <div className="my-8">
      {/* Pipeline visual */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-0 mb-6">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const isActive = activeStage === stage.id;
          return (
            <div key={stage.id} className="flex items-center">
              <button
                onClick={() => setActiveStage(isActive ? null : stage.id)}
                className={`pipeline-node flex flex-col items-center gap-1.5 min-w-[90px] md:min-w-[110px] ${isActive ? 'active' : ''}`}
                aria-label={`Learn about ${stage.label}`}
              >
                <Icon size={20} style={{ color: stage.color }} />
                <span className="text-xs font-medium">{stage.label}</span>
              </button>
              {idx < stages.length - 1 && (
                <ChevronRight size={16} className="text-[var(--color-text-muted)] mx-1 hidden md:block shrink-0" />
              )}
            </div>
          );
        })}
      </div>

      {/* Active stage detail */}
      {active && (
        <div className="animate-fade-in bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] rounded-xl p-6 max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <active.icon size={20} style={{ color: active.color }} />
            <h4 className="font-bold text-lg">{active.label}</h4>
          </div>
          <p className="text-sm text-[var(--color-text-secondary)] mb-3">{active.description}</p>
          <p className="text-sm text-[var(--color-text-muted)]">{active.details}</p>
        </div>
      )}

      {!active && (
        <p className="text-center text-sm text-[var(--color-text-muted)]">
          Click any stage to learn more about it
        </p>
      )}
    </div>
  );
}
