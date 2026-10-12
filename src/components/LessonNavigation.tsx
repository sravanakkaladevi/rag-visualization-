'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight, CheckCircle2, Circle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getPreviousLesson, getNextLesson } from '@/lib/navigation';
import { markLessonComplete, markLessonIncomplete, isLessonComplete, setLastVisited } from '@/lib/progress';

interface LessonNavigationProps {
  currentSlug: string;
}

export default function LessonNavigation({ currentSlug }: LessonNavigationProps) {
  const [completed, setCompleted] = useState(false);
  const prev = getPreviousLesson(currentSlug);
  const next = getNextLesson(currentSlug);

  useEffect(() => {
    setCompleted(isLessonComplete(currentSlug));
    setLastVisited(currentSlug);
  }, [currentSlug]);

  const toggleComplete = () => {
    if (completed) {
      markLessonIncomplete(currentSlug);
      setCompleted(false);
    } else {
      markLessonComplete(currentSlug);
      setCompleted(true);
    }
  };

  return (
    <div className="mt-12 pt-8 border-t border-[var(--color-border-primary)]">
      {/* Mark complete button */}
      <div className="flex justify-center mb-8">
        <button
          onClick={toggleComplete}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${
            completed
              ? 'bg-[var(--color-accent-green-dim)] text-[var(--color-accent-green)] border border-[var(--color-accent-green)]/30'
              : 'bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border border-[var(--color-border-primary)] hover:border-[var(--color-accent-green)]/50 hover:text-[var(--color-accent-green)]'
          }`}
        >
          {completed ? <CheckCircle2 size={18} /> : <Circle size={18} />}
          {completed ? 'Lesson Complete' : 'Mark as Complete'}
        </button>
      </div>

      {/* Prev/Next navigation */}
      <div className="flex items-stretch gap-4">
        {prev ? (
          <Link
            href={prev.href}
            className="flex-1 flex items-center gap-3 p-4 rounded-lg border border-[var(--color-border-primary)] hover:border-[var(--color-accent-purple)] hover:bg-[var(--color-bg-card)] transition-all group"
          >
            <ChevronLeft size={20} className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent-purple)]" />
            <div>
              <span className="text-xs text-[var(--color-text-muted)]">Previous</span>
              <p className="text-sm font-medium text-[var(--color-text-primary)]">{prev.title}</p>
            </div>
          </Link>
        ) : <div className="flex-1" />}

        {next ? (
          <Link
            href={next.href}
            className="flex-1 flex items-center justify-end gap-3 p-4 rounded-lg border border-[var(--color-border-primary)] hover:border-[var(--color-accent-purple)] hover:bg-[var(--color-bg-card)] transition-all group text-right"
          >
            <div>
              <span className="text-xs text-[var(--color-text-muted)]">Next</span>
              <p className="text-sm font-medium text-[var(--color-text-primary)]">{next.title}</p>
            </div>
            <ChevronRight size={20} className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent-purple)]" />
          </Link>
        ) : <div className="flex-1" />}
      </div>
    </div>
  );
}
