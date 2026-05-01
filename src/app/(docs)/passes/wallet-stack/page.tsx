'use client';
import { useState } from 'react';
import { PUWalletStack } from '@/components/ui/PUWalletStack';
import { PUButton } from '@/components/ui/PUButton';
import { ComponentPreview } from '@/components/docs/ComponentPreview';
import { PhoneFrame } from '@/components/docs/PhoneFrame';
import { PropsTable } from '@/components/docs/PropsTable';
import { colors } from '@/lib/tokens';

const SAMPLE_CARDS = [
  { id: 'purple', title: 'Purple WiFi Pass',  backgroundColor: colors.brand,          gradientTo: '#9B7FFE', logoVariant: 'white-navy'   as const },
  { id: 'work',   title: 'Work WiFi Pass',     backgroundColor: colors.backgroundNavy, gradientTo: '#1a3a5c', logoVariant: 'white-purple' as const },
  { id: 'cafe',   title: 'Campus WiFi Pass',   backgroundColor: '#0f9b63',             gradientTo: '#16C172', logoVariant: 'white-purple' as const },
  { id: 'city',   title: 'City WiFi Pass',     backgroundColor: '#2d3748',             gradientTo: '#4a5568', logoVariant: 'white-purple' as const },
];

const cardProps = [
  { name: 'id',              type: 'string',                                              required: true,            description: 'Unique identifier for each card' },
  { name: 'title',           type: 'string',                                              required: true,            description: 'Pass name displayed on the card' },
  { name: 'backgroundColor', type: 'string',                                              default: '"#7458FD"',      description: 'Card background or gradient start' },
  { name: 'gradientTo',      type: 'string',                                              default: 'undefined',      description: 'Gradient end colour' },
  { name: 'logoVariant',     type: "'white-navy' | 'white-purple' | 'dark-purple'",       default: "'white-purple'", description: 'Logo colour variant — white-navy for brand-purple bg, white-purple for dark bg' },
];

const stackProps = [
  { name: 'cards',     type: 'PUWalletCard[]', required: true,       description: 'Array of card data objects' },
  { name: 'className', type: 'string',         default: 'undefined', description: 'Optional class applied to the outer container' },
];

export default function WalletStackPage() {
  const [isDark, setIsDark] = useState(false);
  const [cardCount, setCardCount] = useState(3);

  const cards = SAMPLE_CARDS.slice(0, cardCount);

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Wallet Stack</h1>
      <p className="text-gray-500 mb-8">
        Apple Wallet-style card stack. Tap the stack to expand, tap a card to focus it with the
        holographic effect, tap the focused card or background to collapse. A single card is always
        shown in the focused + holo state without any stacking UI.
      </p>

      {/* ── In Context ── */}
      <div className="mb-12">
        <h2 className="text-lg font-bold text-primary mb-5">In Context</h2>
        <p className="text-sm text-gray-500 mb-5">Fully interactive — tap the cards inside the phone frame.</p>
        <PhoneFrame label="Tap to expand · Tap card to focus · Tap again to collapse" dark={isDark} onToggle={() => setIsDark(d => !d)}>
          {/* Wallet background */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: isDark ? colors.backgroundNavy : colors.backgroundElevated,
            }}
          />
          {/* Mini header */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 56,
              background: isDark ? '#0a2048' : '#ffffff',
              borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#EFF0F0'}`,
              display: 'flex',
              alignItems: 'center',
              padding: '0 16px',
              zIndex: 100,
            }}
          >
            <p
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 700,
                fontSize: 13,
                color: isDark ? '#ffffff' : '#000000',
                margin: 0,
              }}
            >
              WiFi Passes
            </p>
          </div>
          {/* Stack lives below the header */}
          <div style={{ position: 'absolute', top: 56, left: 0, right: 0, bottom: 0 }}>
            <PUWalletStack cards={SAMPLE_CARDS.slice(0, 3)} />
          </div>
        </PhoneFrame>
      </div>

      {/* ── Interactive Preview ── */}
      <h2 className="text-lg font-bold text-primary mb-4">Interactive Preview</h2>
      <p className="text-sm text-gray-500 mb-4">
        Adjust card count to see single-card holo mode vs. multi-card stacking.
      </p>
      <ComponentPreview label="Click cards to interact" bg="gray">
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
          {/* Stack preview — phone-width container so cards stay proportional */}
          <div style={{ width: 320, height: 500, position: 'relative', borderRadius: 16, overflow: 'hidden', background: '#F7F7F8' }}>
            <PUWalletStack key={cardCount} cards={cards} />
          </div>
          {/* Card count controls */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[1, 2, 3, 4].map(n => (
              <PUButton
                key={n}
                label={`${n} card${n > 1 ? 's' : ''}`}
                onClick={() => setCardCount(n)}
                variant={cardCount === n ? 'primary' : 'secondary'}
                size="sm"
              />
            ))}
          </div>
        </div>
      </ComponentPreview>

      {/* ── Behaviour ── */}
      <h2 className="text-lg font-bold text-primary mt-12 mb-4">Behaviour</h2>
      <ol className="text-gray-600 text-sm flex flex-col gap-2 pl-5 list-decimal mb-12">
        <li><strong>Collapsed</strong> — cards are stacked at the bottom of the container, fanning upward with 72px offsets.</li>
        <li><strong>Expanded</strong> — tap the stack to fan cards out at 100px spacing from the top (40px clearance).</li>
        <li><strong>Focused</strong> — tap any expanded card to focus it. The card moves to the top with the holographic tilt + shimmer active. Other cards collapse back to the bottom.</li>
        <li><strong>Reset</strong> — tap the focused card or the background to unfocus; tap again to collapse the stack.</li>
        <li><strong>Single card</strong> — when only one card is provided it is always shown in the focused + holo state; no stacking interaction is available.</li>
      </ol>

      {/* ── Props ── */}
      <h2 className="text-base font-semibold text-gray-800 mb-2">PUWalletStack Props</h2>
      <PropsTable props={stackProps} />

      <h2 className="text-base font-semibold text-gray-800 mt-8 mb-2">PUWalletCard Shape</h2>
      <PropsTable props={cardProps} />
    </div>
  );
}
