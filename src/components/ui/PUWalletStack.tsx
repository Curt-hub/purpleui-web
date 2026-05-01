'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PUPassCard, PULogoVariant } from './PUPassCard';

export interface PUWalletCard {
  id: string;
  title: string;
  backgroundColor?: string;
  gradientTo?: string;
  logoVariant?: PULogoVariant;
}

export interface PUWalletStackProps {
  cards: PUWalletCard[];
  className?: string;
}

const STACK_OFFSET = 72;
const EXPANDED_SPACING = 100;
const CARD_TOP = 40;

export function PUWalletStack({ cards, className }: PUWalletStackProps) {
  const [stackOpen, setStackOpen] = useState(false);
  const [focusedId, setFocusedId] = useState<string | null>(null);

  const numCards = cards.length;
  const isSingle = numCards === 1;

  // Focused card always first in render order (highest z-index reads last)
  const ordered = focusedId
    ? [cards.find(c => c.id === focusedId)!, ...cards.filter(c => c.id !== focusedId)]
    : cards;

  const handleCardClick = (id: string) => {
    if (isSingle) return;
    if (!stackOpen) {
      setStackOpen(true);
    } else if (!focusedId) {
      setFocusedId(id);
    } else if (focusedId === id) {
      setFocusedId(null);
    }
  };

  const handleOverlay = () => {
    if (focusedId) setFocusedId(null);
    else if (stackOpen) setStackOpen(false);
  };

  // Container spans full height when open/focused, slides to bottom when collapsed
  const containerTop = isSingle || stackOpen || focusedId
    ? 0
    : `calc(100% - ${numCards * STACK_OFFSET}px)`;

  const getCardTop = (card: PUWalletCard, index: number): string | number => {
    if (isSingle) return CARD_TOP;
    if (focusedId) {
      if (card.id === focusedId) return CARD_TOP;
      return `calc(100% - ${(numCards - index) * STACK_OFFSET}px)`;
    }
    if (stackOpen) return CARD_TOP + index * EXPANDED_SPACING;
    return index * STACK_OFFSET;
  };

  return (
    <div
      className={className}
      style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}
      onClick={handleOverlay}
    >
      {/* Tap overlay hint (collapsed → expand) */}
      <AnimatePresence>
        {!isSingle && !stackOpen && !focusedId && (
          <motion.div
            key="tap-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              bottom: numCards * STACK_OFFSET + 12,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              pointerEvents: 'none',
              zIndex: 50,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 500,
                color: 'rgba(0,0,0,0.35)',
                letterSpacing: '0.02em',
              }}
            >
              Tap to expand
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card stack container — slides up/down from bottom */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          top: containerTop,
          transition: 'top 0.6s cubic-bezier(0.2,0.8,0.2,1)',
        }}
      >
        {ordered.map((card, index) => {
          const isTopCard = index === ordered.length - 1;
          const isFocused = isSingle || focusedId === card.id;
          const stackDepth = isSingle || isTopCard ? undefined : ordered.length - 1 - index;

          return (
            <div
              key={card.id}
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 'calc(100% - 32px)',
                top: getCardTop(card, index),
                zIndex: index + 1,
                transition: 'top 0.6s cubic-bezier(0.2,0.8,0.2,1)',
              }}
              onClick={e => {
                e.stopPropagation();
                handleCardClick(card.id);
              }}
            >
              <PUPassCard
                title={card.title}
                backgroundColor={card.backgroundColor}
                gradientTo={card.gradientTo}
                holo={isFocused}
                stackDepth={stackDepth}
                logoVariant={card.logoVariant}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
