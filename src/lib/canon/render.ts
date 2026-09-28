import { Marked } from 'marked';

const md = new Marked({ gfm: true, async: false });

/**
 * Convierte Markdown del núcleo (original o traducción) en HTML y pone las anclas
 * derivadas (`d01`, `stop03`…) en la fila o el elemento que define cada identificador.
 */
export function renderMarkdown(markdown: string, anclas: readonly string[] = []): string {
  let html = md.parse(markdown) as string;
  for (const ancla of anclas) {
    const id = ancla.toUpperCase();
    const patron = new RegExp(
      `<(tr|li)>(\\s*(?:<t[dh][^>]*>|<p>)?\\s*(?:\\d+\\\\?\\.\\s*)?(?:<strong>)?<code>${id}</code>)`,
    );
    html = html.replace(patron, `<$1 id="${ancla}">$2`);
  }
  return rotularTablas(html);
}

const sinEtiquetas = (h: string) => h.replace(/<[^>]+>/g, '').replace(/"/g, '&quot;').trim();

/**
 * PRD v1.2 §21.4 (T140): cada celda lleva el rótulo de su columna para que, en pantallas
 * angostas, la tabla se lea como filas apiladas sin desplazamiento horizontal. Los roles
 * explícitos conservan la semántica de tabla aunque el CSS cambie su presentación.
 */
function rotularTablas(html: string): string {
  return html.replace(/<table>([\s\S]*?)<\/table>/g, (_, cuerpo: string) => {
    const rotulos = [...(/<thead>([\s\S]*?)<\/thead>/.exec(cuerpo)?.[1] ?? '').matchAll(/<th[^>]*>([\s\S]*?)<\/th>/g)].map((m) => sinEtiquetas(m[1] ?? ''));
    const conRoles = cuerpo
      .replace(/<(thead|tbody)>/g, '<$1 role="rowgroup">')
      .replace(/<tr( id="[^"]*")?>/g, '<tr role="row"$1>')
      .replace(/<th( [^>]*)?>/g, (_m: string, attrs = '') => `<th role="columnheader"${attrs}>`)
      .replace(/<tr role="row"( id="[^"]*")?>([\s\S]*?)<\/tr>/g, (_fila: string, id = '', celdas: string) => {
        let i = 0;
        const rotuladas = celdas.replace(/<td( [^>]*)?>/g, (_m: string, attrs = '') => {
          const r = rotulos[i++];
          return `<td role="cell"${attrs}${r ? ` data-rotulo="${r}"` : ''}>`;
        });
        return `<tr role="row"${id}>${rotuladas}</tr>`;
      });
    return `<table role="table" class="tabla-canonica">${conRoles}</table>`;
  });
}

/** Renderiza texto en línea (sin párrafo envolvente). */
export function renderLinea(markdown: string): string {
  return md.parseInline(markdown) as string;
}
