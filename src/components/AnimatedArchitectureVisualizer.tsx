'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Play, Pause, RotateCcw, SkipForward, SkipBack, Sparkles, Layers,
  Cpu, Database, Search, FileText, Binary, MessageSquare, Scissors,
  Bot, ShieldCheck, Brain, Network, Image, ArrowRight, Activity,
  CheckCircle2, Zap, ArrowDown, ChevronRight, Terminal, RefreshCw
} from 'lucide-react';

export interface ArchitectureNode {
  id: string;
  label: string;
  sub: string;
  icon: any;
  color: string;
  badge?: string;
  phase: 'Input' | 'Ingestion' | 'Indexing' | 'Retrieval' | 'Evaluation' | 'Generation';
  description: string;
  technicalDetails: string;
  samplePayload: {
    title: string;
    content: string;
    format?: 'json' | 'text' | 'sql';
  };
  keyTools: string[];
}

export interface ArchitectureFlow {
  id: string;
  name: string;
  subtitle: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  description: string;
  nodes: ArchitectureNode[];
  edges: { from: string; to: string; label?: string; condition?: string }[];
}

export const architectures: ArchitectureFlow[] = [
  {
    id: 'basic-rag',
    name: 'Basic / Naive RAG',
    subtitle: 'Standard sequential retrieval and prompt augment pipeline',
    difficulty: 'Beginner',
    category: 'Sequential Pipeline',
    description: 'The canonical RAG architecture. Ingests source documents, splits them into semantic chunks, stores dense vector embeddings, and performs top-K similarity search to augment LLM prompts.',
    nodes: [
      {
        id: 'input-doc',
        label: 'Source PDF',
        sub: 'Document Ingestion',
        icon: FileText,
        color: '#3b82f6',
        phase: 'Ingestion',
        description: 'Raw PDF uploaded by student (e.g., "Cloud Computing Architecture Guide.pdf").',
        technicalDetails: 'Parsed using PyPDFLoader or Unstructured to extract raw text, table structures, and page metadata.',
        samplePayload: {
          title: 'Document Metadata',
          format: 'json',
          content: '{\n  "filename": "Cloud_Computing_Guide.pdf",\n  "pages": 42,\n  "file_size": "2.4 MB",\n  "parser": "PyPDFLoader"\n}',
        },
        keyTools: ['PyPDF', 'pdfplumber', 'Unstructured'],
      },
      {
        id: 'chunker',
        label: 'Text Chunking',
        sub: 'Recursive Splitter',
        icon: Scissors,
        color: '#fbbf24',
        phase: 'Ingestion',
        description: 'Splits raw text into semantically cohesive passages with overlap to preserve cross-boundary context.',
        technicalDetails: 'RecursiveCharacterTextSplitter with chunk_size=800 characters and chunk_overlap=150 characters on paragraph separators.',
        samplePayload: {
          title: 'Chunk Output [Chunk #14]',
          format: 'json',
          content: '{\n  "chunk_id": "chunk_014",\n  "page": 12,\n  "text": "Virtualization decouples compute hardware from operating systems using a hypervisor...",\n  "tokens": 148\n}',
        },
        keyTools: ['LangChain RecursiveSplitter', 'tiktoken'],
      },
      {
        id: 'embedder',
        label: 'Vector Embedder',
        sub: 'text-embedding-3',
        icon: Binary,
        color: '#22c55e',
        phase: 'Indexing',
        description: 'Converts textual chunks into dense floating-point vectors in a high-dimensional semantic latent space.',
        technicalDetails: 'Dimensions: 1536 floats. Normalization applied for fast cosine similarity dot-product calculations.',
        samplePayload: {
          title: 'Vector Embedding Output',
          format: 'json',
          content: '{\n  "dimensions": 1536,\n  "vector_sample": [0.0142, -0.0481, 0.0912, -0.0034, "...", 0.0219],\n  "norm": 1.0\n}',
        },
        keyTools: ['OpenAI Embeddings', 'SentenceTransformers (BGE-M3)'],
      },
      {
        id: 'vector-store',
        label: 'Vector Store',
        sub: 'ChromaDB / FAISS',
        icon: Database,
        color: '#a855f7',
        phase: 'Indexing',
        description: 'Stores indexed embeddings alongside document payloads with Hierarchical Navigable Small World (HNSW) indexing.',
        technicalDetails: 'Approximate Nearest Neighbor (ANN) index using cosine distance metric. Sub-10ms lookup time across 100k vectors.',
        samplePayload: {
          title: 'Vector DB Index Status',
          format: 'json',
          content: '{\n  "collection": "cloud_docs",\n  "index_type": "HNSW",\n  "total_vectors": 340,\n  "distance_metric": "cosine"\n}',
        },
        keyTools: ['ChromaDB', 'Pinecone', 'Qdrant', 'FAISS'],
      },
      {
        id: 'retriever',
        label: 'Top-K Retriever',
        sub: 'Cosine Similarity',
        icon: Search,
        color: '#06b6d4',
        phase: 'Retrieval',
        description: 'User asks "Explain virtualization". Query is embedded, and top-3 most similar document chunks are retrieved.',
        technicalDetails: 'Query vector compared against indexed collection. Filters by minimum similarity threshold (> 0.78).',
        samplePayload: {
          title: 'Top Retrieved Chunks',
          format: 'json',
          content: '[\n  {\n    "chunk_id": "chunk_014",\n    "score": 0.912,\n    "text": "Virtualization decouples compute hardware..."\n  },\n  {\n    "chunk_id": "chunk_015",\n    "score": 0.843,\n    "text": "Hypervisors are classified into Type 1 (bare-metal) and Type 2..."\n  }\n]',
        },
        keyTools: ['VectorStoreRetriever', 'Max Marginal Relevance (MMR)'],
      },
      {
        id: 'llm-synthesis',
        label: 'LLM Generator',
        sub: 'Grounded Prompt',
        icon: Brain,
        color: '#ef4444',
        phase: 'Generation',
        description: 'Constructs an augmented prompt containing retrieved chunks and instructions forbidding speculation.',
        technicalDetails: 'Prompt template: "Answer based ONLY on context below. If absent, say unknown." Model: GPT-4o with temperature=0.0.',
        samplePayload: {
          title: 'Augmented Context Prompt',
          format: 'text',
          content: 'System: You are an expert cloud tutor. Use ONLY the provided context.\nContext:\n[Chunk 14]: Virtualization decouples compute hardware...\n[Chunk 15]: Hypervisors are classified into Type 1...\nUser Query: Explain virtualization.',
        },
        keyTools: ['ChatOpenAI (GPT-4o)', 'Anthropic Claude 3.5'],
      },
      {
        id: 'final-answer',
        label: 'Grounded Answer',
        sub: 'With Source Citation',
        icon: MessageSquare,
        color: '#fbbf24',
        phase: 'Generation',
        description: 'Delivers factual answer with explicit citations back to page numbers in the source PDF.',
        technicalDetails: 'Zero hallucination risk because all factual statements cite retrieved chunks.',
        samplePayload: {
          title: 'Final Grounded Output',
          format: 'text',
          content: 'Virtualization is a computing technique that abstracts physical hardware from operating systems using a hypervisor (Source: Page 12, Chunk 14). Hypervisors operate as either Type 1 (bare-metal) or Type 2 (hosted) (Source: Page 13, Chunk 15).',
        },
        keyTools: ['Grounded Generation', 'Citation Formatter'],
      },
    ],
    edges: [
      { from: 'input-doc', to: 'chunker', label: 'Raw text' },
      { from: 'chunker', to: 'embedder', label: 'Chunks' },
      { from: 'embedder', to: 'vector-store', label: '1536D Vectors' },
      { from: 'vector-store', to: 'retriever', label: 'HNSW Search' },
      { from: 'retriever', to: 'llm-synthesis', label: 'Top-3 Chunks' },
      { from: 'llm-synthesis', to: 'final-answer', label: 'Synthesized' },
    ],
  },

  {
    id: 'conversational-rag',
    name: 'Conversational RAG',
    subtitle: 'Multi-turn chat memory and contextual query reformulation',
    difficulty: 'Intermediate',
    category: 'Memory & State',
    description: 'Solves ambiguous follow-up questions (e.g. "What are its benefits?") by reformulating the prompt into a standalone query using conversation history before querying the vector store.',
    nodes: [
      {
        id: 'user-followup',
        label: 'Follow-up Query',
        sub: '"What are its benefits?"',
        icon: MessageSquare,
        color: '#3b82f6',
        phase: 'Input',
        description: 'User enters a multi-turn follow-up with ambiguous pronouns like "it", "they", or "those".',
        technicalDetails: 'Input: "What are its primary benefits?" Cannot be directly matched against vector store without context.',
        samplePayload: {
          title: 'Raw User Message',
          format: 'text',
          content: 'Turn 2 User Query: "What are its primary benefits?"',
        },
        keyTools: ['ChatUI', 'WebSocket Stream'],
      },
      {
        id: 'chat-history',
        label: 'Chat Memory',
        sub: 'Session History Buffer',
        icon: Layers,
        color: '#fbbf24',
        phase: 'Input',
        description: 'Stores prior conversation turns (User: "What is PostgreSQL?", Assistant: "PostgreSQL is an open-source RDBMS...").',
        technicalDetails: 'Sliding window buffer or Redis memory store retaining the last K message pairs.',
        samplePayload: {
          title: 'Session Memory Store',
          format: 'json',
          content: '[\n  {"role": "user", "content": "What is PostgreSQL?"},\n  {"role": "assistant", "content": "PostgreSQL is a powerful open-source object-relational database..."}\n]',
        },
        keyTools: ['RedisChatMessageHistory', 'InMemoryChatMessageHistory'],
      },
      {
        id: 'query-rewriter',
        label: 'Query Rewriter',
        sub: 'Standalone Formulator',
        icon: RefreshCw,
        color: '#a855f7',
        phase: 'Retrieval',
        description: 'LLM reformulates the question into an explicit standalone query incorporating the chat history.',
        technicalDetails: 'Fast model (gpt-4o-mini) executes prompt: "Rewrite user query given chat history as standalone search query. Do NOT answer."',
        samplePayload: {
          title: 'Reformulation Output',
          format: 'text',
          content: 'Standalone Query: "What are the primary benefits and features of PostgreSQL database?"',
        },
        keyTools: ['create_history_aware_retriever', 'Few-Shot Rewriting'],
      },
      {
        id: 'conv-retriever',
        label: 'Vector Retriever',
        sub: 'Accurate Top-K Search',
        icon: Search,
        color: '#06b6d4',
        phase: 'Retrieval',
        description: 'Searches vector database using the newly reformulated standalone query instead of the ambiguous pronoun question.',
        technicalDetails: 'Matches relevant chunks on PostgreSQL features, ACID compliance, and concurrency.',
        samplePayload: {
          title: 'Retrieved Context',
          format: 'json',
          content: '[\n  {"chunk": "PostgreSQL benefits include ACID compliance, robust extension ecosystem (PostGIS), and MVCC concurrency..."}\n]',
        },
        keyTools: ['ChromaDB', 'HNSW Index'],
      },
      {
        id: 'conv-generator',
        label: 'Conversational LLM',
        sub: 'Context + Chat History',
        icon: Brain,
        color: '#ef4444',
        phase: 'Generation',
        description: 'Synthesizes response with awareness of conversation tone and the newly retrieved documentation.',
        technicalDetails: 'Passes both chat_history messages and retrieved context into the final LLM prompt.',
        samplePayload: {
          title: 'Final Conversational Response',
          format: 'text',
          content: 'The primary benefits of PostgreSQL include full ACID compliance, advanced data types (JSONB, spatial via PostGIS), and Multi-Version Concurrency Control (MVCC) for high performance.',
        },
        keyTools: ['RunnableWithMessageHistory', 'Streaming Callback'],
      },
    ],
    edges: [
      { from: 'user-followup', to: 'query-rewriter', label: 'Latest message' },
      { from: 'chat-history', to: 'query-rewriter', label: 'History context' },
      { from: 'query-rewriter', to: 'conv-retriever', label: 'Standalone query' },
      { from: 'conv-retriever', to: 'conv-generator', label: 'Relevant chunks' },
    ],
  },

  {
    id: 'hybrid-rag',
    name: 'Hybrid RAG',
    subtitle: 'Dual lexical (BM25) and dense vector retrieval with RRF reranking',
    difficulty: 'Intermediate',
    category: 'Advanced Retrieval',
    description: 'Overcomes vector search limitations on exact error codes, SKUs, and domain acronyms by running BM25 keyword search alongside dense semantic embeddings, fusing scores via Reciprocal Rank Fusion.',
    nodes: [
      {
        id: 'hybrid-query',
        label: 'Technical Query',
        sub: '"Error 0x80070005 access denied"',
        icon: Terminal,
        color: '#3b82f6',
        phase: 'Input',
        description: 'Queries containing alphanumeric codes or exact IDs that vector embeddings blur.',
        technicalDetails: 'Requires exact term matching for error hex codes alongside conceptual understanding of permissions.',
        samplePayload: {
          title: 'Input Query Payload',
          format: 'text',
          content: 'Query: "Fix Windows 0x80070005 access denied error on network share"',
        },
        keyTools: ['User Interface', 'Query Parser'],
      },
      {
        id: 'bm25-retriever',
        label: 'BM25 Keyword Search',
        sub: 'Sparse Lexical Index',
        icon: Search,
        color: '#fbbf24',
        phase: 'Retrieval',
        description: 'Computes term frequency & inverse document frequency to nail exact string matches (0x80070005).',
        technicalDetails: 'Rank-BM25 or Elasticsearch inverted index. Immune to semantic drift on rare identifiers.',
        samplePayload: {
          title: 'BM25 Top Matches',
          format: 'json',
          content: '[\n  {"rank": 1, "score": 14.8, "text": "0x80070005: ERROR_ACCESS_DENIED in Windows ACLs"},\n  {"rank": 2, "score": 9.2, "text": "SMB network share permissions overview"}\n]',
        },
        keyTools: ['rank-bm25', 'Elasticsearch / OpenSearch'],
      },
      {
        id: 'dense-retriever',
        label: 'Dense Vector Search',
        sub: 'Semantic Embedding Index',
        icon: Binary,
        color: '#a855f7',
        phase: 'Retrieval',
        description: 'Finds conceptually related documentation about permission troubleshooting, even without exact keywords.',
        technicalDetails: 'Cosine similarity on 1536-dimensional embeddings. Captures synonyms like "forbidden", "unauthorized".',
        samplePayload: {
          title: 'Dense Top Matches',
          format: 'json',
          content: '[\n  {"rank": 1, "score": 0.884, "text": "Troubleshooting unauthorized folder permissions"},\n  {"rank": 2, "score": 0.831, "text": "Active Directory group policies and shared drives"}\n]',
        },
        keyTools: ['Qdrant', 'Weaviate', 'ChromaDB'],
      },
      {
        id: 'rrf-fuser',
        label: 'Reciprocal Rank Fusion',
        sub: 'RRF Score Algorithm',
        icon: Layers,
        color: '#06b6d4',
        phase: 'Evaluation',
        description: 'Combines ranks using formula: RRF_Score = 1 / (60 + rank_bm25) + 1 / (60 + rank_dense).',
        technicalDetails: 'Merges sparse and dense ranking lists without needing raw score normalization.',
        samplePayload: {
          title: 'Fused Rank List',
          format: 'json',
          content: '[\n  {\n    "doc_id": "doc_991",\n    "rrf_score": 0.0328,\n    "text": "Fixing 0x80070005 Access Denied on shared network folders via NTFS permissions."\n  }\n]',
        },
        keyTools: ['EnsembleRetriever', 'RRF Algorithm'],
      },
      {
        id: 'cross-encoder',
        label: 'Cross-Encoder Reranker',
        sub: 'Cohere / BGE-Reranker',
        icon: Zap,
        color: '#22c55e',
        phase: 'Evaluation',
        description: 'Jointly feeds query + candidate chunk into a cross-encoder to compute true semantic relevance.',
        technicalDetails: 'Full attention between all query tokens and document tokens. Reorders top-20 candidates to top-3.',
        samplePayload: {
          title: 'Reranker Relevance Scores',
          format: 'json',
          content: '[\n  {"doc_id": "doc_991", "cross_score": 0.982, "status": "Selected"},\n  {"doc_id": "doc_412", "cross_score": 0.312, "status": "Filtered Out"}\n]',
        },
        keyTools: ['Cohere Rerank', 'BAAI/bge-reranker-large'],
      },
      {
        id: 'hybrid-llm',
        label: 'Answer Synthesis',
        sub: 'High-Precision Generation',
        icon: Brain,
        color: '#ef4444',
        phase: 'Generation',
        description: 'Generates grounded answer with exact error diagnostic and step-by-step remediation.',
        technicalDetails: 'Combines precise keyword accuracy with fluent explanatory synthesis.',
        samplePayload: {
          title: 'Final Answer Output',
          format: 'text',
          content: 'Error 0x80070005 is a Windows Access Denied error. To resolve this on network shares:\n1. Open Share Properties > Security Tab.\n2. Ensure your user or group has Read/Write NTFS permissions.\n3. Verify SMB share permissions under Advanced Sharing.',
        },
        keyTools: ['GPT-4o', 'Claude 3.5 Sonnet'],
      },
    ],
    edges: [
      { from: 'hybrid-query', to: 'bm25-retriever', label: 'Keyword search' },
      { from: 'hybrid-query', to: 'dense-retriever', label: 'Vector search' },
      { from: 'bm25-retriever', to: 'rrf-fuser', label: 'Sparse rank list' },
      { from: 'dense-retriever', to: 'rrf-fuser', label: 'Dense rank list' },
      { from: 'rrf-fuser', to: 'cross-encoder', label: 'Top 20 candidates' },
      { from: 'cross-encoder', to: 'hybrid-llm', label: 'Top 3 verified' },
    ],
  },

  {
    id: 'agentic-rag',
    name: 'Agentic RAG',
    subtitle: 'Autonomous decision loops, tool selection, and iterative query refinement',
    difficulty: 'Advanced',
    category: 'Agentic Workflows',
    description: 'An AI agent reasons about whether retrieval is required, selects tools (Vector DB, Google Search, SQL), inspects results, rewrites queries if insufficient, and executes multiple retrieval hops.',
    nodes: [
      {
        id: 'user-goal',
        label: 'Complex Goal',
        sub: '"Compare revenue & 2026 outlook"',
        icon: Bot,
        color: '#3b82f6',
        phase: 'Input',
        description: 'User presents a multi-faceted question requiring multiple distinct sources.',
        technicalDetails: 'Single-shot retrieval cannot answer multi-step reasoning questions.',
        samplePayload: {
          title: 'Agent Task Input',
          format: 'text',
          content: 'Query: "Compare Apple Q4 2025 revenue with Microsoft and check their projected 2026 AI capital expenditures."',
        },
        keyTools: ['User Input', 'LangGraph State'],
      },
      {
        id: 'agent-brain',
        label: 'Agent Controller',
        sub: 'LangGraph Reasoning Node',
        icon: Brain,
        color: '#a855f7',
        phase: 'Evaluation',
        description: 'Plans required steps: 1) Query 10-K internal vector DB, 2) If 2026 projections absent, invoke Web Search.',
        technicalDetails: 'StateGraph node with bound tools: [internal_retriever, web_search, python_calc].',
        samplePayload: {
          title: 'Agent Tool Call Plan',
          format: 'json',
          content: '{\n  "thought": "I need historical 10-K data from internal docs, but 2026 outlook requires live web search.",\n  "tool_call": "internal_doc_search",\n  "arguments": {"query": "Apple Q4 2025 revenue"}\n}',
        },
        keyTools: ['LangGraph', 'ReAct Agent Pattern'],
      },
      {
        id: 'tool-exec',
        label: 'Tool Dispatcher',
        sub: 'Vector DB + Web Search',
        icon: Search,
        color: '#06b6d4',
        phase: 'Retrieval',
        description: 'Executes chosen tools dynamically and appends raw observations back into agent state.',
        technicalDetails: 'Parallel tool execution when independent; serial execution when dependent.',
        samplePayload: {
          title: 'Tool Execution Observation',
          format: 'json',
          content: '{\n  "tool": "internal_doc_search",\n  "result": "Apple Q4 2025 revenue: $94.9B, Microsoft Q4 2025 revenue: $64.7B."\n}',
        },
        keyTools: ['Tavily Search API', 'ChromaDB', 'SQLDatabaseChain'],
      },
      {
        id: 'grade-docs',
        label: 'Evidence Evaluator',
        sub: 'Relevance & Sufficiency',
        icon: ShieldCheck,
        color: '#fbbf24',
        phase: 'Evaluation',
        description: 'Checks if gathered evidence answers the whole goal. If 2026 CapEx is missing, loops back to query web.',
        technicalDetails: 'Conditional edge function: returns "continue_search" or "synthesize_final".',
        samplePayload: {
          title: 'Evaluation State',
          format: 'json',
          content: '{\n  "has_revenue": true,\n  "has_2026_capex": false,\n  "next_step": "invoke_web_search",\n  "reformulated_query": "Microsoft Apple projected AI CapEx 2026 analyst reports"\n}',
        },
        keyTools: ['Conditional Routing', 'Document Grader LLM'],
      },
      {
        id: 'agent-synthesis',
        label: 'Multi-Source Synthesis',
        sub: 'Final Holistic Answer',
        icon: CheckCircle2,
        color: '#22c55e',
        phase: 'Generation',
        description: 'Combines multi-hop discoveries into structured comparative table with full sources.',
        technicalDetails: 'Synthesizes both internal financial records and external verified web results.',
        samplePayload: {
          title: 'Agent Final Response',
          format: 'text',
          content: '### Q4 2025 Revenue Comparison:\n- Apple: $94.9B (+6% YoY)\n- Microsoft: $64.7B (+15% YoY)\n\n### Projected 2026 AI CapEx (Source: Morgan Stanley/Web):\n- Microsoft projected $80B+ primarily for Azure AI datacenter buildout.\n- Apple projected ~$15B, emphasizing hybrid on-device and private cloud compute.',
        },
        keyTools: ['Final Agent Output', 'Markdown Table Generator'],
      },
    ],
    edges: [
      { from: 'user-goal', to: 'agent-brain', label: 'Plan & dispatch' },
      { from: 'agent-brain', to: 'tool-exec', label: 'Call tools' },
      { from: 'tool-exec', to: 'grade-docs', label: 'Observations' },
      { from: 'grade-docs', to: 'agent-brain', label: 'If incomplete (Loop)' },
      { from: 'grade-docs', to: 'agent-synthesis', label: 'If complete' },
    ],
  },

  {
    id: 'corrective-rag',
    name: 'Corrective RAG (CRAG)',
    subtitle: 'Self-grading retrieval with automatic web fallback on ambiguity',
    difficulty: 'Advanced',
    category: 'Self-Correction',
    description: 'Evaluates the relevance of retrieved documents before generation. If documents are irrelevant or insufficient, it triggers query refinement and falls back to external web search.',
    nodes: [
      {
        id: 'crag-query',
        label: 'User Query',
        sub: 'Domain Question',
        icon: Search,
        color: '#3b82f6',
        phase: 'Input',
        description: 'User asks question about proprietary or obscure topic.',
        technicalDetails: 'Example: "What is the recommended fix for Kubernetes kernel panic bug CVE-2026-1182?"',
        samplePayload: {
          title: 'Input Query',
          format: 'text',
          content: 'Query: "CVE-2026-1182 Kubernetes kernel patch fix"',
        },
        keyTools: ['User Input'],
      },
      {
        id: 'crag-retriever',
        label: 'Internal Vector DB',
        sub: 'Initial Retrieval',
        icon: Database,
        color: '#a855f7',
        phase: 'Retrieval',
        description: 'Attempts to find patch documents in local knowledge base.',
        technicalDetails: 'Returns candidate documents that might be out of date or completely absent.',
        samplePayload: {
          title: 'Retrieved Internal Passages',
          format: 'json',
          content: '[\n  {"chunk": "General Linux kernel panic troubleshooting steps from 2023..."}\n]',
        },
        keyTools: ['ChromaDB', 'FAISS'],
      },
      {
        id: 'crag-evaluator',
        label: 'Retrieval Evaluator',
        sub: 'Confidence Classifier',
        icon: ShieldCheck,
        color: '#fbbf24',
        phase: 'Evaluation',
        description: 'Scores retrieval confidence: Correct (>0.8), Ambiguous (0.4-0.8), or Incorrect (<0.4).',
        technicalDetails: 'Zero-shot classification prompt or fine-tuned cross-encoder evaluating token alignment.',
        samplePayload: {
          title: 'Evaluator Decision Matrix',
          format: 'json',
          content: '{\n  "confidence_score": 0.28,\n  "grade": "INCORRECT",\n  "action": "TRIGGER_WEB_FALLBACK",\n  "reason": "Retrieved docs discuss 2023 kernels, not CVE-2026-1182."\n}',
        },
        keyTools: ['Evaluator Prompt', 'Confidence Calibrator'],
      },
      {
        id: 'crag-fallback',
        label: 'Web Search Fallback',
        sub: 'External Knowledge Fetch',
        icon: RefreshCw,
        color: '#06b6d4',
        phase: 'Retrieval',
        description: 'Activates external search when internal knowledge base fails confidence threshold.',
        technicalDetails: 'Rewrites search query and calls live web search API for current CVE advisory.',
        samplePayload: {
          title: 'External Web Search Results',
          format: 'json',
          content: '[\n  {\n    "source": "kubernetes.io/security",\n    "snippet": "CVE-2026-1182 patched in v1.33.2: Upgrade containerd to 2.1.0 to prevent cgroup race condition."\n  }\n]',
        },
        keyTools: ['Tavily Search', 'Brave Search API'],
      },
      {
        id: 'crag-synthesis',
        label: 'Corrected Answer',
        sub: 'Guaranteed Fresh & Verified',
        icon: CheckCircle2,
        color: '#22c55e',
        phase: 'Generation',
        description: 'Produces accurate answer using the verified web fallback evidence instead of outdated local docs.',
        technicalDetails: 'Avoids hallucinating outdated internal information.',
        samplePayload: {
          title: 'Grounded Answer',
          format: 'text',
          content: 'CVE-2026-1182 is resolved in Kubernetes v1.33.2. Remediation requires updating containerd to version 2.1.0 or higher to eliminate the memory race condition in kernel cgroups.',
        },
        keyTools: ['Corrective Generation', 'Grounded LLM'],
      },
    ],
    edges: [
      { from: 'crag-query', to: 'crag-retriever', label: 'Query' },
      { from: 'crag-retriever', to: 'crag-evaluator', label: 'Local docs' },
      { from: 'crag-evaluator', to: 'crag-fallback', label: 'If Low Confidence' },
      { from: 'crag-evaluator', to: 'crag-synthesis', label: 'If High Confidence' },
      { from: 'crag-fallback', to: 'crag-synthesis', label: 'Verified Web Docs' },
    ],
  },

  {
    id: 'self-rag',
    name: 'Self-RAG',
    subtitle: 'Self-reflective tokens for retrieval necessity, relevance, and groundedness',
    difficulty: 'Advanced',
    category: 'Reflection Tokens',
    description: 'Introduces self-reflection tokens: [Retrieve] determines if retrieval is needed, [IsRel] grades passage relevance, [IsSup] checks if claims are supported, and [IsUse] scores answer usefulness.',
    nodes: [
      {
        id: 'self-input',
        label: 'Prompt Input',
        sub: '"Summarize photosynthesis"',
        icon: Brain,
        color: '#3b82f6',
        phase: 'Input',
        description: 'Input query analyzed to determine if retrieval is even necessary.',
        technicalDetails: 'Common knowledge queries can be answered directly; factual/domain queries trigger retrieval.',
        samplePayload: {
          title: 'Input Query',
          format: 'text',
          content: 'Query: "What is the quantum yield efficiency in C4 photosynthesis light reactions?"',
        },
        keyTools: ['Reflection Model'],
      },
      {
        id: 'self-decision',
        label: '[Retrieve] Token',
        sub: 'Retrieval Necessity Decision',
        icon: Zap,
        color: '#fbbf24',
        phase: 'Evaluation',
        description: 'Model outputs special token: [Retrieve: Yes] or [Retrieve: No].',
        technicalDetails: 'Prevents unnecessary vector DB lookups for general knowledge, saving latency and cost.',
        samplePayload: {
          title: 'Reflection Token Output',
          format: 'json',
          content: '{\n  "token": "[Retrieve:Yes]",\n  "confidence": 0.94,\n  "rationale": "Specialized biophysics question requiring peer-reviewed constants."\n}',
        },
        keyTools: ['Self-RAG Fine-Tuned LM'],
      },
      {
        id: 'self-passages',
        label: '[IsRel] Token',
        sub: 'Passage Relevance Grading',
        icon: Search,
        color: '#a855f7',
        phase: 'Retrieval',
        description: 'Evaluates each retrieved passage individually with [IsRel: Relevant] or [IsRel: Irrelevant].',
        technicalDetails: 'Filters out noisy passages before generation begins.',
        samplePayload: {
          title: 'Passage Relevance Assessment',
          format: 'json',
          content: '[\n  {"passage_1": "[IsRel:Relevant]", "score": 0.91},\n  {"passage_2": "[IsRel:Irrelevant]", "score": 0.12}\n]',
        },
        keyTools: ['Critic Token Evaluation'],
      },
      {
        id: 'self-critique',
        label: '[IsSup] Grounding Check',
        sub: 'Support Verification',
        icon: ShieldCheck,
        color: '#06b6d4',
        phase: 'Evaluation',
        description: 'Checks if every generated sentence is strictly supported by the retrieved passage: [IsSup: FullySupported].',
        technicalDetails: 'Detects hallucinations at sentence level. Rewrites any unsupported claim.',
        samplePayload: {
          title: 'Support Verification Token',
          format: 'json',
          content: '{\n  "sentence": "C4 quantum yield approaches ~0.065 mol CO2 per absorbed photon.",\n  "token": "[IsSup:FullySupported]",\n  "supporting_passage": "Passage 1 (Bioenergetics 2024)"\n}',
        },
        keyTools: ['Hallucination Critic'],
      },
      {
        id: 'self-output',
        label: '[IsUse] High-Utility Answer',
        sub: 'Optimized Grounded Response',
        icon: CheckCircle2,
        color: '#22c55e',
        phase: 'Generation',
        description: 'Selects the candidate response segment with highest overall utility score [IsUse: 5/5].',
        technicalDetails: 'Guarantees the response is both factually grounded and directly answers the user prompt.',
        samplePayload: {
          title: 'Self-Reflected Final Answer',
          format: 'text',
          content: 'In C4 plants, the quantum yield efficiency in light reactions typically reaches ~0.065 mol CO2 per mol absorbed photons under high light and temperature, outperforming C3 species by minimizing photorespiration.',
        },
        keyTools: ['Self-RAG Output Selector'],
      },
    ],
    edges: [
      { from: 'self-input', to: 'self-decision', label: 'Inspect query' },
      { from: 'self-decision', to: 'self-passages', label: 'If [Retrieve:Yes]' },
      { from: 'self-passages', to: 'self-critique', label: 'Filtered passages' },
      { from: 'self-critique', to: 'self-output', label: 'Verified claims' },
    ],
  },

  {
    id: 'graphrag',
    name: 'GraphRAG',
    subtitle: 'Knowledge graph entity-relation extraction and community summaries',
    difficulty: 'Advanced',
    category: 'Graph Reasoning',
    description: 'Builds a connected knowledge graph of entities and relationships. Excels at global dataset synthesis and multi-hop questions (e.g. "How does Django connect Python code to a database?").',
    nodes: [
      {
        id: 'graph-corpus',
        label: 'Unstructured Text',
        sub: 'Architecture Manuals',
        icon: FileText,
        color: '#3b82f6',
        phase: 'Ingestion',
        description: 'Large corpus of technical documentation with interconnected concepts.',
        technicalDetails: 'Example documentation covering Django ORM, DB Drivers, and PostgreSQL connection pools.',
        samplePayload: {
          title: 'Input Text Corpus',
          format: 'text',
          content: 'Django applications communicate with PostgreSQL via psycopg2 database drivers through Django ORM model definitions.',
        },
        keyTools: ['Text Parsers', 'Corpus Reader'],
      },
      {
        id: 'entity-extractor',
        label: 'Entity & Relation Extractor',
        sub: 'Graph Construction LLM',
        icon: Network,
        color: '#fbbf24',
        phase: 'Indexing',
        description: 'Extracts nodes (Python, Django ORM, PostgreSQL) and typed edges (USES, TRANSLATES_TO, CONNECTS_VIA).',
        technicalDetails: 'Extracts triplets (Head, Relation, Tail) with semantic properties.',
        samplePayload: {
          title: 'Extracted Graph Triplets',
          format: 'json',
          content: '[\n  {"head": "Python Code", "relation": "DEFINES_MODELS_IN", "tail": "Django ORM"},\n  {"head": "Django ORM", "relation": "TRANSLATES_TO_SQL_FOR", "tail": "DB Driver (psycopg)"},\n  {"head": "DB Driver", "relation": "MAINTAINS_SOCKET_WITH", "tail": "PostgreSQL Database"}\n]',
        },
        keyTools: ['LangChain GraphTransformers', 'Microsoft GraphRAG'],
      },
      {
        id: 'graph-db',
        label: 'Knowledge Graph Store',
        sub: 'Neo4j / NetworkX',
        icon: Database,
        color: '#a855f7',
        phase: 'Indexing',
        description: 'Persists nodes, relationships, and computes hierarchical Leiden community clusters.',
        technicalDetails: 'Graph database supporting Cypher queries and community summary generation.',
        samplePayload: {
          title: 'Graph Schema & Community Clusters',
          format: 'json',
          content: '{\n  "nodes": 450,\n  "relationships": 1280,\n  "communities": 12,\n  "community_summaries": ["Web Framework Cluster", "Database Persistence Cluster"]\n}',
        },
        keyTools: ['Neo4j', 'Amazon Neptune', 'NetworkX'],
      },
      {
        id: 'graph-retrieval',
        label: 'Graph Traversal Retrieval',
        sub: 'Multi-Hop Cypher Query',
        icon: Search,
        color: '#06b6d4',
        phase: 'Retrieval',
        description: 'Traverses edges from "Python" to "Database", capturing intermediary drivers and protocols that vector search misses.',
        technicalDetails: 'Executes 2-hop neighbor traversal combining local entities with global community summaries.',
        samplePayload: {
          title: 'Graph Traversal Path',
          format: 'json',
          content: '{\n  "path": "(Python Code) -> [:DEFINES] -> (Django ORM) -> [:COMPUTES_SQL] -> (DB Backend) -> [:TCP_CONNECTION] -> (PostgreSQL)",\n  "hops": 3\n}',
        },
        keyTools: ['Cypher Query Engine', 'Community Summarizer'],
      },
      {
        id: 'graph-synthesis',
        label: 'Holistic Synthesis',
        sub: 'Relationship-Aware Answer',
        icon: CheckCircle2,
        color: '#22c55e',
        phase: 'Generation',
        description: 'Answers how components relate across the entire architecture with full contextual awareness.',
        technicalDetails: 'Uncovers holistic architecture patterns impossible to find from isolated vector chunks.',
        samplePayload: {
          title: 'Final Graph-Augmented Output',
          format: 'text',
          content: 'Django connects Python code to a database through a layered architecture:\n1. Python models define schema declarations.\n2. Django ORM translates QuerySets into SQL statements.\n3. The database backend executes SQL via client libraries (e.g. psycopg).\n4. Persistent connections communicate over TCP sockets with PostgreSQL.',
        },
        keyTools: ['Graph Augmented LLM', 'Structured Reasoning'],
      },
    ],
    edges: [
      { from: 'graph-corpus', to: 'entity-extractor', label: 'Extract triplets' },
      { from: 'entity-extractor', to: 'graph-db', label: 'Build graph' },
      { from: 'graph-db', to: 'graph-retrieval', label: 'Traverse paths' },
      { from: 'graph-retrieval', to: 'graph-synthesis', label: 'Context paths' },
    ],
  },

  {
    id: 'multimodal-rag',
    name: 'Multimodal RAG',
    subtitle: 'Joint image, table, and text embedding with vision models',
    difficulty: 'Advanced',
    category: 'Cross-Modal',
    description: 'Retrieves across text, tables, and images. Uses Vision Transformers (ColPali, CLIP) and multimodal LLMs (GPT-4o) to answer queries about complex PDFs containing diagrams, graphs, and structured charts.',
    nodes: [
      {
        id: 'mm-pdf',
        label: 'Rich PDF Document',
        sub: 'Text + Tables + Charts',
        icon: FileText,
        color: '#3b82f6',
        phase: 'Ingestion',
        description: 'Documents with critical data locked in visual charts, diagrams, and complex tables.',
        technicalDetails: 'Standard OCR misses context from financial bar charts and process diagrams.',
        samplePayload: {
          title: 'Multimodal Asset Ingestion',
          format: 'json',
          content: '{\n  "page_1": {"type": "text_paragraph"},\n  "page_2": {"type": "quarterly_earnings_barchart.png"},\n  "page_3": {"type": "pricing_matrix_table"}\n}',
        },
        keyTools: ['pdf2image', 'Unstructured Image Extractor'],
      },
      {
        id: 'mm-parser',
        label: 'Vision Parser & OCR',
        sub: 'Image & Table Extraction',
        icon: Image,
        color: '#fbbf24',
        phase: 'Ingestion',
        description: 'Extracts cropped images, converts tables into structured Markdown/HTML, and preserves page layouts.',
        technicalDetails: 'Table Transformer or Gemini Flash Vision describes complex charts into structured data.',
        samplePayload: {
          title: 'Vision Summary of Chart',
          format: 'text',
          content: 'Chart Description: Bar chart comparing Q1-Q4 revenue. Q1: $10M, Q2: $14M, Q3: $18M, Q4: $24M. Trend indicates 140% annual growth.',
        },
        keyTools: ['Table Transformer', 'GPT-4o Vision API', 'PaddleOCR'],
      },
      {
        id: 'mm-embedder',
        label: 'Cross-Modal Embedder',
        sub: 'CLIP / ColPali Vision Embeddings',
        icon: Binary,
        color: '#a855f7',
        phase: 'Indexing',
        description: 'Embeds text and image patches into a shared mathematical latent space where text queries match diagrams.',
        technicalDetails: 'ColPali produces multi-vector patch embeddings directly from page screenshots without needing OCR.',
        samplePayload: {
          title: 'Cross-Modal Vector Coordinates',
          format: 'json',
          content: '{\n  "model": "ColPali-v1.2",\n  "patch_embeddings": 1024,\n  "modality": "image_patch_tokens",\n  "shared_embedding_dim": 128\n}',
        },
        keyTools: ['ColPali', 'OpenAI CLIP', 'Google SigLIP'],
      },
      {
        id: 'mm-retriever',
        label: 'Multimodal Vector Store',
        sub: 'Text-to-Image Top-K Search',
        icon: Search,
        color: '#06b6d4',
        phase: 'Retrieval',
        description: 'User query "Show me Q4 revenue growth graph" retrieves both the textual paragraph and the exact chart image.',
        technicalDetails: 'Returns paired multimodal context (text chunk + cropped high-res image bitmap).',
        samplePayload: {
          title: 'Retrieved Multimodal Bundle',
          format: 'json',
          content: '{\n  "text_chunk": "Annual performance reached record highs...",\n  "image_asset": "earnings_barchart_p2.png",\n  "similarity_score": 0.932\n}',
        },
        keyTools: ['Qdrant Multimodal Store', 'Weaviate Image Vectorizer'],
      },
      {
        id: 'mm-llm',
        label: 'Multimodal LLM',
        sub: 'GPT-4o Vision Synthesis',
        icon: Brain,
        color: '#ef4444',
        phase: 'Generation',
        description: 'Model inspects both the retrieved image pixels and textual context to formulate a rich, grounded answer.',
        technicalDetails: 'Model visually reads the bar heights in the chart to verify the numbers cited in text.',
        samplePayload: {
          title: 'Multimodal Grounded Answer',
          format: 'text',
          content: 'According to the Q4 Revenue Bar Chart on Page 2, revenue grew from $10M in Q1 to $24M in Q4 (140% growth), exceeding the projected targets shown in the accompanying table.',
        },
        keyTools: ['GPT-4o Vision', 'Claude 3.5 Sonnet', 'Gemini 1.5 Pro'],
      },
    ],
    edges: [
      { from: 'mm-pdf', to: 'mm-parser', label: 'Extract images/tables' },
      { from: 'mm-parser', to: 'mm-embedder', label: 'Cross-modal vectors' },
      { from: 'mm-embedder', to: 'mm-retriever', label: 'Shared index' },
      { from: 'mm-retriever', to: 'mm-llm', label: 'Image + Text payload' },
    ],
  },
];

interface AnimatedArchitectureVisualizerProps {
  initialType?: string;
  allowSwitching?: boolean;
}

export default function AnimatedArchitectureVisualizer({
  initialType = 'basic-rag',
  allowSwitching = true,
}: AnimatedArchitectureVisualizerProps) {
  const [selectedArchId, setSelectedArchId] = useState<string>(initialType);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync if initialType changes
  useEffect(() => {
    if (initialType) {
      setSelectedArchId(initialType);
      setActiveStep(0);
    }
  }, [initialType]);

  const currentArch = architectures.find(a => a.id === selectedArchId) || architectures[0];
  const currentNode = currentArch.nodes[activeStep] || currentArch.nodes[0];

  // Auto-play interval engine
  useEffect(() => {
    if (isPlaying) {
      const intervalMs = Math.round(2200 / playbackSpeed);
      timerRef.current = setInterval(() => {
        setActiveStep(prev => (prev + 1) % currentArch.nodes.length);
      }, intervalMs);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed, currentArch.nodes.length]);

  const handleNext = () => {
    setIsPlaying(false);
    setActiveStep(prev => (prev + 1) % currentArch.nodes.length);
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setActiveStep(prev => (prev - 1 + currentArch.nodes.length) % currentArch.nodes.length);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleSelectNode = (index: number) => {
    setIsPlaying(false);
    setActiveStep(index);
  };

  const difficultyColors = {
    Beginner: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    Intermediate: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    Advanced: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
  };

  return (
    <div className="rounded-2xl border border-[var(--color-border-primary)] bg-[var(--color-bg-card)] overflow-hidden shadow-2xl transition-all">
      {/* Visualizer Header */}
      <div className="p-4 sm:p-6 border-b border-[var(--color-border-primary)] bg-[var(--color-bg-primary)]/80 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[var(--color-accent-purple)]/15 text-[var(--color-accent-purple)] border border-[var(--color-accent-purple)]/30">
              <Sparkles size={12} className="animate-spin" /> Interactive Animated Architecture
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${difficultyColors[currentArch.difficulty]}`}>
              {currentArch.difficulty}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--color-text-primary)]">
            {currentArch.name}
          </h3>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-0.5">
            {currentArch.subtitle}
          </p>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center flex-wrap gap-2 self-start md:self-auto bg-[var(--color-bg-tertiary)]/70 p-2 rounded-xl border border-[var(--color-border-primary)]">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-accent-purple)] text-white text-xs font-semibold hover:bg-[var(--color-accent-purple)]/80 transition-all shadow-md active:scale-95"
            title={isPlaying ? 'Pause Animation' : 'Play Animation'}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            <span>{isPlaying ? 'Pause' : 'Play Flow'}</span>
          </button>

          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              className="p-1.5 rounded-lg hover:bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] hover:text-white transition-colors"
              title="Previous Step"
            >
              <SkipBack size={14} />
            </button>
            <button
              onClick={handleNext}
              className="p-1.5 rounded-lg hover:bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] hover:text-white transition-colors"
              title="Next Step"
            >
              <SkipForward size={14} />
            </button>
            <button
              onClick={handleReset}
              className="p-1.5 rounded-lg hover:bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] hover:text-white transition-colors"
              title="Reset Flow to Start"
            >
              <RotateCcw size={14} />
            </button>
          </div>

          <div className="h-4 w-px bg-[var(--color-border-primary)] mx-1" />

          {/* Speed Toggle */}
          <div className="flex items-center gap-1 text-[11px] font-mono">
            {[1, 1.5, 2].map(speed => (
              <button
                key={speed}
                onClick={() => setPlaybackSpeed(speed)}
                className={`px-2 py-0.5 rounded transition-colors ${
                  playbackSpeed === speed
                    ? 'bg-[var(--color-accent-yellow)] text-black font-bold'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Architecture Tabs (If switching is enabled) */}
      {allowSwitching && (
        <div className="px-4 py-2.5 bg-[var(--color-bg-secondary)] border-b border-[var(--color-border-primary)] overflow-x-auto scrollbar-none flex items-center gap-1.5">
          {architectures.map(arch => (
            <button
              key={arch.id}
              onClick={() => {
                setSelectedArchId(arch.id);
                setActiveStep(0);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedArchId === arch.id
                  ? 'bg-[var(--color-accent-purple)] text-white font-semibold shadow-sm ring-1 ring-white/20'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]'
              }`}
            >
              <span>{arch.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Visual Canvas Area */}
      <div className="p-6 sm:p-8 relative bg-gradient-to-b from-[var(--color-bg-primary)] to-[var(--color-bg-card)] overflow-x-auto">
        {/* Animated Background subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Nodes and Flow Path */}
        <div className="relative flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-6 min-w-[720px]">
          {currentArch.nodes.map((node, index) => {
            const IconComponent = node.icon;
            const isActive = index === activeStep;
            const isCompleted = index < activeStep;

            return (
              <div key={node.id} className="flex items-center">
                {/* Node Card */}
                <button
                  onClick={() => handleSelectNode(index)}
                  className={`group relative flex flex-col items-center p-3 sm:p-4 rounded-xl border text-center transition-all duration-300 w-32 sm:w-36 select-none ${
                    isActive
                      ? 'scale-105 z-20 border-[var(--color-accent-yellow)] shadow-[0_0_25px_rgba(251,191,36,0.35)] ring-2 ring-[var(--color-accent-yellow)]/60'
                      : isCompleted
                      ? 'border-[var(--color-border-hover)] bg-[var(--color-bg-card)] opacity-90'
                      : 'border-[var(--color-border-primary)] bg-[var(--color-bg-card)]/60 opacity-60 hover:opacity-100 hover:border-[var(--color-border-hover)]'
                  }`}
                  style={{
                    backgroundColor: isActive
                      ? `color-mix(in srgb, ${node.color} 18%, var(--color-bg-card))`
                      : undefined,
                  }}
                >
                  {/* Step Badge */}
                  <div className="absolute -top-2.5 -left-2.5 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shadow-md transition-all">
                    {isActive ? (
                      <span className="w-full h-full rounded-full bg-[var(--color-accent-yellow)] text-black flex items-center justify-center animate-bounce">
                        {index + 1}
                      </span>
                    ) : isCompleted ? (
                      <span className="w-full h-full rounded-full bg-emerald-500 text-white flex items-center justify-center">
                        ✓
                      </span>
                    ) : (
                      <span className="w-full h-full rounded-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border-primary)] text-[var(--color-text-muted)] flex items-center justify-center">
                        {index + 1}
                      </span>
                    )}
                  </div>

                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-2 transition-transform group-hover:scale-110"
                    style={{
                      background: `color-mix(in srgb, ${node.color} 20%, transparent)`,
                      color: node.color,
                    }}
                  >
                    <IconComponent size={20} />
                  </div>

                  {/* Label & Subtitle */}
                  <span className="text-xs sm:text-sm font-bold text-[var(--color-text-primary)] leading-tight mb-0.5 line-clamp-2">
                    {node.label}
                  </span>
                  <span className="text-[10px] text-[var(--color-text-muted)] truncate max-w-full">
                    {node.sub}
                  </span>

                  {/* Active Pulse Ring */}
                  {isActive && (
                    <span className="absolute -bottom-1 w-2 h-2 rounded-full bg-[var(--color-accent-yellow)] animate-ping" />
                  )}
                </button>

                {/* Animated Arrow Connector (if not last) */}
                {index < currentArch.nodes.length - 1 && (
                  <div className="relative flex items-center px-2 sm:px-3">
                    {/* Background line */}
                    <div className="w-6 sm:w-8 h-[2px] bg-[var(--color-border-primary)] rounded-full relative overflow-hidden">
                      {/* Animated traveling data particle */}
                      {isActive && isPlaying && (
                        <div
                          className="absolute top-0 bottom-0 w-3 bg-gradient-to-r from-transparent via-[var(--color-accent-yellow)] to-white animate-pulse"
                          style={{
                            animation: `moveRight ${Math.round(2000 / playbackSpeed)}ms linear infinite`,
                          }}
                        />
                      )}
                    </div>
                    {/* Arrow head */}
                    <div
                      className={`w-0 h-0 border-t-[4px] border-b-[4px] border-l-[6px] border-t-transparent border-b-transparent transition-colors ${
                        isActive
                          ? 'border-l-[var(--color-accent-yellow)]'
                          : isCompleted
                          ? 'border-l-emerald-500'
                          : 'border-l-[var(--color-border-primary)]'
                      }`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Execution Inspector Panel */}
      <div className="border-t border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)]/90 p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
          {/* Left: Step narrative & explanation */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[var(--color-accent-purple)] text-white text-xs font-bold">
                Step {activeStep + 1}
              </span>
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-[var(--color-accent-yellow)] block">
                  {currentNode.phase} Phase
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-[var(--color-text-primary)]">
                  {currentNode.label} — {currentNode.sub}
                </h4>
              </div>
            </div>

            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              {currentNode.description}
            </p>

            <div className="p-3.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] text-xs text-[var(--color-text-secondary)] space-y-1">
              <strong className="text-[var(--color-text-primary)] block">Under The Hood:</strong>
              <p>{currentNode.technicalDetails}</p>
            </div>

            {/* Key Tools */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-xs text-[var(--color-text-muted)] mr-1">Industry Tools:</span>
              {currentNode.keyTools.map(tool => (
                <span
                  key={tool}
                  className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-[var(--color-bg-tertiary)] text-[var(--color-accent-cyan)] border border-[var(--color-border-primary)]"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Live Simulated Payload Data Stream */}
          <div className="w-full lg:w-5/12 rounded-xl border border-[var(--color-border-primary)] bg-[var(--color-bg-primary)] overflow-hidden shadow-inner">
            <div className="px-4 py-2.5 bg-[var(--color-bg-tertiary)] border-b border-[var(--color-border-primary)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs font-mono font-semibold text-[var(--color-text-muted)] ml-2">
                  {currentNode.samplePayload.title}
                </span>
              </div>
              <span className="text-[10px] font-mono uppercase text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                LIVE PAYLOAD
              </span>
            </div>

            <div className="p-4 font-mono text-xs overflow-x-auto max-h-56 leading-relaxed text-[var(--color-text-secondary)] whitespace-pre">
              {currentNode.samplePayload.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
