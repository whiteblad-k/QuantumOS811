#!/bin/bash
# Analizador de Red Inteligente (Modo Auditoría Total)
LATEST=$(ls -t security/Logs/*.log | head -n 1)
WHITELIST="security/known_devices.txt"

echo "[*] Auditoría de Seguridad: Verificando dispositivos actuales..."

# Extraer solo las IPs
grep -oE '192\.168\.1\.[0-9]+' "$LATEST" | sort -u > current_ips.txt

ALERT=false

while read -r ip; do
    if grep -q "$ip" "$WHITELIST"; then
        echo "[INFO] Dispositivo autorizado: $ip"
    else
        echo "[!!!] ALERTA DE SEGURIDAD: Dispositivo NO AUTORIZADO detectado: $ip"
        ALERT=true
        # Lanzar alerta por red Mesh
        echo "ALERTA_IDS: Intruso detectado en Nodo GX1158 | IP: $ip | $(date)" | ipfs pubsub pub quantum-mesh
    fi
done < current_ips.txt

if [ "$ALERT" = false ]; then
    echo "[OK] Todos los dispositivos conectados están autorizados."
fi

rm current_ips.txt
