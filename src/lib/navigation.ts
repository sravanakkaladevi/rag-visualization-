import { NavItem } from './types';

export const navigation: NavItem[] = [
  {
    title: 'Getting Started',
    href: '/learn',
    icon: 'BookOpen',
    children: [
      { title: 'RAG Fundamentals', href: '/learn/rag-fundamentals', icon: 'Lightbulb' },
    ],
  },
  {
    title: 'RAG Approaches',
    href: '/learn',
    icon: 'Layers',
    children: [
      { title: 'Basic / Naive RAG', href: '/learn/basic-rag', icon: 'FileText', badge: 'Beginner' },
      { title: 'Conversational RAG', href: '/learn/conversational-rag', icon: 'MessageSquare' },
      { title: 'Hybrid RAG', href: '/learn/hybrid-rag', icon: 'GitMerge' },
      { title: 'Agentic RAG', href: '/learn/agentic-rag', icon: 'Bot' },
      { title: 'Corrective RAG', href: '/learn/corrective-rag', icon: 'ShieldCheck' },
      { title: 'Self-RAG', href: '/learn/self-rag', icon: 'Brain' },
      { title: 'GraphRAG', href: '/learn/graphrag', icon: 'Network' },
      { title: 'Multimodal RAG', href: '/learn/multimodal-rag', icon: 'Image' },
    ],
  },
  {
    title: 'Tools & Frameworks',
    href: '/tools',
    icon: 'Wrench',
  },
  {
    title: 'Projects',
    href: '/projects',
    icon: 'FolderGit2',
    children: [
      { title: 'Chat with PDF', href: '/projects/chat-with-pdf', icon: 'FileQuestion' },
      { title: 'Conversational RAG', href: '/projects/conversational-rag', icon: 'MessagesSquare' },
      { title: 'Hybrid Search', href: '/projects/hybrid-rag', icon: 'Search' },
      { title: 'Agentic RAG', href: '/projects/agentic-rag', icon: 'Workflow' },
      { title: 'Local RAG', href: '/projects/local-rag', icon: 'HardDrive' },
    ],
  },
  {
    title: 'RAG vs Fine-Tuning',
    href: '/compare/rag-vs-fine-tuning',
    icon: 'Scale',
  },
  {
    title: 'Glossary',
    href: '/glossary',
    icon: 'BookA',
  },
];

export const lessonOrder = [
  'rag-fundamentals',
  'basic-rag',
  'conversational-rag',
  'hybrid-rag',
  'agentic-rag',
  'corrective-rag',
  'self-rag',
  'graphrag',
  'multimodal-rag',
];

export function getPreviousLesson(currentSlug: string): { title: string; href: string } | null {
  const idx = lessonOrder.indexOf(currentSlug);
  if (idx <= 0) return null;
  const prevSlug = lessonOrder[idx - 1];
  const allLessons = navigation.flatMap(n => n.children || []);
  const found = allLessons.find(l => l.href === `/learn/${prevSlug}`);
  return found ? { title: found.title, href: found.href } : null;
}

export function getNextLesson(currentSlug: string): { title: string; href: string } | null {
  const idx = lessonOrder.indexOf(currentSlug);
  if (idx < 0 || idx >= lessonOrder.length - 1) return null;
  const nextSlug = lessonOrder[idx + 1];
  const allLessons = navigation.flatMap(n => n.children || []);
  const found = allLessons.find(l => l.href === `/learn/${nextSlug}`);
  return found ? { title: found.title, href: found.href } : null;
}
