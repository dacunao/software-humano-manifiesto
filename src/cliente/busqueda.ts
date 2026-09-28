/**
 * Búsqueda en el sitio (FR-023, RQ-16). Estados: cerrada → cargando índice → lista, con
 * resultados, sin resultados o índice no disponible; una búsqueda vacía no muestra nada.
 * Normaliza mayúsculas y tildes, exige todos los términos (como comienzo de palabra) y ordena:
 * título, identificador, texto. No envía ni guarda lo que se busca (FR-018).
 */
interface Entrada { u: string; p: string; s: string; c?: string; t: string }

const boton = document.querySelector<HTMLButtonElement>('[data-abrir-busqueda]');
const dialogo = document.querySelector<HTMLDialogElement>('[data-busqueda]');
const consulta = dialogo?.querySelector<HTMLInputElement>('[data-consulta]');
const estado = dialogo?.querySelector<HTMLElement>('[data-estado]');
const lista = dialogo?.querySelector<HTMLElement>('[data-resultados-lista]');

const normal = (x: string) => x.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
const palabras = (x: string) => normal(x).split(/[^\p{L}\p{N}-]+/u).filter(Boolean);

let indice: { e: Entrada; titulo: string[]; codigo: string[]; texto: string[] }[] | undefined;
let carga: Promise<void> | undefined;

function cargar(): Promise<void> {
  if (!dialogo || !estado) return Promise.resolve();
  carga ??= (async () => {
    estado.textContent = dialogo.dataset['cargando'] ?? '';
    try {
      const r = await fetch(dialogo.dataset['indice'] ?? '');
      if (!r.ok) throw new Error(String(r.status));
      const datos = (await r.json()) as Entrada[];
      indice = datos.map((e) => ({ e, titulo: palabras(`${e.p} ${e.s}`), codigo: e.c ? [normal(e.c)] : [], texto: palabras(e.t) }));
      estado.textContent = '';
    } catch {
      carga = undefined; // se reintenta al volver a abrir
      estado.textContent = dialogo.dataset['error'] ?? '';
    }
  })();
  return carga;
}

function coincide(lista: string[], termino: string): boolean {
  return lista.some((p) => p.startsWith(termino));
}

/** Extracto alrededor del primer término, con los términos resaltados, sin HTML del índice. */
function extracto(texto: string, terminos: string[]): DocumentFragment {
  const f = document.createDocumentFragment();
  const base = normal(texto);
  const posiciones = terminos.map((t) => base.indexOf(t)).filter((x) => x >= 0);
  const desde = Math.max(0, (posiciones.length ? Math.min(...posiciones) : 0) - 60);
  const trozo = (desde > 0 ? '…' : '') + texto.slice(desde, desde + 180) + (texto.length > desde + 180 ? '…' : '');
  const norma = normal(trozo);
  const marcas: [number, number][] = [];
  for (const t of terminos) {
    let j = norma.indexOf(t);
    while (j >= 0) { marcas.push([j, j + t.length]); j = norma.indexOf(t, j + t.length); }
  }
  marcas.sort((a, b) => a[0] - b[0]);
  let pos = 0;
  for (const [a, b] of marcas) {
    if (a < pos) continue;
    f.append(trozo.slice(pos, a));
    const m = document.createElement('mark');
    m.textContent = trozo.slice(a, b);
    f.append(m);
    pos = b;
  }
  f.append(trozo.slice(pos));
  return f;
}

function mostrar(q: string): void {
  if (!lista || !estado || !dialogo || !indice) return;
  lista.replaceChildren();
  const terminos = palabras(q);
  if (!terminos.length) { estado.textContent = ''; return; }
  const puntuados = indice
    .map((x) => {
      let puntos = 0;
      for (const t of terminos) {
        if (coincide(x.titulo, t)) puntos += 3;
        else if (coincide(x.codigo, t)) puntos += 2;
        else if (coincide(x.texto, t)) puntos += 1;
        else return undefined;
      }
      return { x, puntos };
    })
    .filter((y): y is { x: NonNullable<typeof indice>[number]; puntos: number } => !!y)
    .sort((a, b) => b.puntos - a.puntos)
    // Un resultado por sección, con su mejor coincidencia (RQ-16 enmendado, P06); un identificador
    // buscado conserva su propio resultado.
    .filter((y, i, todos) => {
      const clave = (z: typeof y) => `${z.x.e.p}|${z.x.e.s}|${y.x.e.c && terminos.includes(normal(y.x.e.c)) ? y.x.e.c : ''}`;
      return todos.findIndex((z) => clave(z) === clave(y)) === i;
    })
    .slice(0, 30);
  if (!puntuados.length) {
    estado.textContent = (dialogo.dataset['sinResultados'] ?? '').replace('{q}', q.trim());
    return;
  }
  estado.textContent = (dialogo.dataset['resultados'] ?? '').replace('{n}', String(puntuados.length));
  // Agrupados por página, en el orden del mejor resultado de cada una.
  const grupos = new Map<string, Entrada[]>();
  for (const { x } of puntuados) grupos.set(x.e.p, [...(grupos.get(x.e.p) ?? []), x.e]);
  for (const [pagina, entradas] of grupos) {
    const seccion = document.createElement('section');
    const h = document.createElement('h3');
    h.textContent = pagina;
    const ol = document.createElement('ol');
    for (const e of entradas) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = e.u;
      const titulo = document.createElement('span');
      titulo.className = 'resultado-titulo';
      titulo.textContent = e.c && e.c !== e.s ? `${e.c} · ${e.s}` : e.s;
      const texto = document.createElement('span');
      texto.className = 'resultado-texto';
      texto.append(extracto(e.t, terminos));
      a.append(titulo, texto);
      a.addEventListener('click', () => dialogo.close());
      li.append(a);
      ol.append(li);
    }
    seccion.append(h, ol);
    lista.append(seccion);
  }
}

if (boton && dialogo && consulta) {
  boton.hidden = false;
  let espera: number | undefined;
  boton.addEventListener('click', () => {
    dialogo.showModal();
    consulta.focus();
    void cargar().then(() => mostrar(consulta.value));
  });
  consulta.addEventListener('input', () => {
    window.clearTimeout(espera);
    espera = window.setTimeout(() => { void cargar().then(() => mostrar(consulta.value)); }, 120);
  });
  // Escape cierra de una vez, también cuando el campo tiene texto (el navegador solo lo borraría).
  consulta.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { e.preventDefault(); dialogo.close(); }
  });
  dialogo.querySelector('[data-cerrar-busqueda]')?.addEventListener('click', () => dialogo.close());
  dialogo.addEventListener('close', () => boton.focus());
}
