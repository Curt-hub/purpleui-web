'use client';

export type PULoaderVariant = 'light' | 'dark';

interface PULoaderProps {
  variant?: PULoaderVariant;
}

// Figma: 64px circle spinner, 6px border, loaderTrack (#DDDDDF) as track
// Light — backgroundNavy arc (#011638), use on light backgrounds
// Dark  — brand arc (#7458FD), use on dark backgrounds
const arcColor: Record<PULoaderVariant, string> = {
  light: '#011638', // backgroundNavy
  dark:  '#7458FD', // brand
};

export function PULoader({ variant = 'light' }: PULoaderProps) {
  return (
    <div
      className="w-16 h-16 rounded-full border-[6px] animate-spin border-loader-track"
      style={{ borderTopColor: arcColor[variant] }}
    />
  );
}
