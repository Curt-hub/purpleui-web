'use client';
import { useRef, useState, useEffect, type ChangeEvent } from 'react';
import { type LogoOrientation } from './utils/colorUtils';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BrandFormProps {
  firstName:        string;
  setFirstName:     (v: string) => void;
  companyName:      string;
  setCompanyName:   (v: string) => void;
  primaryColor:     string;
  setPrimaryColor:  (v: string) => void;
  logoFile:         File | null;
  logoDataUrl:      string | null;
  logoOrientation:  LogoOrientation | null;
  handleLogoUpload: (file: File) => void;
  clearLogo:        () => void;
  exportConfig:     () => string;
}

// ─── Shared styles ────────────────────────────────────────────────────────────

const sectionLabel: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '0.08em',
  color: '#94a3b8',
  textTransform: 'uppercase',
  marginBottom: 8,
  display: 'block',
  fontFamily: "'Poppins', sans-serif",
};

const inputBase: React.CSSProperties = {
  border: '1px solid #e2e8f0',
  borderRadius: 8,
  padding: '10px 14px',
  fontSize: 15,
  width: '100%',
  boxSizing: 'border-box',
  fontFamily: "'Poppins', sans-serif",
  color: '#1e293b',
  background: '#ffffff',
  outline: 'none',
  transition: 'border-color 0.15s',
};

// ─── Preset swatches ──────────────────────────────────────────────────────────

const PRESETS = ['#7458FD', '#011638', '#0f9b63', '#2d3748', '#C0392B'] as const;

function ColorSection({
  primaryColor,
  setPrimaryColor,
}: Pick<BrandFormProps, 'primaryColor' | 'setPrimaryColor'>) {
  const customInputRef = useRef<HTMLInputElement>(null);
  const [hexInput, setHexInput] = useState(primaryColor);

  useEffect(() => { setHexInput(primaryColor); }, [primaryColor]);

  function onHexChange(e: ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setHexInput(val);
    if (/^#[0-9A-Fa-f]{6}$/.test(val)) setPrimaryColor(val);
  }

  function onHexBlur() {
    if (!/^#[0-9A-Fa-f]{6}$/.test(hexInput)) setHexInput(primaryColor);
  }

  const isCustom = !PRESETS.map((p) => p.toLowerCase()).includes(primaryColor.toLowerCase() as typeof PRESETS[number]);

  return (
    <div>
      <span style={sectionLabel}>Brand Colour</span>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        {PRESETS.map((color) => {
          const selected = primaryColor.toLowerCase() === color.toLowerCase();
          return (
            <button
              key={color}
              onClick={() => setPrimaryColor(color)}
              title={color}
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: color,
                border: `2px solid ${selected ? color : 'transparent'}`,
                outline: selected ? `2px solid ${color}` : '2px solid transparent',
                outlineOffset: 2,
                cursor: 'pointer',
                transform: selected ? 'scale(1.08)' : 'scale(1)',
                transition: 'transform 0.12s, outline 0.12s',
                padding: 0,
                flexShrink: 0,
              }}
              aria-label={`Select color ${color}`}
              aria-pressed={selected}
            />
          );
        })}

        {/* Custom swatch */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <div
            onClick={() => customInputRef.current?.click()}
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              background: primaryColor,
              border: `2px solid ${isCustom ? primaryColor : 'transparent'}`,
              outline: isCustom ? `2px solid ${primaryColor}` : '2px solid transparent',
              outlineOffset: 2,
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              transform: isCustom ? 'scale(1.08)' : 'scale(1)',
              transition: 'transform 0.12s',
              flexShrink: 0,
            }}
            role="button"
            aria-label="Pick custom color"
          >
            <input
              ref={customInputRef}
              type="color"
              value={primaryColor}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPrimaryColor(e.target.value)}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0,
                cursor: 'pointer',
                width: '100%',
                height: '100%',
              }}
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
              width: 68,
              fontSize: 11,
              fontFamily: 'monospace',
              color: '#475569',
              background: 'none',
              border: 'none',
              borderBottom: '1px solid #e2e8f0',
              outline: 'none',
              textAlign: 'center',
              padding: '1px 0',
              letterSpacing: '0.03em',
            }}
            onFocus={(e) => { e.currentTarget.style.borderBottomColor = '#7458FD'; }}
            onBlurCapture={(e) => { e.currentTarget.style.borderBottomColor = '#e2e8f0'; }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Logo upload ──────────────────────────────────────────────────────────────

const ORIENTATION_LABELS: Record<LogoOrientation, string> = {
  landscape: 'Landscape • 80×28 px max on card',
  square:    'Square • 28×28 px max on card',
  portrait:  'Portrait • 24×40 px max on card',
};

function LogoSection({
  logoFile, logoDataUrl, logoOrientation, handleLogoUpload, clearLogo,
}: Pick<BrandFormProps, 'logoFile' | 'logoDataUrl' | 'logoOrientation' | 'handleLogoUpload' | 'clearLogo'>) {
  const inputRef = useRef<HTMLInputElement>(null);

  function onFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleLogoUpload(file);
    e.target.value = '';
  }

  return (
    <div>
      <span style={sectionLabel}>Company Logo</span>
      {logoDataUrl ? (
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '10px 14px',
            border: '1px solid #e2e8f0',
            borderRadius: 8,
            background: '#f8fafc',
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoDataUrl}
              alt="Logo preview"
              style={{ height: 48, maxWidth: 100, objectFit: 'contain', flexShrink: 0 }}
            />
            <span style={{
              flex: 1,
              fontSize: 13,
              color: '#475569',
              fontFamily: "'Poppins', sans-serif",
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {logoFile?.name ?? 'Uploaded logo'}
            </span>
            <button
              onClick={clearLogo}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 18,
                color: '#94a3b8',
                lineHeight: 1,
                padding: '0 4px',
                flexShrink: 0,
              }}
              aria-label="Remove logo"
            >
              ×
            </button>
          </div>

          {/* Orientation badge */}
          {logoOrientation && (
            <span style={{
              display: 'inline-block',
              marginTop: 8,
              padding: '3px 10px',
              borderRadius: 999,
              background: '#f1f5f9',
              fontSize: 11,
              color: '#64748b',
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 500,
            }}>
              {ORIENTATION_LABELS[logoOrientation]}
            </span>
          )}
        </div>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click(); }}
          style={{
            border: '1.5px dashed #cbd5e1',
            borderRadius: 8,
            height: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            cursor: 'pointer',
            background: '#f8fafc',
            transition: 'border-color 0.15s, background 0.15s',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = '#7458FD';
            (e.currentTarget as HTMLDivElement).style.background  = '#f5f3ff';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = '#cbd5e1';
            (e.currentTarget as HTMLDivElement).style.background  = '#f8fafc';
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M9 2v10M4 7l5-5 5 5" stroke="#94a3b8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 14h14" stroke="#94a3b8" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
          <span style={{ fontSize: 13, color: '#94a3b8', fontFamily: "'Poppins', sans-serif" }}>
            Upload PNG or SVG
          </span>
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/svg+xml"
            onChange={onFileChange}
            style={{ display: 'none' }}
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
}

// ─── BrandForm ────────────────────────────────────────────────────────────────

export function BrandForm({
  firstName,    setFirstName,
  companyName,  setCompanyName,
  primaryColor, setPrimaryColor,
  logoFile,     logoDataUrl, logoOrientation,
  handleLogoUpload, clearLogo,
  exportConfig,
}: BrandFormProps) {
  const [copied, setCopied] = useState(false);

  function copyConfig() {
    navigator.clipboard.writeText(exportConfig()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

      {/* Name inputs */}
      <div>
        <div className="wps-name-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div>
            <label style={sectionLabel} htmlFor="wps-firstname">First Name</label>
            <input
              id="wps-firstname"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Curt"
              style={inputBase}
              onFocus={(e) => { e.currentTarget.style.borderColor = '#7458FD'; }}
              onBlur={(e)  => { e.currentTarget.style.borderColor = '#e2e8f0'; }}
            />
          </div>
          <div>
            <label style={sectionLabel} htmlFor="wps-company">Company Name</label>
            <input
              id="wps-company"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="ACME"
              style={inputBase}
              onFocus={(e) => { e.currentTarget.style.borderColor = '#7458FD'; }}
              onBlur={(e)  => { e.currentTarget.style.borderColor = '#e2e8f0'; }}
            />
          </div>
        </div>
      </div>

      {/* Brand colour */}
      <ColorSection primaryColor={primaryColor} setPrimaryColor={setPrimaryColor} />

      {/* Logo */}
      <LogoSection
        logoFile={logoFile}
        logoDataUrl={logoDataUrl}
        logoOrientation={logoOrientation}
        handleLogoUpload={handleLogoUpload}
        clearLogo={clearLogo}
      />

      {/* Copy config */}
      <button
        onClick={copyConfig}
        style={{
          width: '100%',
          padding: '12px 0',
          borderRadius: 10,
          border: '1px solid #e2e8f0',
          background: copied ? '#f0fdf4' : '#f8fafc',
          color: copied ? '#16a34a' : '#475569',
          fontSize: 14,
          fontWeight: 600,
          fontFamily: "'Poppins', sans-serif",
          cursor: 'pointer',
          transition: 'background 0.15s, color 0.15s',
          letterSpacing: '0.01em',
        }}
        onMouseEnter={(e) => {
          if (!copied) e.currentTarget.style.borderColor = '#7458FD';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#e2e8f0';
        }}
      >
        {copied ? 'Copied!' : 'Copy setup JSON'}
      </button>

    </div>
  );
}

export default BrandForm;
