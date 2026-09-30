import { readFileSync } from 'node:fs';
import { expect, test } from 'bun:test';
import { contenido } from '../../../src/lib/sitio';

// T228 · `site` de Astro y el dominio del contenido no pueden divergir (PRD §29.1).
test('site de astro.config.mts es el dominio de sitio.yaml', () => {
  const site = readFileSync('astro.config.mts', 'utf8').match(/site: '([^']+)'/)?.[1];
  expect(site).toBe(`https://${contenido.sitio.domain}`);
});
