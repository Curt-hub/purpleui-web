'use client';
import { useRef, useEffect, useCallback } from 'react';
import { PUButton } from '@/components/ui/PUButton';
import { faArrowDownToLine } from '@fortawesome/pro-regular-svg-icons';
import {
  hexToHsl,
  rgbToHslValues,
  hslToRgbValues,
  type LogoOrientation,
} from './utils/colorUtils';

// ─── Illustration dimensions ──────────────────────────────────────────────────

const W = 1230;
const H = 1359;

// Logo overlay — position and angle matched to Figma design (node 238:8381).
// Figma uses -rotate-30 on the pass card; screenshot maps logo to ~(815, 145) in our 1230x1359 canvas.
const LOGO_CENTER_X  = 795;
const LOGO_CENTER_Y  = 185;
const LOGO_ANGLE_DEG = -30;

// ─── Pixel recolour — card only ───────────────────────────────────────────────
//
// The card in wallet-main.png is purple (hue ≈ 255°).
// The wallet body is blue (hue ≈ 220°).
// Targeting h: 238–282 with s > 35 exclusively hits the card pixels.
// Lightness is preserved, so the original 3D shading / gradient stays intact.

// Approximate lightness of the card's flat face in wallet-main.png.
// Pixel offsets in the composite are scaled relative to this so any brand
// colour's flat area maps to exactly the target lightness.
const CARD_BASE_L = 60;

function colorizeCardPixels(imageData: ImageData, targetHex: string): void {
  const { h: tH, s: tS, l: tL } = hexToHsl(targetHex);
  const d = imageData.data;

  for (let i = 0; i < d.length; i += 4) {
    if (d[i + 3] < 10) continue;

    const { h, s, l } = rgbToHslValues(d[i] / 255, d[i + 1] / 255, d[i + 2] / 255);

    // Card purple band — excludes wallet blue (h≈220), gold snap (h≈40), shadows (low s)
    if (h < 238 || h > 282 || s < 35 || l < 15 || l > 90) continue;

    // Remap lightness: flat face (l≈CARD_BASE_L) → target lightness; scale shading around it.
    const newL = Math.max(5, Math.min(95, tL + (l - CARD_BASE_L) * 0.65));
    const { r, g, b } = hslToRgbValues(tH, Math.min(100, tS * 0.9 + 5), newL);
    d[i] = r; d[i + 1] = g; d[i + 2] = b;
  }
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface WalletCompositeProps {
  primaryColor:    string;
  logoDataUrl:     string | null;
  logoOrientation: LogoOrientation | null;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function WalletComposite({ primaryColor, logoDataUrl, logoOrientation }: WalletCompositeProps) {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const walletImgRef = useRef<HTMLImageElement | null>(null);
  const logoImgRef   = useRef<HTMLImageElement | null>(null);

  const colorRef  = useRef(primaryColor);
  const orientRef = useRef(logoOrientation);
  useEffect(() => { colorRef.current  = primaryColor; });
  useEffect(() => { orientRef.current = logoOrientation; });

  // ── Composite draw ──────────────────────────────────────────────────────────

  const composite = useCallback(() => {
    const canvas    = canvasRef.current;
    const walletImg = walletImgRef.current;
    if (!canvas || !walletImg) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 1. Draw wallet PNG
    ctx.clearRect(0, 0, W, H);
    ctx.drawImage(walletImg, 0, 0, W, H);

    // 2. Recolour card pixels to brand primary colour (wallet body stays original blue)
    const imageData = ctx.getImageData(0, 0, W, H);
    colorizeCardPixels(imageData, colorRef.current);
    ctx.putImageData(imageData, 0, 0);

    // 3. Draw logo on the card (transparent BG — logo renders as-uploaded, matching card tilt)
    const logoImg = logoImgRef.current;
    if (logoImg) {
      ctx.save();
      ctx.translate(LOGO_CENTER_X, LOGO_CENTER_Y);
      ctx.rotate((LOGO_ANGLE_DEG * Math.PI) / 180);

      const orient = orientRef.current;
      const availW = orient === 'portrait' ? 100 : orient === 'square' ? 135 : 273;
      const availH = orient === 'portrait' ? 165 : orient === 'square' ? 135 : 104;
      const scale  = Math.min(availW / logoImg.naturalWidth, availH / logoImg.naturalHeight);
      const finalW = logoImg.naturalWidth  * scale;
      const finalH = logoImg.naturalHeight * scale;

      ctx.drawImage(logoImg, -finalW / 2, -finalH / 2, finalW, finalH);
      ctx.restore();
    }
  }, []); // stable — reads from refs

  // ── Image preloads ──────────────────────────────────────────────────────────

  useEffect(() => {
    const img = new Image();
    img.onload = () => { walletImgRef.current = img; composite(); };
    img.src = '/illustrations/wallet-main.png';
  }, [composite]);

  useEffect(() => {
    if (!logoDataUrl) { logoImgRef.current = null; composite(); return; }
    const img = new Image();
    img.onload = () => { logoImgRef.current = img; composite(); };
    img.src = logoDataUrl;
  }, [logoDataUrl, composite]);

  useEffect(() => { composite(); }, [primaryColor, composite]);
  useEffect(() => { composite(); }, [logoOrientation, composite]);

  // ── Download ────────────────────────────────────────────────────────────────

  function download() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement('a');
    a.download = 'wifi-pass-illustration.png';
    a.href = canvas.toDataURL('image/png');
    a.click();
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{
        width: '100%',
        maxWidth: 228,
        filter: 'drop-shadow(0 12px 28px rgba(0,0,0,0.15))',
      }}>
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          style={{ width: '100%', display: 'block' }}
        />
      </div>

      <div style={{ marginTop: 16 }}>
        <PUButton variant="secondary" size="compact" label="Download illustration PNG" icon={faArrowDownToLine} iconPosition="before" onClick={download} />
      </div>
    </div>
  );
}

export default WalletComposite;
