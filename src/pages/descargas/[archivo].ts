import { readFileSync } from 'node:fs';
import type { APIRoute } from 'astro';
import { leerCanon, RUTA_CANON } from '../../lib/canon/lector';
import { contenido } from '../../lib/sitio';

/**
 * Descargas del texto íntegro (FR-003 v1.1, P10). El original en español se entrega idéntico
 * byte a byte; las traducciones se generan nodo a nodo y se rotulan como tales.
 */
export function getStaticPaths() {
  return ['es', 'en', 'pt-br'].map((l) => ({ params: { archivo: `nucleo-v2.1-${l}.md` } }));
}

const AVISO: Record<string, string> = {
  // Texto del aviso de las traducciones aprobadas por Damián Acuña el 2026-09-28.
  en: '> Translation of the core of the Software Humano Manifesto v2.1. The Spanish original retains doctrinal authority; where the two diverge, the Spanish text governs.',
  'pt-br': '> Tradução do núcleo do Manifesto de Software Humano v2.1. O original em espanhol mantém a autoridade doutrinária; havendo divergência entre os dois, prevalece o texto em espanhol.',
};

export const GET: APIRoute = ({ params }) => {
  const l = /nucleo-v2\.1-(es|en|pt-br)\.md$/.exec(params['archivo'] ?? '')?.[1] ?? 'es';
  let cuerpo: string;
  if (l === 'es') cuerpo = readFileSync(RUTA_CANON, 'utf8');
  else {
    const t = contenido.traducciones.find((x) => x.locale === (l === 'en' ? 'en' : 'pt-BR'));
    const partes = leerCanon().nodos.map((n) => t?.entries[n.id]?.text ?? n.source);
    cuerpo = `${AVISO[l]}\n\n${partes.join('\n\n')}\n`;
  }
  return new Response(cuerpo, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
