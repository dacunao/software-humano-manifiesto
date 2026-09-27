/** `bun run check:publish` · falla mientras falte algo para publicar (T023). No autoriza publicar: eso es de Damián. */
import { leerCanon } from '../src/lib/canon/lector';
import { cargarContenido } from '../src/lib/contenido/cargar';
import { faltantesParaPublicar } from '../src/lib/validacion/publicacion';

const faltantes = faltantesParaPublicar(cargarContenido(), leerCanon());
if (faltantes.length) {
  console.error(`No se puede publicar todavía. Falta:\n- ${faltantes.join('\n- ')}`);
  process.exit(1);
}
console.log('Comprobación previa a la publicación: completa. La aceptación sigue siendo de la autoridad de producto (PRD §34).');
