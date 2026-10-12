export interface Lesson {
  slug: string;
  title: string;
  description: string;
  category: LessonCategory;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  order: number;
  icon: string;
  estimatedMinutes: number;
  prerequisites?: string[];
  tags: string[];
}

export type LessonCategory =
  | 'fundamentals'
  | 'approaches'
  | 'tools'
  | 'projects'
  | 'comparison';

export interface LessonContent {
  slug: string;
  sections: ContentSection[];
}

export interface ContentSection {
  id: string;
  title: string;
  content: string;
  type?: 'text' | 'code' | 'diagram' | 'table' | 'callout' | 'comparison';
  language?: string;
  diagramType?: 'pipeline' | 'architecture' | 'flow' | 'comparison';
}

export interface Tool {
  slug: string;
  name: string;
  description: string;
  category: ToolCategory;
  ragComponent: string;
  whenToUse: string;
  example: string;
  docsUrl: string;
  icon: string;
  tags: string[];
}

export type ToolCategory =
  | 'framework'
  | 'vector-database'
  | 'orchestration'
  | 'model-runner'
  | 'embedding'
  | 'search-engine'
  | 'platform';

export interface Project {
  slug: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  stack: string[];
  estimatedHours: number;
  prerequisites: string[];
}

export interface GlossaryEntry {
  term: string;
  slug: string;
  definition: string;
  relatedTerms: string[];
  category: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  children?: NavItem[];
  badge?: string;
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

export interface SearchResult {
  title: string;
  description: string;
  href: string;
  category: string;
  type: 'lesson' | 'tool' | 'project' | 'glossary';
}
