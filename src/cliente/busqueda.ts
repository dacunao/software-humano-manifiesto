/**
 * Búsqueda en el sitio (FR-023, RQ-16 enmendado): motor Pagefind con nuestra interfaz. Estados:
 * cerrada → cargando índice → lista, con resultados, sin resultados o índice no disponible; una
 * búsqueda vacía no muestra nada. Resultados por página con sus subresultados por sección. El
 * índice del idioma de la página se descarga solo al abrir; no se envía ni se guarda lo buscado.
 */
interface Sub { title: string; url: string; excerpt: string; anchor?: unknown }
interface Dato { url: string; meta: { title?: string }; excerpt: string; sub_results: Sub[] }
interface Pagefind {
  options(o: Record<string, unknown>): Promise<void>;
  init(): Promise<void>;
  debouncedSearch(q: string, o?: unknown, ms?: number): Promise<{ results: { data(): Promise<Dato> }[] } | null>;
}

const PARAMETRO = 'resaltar';
const boton = document.querySelector<HTMLButtonElement>('[data-abrir-busqueda]');
const dialogo = document.querySelector<HTMLDialogElement>('[data-busqueda]');
const consulta = dialogo?.querySelector<HTMLInputElement>('[data-consulta]');
const estado = dialogo?.querySelector<HTMLElement>('[data-estado]');
const lista = dialogo?.querySelector<HTMLElement>('[data-resultados-lista]');

let motor: Pagefind | undefined;
let carga: Promise<Pagefind | undefined> | undefined;

function cargar(): Promise<Pagefind | undefined> {
  if (!dialogo || !estado) return Promise.resolve(undefined);
  carga ??= (async () => {
    estado.textContent = dialogo.dataset['cargando'] ?? '';
    try {
      const ruta = '/pagefind/pagefind.js';
      const pf = (await import(/* @vite-ignore */ ruta)) as Pagefind;
      await pf.options({ excerptLength: 22, highlightParam: PARAMETRO });
      await pf.init();
      motor = pf;
      estado.textContent = '';
      return pf;
    } catch {
      carga = undefined; // se reintenta al volver a abrir
      estado.textContent = dialogo.dataset['error'] ?? '';
      return undefined;
    }
  })();
  return carga;
}

/** Extracto de Pagefind reconstruido como texto y <mark>, sin insertar HTML (P07). */
function extracto(html: string): DocumentFragment {
  const f = document.createDocumentFragment();
  const doc = new DOMParser().parseFromString(`<body>${html}</body>`, 'text/html');
  for (const n of doc.body.childNodes) {
    if (n.nodeName === 'MARK') {
      const m = document.createElement('mark');
      m.textContent = n.textContent;
      f.append(m);
    } else f.append(n.textContent ?? '');
  }
  return f;
}

function enlace(url: string, titulo: string, texto: string, principal: boolean): HTMLLIElement {
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.href = url;
  if (!principal) a.className = 'subresultado';
  const t = document.createElement('span');
  t.className = 'resultado-titulo';
  t.textContent = titulo;
  const x = document.createElement('span');
  x.className = 'resultado-texto';
  x.append(extracto(texto));
  a.append(t, x);
  a.addEventListener('click', () => dialogo?.close());
  li.append(a);
  return li;
}

async function mostrar(q: string): Promise<void> {
  if (!lista || !estado || !dialogo || !motor) return;
  if (!q.trim()) { lista.replaceChildren(); estado.textContent = ''; return; }
  const busqueda = await motor.debouncedSearch(q, {}, 150);
  if (!busqueda) return; // la reemplazó una búsqueda más reciente
  const datos = await Promise.all(busqueda.results.slice(0, 8).map((r) => r.data()));
  lista.replaceChildren();
  if (!datos.length) {
    estado.textContent = (dialogo.dataset['sinResultados'] ?? '').replace('{q}', q.trim());
    return;
  }
  estado.textContent = (dialogo.dataset['resultados'] ?? '').replace('{n}', String(datos.length));
  for (const d of datos) {
    const seccion = document.createElement('section');
    seccion.className = 'resultado-pagina';
    const ol = document.createElement('ol');
    const titulo = d.meta.title ?? d.url;
    const subs = d.sub_results.filter((s) => s.anchor).slice(0, 3);
    const propia = d.sub_results.find((s) => !s.anchor);
    // La página como primer resultado; debajo, las secciones que coinciden.
    ol.append(enlace(propia?.url ?? d.url, titulo, (propia ?? d).excerpt, true));
    for (const s of subs) ol.append(enlace(s.url, s.title, s.excerpt, false));
    seccion.append(ol);
    lista.append(seccion);
  }
}

if (boton && dialogo && consulta) {
  boton.hidden = false;
  boton.addEventListener('click', () => {
    dialogo.showModal();
    consulta.focus();
    void cargar().then(() => mostrar(consulta.value));
  });
  consulta.addEventListener('input', () => { void cargar().then(() => mostrar(consulta.value)); });
  // Escape cierra de una vez, también cuando el campo tiene texto (el navegador solo lo borraría).
  consulta.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { e.preventDefault(); dialogo.close(); }
  });
  dialogo.querySelector('[data-cerrar-busqueda]')?.addEventListener('click', () => dialogo.close());
  dialogo.addEventListener('close', () => boton.focus());
}

// Resaltado en destino (RQ-16 enmendado): solo si la dirección lo pide.
if (new URLSearchParams(location.search).has(PARAMETRO)) {
  const ruta = '/pagefind/pagefind-highlight.js';
  void import(/* @vite-ignore */ ruta)
    .then(() => {
      const R = (window as unknown as { PagefindHighlight?: new (o: Record<string, unknown>) => unknown }).PagefindHighlight;
      if (R) new R({ highlightParam: PARAMETRO });
    })
    .catch(() => { /* sin resaltado: la página se lee igual */ });
}

export {};
