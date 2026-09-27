#!/usr/bin/env bash
# Comprobación de entorno para el paquete Software Humano para SpecKit.
#
# No modifica nada. Solo verifica que el entorno permita instalar y operar
# la adaptación, e informa qué hacer ante cada fallo.
#
# Uso:  tools/speckit/preflight.sh
# Sale con 0 si no hay bloqueos, 1 si hay al menos uno.

set -uo pipefail

RAIZ="$(CDPATH="" cd -- "$(dirname -- "${BASH_SOURCE[0]}")/../.." && pwd)"
RANGO_MIN="1.0.0"
RANGO_MAX="2.0.0"

bloqueos=0
avisos=0

if [ -t 1 ]; then
    OK=$'\033[32mOK  \033[0m'; FALLA=$'\033[31mFALLA\033[0m'; AVISO=$'\033[33mAVISO\033[0m'
else
    OK="OK  "; FALLA="FALLA"; AVISO="AVISO"
fi

ok()    { printf '  %s  %s\n' "$OK" "$1"; }
falla() { printf '  %s %s\n' "$FALLA" "$1"; printf '         → %s\n' "$2"; bloqueos=$((bloqueos+1)); }
aviso() { printf '  %s %s\n' "$AVISO" "$1"; printf '         → %s\n' "$2"; avisos=$((avisos+1)); }
titulo(){ printf '\n%s\n' "$1"; }

# Compara dos versiones semánticas. Devuelve 0 si $1 < $2.
menor_que() {
    [ "$1" = "$2" ] && return 1
    [ "$(printf '%s\n%s\n' "$1" "$2" | sort -V | head -1)" = "$1" ]
}

printf 'Comprobación de entorno · Software Humano para SpecKit\n'
printf 'Raíz evaluada: %s\n' "$RAIZ"

# ─────────────────────────────────────────────────────────────────────────────
titulo '1 · Repositorio Git'

if ! command -v git >/dev/null 2>&1; then
    falla "git no está instalado" "Instálalo antes de continuar. El método exige trazabilidad bajo control de versiones."
elif ! git -C "$RAIZ" rev-parse --show-toplevel >/dev/null 2>&1; then
    falla "la raíz no es un repositorio Git" "Ejecuta 'git init' en $RAIZ y crea un commit base. Sin línea base no puedes distinguir los cambios de la instalación de los cambios preexistentes."
else
    top="$(git -C "$RAIZ" rev-parse --show-toplevel)"
    ok "repositorio Git en $top"
    if [ -n "$(git -C "$RAIZ" status --porcelain 2>/dev/null)" ]; then
        aviso "hay cambios sin confirmar" "Confírmalos o guárdalos antes de instalar, para que 'git status' permita aislar lo que produce la instalación."
    else
        ok "árbol de trabajo limpio"
    fi
fi

# ─────────────────────────────────────────────────────────────────────────────
titulo '2 · SpecKit'

ver_speckit=""
origen_speckit=""

if [ -x "$RAIZ/tools/speckit/specify" ]; then
    ver_speckit="$("$RAIZ/tools/speckit/specify" --version 2>/dev/null | tr -d '[:space:]' | sed 's/^specify//')"
    origen_speckit="envoltorio del repositorio (tools/speckit/specify)"
elif command -v specify >/dev/null 2>&1; then
    ver_speckit="$(specify --version 2>/dev/null | tr -d '[:space:]' | sed 's/^specify//')"
    origen_speckit="instalación global"
fi

if [ -z "$ver_speckit" ]; then
    falla "SpecKit no está disponible" "Instálalo, o usa una instancia aislada: uvx --from git+https://github.com/github/spec-kit.git@v1.0.8 specify --version"
elif menor_que "$ver_speckit" "$RANGO_MIN" || ! menor_que "$ver_speckit" "$RANGO_MAX"; then
    falla "SpecKit $ver_speckit está fuera del rango >=$RANGO_MIN,<$RANGO_MAX ($origen_speckit)" \
          "No actualices la instalación global si otros proyectos dependen de ella. Usa una instancia aislada con el envoltorio tools/speckit/specify. Ver instructions/00_REQUISITOS_DE_INSTALACION.md, requisito 2."
else
    ok "SpecKit $ver_speckit dentro del rango ($origen_speckit)"
fi

if command -v uvx >/dev/null 2>&1; then
    ok "uvx disponible (permite fijar una versión aislada)"
else
    aviso "uvx no está disponible" "Instala uv (https://docs.astral.sh/uv/) si necesitas una instancia aislada de SpecKit sin tocar la instalación global."
fi

# ─────────────────────────────────────────────────────────────────────────────
titulo '3 · Python con PyYAML  (resolución de plantillas compuestas)'

py_ok=""
for cand in python3 /usr/bin/python3 /opt/homebrew/bin/python3 /usr/local/bin/python3; do
    ruta="$(command -v "$cand" 2>/dev/null || true)"
    [ -z "$ruta" ] && continue
    if "$ruta" -c 'import yaml' >/dev/null 2>&1; then
        py_ok="$ruta"
        break
    fi
done

py_path="$(command -v python3 2>/dev/null || true)"

if [ -z "$py_path" ]; then
    falla "no hay python3 en el PATH" "Los scripts de SpecKit lo necesitan para componer plantillas."
elif "$py_path" -c 'import yaml' >/dev/null 2>&1; then
    ok "python3 del PATH tiene PyYAML ($py_path)"
elif [ -n "$py_ok" ]; then
    aviso "el python3 del PATH NO tiene PyYAML, pero $py_ok sí" \
          "Sin corregirlo, la resolución de plantillas falla con 'PyYAML is required to resolve preset template composition'. Antepón el shim: PATH=\"\$PWD/tools/speckit/shim:\$PATH\" antes de invocar los scripts de .specify/scripts/bash/."
else
    falla "ningún python3 encontrado tiene PyYAML" \
          "Instálalo en un intérprete disponible. En macOS con Homebrew, PEP 668 bloquea 'pip install --user' y '--break-system-packages' puede romper Homebrew: prefiere /usr/bin/python3 o un entorno virtual."
fi

# ─────────────────────────────────────────────────────────────────────────────
titulo '4 · Utilidades de apoyo'

command -v shasum >/dev/null 2>&1 || command -v sha256sum >/dev/null 2>&1 \
    && ok "shasum/sha256sum disponible (verificación de integridad)" \
    || falla "no hay shasum ni sha256sum" "Sin ellos no puedes verificar SHA256SUMS ni el checksum del preset."

if command -v jq >/dev/null 2>&1; then
    ok "jq disponible"
else
    aviso "jq no está disponible" "Los scripts de SpecKit lo prefieren y recurren a python3 como alternativa. No es bloqueante."
fi

# ─────────────────────────────────────────────────────────────────────────────
titulo '5 · Integridad del paquete'

if [ -f "$RAIZ/SHA256SUMS" ]; then
    if command -v shasum >/dev/null 2>&1; then
        total="$(grep -c . "$RAIZ/SHA256SUMS")"
        buenos="$(cd "$RAIZ" && shasum -a 256 -c SHA256SUMS 2>/dev/null | grep -c ': OK$')"
        if [ "$buenos" = "$total" ]; then
            ok "SHA256SUMS verifica $buenos/$total archivos"
        else
            falla "SHA256SUMS verifica solo $buenos/$total archivos" \
                  "Un archivo del paquete fue modificado o falta. No instales un paquete cuya integridad no está demostrada."
        fi
    fi
else
    aviso "no se encontró SHA256SUMS en la raíz" "Si descomprimiste el paquete en una subcarpeta, muévelo a la raíz del repositorio."
fi

# ─────────────────────────────────────────────────────────────────────────────
titulo '6 · Estado de SpecKit en este proyecto'

if [ -d "$RAIZ/.specify" ]; then
    ok ".specify/ existe: el proyecto ya está inicializado"
    if [ -f "$RAIZ/.specify/memory/constitution.md" ]; then
        if grep -q 'SH-FUND' "$RAIZ/.specify/memory/constitution.md" 2>/dev/null; then
            ok "la constitución ya contiene el núcleo del manifiesto"
        else
            aviso "la constitución existe pero no contiene el núcleo" "Es el andamiaje nativo sin resolver. Deberás materializarla (paso 5 de la instrucción 01)."
        fi
    fi
    if [ -d "$RAIZ/.specify/presets/software-humano" ]; then
        aviso "ya hay un preset software-humano instalado" "Verifica su versión antes de reinstalar. No uses --force en 'preset add'."
    fi
else
    ok ".specify/ no existe: se requerirá 'specify init' con autorización humana"
fi

# ─────────────────────────────────────────────────────────────────────────────
titulo 'Resultado'

if [ "$bloqueos" -gt 0 ]; then
    printf '  %d bloqueo(s) y %d aviso(s).\n' "$bloqueos" "$avisos"
    printf '  NO instales todavía. Resuelve los bloqueos e informa a la persona responsable.\n\n'
    exit 1
fi

printf '  0 bloqueos, %d aviso(s).\n' "$avisos"
printf '  El entorno permite instalar. Continúa con instructions/01_INSTALAR_Y_VERIFICAR_SPECKIT.md\n\n'
exit 0
