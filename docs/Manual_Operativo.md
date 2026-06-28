# Manual Operativo de QuantumOS811

## 🌌 ¿Qué es esto?
QuantumOS811 es un nodo de trabajo descentralizado y auditable. No es solo código; es un sistema diseñado para mantener la seguridad y la trazabilidad de tus investigaciones (RF, Redes, Cuántica) de forma automatizada.

## 🧠 Filosofía: "Hazlo una vez, automatízalo siempre"
El sistema se basa en 3 pilares:
1. **Git:** Tu memoria histórica (trazabilidad).
2. **IPFS:** Tu respaldo inmutable (descentralización).
3. **Automatización:** El script `sync_all.sh` hace el trabajo pesado por ti.

## 🚀 ¿Cómo empezar? (Guía para no agobiarse)
Si eres nuevo en el proyecto, solo sigue estos 3 pasos:

1. **Entrar al Nodo:** `cd ~/repo_github/QuantumOS811`
2. **Trabajar:** Haz tus cambios, crea tus logs en `security/Logs/`, o desarrolla tus scripts.
3. **Sincronizar:** Ejecuta `./sync_all.sh` y deja que el sistema se encargue de subir todo a GitHub e IPFS.

## 📂 Estructura del Árbol (¿Dónde va cada cosa?)
* `security/`: Aquí van los resultados de tus auditorías (Nmap, RF).
* `ghostrider/`: Aquí vive el núcleo de red y comunicación.
* `docs/`: Aquí resides tú, dejando constancia de cómo funciona todo.
* `scripts/`: Tus herramientas de automatización.

## 🛠 ¿Necesitas ayuda?
Si ves un error, no te desesperes:
1. Revisa `git status` para ver qué está pasando.
2. Si el error es de autenticación, verifica tu Token de GitHub.
3. Si el nodo IPFS falla, `ipfs daemon` es tu mejor amigo.

---
*Hecho para ser simple. Hecho para ser resistente.*
