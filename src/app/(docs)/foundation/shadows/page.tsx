'use client';
import { useState } from 'react';
import { shadows } from '@/lib/tokens';

const sections = [
  {
    title: 'Bottom, south-facing',
    items: [
      { name: 'Bottom A', token: 'bottomA', usage: 'Button, Pills',   shadow: shadows.bottomA },
      { name: 'Bottom B', token: 'bottomB', usage: 'Inputs',          shadow: shadows.bottomB },
      { name: 'Bottom C', token: 'bottomC', usage: 'Tables',          shadow: shadows.bottomC },
      { name: 'Bottom D', token: 'bottomD', usage: 'Hero banners',    shadow: shadows.bottomD },
    ],
  },
  {
    title: 'Top, north-facing',
    items: [
      { name: 'Top A', token: 'topA', usage: 'Navigation bar',       shadow: shadows.topA },
      { name: 'Top B', token: 'topB', usage: 'Sticky headers',       shadow: shadows.topB },
      { name: 'Top C', token: 'topC', usage: 'Elevated sheets',      shadow: shadows.topC },
      { name: 'Top D', token: 'topD', usage: 'Modal overlays',       shadow: shadows.topD },
    ],
  },
  {
    title: 'Side navigation',
    items: [
      { name: 'Side nav', token: 'sideNav', usage: 'Side nav drawer', shadow: shadows.sideNav },
    ],
  },
  {
    title: 'Tiles',
    items: [
      { name: 'Tiles — Active', token: 'tilesActive', usage: 'Default tile state',  shadow: shadows.tilesActive },
      { name: 'Tiles — Hover',  token: 'tilesHover',  usage: 'Hovered tile state',  shadow: shadows.tilesHover },
    ],
  },
];

function ShadowCard({
  name,
  usage,
  shadow,
}: {
  name: string;
  token: string;
  usage: string;
  shadow: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(shadow);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className="flex flex-col gap-5 cursor-pointer group"
      onClick={handleClick}
      title="Click to copy shadow value"
    >
      {/* Preview */}
      <div className="bg-[#DDDDDF] rounded-lg flex items-center justify-center h-44 group-hover:bg-[#d0d0d2] transition-colors">
        <div
          className="bg-white rounded-full"
          style={{ boxShadow: shadow, width: 72, height: 72 }}
        />
      </div>
      {/* Details */}
      <div className="flex flex-col gap-1">
        <p className="text-sm font-bold text-black">{name}</p>
        <p className="text-sm text-[#595959]">{usage}</p>
        <p className="text-xs font-mono text-[#AAACB0] mt-1 break-all min-h-[2.5rem]">
          {copied ? (
            <span className="text-[#7458FD] font-bold not-italic">Copied!</span>
          ) : (
            shadow
          )}
        </p>
      </div>
    </div>
  );
}

export default function ShadowsPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Shadows</h1>
      <p className="text-gray-500 mb-10">
        Shadow styles primarily used on interface elements such as tiles, containers and navigation bars.
        Click any card to copy its CSS box-shadow value.
      </p>

      {sections.map(({ title, items }) => (
        <section key={title} className="mb-14">
          <h2 className="text-lg font-bold text-primary mb-6">{title}</h2>
          <div className="grid grid-cols-4 gap-8">
            {items.map(item => (
              <ShadowCard key={item.token} {...item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
