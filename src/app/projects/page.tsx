import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FolderGit2, Clock, ArrowRight, CheckCircle2, Terminal, ShieldAlert, Cpu
} from 'lucide-react';
import { projects } from '@/lib/projects-data';
import Sidebar from '@/components/Sidebar';

export const metadata: Metadata = {
  title: 'Practical RAG Projects — RAG Learning Hub',
  description: 'Hands-on project tutorials implementing real-world RAG architectures with code, architectures, and troubleshooting.',
};

export default function ProjectsPage() {
  const projectList = Object.values(projects);

  const difficultyColors = {
    Beginner: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    Intermediate: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    Advanced: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 min-w-0 px-4 sm:px-8 py-8 max-w-6xl mx-auto">
        <header className="mb-10 pb-8 border-b border-[var(--color-border-primary)]">
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-accent-purple)] uppercase tracking-wider mb-2">
            <FolderGit2 size={14} />
            Hands-on Tutorials
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text-primary)] tracking-tight mb-4">
            Practical RAG Projects
          </h1>
          <p className="text-base sm:text-lg text-[var(--color-text-secondary)] max-w-3xl leading-relaxed">
            Build production-grade RAG applications from scratch. Each tutorial includes complete architecture diagrams, prerequisites, step-by-step code, troubleshooting, and security considerations.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          {projectList.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="rounded-xl border border-[var(--color-border-primary)] bg-[var(--color-bg-card)] p-6 flex flex-col justify-between hover:border-[var(--color-border-focus)] transition-all group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border ${
                      difficultyColors[project.difficulty]
                    }`}
                  >
                    {project.difficulty}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
                    <Clock size={12} />
                    {project.estimatedTime}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-yellow)] transition-colors mb-2">
                  {project.title}
                </h2>

                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">
                  {project.shortDesc}
                </p>

                {/* Tech stack pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[11px] font-medium bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] border border-[var(--color-border-primary)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--color-border-primary)] flex items-center justify-between text-xs font-semibold text-[var(--color-accent-purple)]">
                <span>Start Project Tutorial</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
