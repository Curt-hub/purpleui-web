'use client';
import { useState, useId } from 'react';
import { colors } from '@/lib/tokens';

export interface PUTextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'tel' | 'number' | 'url';
  error?: string;
  disabled?: boolean;
  dark?: boolean;
  /** Override the surface background used to mask the border behind the floating label. Defaults to white (light) or #011638 (dark). */
  labelBg?: string;
  id?: string;
}

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M10 4.5C5.5 4.5 1.73 7.61 1 10c.73 2.39 4.5 5.5 9 5.5s8.27-3.11 9-5.5c-.73-2.39-4.5-5.5-9-5.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M3 3l14 14M8.5 8.56A2.5 2.5 0 0 0 12.43 12.5M6.36 6.37C4.36 7.5 2.73 8.75 2 10c.73 2.39 4.5 5.5 9 5.5 1.55 0 3.02-.36 4.33-.97M11.1 4.63A9.17 9.17 0 0 0 10 4.5C5.5 4.5 1.73 7.61 1 10c.37 1.21 1.17 2.37 2.24 3.34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export function PUTextInput({
  label,
  value,
  onChange,
  type = 'text',
  error,
  disabled = false,
  dark = false,
  labelBg,
  id: idProp,
}: PUTextInputProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const floated = focused || value.length > 0;
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  const resolvedLabelBg = labelBg ?? (dark ? '#011638' : '#ffffff');

  // Border colours
  let borderColor: string;
  if (error)             borderColor = colors.error;
  else if (focused)      borderColor = dark ? '#ffffff' : colors.brand;
  else if (value.length) borderColor = dark ? '#ffffff' : colors.onBackgroundSecondary;
  else                   borderColor = dark ? 'rgba(255,255,255,0.25)' : colors.outline;

  // Label colours
  let labelColor: string;
  if (!floated) {
    labelColor = dark ? 'rgba(255,255,255,0.35)' : colors.onBackgroundTertiary;
  } else if (error) {
    labelColor = colors.error;
  } else if (focused) {
    labelColor = dark ? '#ffffff' : colors.brand;
  } else {
    labelColor = dark ? 'rgba(255,255,255,0.70)' : colors.onBackgroundSecondary;
  }

  const textColor = dark ? '#ffffff' : colors.onBackground;
  const iconColor = dark ? 'rgba(255,255,255,0.35)' : colors.onBackgroundTertiary;

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div
        style={{
          position: 'relative',
          height: 56,
          borderRadius: 10,
          border: `1.5px solid ${borderColor}`,
          transition: 'border-color 0.15s ease',
          opacity: disabled ? 0.4 : 1,
          pointerEvents: disabled ? 'none' : 'auto',
          boxSizing: 'border-box',
        }}
      >
        {/* Floating label */}
        <label
          htmlFor={id}
          style={{
            position: 'absolute',
            left: floated ? 6 : 16,
            top: floated ? -11 : '50%',
            transform: floated ? 'none' : 'translateY(-50%)',
            padding: floated ? '0 10px' : 0,
            background: floated ? resolvedLabelBg : 'transparent',
            fontFamily: 'Poppins, sans-serif',
            fontSize: floated ? 12 : 14,
            fontWeight: 400,
            lineHeight: 1.5,
            color: labelColor,
            transition: 'all 0.15s ease',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            zIndex: 1,
            cursor: 'text',
          }}
        >
          {label}
        </label>

        <input
          id={id}
          type={inputType}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            padding: `0 ${isPassword ? 48 : 16}px 0 16px`,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontFamily: 'Poppins, sans-serif',
            fontSize: 14,
            fontWeight: 400,
            color: textColor,
            boxSizing: 'border-box',
          }}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(s => !s)}
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            style={{
              position: 'absolute',
              right: 14,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              padding: 4,
              cursor: 'pointer',
              color: iconColor,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>

      {error && (
        <p
          style={{
            margin: '6px 0 0 4px',
            fontFamily: 'Poppins, sans-serif',
            fontSize: 12,
            fontWeight: 400,
            lineHeight: 1.5,
            color: colors.error,
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
