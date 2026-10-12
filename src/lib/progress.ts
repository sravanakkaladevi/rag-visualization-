'use client';

const STORAGE_KEY = 'rag-learning-hub-progress';

export interface ProgressData {
  completedLessons: string[];
  lastVisited: string | null;
  lastUpdated: string;
}

function getDefaultProgress(): ProgressData {
  return {
    completedLessons: [],
    lastVisited: null,
    lastUpdated: new Date().toISOString(),
  };
}

export function getProgress(): ProgressData {
  if (typeof window === 'undefined') return getDefaultProgress();
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return getDefaultProgress();
    return JSON.parse(stored);
  } catch {
    return getDefaultProgress();
  }
}

export function markLessonComplete(slug: string): void {
  if (typeof window === 'undefined') return;
  const progress = getProgress();
  if (!progress.completedLessons.includes(slug)) {
    progress.completedLessons.push(slug);
  }
  progress.lastUpdated = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function markLessonIncomplete(slug: string): void {
  if (typeof window === 'undefined') return;
  const progress = getProgress();
  progress.completedLessons = progress.completedLessons.filter(s => s !== slug);
  progress.lastUpdated = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function isLessonComplete(slug: string): boolean {
  return getProgress().completedLessons.includes(slug);
}

export function setLastVisited(slug: string): void {
  if (typeof window === 'undefined') return;
  const progress = getProgress();
  progress.lastVisited = slug;
  progress.lastUpdated = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function getCompletionPercentage(totalLessons: number): number {
  const progress = getProgress();
  if (totalLessons === 0) return 0;
  return Math.round((progress.completedLessons.length / totalLessons) * 100);
}
