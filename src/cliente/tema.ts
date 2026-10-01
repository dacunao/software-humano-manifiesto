/**
 * Día y noche (PRD v1.4 §21.7, RQ-17). `public/tema.js` ya aplicó la elección guardada antes de
 * pintar; aquí solo se muestra el control y se guarda o se borra la elección.
 */
import { guardarPreferencia, leerPreferencia } from './preferencias';

const CLAVE = 'sh-tema';
const raiz = document.documentElement;
const control = document.querySelector<HTMLElement>('[data-control-tema]');
const alternar = control?.querySelector<HTMLButtonElement>('[data-tema-alternar]');
// Volver al sistema vive en el pie, para no ensanchar la cabecera (P06).
const sistema = document.querySelector<HTMLButtonElement>('[data-tema-sistema]');
const oscuroDelSistema = window.matchMedia('(prefers-color-scheme: dark)');

const guardada = () => leerPreferencia(CLAVE);

function reflejar(): void {
  const elegido = raiz.dataset['tema'];
  const oscuro = elegido ? elegido === 'oscuro' : oscuroDelSistema.matches;
  alternar?.setAttribute('aria-pressed', String(oscuro));
  if (sistema) sistema.hidden = !elegido;
}

if (control && alternar) {
  control.hidden = false;
  const previo = guardada();
  if (previo === 'claro' || previo === 'oscuro') raiz.dataset['tema'] = previo;
  alternar.addEventListener('click', () => {
    const nuevo = alternar.getAttribute('aria-pressed') === 'true' ? 'claro' : 'oscuro';
    raiz.dataset['tema'] = nuevo;
    guardarPreferencia(CLAVE, nuevo);
    reflejar();
  });
  sistema?.addEventListener('click', () => {
    delete raiz.dataset['tema'];
    guardarPreferencia(CLAVE, null);
    reflejar();
    alternar.focus();
  });
  oscuroDelSistema.addEventListener('change', reflejar);
  reflejar();
}

export {};
