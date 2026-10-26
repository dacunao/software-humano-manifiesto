# Calidad de los sitios

Dos herramientas que se corren a voluntad; nada corre solo.

- `bun calidad.ts camino <perfil>`: qué le falta a ese producto para cumplir buenas prácticas y estándares (WCAG 2.2 AA, Core Web Vitals, OWASP, Google Search Essentials, Twelve-Factor, Ley 21.719). Con `--nuevo` hace las preguntas y crea el perfil; `confirmar <perfil> <id>` marca un paso manual como hecho.
- `bun calidad.ts control <perfil|todos>`: revisa lo publicado (incluye Chrome, Safari y Firefox reales buscando bloqueos de la política de seguridad) y muestra solo lo que falla. `--vista-previa`, `--rapido` (sin Google), `--todo`.

Perfiles en `perfiles/`. Uso diario: [CARTILLA.md](CARTILLA.md). Para agentes: la skill en `skill/SKILL.md` y la salida `--json`. La velocidad, la accesibilidad y las visitas reales usan la clave en `~/.config/software-humano/pagespeed-api-key`.
