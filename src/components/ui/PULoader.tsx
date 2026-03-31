'use client';

export type PULoaderVariant = 'light' | 'dark';

interface PULoaderProps {
  variant?: PULoaderVariant;
}

// Figma: 64px circle spinner, 6px border, Grey D (#DDDDDF) track
// Light — navy arc (#011638), use on light backgrounds
// Dark  — purple arc (#7458FD), use on dark backgrounds
const arcColor: Record<PULoaderVariant, string> = {
  light: '#011638',
  dark:  '#7458FD',
};

export function PULoader({ variant = 'light' }: PULoaderProps) {
  return (
    <div
      className="w-16 h-16 rounded-full border-[6px] animate-spin"
      style={{
        borderColor: '#DDDDDF',
        borderTopColor: arcColor[variant],
      }}
    />
  );
}
