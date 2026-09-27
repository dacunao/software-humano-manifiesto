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
  return html;
}

/** Renderiza texto en línea (sin párrafo envolvente). */
export function renderLinea(markdown: string): string {
  return md.parseInline(markdown) as string;
}
