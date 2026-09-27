/**
 * T044–T053 · Borradores en español de las seis entradas editoriales de cada principio.
 * Derivan de su sección canónica y del PRD §17; el texto canónico no se copia, se cita en la vista.
 * Voz impersonal. Todo nace en `borrador`; en y pt-BR quedan `pendiente` hasta la fase 11.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse, stringify } from 'yaml';
import { DIR_CONTENIDO } from '../src/lib/contenido/cargar';
import type { Principio } from '../src/lib/contenido/esquemas';

type Textos = Record<'tension' | 'significado' | 'consecuencia' | 'ejemplo' | 'contraejemplo' | 'prueba', string>;

const B: Record<string, Textos> = {
  p01: {
    tension: 'Un equipo puede entregar muchas funcionalidades y resolver poco. Cuando el trabajo se organiza por features o por perfiles genéricos, nadie tiene que explicar qué cambia para la persona después de usar el producto.',
    significado: 'Una capacidad importa solo cuando produce un cambio reconocible para alguien: pasar de una situación actual a un resultado buscado. Antes de diseñar una respuesta se describe cuándo surge la necesidad, qué la motiva y qué resultado permitiría reconocer el avance.',
    consecuencia: 'Cada decisión tiene que poder rastrearse hasta el fundamento de producto que la justifica. Un pedido de funcionalidad se reformula como circunstancia, motivación y resultado antes de discutir soluciones, y esa formulación admite más de una respuesta, incluida la de no construir.',
    ejemplo: 'Un pedido llega como «agregar un botón de exportar». Reformulado, dice: cuando alguien tiene que presentar sus datos a otra persona, necesita llevarlos fuera de la herramienta sin rehacer el trabajo. Esa formulación admite un botón, un enlace para compartir o un informe automático, y permite elegir la respuesta que menos carga agrega.',
    contraejemplo: 'Describir un sitio como una colección de páginas o de efectos. La lista de lo que contiene no dice qué comprensión o capacidad obtiene quien lo recorre.',
    prueba: 'Una decisión está lista cuando estas preguntas tienen respuesta con evidencia, no con intuición.',
  },
  p02: {
    tension: 'Dos productos pueden entregar el mismo resultado y dejar a sus usuarios en estados muy distintos: uno con energía para seguir, otro con dudas, errores y ganas de abandonar. Ese desgaste rara vez aparece en una especificación técnica.',
    significado: 'El resultado de un producto incluye cuánto esfuerzo, incertidumbre y atención exige obtenerlo. Si algo funciona pero desgasta, todavía no funciona bien.',
    consecuencia: 'Esfuerzo, claridad y confianza entran en los criterios de aceptación, igual que la exactitud. Se prueba el recorrido completo, no cada pantalla por separado.',
    ejemplo: 'Dos buscadores devuelven los mismos resultados. Uno muestra enseguida por qué coincide cada resultado; el otro obliga a abrirlos uno por uno para saberlo. Los dos son exactos; solo uno ahorra el trabajo de verificar.',
    contraejemplo: 'Dar por cumplido un requisito porque todo el texto está técnicamente disponible, aunque llegar a él exija luchar con la navegación, la tipografía o el movimiento.',
    prueba: 'Estas preguntas miden lo que una prueba técnica no ve: el costo de usar el producto.',
  },
  p03: {
    tension: 'Cuando la interfaz replica la arquitectura, la persona tiene que aprender cómo se construyó el producto antes de obtener algo de él. Esa transferencia parece inevitable solo porque le resulta cómoda al equipo.',
    significado: 'El dominio puede exigir reglas, integraciones y excepciones. El equipo absorbe esa complejidad y la presenta como decisiones comprensibles; las tablas y los estados internos no dictan el lenguaje ni la navegación.',
    consecuencia: 'Los conceptos internos se traducen al modelo mental de quien usa el producto. El sistema resuelve lo que puede resolver con el contexto disponible, y una excepción solo se muestra a quien realmente debe decidirla.',
    ejemplo: 'Un servicio de envíos necesita saber si un paquete es nacional o internacional. En lugar de preguntarlo, lo deduce de la dirección de destino y solo pide los datos de aduana cuando corresponden.',
    contraejemplo: 'Abrir una explicación con rutas de archivos, configuraciones o comandos antes de que la persona entienda para qué sirven.',
    prueba: 'Estas preguntas separan los pasos que existen por la persona de los que existen por el sistema.',
  },
  p04: {
    tension: 'Un producto mínimo puede ser fácil el primer día y limitante el décimo. Uno que muestra toda su potencia desde el inicio puede resultar inabordable. Los dos extremos fallan, por razones opuestas.',
    significado: 'La simplicidad no reduce la capacidad: decide cuándo aparece. Lo visible se adapta al momento, a la experiencia y a la decisión actual, y la profundidad queda disponible sin imponerse.',
    consecuencia: 'Primero se muestra la ruta principal; las opciones avanzadas aparecen cuando el contexto las vuelve relevantes. Los valores predeterminados se eligen con cuidado y pueden cambiarse cuando la decisión importa.',
    ejemplo: 'Cada principio de este sitio se entiende en su página sin abrir nada; quien quiere el texto completo, las reglas o las pruebas los encuentra a un paso, en el mismo lugar.',
    contraejemplo: 'Una portada mínima que oculta el contenido, o una página inicial que lo muestra todo a la vez.',
    prueba: 'Estas preguntas distinguen la simplificación que quita ruido de la que quita capacidad.',
  },
  p05: {
    tension: 'Cada convención propia que hay que memorizar consume la capacidad que la persona necesitaba para su problema real. En productos de uso infrecuente, o con contenido difícil, esa carga es especialmente dañina.',
    significado: 'La interfaz se apoya en expectativas conocidas, jerarquía comprensible y respuesta inmediata. Quien llega viene a hacer su trabajo, no a aprender el del equipo.',
    consecuencia: 'Se prefieren patrones conocidos cuando resuelven bien el problema. La acción principal, el estado actual y el siguiente paso posible tienen que ser evidentes sin un tutorial previo.',
    ejemplo: 'Una navegación que nombra cada destino por lo que contiene («Manifiesto», «Principios», «Aplicación») permite elegir sin haber recorrido nada antes.',
    contraejemplo: 'Obligar a descubrir cómo avanzar, o a interpretar gestos ocultos, antes de poder leer.',
    prueba: 'Estas preguntas detectan el aprendizaje que la interfaz agrega sin que el problema lo pida.',
  },
  p06: {
    tension: 'Menús, alertas, animaciones, elecciones y textos compiten por la misma atención, que es finita. Una interfaz puede no tener errores y aun así fracasar por saturación.',
    significado: 'La atención se administra con la misma disciplina que el rendimiento o el costo: cada elemento visible y cada decisión solicitada tienen que justificar lo que consumen.',
    consecuencia: 'Se jerarquiza por relevancia para el momento actual, no por igualdad entre funcionalidades. Las señales intensas se reservan para lo que de verdad requiere atención.',
    ejemplo: 'Una página con una idea dominante por sección y una sola acción principal deja claro qué hacer después, sin pedir que la persona ordene opciones que el producto podía ordenar.',
    contraejemplo: 'Animaciones continuas, llamados simultáneos con el mismo peso o fondos que reducen la legibilidad del texto.',
    prueba: 'Estas preguntas ayudan a decidir qué puede quitarse sin perder información ni control.',
  },
  p07: {
    tension: 'La incertidumbre frena la acción. Con IA, además, una respuesta fluida puede ocultar sus límites y hacer difícil distinguir un hecho de una inferencia.',
    significado: 'La confianza no se promete: surge de una conducta predecible. El producto muestra su estado, anticipa consecuencias, confirma resultados y ofrece una forma de recuperarse.',
    consecuencia: 'Se distinguen con claridad recomendaciones, decisiones automáticas y resultados confirmados. Antes de una acción irreversible la persona sabe qué va a cambiar y, cuando es razonable, puede deshacer o volver a un estado seguro.',
    ejemplo: 'Este sitio rotula cada bloque según lo que es —texto canónico, explicación, ejemplo o estado técnico— para que quien lee sepa qué está citando.',
    contraejemplo: 'Presentar una adaptación independiente como oficial, publicada o respaldada por una empresa que no la respalda.',
    prueba: 'Estas preguntas comprueban si la confianza descansa en evidencia o en el tono.',
  },
  p08: {
    tension: 'Nadie separa la interfaz, la ingeniería y el contenido: se experimenta un producto completo. Una inconsistencia pequeña se tolera; cien convierten el uso en fricción constante.',
    significado: 'Tipografía, textos, foco, estados vacíos, errores y transiciones forman una sola experiencia. Ningún detalle compensa por sí solo una mala solución, pero su acumulación refuerza o erosiona la confianza.',
    consecuencia: 'Se diseñan y se verifican también los estados menos frecuentes: vacío, carga, error, éxito y recuperación. Lenguaje, jerarquía y comportamiento se mantienen en todo el recorrido, y se revisa con contenido real antes de aprobar.',
    ejemplo: 'Un enlace compartido abre exactamente la sección citada y en el idioma elegido. Nadie lo nota cuando funciona; todos lo notan cuando falla.',
    contraejemplo: 'Tratar los errores, la carga, las pantallas pequeñas o el teclado como terminaciones que se resuelven después.',
    prueba: 'Estas preguntas buscan los detalles que contradicen la lógica del resto.',
  },
  p09: {
    tension: 'La lentitud cambia la conducta: provoca clics repetidos, dudas y abandono. Perder un avance obliga a reconstruir el contexto y destruye la confianza muy rápido.',
    significado: 'Latencia, disponibilidad y preservación del trabajo son propiedades de la experiencia. Quien usa el producto no distingue entre infraestructura e interfaz cuando algo tarda o se pierde.',
    consecuencia: 'Las interacciones críticas tienen presupuestos de respuesta explícitos. Si una operación puede demorarse se muestra progreso honesto, y el trabajo se guarda con una frecuencia proporcional al costo de perderlo.',
    ejemplo: 'El contenido de este sitio llega como texto antes de que se ejecute cualquier script; si un script falla, la lectura sigue.',
    contraejemplo: 'Bloquear la lectura hasta que termine una animación o se descarguen tipografías y recursos pesados.',
    prueba: 'Estas preguntas tratan el tiempo y la continuidad como parte de lo que se entrega.',
  },
  p10: {
    tension: 'La automatización sin agencia humana puede acelerar el camino equivocado. Cuando la ayuda decide en silencio o encierra la información, la persona pierde el control de su propio trabajo.',
    significado: 'El software puede anticipar, recomendar y automatizar sin ocultar decisiones, encerrar información ni impedir alternativas. Con IA, el control incluye saber qué información se usó y qué acción se ejecutó.',
    consecuencia: 'La confirmación se pide en proporción al impacto. Se puede revisar, editar, exportar y revertir cuando el dominio lo permite, y se separan autorización, recomendación y ejecución.',
    ejemplo: 'En este sitio se puede leer sin un orden impuesto, copiar cualquier pasaje y compartir una dirección estable, sin crear una cuenta ni entregar datos.',
    contraejemplo: 'Secuestrar el desplazamiento de la página, reproducir audio sin pedirlo, exigir un registro o impedir el acceso al texto completo.',
    prueba: 'Estas preguntas verifican que la ayuda no se convierta en apropiación.',
  },
};

const ORIGEN: Record<keyof Textos, (n: number) => string> = {
  tension: (n) => `principio-${n}-07`,
  significado: (n) => `principio-${n}-05`,
  consecuencia: (n) => `principio-${n}-09`,
  ejemplo: (n) => `p${String(n).padStart(2, '0')}`,
  contraejemplo: (n) => `principio-${n}-12`,
  prueba: (n) => `principio-${n}-11`,
};

for (let n = 1; n <= 10; n++) {
  const a = `p${String(n).padStart(2, '0')}`;
  const ruta = join(DIR_CONTENIDO, 'principios', `${a}.yaml`);
  const p = parse(readFileSync(ruta, 'utf8')) as Principio;
  for (const [clave, texto] of Object.entries(B[a]!) as [keyof Textos, string][]) {
    const e = p.entries[clave]!;
    e.derivedFrom = ORIGEN[clave](n);
    // Cada entrada con su propio objeto: el esqueleto compartía referencias vía alias YAML.
    e.text = { ...structuredClone(e.text), es: { state: 'borrador', text: texto } };
  }
  writeFileSync(ruta, `# ${p.id} · contrato del PRD §17. Nombre, frase, reglas, pruebas y señal se citan del núcleo (#${a}).\n` + stringify(p, { lineWidth: 0, aliasDuplicateObjects: false }));
}
console.log('10 principios redactados en borrador (es)');
