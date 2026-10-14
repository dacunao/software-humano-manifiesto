/**
 * `bun run scripts/indexnow.ts [--desde=AAAA-MM-DD] [--prueba]` · avisa a los buscadores con IndexNow (RQ-21, T289).
 *
 * Se ejecuta a mano, después de `versions deploy`: publicar sigue siendo un acto deliberado.
 * Lee el sitemap publicado y envía todas sus direcciones, o solo las modificadas desde `--desde`.
 * Antes de enviar, comprueba que el archivo de la clave esté publicado y coincida.
 */
import { cargarContenido } from '../src/lib/contenido/cargar';

const { domain, indexnow } = cargarContenido().sitio;
const origen = `https://${domain}`;
const claveUrl = `${origen}/${indexnow.key}.txt`;
const args = Object.fromEntries(process.argv.slice(2).map((a) => a.replace(/^--/, '').split('=')));
const desde = args['desde'] as string | undefined;
const prueba = 'prueba' in args;

if (desde && !/^\d{4}-\d{2}-\d{2}$/.test(desde)) {
  console.error(`--desde debe ser AAAA-MM-DD; recibí «${desde}».`);
  process.exit(1);
}

const publicada = await fetch(claveUrl).then((r) => (r.ok ? r.text() : null));
if (publicada?.trim() !== indexnow.key) {
  console.error(`El archivo de la clave no está publicado o no coincide: ${claveUrl}. Publica primero y vuelve a intentar.`);
  process.exit(1);
}

const sitemap = await fetch(`${origen}/sitemap.xml`).then((r) => r.text());
const urls = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)]
  .map(([, bloque]) => ({ loc: bloque!.match(/<loc>([^<]+)<\/loc>/)?.[1], lastmod: bloque!.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1] }))
  .filter((u): u is { loc: string; lastmod: string | undefined } => Boolean(u.loc))
  .filter((u) => !desde || (u.lastmod ?? '') >= desde)
  .map((u) => u.loc);

if (!urls.length) {
  console.log(`Ninguna dirección modificada desde ${desde}. No se envía nada.`);
  process.exit(0);
}

const cuerpo = { host: domain, key: indexnow.key, keyLocation: claveUrl, urlList: urls };
console.log(`${urls.length} direcciones${desde ? ` modificadas desde ${desde}` : ''} para IndexNow.`);
if (prueba) {
  console.log(JSON.stringify(cuerpo, null, 2));
  console.log('Modo prueba: no se envió nada.');
  process.exit(0);
}

const respuesta = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(cuerpo),
});
const significado: Record<number, string> = {
  200: 'recibido',
  202: 'recibido; la clave se validará después',
  400: 'formato inválido',
  403: 'la clave no es válida para este sitio',
  422: 'alguna dirección no pertenece al sitio',
  429: 'demasiados avisos; espera antes de reintentar',
};
console.log(`IndexNow respondió ${respuesta.status}: ${significado[respuesta.status] ?? (await respuesta.text())}.`);
process.exit(respuesta.ok ? 0 : 1);
