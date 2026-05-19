import { useState, useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { getLogoMaxDims, type LogoOrientation } from './utils/colorUtils';

const CANVAS_W = 512;
const CANVAS_H = 320;
const CORNER_R = 28;

export interface CardTextureConfig {
  primaryColor: string;
  gradientTo: string;
  logoDataUrl: string | null;
  logoOrientation: LogoOrientation | null;
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  w: number, h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y,     x + w, y + r,     r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x,     y + h, x,     y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x,     y,     x + r, y,         r);
  ctx.closePath();
}

export function useCardTexture(config: CardTextureConfig, hologramImageUrl: string) {
  const canvasRef  = useRef<HTMLCanvasElement | null>(null);
  const textureRef = useRef<THREE.CanvasTexture | null>(null);
  const holoImgRef = useRef<HTMLImageElement | null>(null);
  const logoImgRef = useRef<HTMLImageElement | null>(null);
  // Always-current snapshot of config so stable callbacks can read latest values
  const configRef  = useRef(config);
  useEffect(() => { configRef.current = config; });

  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

  // Stable draw function — reads from refs, never recreated
  const rebuildTexture = useCallback(() => {
    if (typeof document === 'undefined') return;

    // Lazy-init canvas
    if (!canvasRef.current) {
      const c = document.createElement('canvas');
      c.width  = CANVAS_W;
      c.height = CANVAS_H;
      canvasRef.current = c;
    }

    // Lazy-init texture (only fires setTexture once)
    if (!textureRef.current) {
      const t = new THREE.CanvasTexture(canvasRef.current);
      textureRef.current = t;
      setTexture(t);
    }

    const { primaryColor, gradientTo, logoOrientation } = configRef.current;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

    // 1. Clip to rounded card shape
    drawRoundedRect(ctx, 0, 0, CANVAS_W, CANVAS_H, CORNER_R);
    ctx.save();
    ctx.clip();

    // 2. Gradient fill (top → bottom)
    const grad = ctx.createLinearGradient(0, 0, 0, CANVAS_H);
    grad.addColorStop(0, primaryColor);
    grad.addColorStop(1, gradientTo);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // 3. Top highlight band
    ctx.fillStyle = 'rgba(255,255,255,0.10)';
    ctx.fillRect(0, 0, CANVAS_W, 80);

    // 4. Hologram badge — bottom-left
    if (holoImgRef.current) {
      const sz = 52;
      ctx.drawImage(holoImgRef.current, 32, CANVAS_H - 32 - sz, sz, sz);
    }

    // 5. Partner logo — bottom-right with white pill background
    const logoImg = logoImgRef.current;
    if (logoImg && logoOrientation) {
      const { maxW, maxH } = getLogoMaxDims(logoOrientation);

      // Contain-fit the logo within maxW × maxH
      const scale = Math.min(maxW / logoImg.naturalWidth, maxH / logoImg.naturalHeight);
      const drawW = logoImg.naturalWidth  * scale;
      const drawH = logoImg.naturalHeight * scale;

      const pad   = 10;
      const pillW = maxW + pad * 2;
      const pillH = maxH + pad * 2;
      const pillX = CANVAS_W - 32 - pillW;
      const pillY = CANVAS_H - 32 - pillH;

      // White rounded pill
      ctx.fillStyle = 'rgba(255,255,255,0.95)';
      drawRoundedRect(ctx, pillX, pillY, pillW, pillH, 10);
      ctx.fill();

      // Logo centered inside maxW × maxH region within the pill
      const imgX = pillX + pad + (maxW - drawW) / 2;
      const imgY = pillY + pad + (maxH - drawH) / 2;
      ctx.drawImage(logoImg, imgX, imgY, drawW, drawH);
    }

    ctx.restore();
    textureRef.current.needsUpdate = true;
  }, []); // stable — always reads from configRef / image refs

  // Pre-load hologram once
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      holoImgRef.current = img;
      rebuildTexture();
    };
    img.src = hologramImageUrl;
  }, [hologramImageUrl, rebuildTexture]);

  // Pre-load logo whenever the data URL changes
  useEffect(() => {
    if (!config.logoDataUrl) {
      logoImgRef.current = null;
      rebuildTexture();
      return;
    }
    const img = new Image();
    img.onload = () => {
      logoImgRef.current = img;
      rebuildTexture();
    };
    img.src = config.logoDataUrl;
  }, [config.logoDataUrl, rebuildTexture]);

  // Rebuild when colors or logo orientation change
  useEffect(() => {
    rebuildTexture();
  }, [config.primaryColor, config.gradientTo, config.logoOrientation, rebuildTexture]);

  // Dispose texture on unmount
  useEffect(() => {
    return () => { textureRef.current?.dispose(); };
  }, []);

  return { texture, rebuildTexture };
}
