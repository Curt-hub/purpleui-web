'use client';

export type IllustrationName = 'globe' | 'wallet' | 'voucher' | 'coffee-cup';

interface PUIllustrationProps {
  name: IllustrationName;
  /**
   * Size of the square container in px.
   * The image scales to fill it via object-fit: contain.
   * Default: 140
   */
  size?: number;
}

const SOURCES: Record<IllustrationName, { src: string; alt: string }> = {
  'globe':      { src: '/illustrations/globe-main.png',  alt: 'Globe' },
  'wallet':     { src: '/illustrations/wallet-main.png', alt: 'Wallet' },
  'voucher':    { src: '/illustrations/voucher-main.png', alt: 'Voucher' },
  'coffee-cup': { src: '/illustrations/coffee-cup.png',  alt: 'Coffee cup' },
};

export function PUIllustration({ name, size = 140 }: PUIllustrationProps) {
  const { src, alt } = SOURCES[name];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      style={{
        width: size,
        height: size,
        objectFit: 'contain',
        display: 'block',
      }}
    />
  );
}
