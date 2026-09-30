import { existsSync } from 'node:fs';
import { join } from 'node:path';
import type { Hallazgo } from './reglas';
import { enlaces, ids, jsonld, paginasHtml, rutaPublica, textoVisible } from './html';

/**
 * RV-11 · enlaces internos rotos, incluidas las anclas. RV-12 · JSON-LD solo con entidades visibles;
 * `SoftwareSourceCode` solo con la adaptación publicada y con su repositorio enlazado en la página.
 */
export function validarSalida(dir: string, publicada = false): Hallazgo[] {
  const h: Hallazgo[] = [];
  const paginas = paginasHtml(dir);
  const porRuta = new Map(paginas.map((p) => [rutaPublica(p.archivo), p]));

  for (const p of paginas) {
    for (const href of enlaces(p.html)) {
      if (!href.startsWith('/') && !href.startsWith('#')) continue;
      const [base, ancla] = href.startsWith('#') ? [rutaPublica(p.archivo), href.slice(1)] : href.split('#');
      const limpia = (base ?? '/').split('?')[0]!.replace(/\/+$/, '') || '/';
      const destino = porRuta.get(limpia);
      if (!destino) {
        if (!existsSync(join(dir, limpia))) h.push({ regla: 'RV-11', archivo: p.archivo, entidad: href, mensaje: 'enlace interno sin destino' });
        continue;
      }
      if (ancla && !ids(destino.html).has(ancla))
        h.push({ regla: 'RV-11', archivo: p.archivo, entidad: href, mensaje: `el ancla #${ancla} no existe en ${destino.archivo}` });
    }

    const visible = textoVisible(p.html).toLowerCase();
    for (const bloque of jsonld(p.html)) {
      const grafo = ((bloque as { '@graph'?: Record<string, unknown>[] })['@graph'] ?? [bloque]) as Record<string, unknown>[];
      for (const nodo of grafo) {
        const tipo = String(nodo['@type']);
        if (tipo === 'SoftwareSourceCode' && !publicada)
          h.push({ regla: 'RV-12', archivo: p.archivo, entidad: tipo, mensaje: 'marcado de código fuente sin publicación real' });
        if (tipo === 'SoftwareSourceCode' && publicada && !enlaces(p.html).includes(String(nodo['codeRepository'])))
          h.push({ regla: 'RV-12', archivo: p.archivo, entidad: `${tipo}.codeRepository`, mensaje: 'el repositorio no está enlazado en la página' });
        if (['WebPage', 'WebSite'].includes(tipo)) continue; // describen la página misma
        for (const clave of ['name', 'termCode', 'version'] as const) {
          const v = nodo[clave];
          if (typeof v === 'string' && !visible.includes(v.toLowerCase()))
            h.push({ regla: 'RV-12', archivo: p.archivo, entidad: `${tipo}.${clave}`, mensaje: `«${v}» no aparece en la página` });
        }
      }
    }
  }
  return h;
}
