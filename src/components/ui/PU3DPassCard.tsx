'use client';
import dynamic from 'next/dynamic';

export interface PU3DPassCardProps {
  /** Slowly auto-rotate the card. */
  autoRotate?: boolean;
  /** Allow the user to drag and orbit the card freely. */
  interactive?: boolean;
  className?: string;
}

const Scene = dynamic(() => import('./PU3DPassCardScene'), { ssr: false });

export function PU3DPassCard({
  autoRotate = false,
  interactive = false,
  className,
}: PU3DPassCardProps) {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        paddingBottom: '75%',
        cursor: interactive ? 'grab' : 'default',
      }}
    >
      <Scene autoRotate={autoRotate} interactive={interactive} />
    </div>
  );
}
