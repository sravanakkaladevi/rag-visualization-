import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FolderGit2, Clock, CheckCircle2, ChevronRight, Terminal, ShieldAlert,
  AlertTriangle, Cpu, Layers, HelpCircle, ArrowLeft
} from 'lucide-react';
import { projects } from '@/lib/projects-data';
import Sidebar from '@/components/Sidebar';
import CodeBlock from '@/components/CodeBlock';
import Callout from '@/components/Callout';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(projects).map(slug => ({ slug }));
}

export const instant = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects[slug];
  if (!project) return { title: 'Project Not Found — RAG Learning Hub' };

  return {
    title: `${project.title} Tutorial — RAG Learning Hub`,
    description: project.shortDesc,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects[slug];

  if (!project) {
    notFound();
  }

  const difficultyColors = {
    Beginner: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    Intermediate: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    Advanced: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 min-w-0 px-4 sm:px-8 py-8 max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] mb-6">
          <Link href="/" className="hover:text-[var(--color-text-primary)] transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <Link href="/projects" className="hover:text-[var(--color-text-primary)] transition-colors">
            Projects
          </Link>
          <ChevronRight size={12} />
          <span className="text-[var(--color-accent-purple)] font-medium truncate">
            {project.title}
          </span>
        </nav>

        {/* Header */}
        <header className="mb-10 pb-8 border-b border-[var(--color-border-primary)]">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${
                difficultyColors[project.difficulty]
              }`}
            >
              {project.difficulty}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
              <Clock size={14} />
              Estimated time: {project.estimatedTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text-primary)] tracking-tight mb-4">
            {project.title}
          </h1>

          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-6">
            {project.shortDesc}
          </p>

          {/* Tech Stack list */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[var(--color-text-muted)] mr-1">
              Tech Stack:
            </span>
            {project.stack.map(tech => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[var(--color-bg-card)] text-[var(--color-accent-yellow)] border border-[var(--color-border-primary)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </header>

        {/* Architecture section */}
        <section className="mb-10 space-y-3">
          <h2 className="text-xl font-bold text-[var(--color-text-primary)] flex items-center gap-2">
            <Layers size={18} className="text-[var(--color-accent-purple)]" />
            System Architecture
          </h2>
          <div className="p-4 rounded-xl border border-[var(--color-border-primary)] bg-[var(--color-bg-card)] font-mono text-xs sm:text-sm text-[var(--color-accent-cyan)] leading-relaxed overflow-x-auto">
            {project.architecture}
          </div>
        </section>

        {/* Prerequisites & Setup */}
        <section className="mb-10 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-3">
              Prerequisites
            </h2>
            <ul className="space-y-2">
              {project.prerequisites.map((pre, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                  <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                  <span>{pre}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-2 flex items-center gap-2">
              <Terminal size={16} className="text-[var(--color-accent-green)]" />
              Installation Commands
            </h3>
            <CodeBlock
              code={project.installCommands}
              language="bash"
              filename="terminal"
            />
          </div>

          <div>
            <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-2">
              Folder Structure
            </h3>
            <CodeBlock
              code={project.folderStructure}
              language="text"
              filename="Directory Layout"
            />
          </div>
        </section>

        {/* Step-by-Step Implementation */}
        <section className="mb-12 space-y-8">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] pb-2 border-b border-[var(--color-border-primary)]">
            Step-by-Step Implementation
          </h2>

          {project.steps.map(step => (
            <div key={step.number} className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[var(--color-accent-purple)] text-white text-xs font-bold shrink-0">
                  {step.number}
                </span>
                <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                  {step.title}
                </h3>
              </div>

              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {step.description}
              </p>

              {step.code && (
                <CodeBlock
                  code={step.code}
                  language={step.codeLanguage || 'python'}
                  filename={step.codeFilename}
                />
              )}
            </div>
          ))}
        </section>

        {/* Example Input and Output */}
        <section className="mb-10 p-6 rounded-xl border border-[var(--color-border-primary)] bg-[var(--color-bg-card)] space-y-4">
          <h2 className="text-lg font-bold text-[var(--color-accent-yellow)] flex items-center gap-2">
            <Cpu size={18} />
            Example Execution (Input & Output)
          </h2>

          <div className="space-y-2">
            <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
              Input Query:
            </span>
            <div className="p-3 rounded-lg bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] font-mono text-xs text-[var(--color-text-primary)] whitespace-pre-wrap">
              {project.exampleIO.input}
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
              Generated Grounded Output:
            </span>
            <div className="p-3 rounded-lg bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] font-mono text-xs text-emerald-400 whitespace-pre-wrap">
              {project.exampleIO.output}
            </div>
          </div>

          <p className="text-xs text-[var(--color-text-secondary)] italic">
            <strong>Why this works:</strong> {project.exampleIO.explanation}
          </p>
        </section>

        {/* Troubleshooting */}
        <section className="mb-10 space-y-4">
          <h2 className="text-xl font-bold text-[var(--color-text-primary)] flex items-center gap-2">
            <HelpCircle size={18} className="text-[var(--color-accent-yellow)]" />
            Troubleshooting Common Gotchas
          </h2>
          <div className="space-y-3">
            {project.troubleshooting.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-[var(--color-border-primary)] bg-[var(--color-bg-card)] space-y-1.5"
              >
                <h4 className="text-sm font-semibold text-rose-400 flex items-center gap-2">
                  <AlertTriangle size={15} />
                  {item.issue}
                </h4>
                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] pl-6">
                  {item.solution}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Limitations & Security */}
        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          <div className="p-5 rounded-xl border border-[var(--color-border-primary)] bg-[var(--color-bg-card)] space-y-3">
            <h3 className="text-sm font-bold text-[var(--color-text-primary)] flex items-center gap-2">
              <AlertTriangle size={16} className="text-amber-400" />
              Known Limitations
            </h3>
            <ul className="space-y-1.5 text-xs text-[var(--color-text-secondary)]">
              {project.limitations.map((lim, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-amber-400">•</span>
                  <span>{lim}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-xl border border-[var(--color-border-primary)] bg-[var(--color-bg-card)] space-y-3">
            <h3 className="text-sm font-bold text-[var(--color-text-primary)] flex items-center gap-2">
              <ShieldAlert size={16} className="text-rose-400" />
              Security Considerations
            </h3>
            <ul className="space-y-1.5 text-xs text-[var(--color-text-secondary)]">
              {project.securityConsiderations.map((sec, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-rose-400">•</span>
                  <span>{sec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Back navigation */}
        <div className="pt-6 border-t border-[var(--color-border-primary)] flex justify-between">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--color-accent-purple)] hover:underline"
          >
            <ArrowLeft size={14} /> Back to all projects
          </Link>
        </div>
      </main>
    </div>
  );
}
