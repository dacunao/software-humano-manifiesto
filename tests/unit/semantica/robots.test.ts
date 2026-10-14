import { readFileSync } from 'node:fs';
import { expect, test } from 'bun:test';
import { contenido } from '../../../src/lib/sitio';

// T294 · robots.txt no bloquea a nadie, declara el uso permitido por IA y el sitemap (estándar común B10).
test('robots.txt permite todo, declara Content-Signal y el sitemap', () => {
  const robots = readFileSync('public/robots.txt', 'utf8');
  expect(robots).toContain('User-agent: *');
  expect(robots).toContain('Content-Signal: search=yes, ai-input=yes, ai-train=yes');
  expect(robots).toContain('Allow: /');
  expect(robots).not.toContain('Disallow');
  expect(robots).toContain(`Sitemap: https://${contenido.sitio.domain}/sitemap.xml`);
});
