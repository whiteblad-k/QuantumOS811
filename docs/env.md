# Variables de entorno y Firebase

- No comitees archivos `.env` con credenciales. Añade un `.env` local con las variables `VITE_FIREBASE_*` mostradas en `.env.example`.
- En producción/CI: guarda las claves en **Secretos** (por ejemplo, GitHub Actions Secrets) y expónlas como variables de entorno en el job de build.
- Si prefieres no exponer claves en el cliente, implementa un backend/proxy para operaciones sensibles (escrituras administrativas, tokens restringidos, etc.).

Recomendaciones:
- Usa `VITE_FIREBASE_*` para que Vite las incluya en la build. Para funciones sensibles o admin, usa funciones server-side o Cloud Functions con permisos restringidos.
- Documenta el proceso de deploy en tu `README` y añade instrucciones de cómo configurar Secrets en CI.
