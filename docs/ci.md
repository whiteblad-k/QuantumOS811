# CI / GitHub Actions

Este proyecto ya incluye un workflow de CI que instala dependencias, construye la app y ejecuta tests/lint si existen.

Variables necesarias (añádelas como **Secrets** en GitHub repository Settings > Secrets > Actions):

- VITE_FIREBASE_API_KEY
- VITE_FIREBASE_AUTH_DOMAIN
- VITE_FIREBASE_PROJECT_ID
- VITE_FIREBASE_STORAGE_BUCKET
- VITE_FIREBASE_MESSAGING_SENDER_ID
- VITE_FIREBASE_APP_ID
- VITE_FIREBASE_MEASUREMENT_ID

Notas:
- No subas credenciales al repositorio. Usa Secrets para las variables que terminan en `VITE_FIREBASE_*`.
- Para publicar builds firmados (AAB/TWA) necesitaremos añadir secrets para el keystore y configurar un job adicional que haga la firma usando esas variables (ver `docs/ci.md`).
