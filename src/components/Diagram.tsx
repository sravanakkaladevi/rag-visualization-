import { ReactNode } from 'react';

interface DiagramProps {
  title?: string;
  children: ReactNode;
}

export default function Diagram({ title, children }: DiagramProps) {
  return (
    <div className="my-6 rounded-xl border border-[var(--color-border-primary)] bg-[var(--color-bg-card)] overflow-hidden">
      {title && (
        <div className="px-4 py-2.5 border-b border-[var(--color-border-primary)] bg-[var(--color-bg-tertiary)]">
          <span className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">{title}</span>
        </div>
      )}
      <div className="p-6 flex justify-center overflow-x-auto">
        {children}
      </div>
    </div>
  );
}

interface FlowNodeProps {
  label: string;
  color?: string;
  icon?: string;
  sub?: string;
}

export function FlowNode({ label, color = 'var(--color-accent-purple)', sub }: FlowNodeProps) {
  return (
    <div
      className="flex flex-col items-center justify-center px-4 py-2.5 rounded-lg border text-center min-w-[100px]"
      style={{ borderColor: color, background: `color-mix(in srgb, ${color} 10%, transparent)` }}
    >
      <span className="text-sm font-semibold" style={{ color }}>{label}</span>
      {sub && <span className="text-xs text-[var(--color-text-muted)] mt-0.5">{sub}</span>}
    </div>
  );
}

export function FlowArrow() {
  return (
    <div className="flex items-center mx-2">
      <div className="w-6 h-px bg-[var(--color-border-hover)]" />
      <div className="w-0 h-0 border-t-[4px] border-b-[4px] border-l-[6px] border-t-transparent border-b-transparent border-l-[var(--color-border-hover)]" />
    </div>
  );
}

export function FlowArrowDown() {
  return (
    <div className="flex justify-center my-2">
      <div className="flex flex-col items-center">
        <div className="w-px h-4 bg-[var(--color-border-hover)]" />
        <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-t-[6px] border-l-transparent border-r-transparent border-t-[var(--color-border-hover)]" />
      </div>
    </div>
  );
}
