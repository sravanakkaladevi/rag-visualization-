# RAG Learning Hub & Visualizer 🚀

[![Live Demo](https://img.shields.io/badge/Live%20Demo-rag--visualization.vercel.app-7928CA?style=for-the-badge&logo=vercel&logoColor=white)](https://rag-visualization.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

An interactive, visual-first educational platform and architecture simulator for **Retrieval-Augmented Generation (RAG)**. Understand how LLMs retrieve knowledge, inspect vector embeddings, and explore 8 real-world RAG architectures from beginner to advanced.

👉 **Experience the live app:** [rag-visualization.vercel.app](https://rag-visualization.vercel.app/)

---

## 🌟 Key Highlights

- ⚡ **Interactive Architecture Simulator**: Step-by-step visual animation for 8 distinct RAG architecture patterns with playback controls (play/pause, speed toggling 1x/1.5x/2x, stage scrubbing, and payload inspectors).
- 📚 **In-Depth Lessons**: Comprehensive guides covering fundamentals, chunking strategies, embedding models, vector indices, re-ranking, and evaluation metrics.
- 🛠️ **15+ AI Tools Covered**: Deep dives and comparisons for frameworks (LangChain, LlamaIndex), vector stores (ChromaDB, FAISS, Pinecone, Qdrant), graph databases (Neo4j), and local runtimes (Ollama).
- 🧩 **Hands-on Projects**: Step-by-step tutorials to build practical AI applications (Chat with PDF, Agentic Research Assistant, GraphRAG, etc.).
- ⚖️ **Architecture Comparisons**: Side-by-side matrices (RAG vs. Fine-Tuning, Sparse vs. Dense Retrieval, etc.) with decision guides.
- 📖 **RAG Glossary**: Searchable, categorized dictionary of modern AI and retrieval terminology.
- 🌓 **Sleek Responsive UI**: Modern dark/light mode design powered by Tailwind CSS v4 and Lucide icons.

---

## 🧠 8 Animated RAG Architectures

The simulator allows you to inspect data flow, latency, and intermediate payloads across 8 production patterns:

| Architecture | Complexity | Key Concepts | Use Case |
|---|---|---|---|
| **1. Basic / Naive RAG** | Beginner | Chunking $\rightarrow$ Dense Embeddings $\rightarrow$ Cosine Top-K $\rightarrow$ LLM | Simple document Q&A |
| **2. Conversational RAG** | Intermediate | Query Rewriting + Chat Memory + Session State | Multi-turn support chatbots |
| **3. Hybrid RAG** | Intermediate | Dense Vector + Sparse BM25 Search + Reciprocal Rank Fusion (RRF) | Technical & keyword-sensitive search |
| **4. Agentic RAG** | Advanced | Autonomous Tool Selection + ReAct Loops + Dynamic Routing | Complex multi-source research |
| **5. Corrective RAG (CRAG)** | Advanced | Retrieval Evaluator + Web Fallback Search + Document Refinement | Robust factual accuracy |
| **6. Self-RAG** | Advanced | Self-reflection tokens (`[Retrieve]`, `[IsRel]`, `[IsSup]`, `[IsUse]`) | Hallucination mitigation |
| **7. GraphRAG** | Advanced | Entity-relation extraction + Knowledge Graph traversal + Community detection | Connected enterprise knowledge |
| **8. Multimodal RAG** | Advanced | CLIP embeddings + OCR + Cross-modal vector alignment | Slides, charts, diagrams, PDFs |

---

## 🏗️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **UI & Runtime**: [React 19](https://react.dev/), TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18.18.0 or later
- [npm](https://www.npmjs.com/), [pnpm](https://pnpm.io/), or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sravanakkaladevi/rag-visualization-.git
   cd rag-visualization-
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📁 Project Structure

```text
src/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Landing page & architecture showcase
│   ├── layout.tsx                # Root layout with theme provider & header
│   ├── globals.css               # Design system tokens & utility styles
│   ├── learn/                    # Lesson pages and category breakdowns
│   ├── tools/                    # Tool reference and tech stack directories
│   ├── projects/                 # Practical step-by-step project tutorials
│   ├── compare/                  # RAG vs Fine-Tuning & comparison matrix
│   └── glossary/                 # Interactive terms glossary & search
├── components/                   # Reusable React UI components
│   ├── AnimatedArchitectureVisualizer.tsx # 8 animated architecture workflows
│   ├── RAGPipeline.tsx           # Interactive 7-stage basic pipeline
│   ├── Header.tsx                # Responsive top navigation & theme toggle
│   ├── Sidebar.tsx               # Collapsible curriculum navigation
│   ├── CodeBlock.tsx             # Syntax-highlighted code snippets
│   └── Callout.tsx               # Callout boxes (Notes, Tips, Warnings)
└── lib/                          # Data sources and helpers
    ├── lessons-data.ts           # Full curriculum content & metadata
    ├── tools-data.ts             # Tools specifications & comparisons
    ├── projects-data.ts          # Project guides and implementations
    └── glossary-data.ts          # Searchable dictionary terms
```

---

## 🔮 Roadmap & Future Enhancements

- [ ] **Live Sandbox / Playground**: In-browser client-side embedding calculation and vector cosine similarity testing with Transformers.js.
- [ ] **Interactive Quiz & Progress Tracking**: Lesson completion indicators and knowledge checks.
- [ ] **Custom Pipeline Builder**: Drag-and-drop node builder to assemble custom RAG topologies.
- [ ] **Export Pipeline as Code**: Generate LangChain / LlamaIndex / Python scripts directly from simulated architectures.

---

## 🤝 Contributing

Contributions, feedback, and suggestions are welcome!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License.
