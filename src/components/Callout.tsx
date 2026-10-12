import { Info, Lightbulb, AlertTriangle, AlertCircle } from 'lucide-react';
import { ReactNode } from 'react';

interface CalloutProps {
  type: 'info' | 'tip' | 'warning' | 'danger';
  title?: string;
  children: ReactNode;
}

const config = {
  info: { icon: Info, className: 'callout-info', defaultTitle: 'Note' },
  tip: { icon: Lightbulb, className: 'callout-tip', defaultTitle: 'Tip' },
  warning: { icon: AlertTriangle, className: 'callout-warning', defaultTitle: 'Warning' },
  danger: { icon: AlertCircle, className: 'callout-danger', defaultTitle: 'Important' },
};

export default function Callout({ type, title, children }: CalloutProps) {
  const { icon: Icon, className, defaultTitle } = config[type];

  return (
    <div className={`callout ${className}`}>
      <div className="flex items-center gap-2 mb-1.5">
        <Icon size={16} />
        <span className="text-sm font-semibold">{title || defaultTitle}</span>
      </div>
      <div className="text-sm text-[var(--color-text-secondary)]">{children}</div>
    </div>
  );
}
