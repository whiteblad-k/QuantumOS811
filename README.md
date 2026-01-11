# QuantumOS811
Landing page y repositorio del proyecto QuantumOS811 / Revolskineet: plataforma de seguridad, inteligencia y desarrollo humano”

## Variables de entorno (Firebase)

No comitees un archivo `.env` con claves. Copia `.env.example` a `.env` para desarrollo local y consulta `docs/env.md` para instrucciones de CI y seguridad. En CI (GitHub Actions) guarda las claves en Secrets y expón las variables en el job de build.

## Integración CI ✅

Se añadió un workflow de GitHub Actions (`.github/workflows/ci.yml`) que instala dependencias, ejecuta `npm run build` y `npm test` si están definidos, y sube el artefacto `dist` como build. Define los secretos `VITE_FIREBASE_*` en GitHub y no los subas al repo.


