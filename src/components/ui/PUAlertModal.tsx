'use client';
import { useEffect, useId, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from '@/lib/tokens';

// [href] gets the same tabindex="-1" exclusion as everything else — a link can opt
// out of the tab order the same way a button or input can.
const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href]:not([tabindex="-1"]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Elements can match the selector above and still be unreachable — CSS-hidden
// (display:none / visibility:hidden, on the element itself OR an ancestor) or
// living inside an `inert` subtree. Filter those out so the trap never lands
// focus on something the user can't see.
function isReachable(el: HTMLElement): boolean {
  if (el.closest('[inert]')) return false;

  // checkVisibility() walks the ancestor chain for us. That matters because
  // `display` is NOT an inherited CSS property — getComputedStyle(el).display
  // only ever reports the element's own value, never a display:none wrapper
  // higher up (visibility IS inherited, so that half doesn't need the walk).
  // Deliberately NOT passing opacityProperty: true — this panel mounts via a
  // framer-motion fade-in (initial opacity: 0), and this effect can run before
  // that animation ticks past 0, which would make checkVisibility misreport a
  // genuinely-appearing dialog's own buttons as unreachable.
  if (typeof el.checkVisibility === 'function') {
    return el.checkVisibility({ visibilityProperty: true });
  }

  // Fallback for browsers without checkVisibility (e.g. Safari < 17.4).
  if (window.getComputedStyle(el).visibility === 'hidden') return false;
  for (let node: HTMLElement | null = el; node; node = node.parentElement) {
    if (window.getComputedStyle(node).display === 'none') return false;
  }
  return true;
}

// Re-run on every Tab keypress below — negligible for this modal's two buttons,
// but don't reuse this unmemoized against a panel with many focusable children
// (e.g. a tray full of form fields), where the per-candidate getComputedStyle
// calls would actually add up. Memoize per open/DOM-mutation if that ever applies.
function getFocusableElements(panel: HTMLElement): HTMLElement[] {
  return Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(isReachable);
}

// Module-scoped stack of currently-open PUAlertModal instances. If two are stacked,
// only the topmost (last opened) should react to Escape. This only coordinates
// between PUAlertModal instances specifically — a different overlay type stacked
// alongside it would need a shared overlay-stack context, which doesn't exist yet.
let openInstanceStack: symbol[] = [];

export type PUAlertModalVariant = 'info' | 'warning' | 'destructive';

interface PUAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: PUAlertModalVariant;
  dark?: boolean;
}

const confirmBg: Record<PUAlertModalVariant, string> = {
  info:        colors.brand,
  warning:     colors.warning,
  destructive: colors.error,
};
const confirmColor: Record<PUAlertModalVariant, string> = {
  info:        '#ffffff',
  warning:     colors.onBackground,
  destructive: '#ffffff',
};

export function PUAlertModal({
  isOpen, onClose, onConfirm, title, message,
  confirmLabel = 'Confirm', cancelLabel = 'Cancel', variant = 'info', dark = false,
}: PUAlertModalProps) {
  const titleId = useId();
  const messageId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);

  // Keep the latest onClose reachable from the trap effect without putting it in that
  // effect's dependency array. onClose is frequently an inline arrow function from the
  // caller, so it gets a new identity on every parent re-render — if it were a dep on
  // the setup/teardown effect below, any unrelated parent re-render while the dialog is
  // open would tear down and rebuild the trap (focus flicker, and previouslyFocusedRef
  // getting clobbered with whatever's focused inside the panel at that moment instead of
  // the original trigger).
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  // Focus trap: move focus in on open, cycle within the panel on Tab,
  // dismiss on Escape, and restore focus to the trigger on close.
  // Keyed on [isOpen] only — see onCloseRef above for why onClose isn't a dep here.
  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;

    const panel = panelRef.current;
    const firstFocusable = panel ? getFocusableElements(panel)[0] : undefined;
    (firstFocusable ?? panel)?.focus();

    const instanceId = Symbol('PUAlertModal');
    openInstanceStack.push(instanceId);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const isTopmost = openInstanceStack[openInstanceStack.length - 1] === instanceId;
        if (!isTopmost) return;
        e.preventDefault();
        onCloseRef.current();
        return;
      }

      if (e.key !== 'Tab' || !panel) return;

      const focusables = getFocusableElements(panel);
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      openInstanceStack = openInstanceStack.filter(id => id !== instanceId);
      previouslyFocusedRef.current?.focus?.();
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            style={{
              background: dark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.2)',
              backdropFilter: 'blur(5px)',
              WebkitBackdropFilter: 'blur(5px)',
            }}
            onClick={onClose}
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center px-[30px]">
            <motion.div
              ref={panelRef}
              role="alertdialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={messageId}
              tabIndex={-1}
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 12 }}
              transition={{ type: 'spring', stiffness: 420, damping: 26 }}
              style={{
                width: '100%',
                maxWidth: 393,
                background: dark ? colors.backgroundElevatedNavy : colors.background,   // backgroundElevatedNavy dark : background
                borderRadius: 12,
                border: dark ? '1px solid rgba(255,255,255,0.1)' : `1px solid ${colors.outlineSubtle}`,  // outline dark : outlineSubtle
                boxShadow: '0px 10px 20px 0px rgba(0,0,0,0.1)',
                padding: '50px 30px',
                display: 'flex',
                flexDirection: 'column',
                gap: 40,
              }}
            >
              {/* Content */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <p id={titleId} style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 700,
                  fontSize: 18,
                  color: dark ? '#ffffff' : colors.onBackground,  // onBackground dark : onBackground
                  margin: 0,
                  lineHeight: 1.3,
                }}>
                  {title}
                </p>
                <p id={messageId} style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 400,
                  fontSize: 14,
                  color: dark ? 'rgba(255,255,255,0.7)' : colors.onBackground,  // onBackgroundSecondary dark : onBackground
                  margin: 0,
                  lineHeight: 1.5,
                }}>
                  {message}
                </p>
              </div>

              {/* Buttons — stacked vertically */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {/* Confirm */}
                <button
                  onClick={onConfirm}
                  style={{
                    width: '100%',
                    height: 48,
                    borderRadius: 50,
                    border: 'none',
                    background: confirmBg[variant],
                    color: confirmColor[variant],
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: 'pointer',
                  }}
                >
                  {confirmLabel}
                </button>
                {/* Cancel */}
                <button
                  onClick={onClose}
                  style={{
                    width: '100%',
                    height: 48,
                    borderRadius: 50,
                    border: dark ? '1px solid rgba(255,255,255,0.2)' : `1.5px solid ${colors.onBackground}`,  // outline dark : onBackground
                    background: 'transparent',
                    color: dark ? 'rgba(255,255,255,0.8)' : colors.onBackground,  // onBackgroundSecondary dark : onBackground
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: 'pointer',
                  }}
                >
                  {cancelLabel}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
