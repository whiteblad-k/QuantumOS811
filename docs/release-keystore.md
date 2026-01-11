# Generar keystore y configurar Secrets para CI

1. Generar un keystore localmente (ejemplo):

```bash
keytool -genkey -v -keystore release.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

2. Codifica el keystore en base64 para subirlo como Secret en GitHub:

```bash
base64 release.keystore | pbcopy   # macOS
base64 release.keystore | xclip    # Linux
```

3. Crea los Secrets en el repositorio (Settings → Secrets → Actions):

- `ANDROID_KEYSTORE_BASE64` → contenido base64 del keystore
- `KEYSTORE_PASSWORD` → contraseña del keystore
- `KEY_ALIAS` → alias de la llave
- `KEY_PASSWORD` → contraseña de la llave
- `PLAY_SERVICE_ACCOUNT_JSON` → (opcional) JSON de la service account de Google Play

4. Para subir a Play Console automáticamente:
- Crea una Service Account en Google Play Console con permisos `Release Manager` o `Editor`. Descarga el JSON y súbelo como `PLAY_SERVICE_ACCOUNT_JSON`.

5. En la PR que crea la AAB, verifica el job `Build TWA (AAB)` y descarga el artifact `twa-aab` para revisar el AAB.
