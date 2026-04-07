'use client';
import { PurpleLogo, PurpleIcon } from '@/components/ui/PurpleLogo';

const colourways = [
  {
    label: 'Blue with Purple dots',
    bg: '#F5F1ED',
    variant: 'dark-purple' as const,
    usage: 'Use on light / pearl white backgrounds',
    logoFile: '/logo/logo-dark-purple.svg',
    iconFile: '/logo/icon-dark-purple.svg',
  },
  {
    label: 'White with Navy dots',
    bg: '#7458FD',
    variant: 'white-navy' as const,
    usage: 'Use on the Purple brand colour',
    logoFile: '/logo/logo-white-navy.svg',
    iconFile: '/logo/icon-white-navy.svg',
  },
  {
    label: 'White with Purple dots',
    bg: '#011638',
    variant: 'white-purple' as const,
    usage: 'Use on dark navy / dark backgrounds',
    logoFile: '/logo/logo-white-purple.svg',
    iconFile: '/logo/icon-white-purple.svg',
  },
];

function DownloadButton({ href, filename }: { href: string; filename: string }) {
  return (
    <a
      href={href}
      download={filename}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-poppins font-medium transition-all"
      style={{ background: '#f3f4f6', color: '#6b7280' }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(116,88,253,0.1)';
        (e.currentTarget as HTMLAnchorElement).style.color = '#7458FD';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLAnchorElement).style.background = '#f3f4f6';
        (e.currentTarget as HTMLAnchorElement).style.color = '#6b7280';
      }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M6 1v7M3 5.5l3 3 3-3M1 10h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      SVG
    </a>
  );
}

export default function LogosPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Logo</h1>
      <p className="text-gray-500 mb-10">
        The Purple logo is available in colourways designed to work on both light and dark backgrounds.
      </p>

      {/* Wordmark */}
      <div className="flex flex-col gap-3 mb-12">
        {colourways.map(({ label, bg, variant, usage, logoFile }) => (
          <div key={label + bg} className="rounded-2xl overflow-hidden border border-[#DDDDDF]">
            <div
              className="flex items-center justify-center py-12"
              style={{ backgroundColor: bg }}
            >
              <PurpleLogo variant={variant} width={320} />
            </div>
            <div className="px-5 py-4 bg-white flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-black">{label}</p>
                <p className="text-sm text-[#595959] mt-0.5">{usage}</p>
              </div>
              <div className="flex items-center gap-3">
                <DownloadButton href={logoFile} filename={`purple-logo-${variant}.svg`} />
                <div
                  className="w-8 h-8 rounded-full border border-[#DDDDDF] flex-shrink-0"
                  style={{ backgroundColor: bg }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Icon mark */}
      <h2 className="text-xl font-bold text-gray-900 mb-2">Logo Icon</h2>
      <p className="text-gray-500 mb-6">
        The standalone icon mark, used where the full wordmark would be too large.
      </p>
      <div className="flex flex-col gap-3">
        {colourways.map(({ label, bg, variant, usage, iconFile }) => (
          <div key={'icon-' + bg} className="rounded-2xl overflow-hidden border border-[#DDDDDF]">
            <div
              className="flex items-center justify-center py-12"
              style={{ backgroundColor: bg }}
            >
              <PurpleIcon variant={variant} size={96} />
            </div>
            <div className="px-5 py-4 bg-white flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-black">{label}</p>
                <p className="text-sm text-[#595959] mt-0.5">{usage}</p>
              </div>
              <div className="flex items-center gap-3">
                <DownloadButton href={iconFile} filename={`purple-icon-${variant}.svg`} />
                <div
                  className="w-8 h-8 rounded-full border border-[#DDDDDF] flex-shrink-0"
                  style={{ backgroundColor: bg }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
