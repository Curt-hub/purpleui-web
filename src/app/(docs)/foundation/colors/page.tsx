'use client';
import { useState } from 'react';
import { colors } from '@/lib/tokens';

const primaryColors = [
  { name: 'Purple', hex: colors.primary, variable: 'Primary / Purple' },
  { name: 'Dark Blue', hex: colors.darkBlue, variable: 'Primary / Dark Blue' },
  { name: 'Pearl White', hex: colors.pearlWhite, variable: 'Primary / Pearl White' },
];

const monochromeColors = [
  { name: 'Black', hex: colors.black, variable: 'Monochrome / Black' },
  { name: 'Off-black', hex: colors.offBlack, variable: 'Monochrome / Off-black' },
  { name: 'White', hex: colors.white, variable: 'Monochrome / White' },
  { name: 'Grey A', hex: colors.greyA, variable: 'Monochrome / Grey A' },
  { name: 'Grey B', hex: colors.greyB, variable: 'Monochrome / Grey B' },
  { name: 'Grey C', hex: colors.greyC, variable: 'Monochrome / Grey C' },
  { name: 'Grey D', hex: colors.greyD, variable: 'Monochrome / Grey D' },
  { name: 'Grey E', hex: colors.greyE, variable: 'Monochrome / Grey E' },
  { name: 'Grey F', hex: colors.greyF, variable: 'Monochrome / Grey F' },
];

const actionColors = [
  { name: 'Blue', hex: colors.blue, variable: 'Actions / Blue' },
  { name: 'Green', hex: colors.green, variable: 'Actions / Green' },
  { name: 'Red', hex: colors.red, variable: 'Actions / Red' },
  { name: 'Yellow', hex: colors.yellow, variable: 'Actions / Yellow' },
];

function ColorSwatch({ name, hex, variable }: { name: string; hex: string; variable: string }) {
  const [copied, setCopied] = useState(false);
  const isWhite = hex.toUpperCase() === '#FFFFFF';

  const handleClick = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className="flex flex-col overflow-hidden rounded-lg border border-[#DDDDDF] cursor-pointer hover:ring-2 hover:ring-[#7458FD]/40 hover:border-[#7458FD]/40 transition-all"
      onClick={handleClick}
      title={variable}
    >
      <div
        style={{ backgroundColor: hex }}
        className={`h-28 flex items-start p-3 ${isWhite ? 'border-b border-[#DDDDDF]' : ''}`}
      >
        <span
          className="text-xs px-2 py-1 rounded bg-white text-black"
          style={isWhite ? { border: '1px solid #DDDDDF' } : undefined}
        >
          {name}
        </span>
      </div>
      <div className="bg-white px-4 py-3 flex flex-col gap-1">
        <p className="text-sm font-bold text-black h-5">
          {copied ? (
            <span className="text-[#7458FD]">Copied!</span>
          ) : (
            hex.toUpperCase()
          )}
        </p>
        <p className="text-xs text-[#595959]">{variable}</p>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-lg font-bold text-primary mb-5">{title}</h2>
      {children}
    </section>
  );
}

export default function ColorsPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Colour palette</h1>
      <p className="text-gray-500 mb-10">
        The Purple colour palette consists of three primary colours: Purple, Dark blue and Pearl white.
        These colours are essential in building brand recognition and ensuring a consistent visual identity.
        Click any swatch to copy its hex value.
      </p>

      <Section title="Primary">
        <div className="grid grid-cols-3 gap-4">
          {primaryColors.map(c => <ColorSwatch key={c.name} {...c} />)}
        </div>
      </Section>

      <Section title="Monochrome">
        <div className="grid grid-cols-3 gap-4 mb-4">
          {monochromeColors.slice(0, 3).map(c => <ColorSwatch key={c.name} {...c} />)}
        </div>
        <div className="grid grid-cols-6 gap-4">
          {monochromeColors.slice(3).map(c => <ColorSwatch key={c.name} {...c} />)}
        </div>
      </Section>

      <Section title="Actions">
        <div className="grid grid-cols-4 gap-4">
          {actionColors.map(c => <ColorSwatch key={c.name} {...c} />)}
        </div>
      </Section>
    </div>
  );
}
