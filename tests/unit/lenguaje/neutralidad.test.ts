import { describe, expect, test } from 'bun:test';
import { textos } from '../../../scripts/traduccion/relevancia';

// T098 · PRD §21.6: el español usa «tú» y «ustedes», sin voseo ni «vosotros». Es una ayuda previa a la
// revisión humana de neutralidad, no la sustituye (los localismos los juzga una persona).
const VOSEO = /(?<!\p{L})(vos|sos|ten[ée]s|pod[ée]s|quer[ée]s|sab[ée]s|hac[ée]s|dec[íi]s|ven[íi]s|sal[íi]s|pens[áa]s|mirá|andá|fijate|tené|poné|dec[íi]me|contame|decime|avisame|escrib[íi]s|le[ée]s|us[áa]s|necesit[áa]s|busc[áa]s|encontr[áa]s)(?!\p{L})/iu;
const VOSOTROS = /(?<!\p{L})(vosotr[oa]s|vuestr[oa]s?|os|\p{L}+[áé]is)(?!\p{L})/iu;
/** Palabras con «-áis»/«-éis» que no son formas de «vosotros». */
const EXCEPCIONES = new Set(['país', 'maíz', 'raíz', 'seis', 'veinteis']);

function hallazgos(texto: string): string[] {
  const limpio = texto.replace(/`[^`]*`|\]\([^)]*\)|https?:\/\/\S+/g, ' ');
  const out: string[] = [];
  for (const re of [VOSEO, VOSOTROS]) {
    for (const m of limpio.matchAll(new RegExp(re.source, 'giu'))) if (!EXCEPCIONES.has(m[0].toLowerCase())) out.push(m[0]);
  }
  return out;
}

describe('neutralidad del español (T098)', () => {
  test('el copy en español no usa voseo ni «vosotros»', () => {
    const malos = textos().filter((x) => x.origen === 'copy').flatMap((x) => hallazgos(x.es).map((h) => `${x.clave}: «${h}»`));
    expect(malos).toEqual([]);
  });

  test('el núcleo original tampoco (si fallara, se registra como propuesta: es una fuente protegida)', () => {
    const malos = textos().filter((x) => x.origen === 'nucleo').flatMap((x) => hallazgos(x.es).map((h) => `${x.clave}: «${h}»`));
    expect(malos).toEqual([]);
  });

  test('detecta voseo y «vosotros»', () => {
    expect(hallazgos('Si vos tenés dudas, podés escribir. Vosotros sabéis.')).toEqual(['vos', 'tenés', 'podés', 'Vosotros', 'sabéis']);
    expect(hallazgos('Tú puedes decidir; ustedes también. Además, el país.')).toEqual([]);
  });
});
