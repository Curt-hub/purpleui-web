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

// ── Download helpers ──────────────────────────────────────────────────────────

function downloadSVG(href: string, filename: string) {
  const a = document.createElement('a');
  a.href = href;
  a.download = filename;
  a.click();
}

async function downloadPNG(svgHref: string, filename: string, scale = 3) {
  const res = await fetch(svgHref);
  const svgText = await res.text();

  // Parse the SVG to get its natural dimensions
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgText, 'image/svg+xml');
  const root = doc.documentElement;
  const w = parseFloat(root.getAttribute('width') ?? '500');
  const h = parseFloat(root.getAttribute('height') ?? '130');

  const blob = new Blob([svgText], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);

  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width  = Math.round(w * scale);
    canvas.height = Math.round(h * scale);
    const ctx = canvas.getContext('2d')!;
    ctx.scale(scale, scale);
    ctx.drawImage(img, 0, 0, w, h);
    URL.revokeObjectURL(url);
    canvas.toBlob(blob => {
      if (!blob) return;
      const pngUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = pngUrl;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(pngUrl);
    }, 'image/png');
  };
  img.src = url;
}

// ── Download button group ─────────────────────────────────────────────────────

function DownloadButtons({ svgHref, baseName }: { svgHref: string; baseName: string }) {
  const btnStyle = {
    base: { background: '#f3f4f6', color: '#6b7280' },
    hover: { background: 'rgba(116,88,253,0.1)', color: '#7458FD' },
  };

  const cls = 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-poppins font-medium transition-all cursor-pointer';

  return (
    <div className="flex items-center gap-2">
      {/* SVG */}
      <button
        className={cls}
        style={btnStyle.base}
        onMouseEnter={e => Object.assign((e.currentTarget as HTMLElement).style, btnStyle.hover)}
        onMouseLeave={e => Object.assign((e.currentTarget as HTMLElement).style, btnStyle.base)}
        onClick={() => downloadSVG(svgHref, `${baseName}.svg`)}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 1v7M3 5.5l3 3 3-3M1 10h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        SVG
      </button>

      {/* PNG */}
      <button
        className={cls}
        style={btnStyle.base}
        onMouseEnter={e => Object.assign((e.currentTarget as HTMLElement).style, btnStyle.hover)}
        onMouseLeave={e => Object.assign((e.currentTarget as HTMLElement).style, btnStyle.base)}
        onClick={() => downloadPNG(svgHref, `${baseName}.png`)}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 1v7M3 5.5l3 3 3-3M1 10h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        PNG
      </button>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

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
                <DownloadButtons svgHref={logoFile} baseName={`purple-logo-${variant}`} />
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
                <DownloadButtons svgHref={iconFile} baseName={`purple-icon-${variant}`} />
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
