#!/bin/bash
# Empaqueta el proyecto Numerón en un ZIP limpio (sin node_modules, .next,
# .env, upload/ ni download/) listo para descargar y ejecutar localmente.
set -e

STAGE=/tmp/numeron-stage
OUT=/home/z/my-project/download/numeron-app.zip

rm -rf "$STAGE"
mkdir -p "$STAGE/numeron"
cd /home/z/my-project

# Carpetas del proyecto (excluye upload/, download/, node_modules/, .next/)
for dir in src public prisma db scripts tests examples mini-services; do
  if [ -e "$dir" ]; then cp -r "$dir" "$STAGE/numeron/"; fi
done

# Archivos de configuración de la raíz (excluye .env a propósito)
for file in package.json bun.lock next.config.ts tailwind.config.ts tsconfig.json \
            postcss.config.mjs eslint.config.mjs components.json Caddyfile .gitignore; do
  if [ -e "$file" ]; then cp "$file" "$STAGE/numeron/"; fi
done

# Crear el ZIP
mkdir -p /home/z/my-project/download
rm -f "$OUT"
cd "$STAGE"
zip -qr "$OUT" numeron

# Resumen de verificación
echo "=== Tamaño del ZIP ==="
du -h "$OUT"
echo "=== Total de archivos ==="
unzip -l "$OUT" | tail -1
echo "=== Archivos clave presentes ==="
for key in numeron/package.json numeron/src/app/page.tsx numeron/src/components/numeron/QuizView.tsx numeron/src/lib/numeron/questions/index.ts; do
  if unzip -l "$OUT" | grep -q " $key\$"; then echo "OK  $key"; else echo "FALTA  $key"; fi
done
echo "=== Verificar que NO incluya carpetas pesadas ==="
unzip -l "$OUT" | grep -cE "node_modules|\.next/|\.env$" || echo "0 (correcto, no incluye nada de eso)"
