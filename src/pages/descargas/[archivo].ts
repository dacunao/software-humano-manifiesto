import { readFileSync } from 'node:fs';
import type { APIRoute } from 'astro';
import { leerCanon, RUTA_CANON } from '../../lib/canon/lector';
import { contenido, t } from '../../lib/sitio';

/**
 * Descargas del texto íntegro (FR-003 v1.1, P10). El original en español se entrega idéntico
 * byte a byte; las traducciones se generan nodo a nodo y se rotulan como tales.
 */
export function getStaticPaths() {
  return ['es', 'en', 'pt-br'].map((l) => ({ params: { archivo: `nucleo-v2.1-${l}.md` } }));
}

export const GET: APIRoute = ({ params }) => {
  const l = /nucleo-v2\.1-(es|en|pt-br)\.md$/.exec(params['archivo'] ?? '')?.[1] ?? 'es';
  let cuerpo: string;
  if (l === 'es') cuerpo = readFileSync(RUTA_CANON, 'utf8');
  else {
    const trad = contenido.traducciones.find((x) => x.locale === (l === 'en' ? 'en' : 'pt-BR'));
    const partes = leerCanon().nodos.map((n) => trad?.entries[n.id]?.text ?? n.source);
    // El aviso vive en las cadenas de interfaz, con su estado: la comprobación previa exige su aprobación (T196).
    const aviso = t('descarga.aviso', l === 'en' ? 'en' : 'pt-BR', { version: contenido.sitio.core.version });
    cuerpo = `> ${aviso}\n\n${partes.join('\n\n')}\n`;
  }
  return new Response(cuerpo, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
