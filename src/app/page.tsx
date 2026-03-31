import Link from 'next/link';
import { LayoutShell } from '@/components/layouts/LayoutShell';
import { PurpleLogo } from '@/components/ui/PurpleLogo';

const stats = [
  { value: '10', label: 'Components' },
  { value: '5',  label: 'Foundations' },
  { value: 'iOS', label: 'SwiftUI Ready' },
];

const contacts = [
  { name: 'Chris Dunn',  email: 'chris@purple.ai' },
  { name: 'Curt Duncan', email: 'curt@purple.ai' },
];

export default function WelcomePage() {
  return (
    <LayoutShell>
      <main>

        {/* ── Hero ── */}
        <div
          className="relative flex flex-col items-center justify-center gap-7 px-10 py-28 text-center overflow-hidden"
          style={{ backgroundColor: '#011638' }}
        >
          {/* Dot-grid texture */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />

          {/* Version badge */}
          <div className="relative z-10 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 text-white/50 text-xs font-poppins font-medium tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7458FD]" />
            Version 1.0
          </div>

          {/* Logo + UI lockup */}
          <div className="relative z-10 flex items-center gap-3">
            <PurpleLogo variant="white-purple" width={180} />
            <span
              className="font-poppins font-bold"
              style={{ fontSize: 40, lineHeight: 1, color: 'transparent', WebkitTextStroke: '2px white', display: 'inline-block', transform: 'translateY(0.1em)' }}
            >
              UI
            </span>
          </div>

          {/* Headline */}
          <div className="relative z-10 flex flex-wrap items-baseline justify-center gap-x-4">
            <span
              className="font-poppins font-bold text-white"
              style={{ fontSize: 'clamp(36px, 5.5vw, 76px)', lineHeight: 1 }}
            >
              MOBILE DESIGN
            </span>
            <span
              className="font-poppins font-bold"
              style={{
                fontSize: 'clamp(36px, 5.5vw, 76px)',
                lineHeight: 1,
                color: 'transparent',
                WebkitTextStroke: '2px white',
              }}
            >
              SYSTEM
            </span>
          </div>

          {/* Subtitle */}
          <p
            className="relative z-10 font-poppins text-white/60 max-w-xl"
            style={{ fontSize: 'clamp(14px, 1.4vw, 18px)', lineHeight: 1.7 }}
          >
            Components, patterns, and guidelines for building the Purple mobile experience — from tokens to production-ready SwiftUI.
          </p>

          {/* CTAs */}
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 mt-1">
            <Link
              href="/buttons/button"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#7458FD] text-white text-sm font-poppins font-bold hover:bg-[#5f43e0] transition-colors"
            >
              Explore Components
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/foundation/colors"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/25 text-white text-sm font-poppins font-bold hover:border-white/50 hover:bg-white/5 transition-all"
            >
              View Foundations
            </Link>
          </div>
        </div>

        {/* ── Stats strip ── */}
        <div className="border-b border-[#DDDDDF]">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-3 divide-x divide-[#DDDDDF]">
              {stats.map(({ value, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 py-10">
                  <span
                    className="font-poppins font-bold text-[#011638]"
                    style={{ fontSize: 'clamp(28px, 3vw, 42px)', lineHeight: 1 }}
                  >
                    {value}
                  </span>
                  <span className="text-sm text-gray-400 font-poppins">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── About + Contacts ── */}
        <div className="max-w-4xl mx-auto px-10 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

            {/* About */}
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-xs font-bold text-[#7458FD] tracking-widest uppercase mb-2 font-poppins">About</p>
                <h2 className="font-poppins font-bold text-[22px] text-black leading-snug">What is Purple UI?</h2>
              </div>
              <div className="font-poppins text-[14px] text-[#595959] leading-relaxed space-y-4">
                <p>
                  Purple UI provides a pixel-perfect design concept and prototyping
                  system for the Purple mobile apps.
                </p>
                <p>
                  The kit defines the visual style and user experience of Purple&apos;s
                  products and mobile apps — ensuring consistency across every screen.
                </p>
                <p>
                  Built on Atomic Design principles, it breaks the interface down into
                  foundational tokens, small components, and patterns that compose
                  into complete screens.
                </p>
              </div>
            </div>

            {/* Contacts */}
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-xs font-bold text-[#7458FD] tracking-widest uppercase mb-2 font-poppins">Contact</p>
                <h2 className="font-poppins font-bold text-[22px] text-black leading-snug">Get in Touch</h2>
              </div>
              <p className="font-poppins text-[14px] text-[#595959] leading-relaxed">
                Want to leave feedback or found a problem? Reach out to a member of the UX Design Team:
              </p>
              <div className="flex flex-col gap-3">
                {contacts.map(({ name, email }) => (
                  <a
                    key={email}
                    href={`mailto:${email}`}
                    className="flex items-center gap-4 p-4 rounded-2xl border border-[#DDDDDF] hover:border-[#7458FD]/40 hover:bg-[#7458FD]/[0.03] transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#7458FD]/10 flex items-center justify-center shrink-0">
                      <svg width="16" height="13" viewBox="0 0 20 16" fill="none">
                        <rect x="0.5" y="0.5" width="19" height="15" rx="1.5" stroke="#7458FD" strokeWidth="1.5" />
                        <path d="M1 1L10 9L19 1" stroke="#7458FD" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="font-poppins font-bold text-sm text-black group-hover:text-[#7458FD] transition-colors">{name}</p>
                      <p className="font-poppins text-xs text-[#595959] truncate">{email}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>

      </main>
    </LayoutShell>
  );
}
