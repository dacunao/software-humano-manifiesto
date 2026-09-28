import type { Canon } from '../canon/lector';
import type { Contenido } from '../contenido/cargar';
import { LOCALES, type Localizado } from '../contenido/esquemas';

/**
 * Comprobación previa a la publicación (T023, data-model.md). No interviene en la construcción:
 * enumera lo que falta para que un idioma pueda publicarse (PRD §19.4, §34).
 */
export function faltantesParaPublicar(c: Contenido, canon: Canon): string[] {
  const f: string[] = [];
  const localizados: { l: Localizado; donde: string }[] = [
    ...Object.entries(c.cadenas).map(([k, l]) => ({ l, donde: `interfaz ${k}` })),
    { l: c.estado.limitations, donde: 'estado-adaptacion limitations' },
  ];
  for (const s of c.superficies) {
    localizados.push({ l: s.title, donde: `${s.id}.title` }, { l: s.description, donde: `${s.id}.description` });
    if (s.hero) localizados.push({ l: s.hero.title, donde: `${s.id}.hero.title` }, { l: s.hero.text, donde: `${s.id}.hero.text` });
    for (const sec of s.sections) {
      localizados.push({ l: sec.title, donde: `${s.id}.${sec.id}.title` });
      if (sec.question) localizados.push({ l: sec.question, donde: `${s.id}.${sec.id}.question` });
      for (const b of [...sec.blocks, ...sec.depth]) {
        if (b.kind === 'entrada') localizados.push({ l: b.entrada.text, donde: b.entrada.id });
        if (b.kind === 'comparacion') localizados.push({ l: b.sistema.text, donde: b.sistema.id }, { l: b.persona.text, donde: b.persona.id });
      }
    }
  }
  for (const p of c.principios) for (const e of Object.values(p.entries)) localizados.push({ l: e.text, donde: e.id });

  for (const locale of LOCALES) {
    const sin = localizados.filter(({ l }) => l[locale]?.state !== 'aprobado');
    if (sin.length) f.push(`${locale}: ${sin.length} textos sin aprobar (p. ej. ${sin.slice(0, 3).map((x) => x.donde).join(', ')})`);
  }
  for (const t of c.traducciones) {
    const hashes = new Map(canon.nodos.map((n) => [n.id, n.hash]));
    const sin = Object.entries(t.entries).filter(([, e]) => e.state !== 'aprobada');
    const obsoletas = Object.entries(t.entries).filter(([id, e]) => e.sourceHash !== hashes.get(id));
    if (sin.length) f.push(`${t.locale}: ${sin.length} nodos canónicos sin traducción aprobada`);
    if (obsoletas.length) f.push(`${t.locale}: ${obsoletas.length} traducciones potencialmente obsoletas`);
  }
  if (!c.sitio.contact.email) f.push('sitio: falta el alias de correo de contacto (PRD §29.7)');
  if (!c.revisiones.linguistica.en) f.push('revisiones: falta la revisión lingüística profesional de en');
  if (!c.revisiones.linguistica['pt-BR']) f.push('revisiones: falta la revisión lingüística profesional de pt-BR');
  if (!c.revisiones.neutralidad.es) f.push('revisiones: falta la revisión de neutralidad latinoamericana de es');
  return f;
}
