'use client';
import { useState, useEffect, useRef, type ChangeEvent } from 'react';
import { PUButton } from '@/components/ui/PUButton';
import { PUIconButton } from '@/components/ui/PUIconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket, faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { useBrandConfig } from './useBrandConfig';
import { WalletComposite } from './WalletComposite';
import { PUPassCard } from '@/components/ui/PUPassCard';
import type { LogoOrientation } from './utils/colorUtils';

// ─── Shared styles ────────────────────────────────────────────────────────────

const LABEL: React.CSSProperties = {
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 600,
  fontSize: 11,
  color: '#6B7280',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
};

const INPUT: React.CSSProperties = {
  padding: '8px 12px',
  borderRadius: 8,
  border: '1px solid #D1D5DB',
  fontFamily: 'Poppins, sans-serif',
  fontSize: 13,
  outline: 'none',
  background: '#fff',
  width: '100%',
  boxSizing: 'border-box',
  color: '#1e293b',
};

// ─── Constants ────────────────────────────────────────────────────────────────

// Light → mid → dark across hues
const PRESETS = [
  '#C4B5FD', // Lavender (light)
  '#BAE6FD', // Sky (light)
  '#A7F3D0', // Mint (light)
  '#FCA5A5', // Rose (light)
  '#7458FD', // Purple (mid)
  '#2563EB', // Blue (mid)
  '#059669', // Emerald (mid)
  '#DC2626', // Red (mid)
  '#011638', // Navy (dark)
  '#3B0764', // Midnight purple (dark)
  '#064E3B', // Forest green (dark)
  '#7F1D1D', // Dark red (dark)
] as const;

const ORIENTATION_LABELS: Record<LogoOrientation, string> = {
  landscape: 'Landscape • 80×28 px max on card',
  square:    'Square • 28×28 px max on card',
  portrait:  'Portrait • 24×40 px max on card',
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WifiPassSetup() {
  const brand = useBrandConfig();
  const [hexInput, setHexInput]     = useState(brand.primaryColor);
  const [copied, setCopied]         = useState(false);
  const logoInputRef              = useRef<HTMLInputElement>(null);
  const customColorRef            = useRef<HTMLInputElement>(null);

  useEffect(() => { setHexInput(brand.primaryColor); }, [brand.primaryColor]);

  function onHexChange(e: ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setHexInput(val);
    if (/^#[0-9A-Fa-f]{6}$/.test(val)) brand.setPrimaryColor(val);
  }

  function onHexBlur() {
    if (!/^#[0-9A-Fa-f]{6}$/.test(hexInput)) setHexInput(brand.primaryColor);
  }

  function onLogoFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) brand.handleLogoUpload(file);
    e.target.value = '';
  }

  function copyConfig() {
    navigator.clipboard.writeText(brand.exportConfig()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  }

  const isCustom = !PRESETS.map(p => p.toLowerCase()).includes(
    brand.primaryColor.toLowerCase() as typeof PRESETS[number]
  );

  return (
    <div style={{ maxWidth: 720, padding: '40px 48px 60px', background: '#f8f7ff', minHeight: '100%' }}>

      {/* Header */}
      <h1 style={{ margin: '0 0 6px', fontSize: 28, fontWeight: 700, color: '#0f172a', fontFamily: 'Poppins, sans-serif' }}>
        WiFi Pass Setup
      </h1>
      <p style={{ margin: '0 0 32px', fontSize: 15, color: '#64748b', fontFamily: 'Poppins, sans-serif' }}>
        Configure your branded WiFi Pass. Changes preview in real time.
      </p>

      {/* ── Playground box ─────────────────────────────────────────────────────── */}
      <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 16, padding: 24, marginBottom: 48 }}>

        {/* Pass preview */}
        <div style={{ maxWidth: 340, margin: '0 auto 28px' }}>
          <PUPassCard
            title={brand.passTitle}
            backgroundColor={brand.primaryColor}
            gradientTo={brand.gradientTo}
            partnerLogoUrl={brand.logoDataUrl ?? undefined}
            partnerLogoOrientation={brand.logoOrientation ?? 'landscape'}
            holo
          />
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Name inputs */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <label style={{ flex: '1 1 140px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={LABEL}>First Name</span>
              <input
                value={brand.firstName}
                onChange={e => brand.setFirstName(e.target.value)}
                placeholder="Curt"
                style={INPUT}
              />
            </label>
            <label style={{ flex: '1 1 140px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={LABEL}>Company Name</span>
              <input
                value={brand.companyName}
                onChange={e => brand.setCompanyName(e.target.value)}
                placeholder="ACME"
                style={INPUT}
              />
            </label>
          </div>

          {/* Brand colour */}
          <div>
            <p style={{ ...LABEL, display: 'block', marginBottom: 8 }}>Brand Colour</p>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              {PRESETS.map(color => (
                <button
                  key={color}
                  onClick={() => brand.setPrimaryColor(color)}
                  title={color}
                  style={{
                    width: 28, height: 28, borderRadius: '50%', background: color, border: 'none',
                    cursor: 'pointer', flexShrink: 0,
                    outline: brand.primaryColor.toLowerCase() === color.toLowerCase()
                      ? `3px solid ${color}` : '3px solid transparent',
                    outlineOffset: 2,
                  }}
                />
              ))}

              {/* Custom swatch + hex input */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div
                  onClick={() => customColorRef.current?.click()}
                  style={{
                    width: 28, height: 28, borderRadius: '50%', background: brand.primaryColor,
                    border: '1px solid #D1D5DB', cursor: 'pointer', flexShrink: 0,
                    position: 'relative', overflow: 'hidden',
                    outline: isCustom ? `3px solid ${brand.primaryColor}` : '3px solid transparent',
                    outlineOffset: 2,
                  }}
                >
                  <input
                    ref={customColorRef}
                    type="color"
                    value={brand.primaryColor}
                    onChange={e => brand.setPrimaryColor(e.target.value)}
                    style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }}
                  />
                </div>
                <input
                  type="text"
                  value={hexInput}
                  onChange={onHexChange}
                  onBlur={onHexBlur}
                  maxLength={7}
                  spellCheck={false}
                  style={{
                    width: 72, fontSize: 12, fontFamily: 'monospace', color: '#475569',
                    background: '#fff', border: '1px solid #D1D5DB', borderRadius: 6,
                    outline: 'none', textAlign: 'center', padding: '4px 6px',
                  }}
                  onFocus={e => { e.currentTarget.style.borderColor = '#7458FD'; }}
                  onBlurCapture={e => { e.currentTarget.style.borderColor = '#D1D5DB'; }}
                />
              </div>
            </div>
          </div>

          {/* Logo upload */}
          <div>
            <p style={{ ...LABEL, display: 'block', marginBottom: 8 }}>Company Logo</p>
            {brand.logoDataUrl ? (
              <div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '8px 12px', border: '1px solid #D1D5DB', borderRadius: 8, background: '#fff',
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={brand.logoDataUrl} alt="Logo preview" style={{ height: 40, maxWidth: 80, objectFit: 'contain', flexShrink: 0 }} />
                  <span style={{ flex: 1, fontSize: 12, color: '#6B7280', fontFamily: 'Poppins, sans-serif', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {brand.logoFile?.name ?? 'Uploaded logo'}
                  </span>
                  <PUIconButton icon={faXmark} variant="light" onClick={brand.clearLogo} aria-label="Remove logo" />
                </div>
                {brand.logoOrientation && (
                  <span style={{ display: 'inline-block', marginTop: 6, padding: '2px 10px', borderRadius: 999, background: '#F3F4F6', fontSize: 11, color: '#6B7280', fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                    {ORIENTATION_LABELS[brand.logoOrientation]}
                  </span>
                )}
              </div>
            ) : (
              <div
                role="button"
                tabIndex={0}
                onClick={() => logoInputRef.current?.click()}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') logoInputRef.current?.click(); }}
                style={{
                  border: '1.5px dashed #D1D5DB', borderRadius: 8, height: 68,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  cursor: 'pointer', background: '#fff', transition: 'border-color 0.15s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#7458FD'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#D1D5DB'; }}
              >
                <FontAwesomeIcon icon={faArrowUpFromBracket} style={{ color: '#9CA3AF', width: 14, height: 14 }} />
                <span style={{ fontSize: 13, color: '#9CA3AF', fontFamily: 'Poppins, sans-serif' }}>Upload PNG or SVG</span>
                <input ref={logoInputRef} type="file" accept="image/png,image/svg+xml" onChange={onLogoFileChange} style={{ display: 'none' }} aria-hidden="true" />
              </div>
            )}
          </div>

          {/* Copy config */}
          <PUButton variant="secondary" size="md" fullWidth label={copied ? 'Copied!' : 'Copy setup JSON'} icon={copied ? faCheck : faCopy} iconPosition="before" onClick={copyConfig} />

        </div>
      </div>

      {/* ── Illustration ────────────────────────────────────────────────────────── */}
      <div>
        <p style={{ ...LABEL, display: 'block', marginBottom: 12 }}>Illustration</p>
        <WalletComposite
          primaryColor={brand.primaryColor}
          logoDataUrl={brand.logoDataUrl}
          logoOrientation={brand.logoOrientation}
        />
      </div>

    </div>
  );
}
