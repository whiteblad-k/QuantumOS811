#!/bin/bash
# QuantumOS811 Sync Automation
echo "[*] Iniciando ciclo de sincronización: $(date)"

# Módulo 2: Git (Detectar y añadir)
git add .

# Módulo 2: Crear Commit
git commit -m "Auto-sync del sistema: $(date)"

# Módulo 3: Push a GitHub
# Sincronización automática de Logs de Seguridad
if [ "$(ls -A security/Logs/)" ]; then
    echo "[*] Detectados nuevos logs de auditoría. Preparando..."
    git add security/Logs/*.log
    git commit -m "chore: auto-upload security logs $(date +%Y-%m-%d)"
fi
git push origin main

# Módulo 4: Verificación
if [ $? -eq 0 ]; then
    echo "[OK] Sincronización completa con GitHub."
else
    echo "[!] Error en la sincronización."
    exit 1
fi
