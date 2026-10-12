'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  BookOpen, Lightbulb, FileText, MessageSquare, GitMerge, Bot, ShieldCheck, Brain,
  Network, Image, Wrench, FolderGit2, Scale, BookA, ChevronRight, ChevronDown,
  CheckCircle2, PanelLeftClose, PanelLeftOpen, X
} from 'lucide-react';
import { navigation } from '@/lib/navigation';
import { getProgress } from '@/lib/progress';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  BookOpen, Lightbulb, FileText, MessageSquare, GitMerge, Bot, ShieldCheck, Brain,
  Network, Image, Wrench, FolderGit2, Scale, BookA,
};

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Initialize open state from localStorage or viewport
    const stored = localStorage.getItem('rag-sidebar-open');
    if (stored !== null) {
      setIsOpen(stored === 'true');
    } else {
      // Default to closed on mobile/tablet, open on desktop
      setIsOpen(window.innerWidth >= 1024);
    }

    const handleToggle = () => {
      setIsOpen(prev => {
        const next = !prev;
        localStorage.setItem('rag-sidebar-open', String(next));
        return next;
      });
    };

    window.addEventListener('toggle-rag-sidebar', handleToggle);
    return () => window.removeEventListener('toggle-rag-sidebar', handleToggle);
  }, []);

  const handleSetOpen = (open: boolean) => {
    setIsOpen(open);
    localStorage.setItem('rag-sidebar-open', String(open));
  };

  useEffect(() => {
    const progress = getProgress();
    setCompletedLessons(progress.completedLessons);
  }, [pathname]);

  useEffect(() => {
    // Auto-expand section containing current page
    navigation.forEach((item, idx) => {
      if (item.children?.some(child => pathname.startsWith(child.href))) {
        setOpenSections(prev => ({ ...prev, [idx]: true }));
      }
    });
  }, [pathname]);

  const toggleSection = (idx: number) => {
    setOpenSections(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleLinkClick = () => {
    // Auto-close on mobile/tablet upon clicking a navigation link
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      handleSetOpen(false);
    }
  };

  const totalLessons = 9;
  const completedCount = completedLessons.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <>
      {/* Desktop spacer to prevent content overlap when sidebar is open */}
      <div
        className={`hidden lg:block shrink-0 transition-all duration-300 ease-in-out ${
          isOpen ? 'w-64' : 'w-0'
        }`}
      />

      {/* Floating "Open Sidebar" button when sidebar is closed */}
      {!isOpen && isClient && (
        <button
          onClick={() => handleSetOpen(true)}
          className="fixed left-4 top-20 z-40 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[var(--color-bg-card)]/95 backdrop-blur-md border border-[var(--color-border-primary)] text-xs font-semibold text-[var(--color-text-primary)] hover:border-[var(--color-accent-purple)] hover:bg-[var(--color-bg-tertiary)] shadow-xl hover:shadow-purple-500/10 transition-all hover:scale-105 group active:scale-95 animate-fade-in"
          title="Open Sidebar Navigation"
          aria-label="Open Sidebar"
        >
          <PanelLeftOpen
            size={16}
            className="text-[var(--color-accent-purple)] group-hover:scale-110 transition-transform"
          />
          <span className="hidden sm:inline">Open Sidebar</span>
        </button>
      )}

      {/* Mobile Backdrop overlay */}
      {isOpen && isClient && (
        <div
          className="fixed inset-0 top-16 bg-black/60 z-30 lg:hidden backdrop-blur-sm animate-fade-in"
          onClick={() => handleSetOpen(false)}
          aria-label="Close Sidebar Backdrop"
        />
      )}

      {/* Main Slidebar Drawer / Aside */}
      <aside
        className={`fixed left-0 top-16 bottom-0 z-40 w-64 border-r border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] overflow-y-auto pb-8 transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none flex flex-col justify-between ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Header Bar with Close Button */}
          <div className="px-4 py-3 border-b border-[var(--color-border-primary)] flex items-center justify-between bg-[var(--color-bg-primary)]/50">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
              <BookOpen size={14} className="text-[var(--color-accent-purple)]" />
              <span>Learning Hub</span>
            </div>

            {/* Close Sidebar Button */}
            <button
              onClick={() => handleSetOpen(false)}
              className="flex items-center gap-1.5 px-2 py-1 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] rounded-md transition-colors group"
              title="Close Sidebar"
              aria-label="Close Sidebar"
            >
              <PanelLeftClose size={15} className="group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-medium">Close</span>
            </button>
          </div>

          {/* Progress bar */}
          <div className="px-4 py-3.5 border-b border-[var(--color-border-primary)]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-[var(--color-text-muted)]">Course Progress</span>
              <span className="text-xs font-bold text-[var(--color-accent-purple)]">{progressPercent}%</span>
            </div>
            <div className="h-1.5 bg-[var(--color-bg-tertiary)] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-blue)] rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-[11px] text-[var(--color-text-muted)] mt-1.5">
              {completedCount} of {totalLessons} lessons completed
            </p>
          </div>

          {/* Navigation Items */}
          <nav className="px-3 py-3 space-y-1">
            {navigation.map((item, idx) => {
              const Icon = item.icon ? iconMap[item.icon] : null;
              const hasChildren = item.children && item.children.length > 0;
              const isOpenSec = openSections[idx];
              const isActive =
                pathname === item.href ||
                (hasChildren && item.children!.some(c => pathname === c.href));

              return (
                <div key={idx}>
                  {hasChildren ? (
                    <button
                      onClick={() => toggleSection(idx)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
                        isActive
                          ? 'text-[var(--color-text-primary)] bg-[var(--color-bg-tertiary)] font-medium'
                          : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {Icon && <Icon size={16} />}
                        <span>{item.title}</span>
                      </span>
                      {isOpenSec ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={handleLinkClick}
                      className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                        pathname === item.href
                          ? 'text-[var(--color-accent-purple)] bg-[var(--color-accent-purple-dim)]/30 font-medium'
                          : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]'
                      }`}
                    >
                      {Icon && <Icon size={16} />}
                      <span>{item.title}</span>
                    </Link>
                  )}

                  {hasChildren && isOpenSec && (
                    <div className="ml-4 mt-1 space-y-0.5 border-l border-[var(--color-border-primary)] pl-3">
                      {item.children!.map(child => {
                        const ChildIcon = child.icon ? iconMap[child.icon] : null;
                        const isChildActive = pathname === child.href;
                        const slug = child.href.split('/').pop() || '';
                        const isComplete = completedLessons.includes(slug);

                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={handleLinkClick}
                            className={`flex items-center gap-2 px-2.5 py-1.5 text-xs sm:text-sm rounded-lg transition-colors ${
                              isChildActive
                                ? 'text-[var(--color-accent-purple)] bg-[var(--color-accent-purple-dim)]/30 font-medium'
                                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]'
                            }`}
                          >
                            {ChildIcon && <ChildIcon size={14} />}
                            <span className="flex-1 truncate">{child.title}</span>
                            {isComplete && (
                              <CheckCircle2
                                size={12}
                                className="text-[var(--color-accent-green)] shrink-0"
                              />
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Footer info in sidebar */}
        <div className="px-4 pt-3 border-t border-[var(--color-border-primary)]/50 text-[11px] text-[var(--color-text-muted)] flex items-center justify-between">
          <span>RAG Learning Hub</span>
          <button
            onClick={() => handleSetOpen(false)}
            className="hover:text-[var(--color-text-primary)] transition-colors underline"
          >
            Hide bar
          </button>
        </div>
      </aside>
    </>
  );
}
