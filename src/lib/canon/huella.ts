import { createHash } from 'node:crypto';

/** Huella SHA-256 fijada del núcleo v2.1 (RQ-01). Cambiarla es una decisión, no un ajuste. */
export const HUELLA_CANON = '9beef610c0b1e81ebc8bb56d3c1a07aa1e1bb75e330ba4cddc1eebdc60fa68dc';

export class ErrorHuellaCanon extends Error {
  constructor(encontrada: string) {
    super(
      `RV-01 · docs/method/Manifiesto_Software_Humano_IA_Nucleo_v2.1.md · La fuente canónica cambió ` +
        `(huella ${encontrada.slice(0, 12)}…, se esperaba ${HUELLA_CANON.slice(0, 12)}…). ` +
        'Registra la versión y describe los cambios antes de actualizar (PRD §27.2).',
    );
    this.name = 'ErrorHuellaCanon';
  }
}

export function sha256(texto: string): string {
  return createHash('sha256').update(texto, 'utf8').digest('hex');
}

/** RV-01: detiene la construcción si el archivo del núcleo no es el fijado. */
export function verificarHuella(contenido: string): void {
  const encontrada = sha256(contenido);
  if (encontrada !== HUELLA_CANON) throw new ErrorHuellaCanon(encontrada);
}
