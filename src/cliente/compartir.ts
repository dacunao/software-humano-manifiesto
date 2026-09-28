/**
 * Copiar o compartir con confirmación clara (FR-011, PRD §17 P10). Mejora progresiva: sin este
 * script el enlace sigue visible y copiable. No envía datos a ningún servicio.
 */
function mejorar(caja: HTMLElement): void {
  const boton = caja.querySelector<HTMLButtonElement>('[data-copiar]');
  const estado = caja.querySelector<HTMLElement>('[data-estado]');
  const url = new URL(caja.dataset['url'] ?? location.href, location.href).href;
  const titulo = caja.dataset['titulo'] ?? document.title;
  if (!boton || !estado) return;
  boton.hidden = false;
  boton.addEventListener('click', async () => {
    estado.textContent = '';
    try {
      if (typeof navigator.share === 'function') {
        await navigator.share({ title: titulo, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      estado.textContent = caja.dataset['copiado'] ?? '';
    } catch (e) {
      // Cancelar el panel de compartir no es un error que haya que anunciar.
      if (e instanceof DOMException && e.name === 'AbortError') return;
      estado.textContent = caja.dataset['error'] ?? '';
    }
  });
}

document.querySelectorAll<HTMLElement>('[data-compartir]').forEach(mejorar);
