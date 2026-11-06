import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import { Analytics } from '@vercel/analytics/next';

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Familjen+Grotesk:ital,wght@0,400;0,500;0,600;0,700&family=IBM+Plex+Sans:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5678245833862577"
          crossOrigin="anonymous"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var m=localStorage.getItem('mode');if(m==='dark'||(!m&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.dataset.mode='dark';}else{document.documentElement.dataset.mode='light';}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="antialiased">
        <Header />
        <div className="pt-16 min-h-screen">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
