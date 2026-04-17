/**
 * Snapshot script — captures every ComponentPreview on each doc page.
 *
 * Requires the dev server to be running: `npm run dev`
 * Run with: `npm run snapshots`
 *
 * Output: public/snapshots/{ComponentName}/{label}.png
 */

import { chromium } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const BASE_URL = 'http://localhost:3000';

const PAGES: { name: string; path: string }[] = [
  { name: 'button',           path: '/buttons/button' },
  { name: 'icon-button',      path: '/buttons/icon-button' },
  { name: 'floating-button',  path: '/buttons/floating-button' },
  { name: 'toast',            path: '/overlays/toast' },
  { name: 'bottom-tray',      path: '/overlays/bottom-tray' },
  { name: 'validation-modal', path: '/overlays/validation-modal' },
  { name: 'loader',           path: '/indicators/loader' },
  { name: 'search-bar',       path: '/inputs/search-bar' },
  { name: 'bottom-nav',       path: '/navigation/bottom-nav' },
  { name: 'map-pins',         path: '/map/map-pins' },
];

function sanitizeFilename(label: string): string {
  return label.trim().replace(/[^a-zA-Z0-9 _-]/g, '').replace(/\s+/g, '_') || 'preview';
}

async function main() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  // Bypass the simple session-cookie auth gate used by the dev server
  await context.addCookies([{
    name: 'purpleui-session',
    value: 'snapshots',
    domain: 'localhost',
    path: '/',
  }]);
  const page = await context.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });

  let total = 0;

  for (const { name, path: pagePath } of PAGES) {
    const url = `${BASE_URL}${pagePath}`;
    console.log(`\n→ ${name}  (${url})`);

    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 15_000 });
    } catch {
      console.warn(`  ⚠ Could not load ${url} — skipping`);
      continue;
    }

    // Wait for React hydration
    await page.waitForTimeout(500);

    const previews = await page.locator('[data-testid="component-preview"]').all();
    console.log(`  found ${previews.length} preview(s)`);

    if (previews.length === 0) continue;

    const outDir = path.join('public', 'snapshots', name);
    fs.mkdirSync(outDir, { recursive: true });

    // Deduplicate labels (same label used more than once on a page)
    const labelCounts: Record<string, number> = {};

    for (const preview of previews) {
      const rawLabel = (await preview.getAttribute('data-label')) ?? '';
      const base = sanitizeFilename(rawLabel) || `preview_${previews.indexOf(preview)}`;
      labelCounts[base] = (labelCounts[base] ?? 0) + 1;
      const suffix = labelCounts[base] > 1 ? `_${labelCounts[base]}` : '';
      const filename = `${base}${suffix}.png`;
      const filepath = path.join(outDir, filename);

      await preview.screenshot({ path: filepath });
      console.log(`  ✓  ${filename}`);
      total++;
    }
  }

  await context.close();
  await browser.close();
  console.log(`\nDone — ${total} snapshot(s) written to public/snapshots/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
