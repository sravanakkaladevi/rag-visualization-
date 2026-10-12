'use client';

import AnimatedArchitectureVisualizer from './AnimatedArchitectureVisualizer';

interface ArchitectureDiagramProps {
  type: string;
}

export default function ArchitectureDiagram({ type }: ArchitectureDiagramProps) {
  return (
    <div className="my-8">
      <AnimatedArchitectureVisualizer
        initialType={type}
        allowSwitching={true}
      />
    </div>
  );
}
