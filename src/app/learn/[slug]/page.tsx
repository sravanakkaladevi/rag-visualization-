import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Clock, Award, CheckCircle2, ChevronRight, BookOpen, Sparkles
} from 'lucide-react';
import { lessons } from '@/lib/lessons-data';
import ArchitectureDiagram from '@/components/ArchitectureDiagram';
import CodeBlock from '@/components/CodeBlock';
import Callout from '@/components/Callout';
import TableOfContents from '@/components/TableOfContents';
import LessonNavigation from '@/components/LessonNavigation';
import Sidebar from '@/components/Sidebar';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(lessons).map(slug => ({ slug }));
}

export const instant = false;

function parseInlineMarkdown(text: string): React.ReactNode[] {
  // Regex to match **bold** and `code`
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="text-[var(--color-text-primary)] font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 text-xs rounded bg-[var(--color-bg-tertiary)] border border-[var(--color-border-primary)] text-[var(--color-accent-purple)] font-mono"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

function FormattedContent({ content }: { content: string }) {
  const blocks = content.split(/\n\n+/);

  return (
    <div className="space-y-4 text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">
      {blocks.map((block, idx) => {
        const trimmed = block.trim();
        const isPoint =
          trimmed.startsWith('**') ||
          trimmed.startsWith('- ') ||
          trimmed.startsWith('* ') ||
          /^\d+\.\s/.test(trimmed);

        if (isPoint) {
          const cleanText = trimmed.replace(/^[-*]\s+/, '');
          return (
            <div key={idx} className="flex items-start gap-3 my-2.5 pl-1">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent-purple)] mt-2 shrink-0 ring-4 ring-[var(--color-accent-purple)]/10" />
              <div className="flex-1 leading-relaxed">
                {parseInlineMarkdown(cleanText)}
              </div>
            </div>
          );
        }

        return (
          <p key={idx} className="leading-relaxed">
            {parseInlineMarkdown(trimmed)}
          </p>
        );
      })}
    </div>
  );
}


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const lesson = lessons[slug];
  if (!lesson) return { title: 'Lesson Not Found — RAG Learning Hub' };

  return {
    title: `${lesson.title} — RAG Learning Hub`,
    description: lesson.description,
  };
}

export default async function LessonPage({ params }: PageProps) {
  const { slug } = await params;
  const lesson = lessons[slug];

  if (!lesson) {
    notFound();
  }

  const tocItems = lesson.sections.map(s => ({
    id: s.id,
    title: s.title,
    level: s.level,
  }));

  const difficultyColors = {
    beginner: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    intermediate: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    advanced: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 min-w-0 px-4 sm:px-8 py-8 xl:pr-64 max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] mb-6">
          <Link href="/" className="hover:text-[var(--color-text-primary)] transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <Link href="/learn" className="hover:text-[var(--color-text-primary)] transition-colors">
            Learn
          </Link>
          <ChevronRight size={12} />
          <span className="text-[var(--color-accent-purple)] font-medium truncate max-w-[200px] sm:max-w-none">
            {lesson.title}
          </span>
        </nav>

        {/* Lesson Header */}
        <header className="mb-10 pb-8 border-b border-[var(--color-border-primary)]">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${
                difficultyColors[lesson.difficulty]
              }`}
            >
              {lesson.difficulty}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
              <Clock size={14} />
              {lesson.estimatedMinutes} min read
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text-primary)] tracking-tight mb-4">
            {lesson.title}
          </h1>

          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            {lesson.description}
          </p>

          {/* Learning Objectives */}
          {lesson.objectives && lesson.objectives.length > 0 && (
            <div className="mt-8 p-5 rounded-xl border border-[var(--color-border-primary)] bg-[var(--color-bg-card)]/50 backdrop-blur-sm">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-accent-yellow)] flex items-center gap-2 mb-3">
                <Sparkles size={16} />
                Learning Objectives
              </h2>
              <ul className="grid sm:grid-cols-2 gap-2 text-sm text-[var(--color-text-secondary)]">
                {lesson.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </header>

        {/* Lesson Sections */}
        <article className="space-y-12">
          {lesson.sections.map(section => (
            <section key={section.id} id={section.id} className="scroll-mt-24 space-y-4">
              {section.level === 2 ? (
                <h2 className="text-2xl font-bold text-[var(--color-text-primary)] pt-4 border-t border-[var(--color-border-primary)]/40 first:border-0 first:pt-0">
                  {section.title}
                </h2>
              ) : (
                <h3 className="text-xl font-semibold text-[var(--color-text-primary)] pt-2">
                  {section.title}
                </h3>
              )}

              {/* Render Section Content with formatted points and bold titles */}
              <FormattedContent content={section.content} />

              {/* Diagram */}
              {section.diagram && (
                <div className="my-6">
                  <ArchitectureDiagram type={section.diagram} />
                </div>
              )}

              {/* Callout */}
              {section.callout && (
                <Callout
                  type={section.callout.type}
                  title={section.callout.title}
                >
                  {section.callout.content}
                </Callout>
              )}

              {/* Code snippet */}
              {section.code && (
                <div className="my-6">
                  <CodeBlock
                    code={section.code.code}
                    language={section.code.language}
                    filename={section.code.title}
                  />
                </div>
              )}
            </section>
          ))}
        </article>

        {/* Key Takeaways */}
        {lesson.keyTakeaways && lesson.keyTakeaways.length > 0 && (
          <section className="mt-12 p-6 rounded-xl border border-[var(--color-accent-purple)]/30 bg-purple-950/10">
            <h2 className="text-lg font-bold text-[var(--color-accent-purple)] flex items-center gap-2 mb-4">
              <Award size={20} />
              Key Takeaways
            </h2>
            <ul className="space-y-2 text-sm sm:text-base text-[var(--color-text-secondary)]">
              {lesson.keyTakeaways.map((takeaway, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-[var(--color-accent-purple)] font-bold">✓</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Navigation (Prev / Next & Completion tracking) */}
        <LessonNavigation currentSlug={lesson.slug} />
      </main>

      {/* Desktop Table of Contents */}
      <TableOfContents items={tocItems} />
    </div>
  );
}
