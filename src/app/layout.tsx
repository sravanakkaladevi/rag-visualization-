import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'RAG Learning Hub — Understand RAG. Build Smarter AI.',
  description:
    'Learn Retrieval-Augmented Generation from beginner to advanced. Explore RAG architectures, retrieval techniques, vector databases, frameworks, and practical implementations.',
  keywords: [
    'RAG', 'Retrieval-Augmented Generation', 'AI', 'LLM', 'Vector Database',
    'Embeddings', 'LangChain', 'LlamaIndex', 'ChromaDB', 'Machine Learning',
  ],
  openGraph: {
    title: 'RAG Learning Hub — Understand RAG. Build Smarter AI.',
    description:
      'Learn Retrieval-Augmented Generation from beginner to advanced. Explore RAG architectures, retrieval techniques, and practical implementations.',
    type: 'website',
    siteName: 'RAG Learning Hub',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <Header />
        <div className="pt-16 min-h-screen">{children}</div>
      </body>
    </html>
  );
}
