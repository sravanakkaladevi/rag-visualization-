'use client';

import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0.1 }
    );

    items.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <aside className="hidden xl:block fixed right-0 top-16 bottom-0 w-56 border-l border-[var(--color-border-primary)] bg-[var(--color-bg-primary)] overflow-y-auto py-6 px-4">
      <h4 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">
        On this page
      </h4>
      <nav className="space-y-1">
        {items.map(item => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`block text-xs py-1 transition-colors ${
              item.level === 3 ? 'pl-3' : ''
            } ${
              activeId === item.id
                ? 'text-[var(--color-accent-purple)] font-medium'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            {item.title}
          </a>
        ))}
      </nav>
    </aside>
  );
}
