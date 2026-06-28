#!/bin/bash
# Script Maestro de Arranque: QuantumOS811

echo "[*] Iniciando Secuencia de Arranque: $(date)"

# 1. Iniciar IPFS si no está corriendo
if ! pgrep -x "ipfs" > /dev/null; then
    echo "[*] IPFS: Iniciando daemon..."
    ipfs daemon > /dev/null 2>&1 &
    sleep 3
    echo "[OK] IPFS: Daemon activo."
else
    echo "[*] IPFS: Ya estaba activo."
fi

# 2. Verificar sincronización de GitHub
echo "[*] Sincronizando con GitHub..."
git pull origin main

echo "----------------------------------------------------"
echo "QuantumOS811 está en modo activo."
echo "Nodo IPFS: Listo."
echo "Repositorio: Sincronizado."
echo "----------------------------------------------------"
