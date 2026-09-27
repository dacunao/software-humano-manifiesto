import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import type { AstroIntegration } from 'astro';
import { leerCanon } from '../lib/canon/lector';
import { cargarContenido } from '../lib/contenido/cargar';
import { formatear, validarContenido, versionInstalada } from '../lib/validacion/reglas';
import { validarSalida } from '../lib/validacion/salida';
import { informeVisibilidad } from '../lib/validacion/visibilidad';

/** RV-01–RV-10 al iniciar y RV-11–RV-12 al terminar; cualquier fallo detiene la construcción (T022). */
export default function validacion(): AstroIntegration {
  return {
    name: 'software-humano-validacion',
    hooks: {
      'astro:build:start': ({ logger }) => {
        const canon = leerCanon(); // RV-01 lanza si la huella no coincide
        const hallazgos = validarContenido(cargarContenido(), canon, versionInstalada());
        if (hallazgos.length) throw new Error(`Contenido inválido:\n${hallazgos.map(formatear).join('\n')}`);
        logger.info(`RV-01–RV-10: sin hallazgos (${canon.nodos.length} nodos canónicos)`);
      },
      'astro:build:done': ({ dir, logger }) => {
        const salida = fileURLToPath(dir);
        const hallazgos = validarSalida(salida);
        if (hallazgos.length) throw new Error(`Salida inválida:\n${hallazgos.map(formatear).join('\n')}`);
        logger.info('RV-11–RV-12: sin hallazgos');
        const informe = informeVisibilidad(salida);
        mkdirSync('.astro', { recursive: true });
        writeFileSync('.astro/informe-visibilidad.json', JSON.stringify(informe, null, 2));
        const menor = [...informe].sort((a, b) => a.proporcion - b.proporcion)[0];
        logger.info(`RQ-13: visibilidad sin abrir detalles, ${informe.length} páginas; mínima ${menor ? `${(menor.proporcion * 100).toFixed(0)} % en ${menor.ruta}` : 'n/d'} (.astro/informe-visibilidad.json)`);
      },
    },
  };
}
