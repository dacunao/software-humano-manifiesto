/**
 * Imagen social por idioma (T158, PRD §25.2): 1200 × 630 PNG en `public/social/`. Se genera a mano
 * cuando cambian la marca o la frase (`bun run scripts/generar-imagen-social.ts`), con el Chromium de
 * Playwright; no agrega un rasterizador a la construcción. Texto: la frase de la portada del núcleo
 * (`portada-04`), canónica en español y su traducción en inglés y portugués; sistema visual v1.0.
 */
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { chromium } from '@playwright/test';
import { leerCanon } from '../src/lib/canon/lector';
import { cargarContenido } from '../src/lib/contenido/cargar';

const contenido = cargarContenido();
const nodo = leerCanon().nodos.find((n) => n.id === 'portada-04')!;
const frase = (l: 'es' | 'en' | 'pt-BR') => (l === 'es' ? nodo.source : contenido.traducciones.find((t) => t.locale === l)?.entries['portada-04']?.text ?? nodo.source);
const icono = readFileSync('public/favicon.svg', 'utf8').replace(/<\?xml[^>]*>/, '').replace(/<title[\s\S]*?<\/desc>/, '');
const fuente = `file://${resolve('public/fonts/NotoSans-latin-wght.woff2')}`;
const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const html = (l: 'es' | 'en' | 'pt-BR') => `<!doctype html><html lang="${l}"><head><meta charset="utf-8"><style>
@font-face { font-family: 'Noto Sans'; src: url('${fuente}') format('woff2-variations'); font-weight: 400 600; }
* { box-sizing: border-box; margin: 0; }
body { width: 1200px; height: 630px; background: #f7f6f2; color: #18212c; font-family: 'Noto Sans', sans-serif; padding: 72px 88px; display: flex; flex-direction: column; justify-content: space-between; }
.marca { display: flex; align-items: center; gap: 22px; }
.marca svg { width: 84px; height: 84px; }
.marca span { font-size: 64px; font-weight: 500; letter-spacing: -0.03em; }
p.frase { font-size: 46px; font-weight: 500; line-height: 1.18; letter-spacing: -0.02em; max-width: 30ch; text-wrap: balance; }
.pie { font-size: 24px; font-weight: 500; color: #52606d; display: flex; justify-content: space-between; }
</style></head><body>
<div class="marca">${icono}<span>Manifiesto</span></div>
<p class="frase">${esc(frase(l))}</p>
<div class="pie"><span>Software Humano</span><span>manifiesto.softwarehumano.com</span></div>
</body></html>`;

const dir = mkdtempSync(join(tmpdir(), 'social-'));
const navegador = await chromium.launch();
const pagina = await navegador.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
for (const [l, archivo] of [['es', 'es'], ['en', 'en'], ['pt-BR', 'pt-br']] as const) {
  const ruta = join(dir, `${archivo}.html`);
  writeFileSync(ruta, html(l));
  await pagina.goto(`file://${ruta}`);
  await pagina.evaluate(() => document.fonts.ready);
  await pagina.screenshot({ path: `public/social/${archivo}.png`, clip: { x: 0, y: 0, width: 1200, height: 630 } });
}
await navegador.close();
console.log('Imágenes sociales: public/social/{es,en,pt-br}.png');
