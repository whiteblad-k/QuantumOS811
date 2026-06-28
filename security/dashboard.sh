#!/bin/bash
# Dashboard de Persistencia: QuantumOS811 (Versión Robusta)

echo -e "\033[1;37m--- ESTADO DE DISPOSITIVOS EN RED ---\033[0m"

LATEST=$(ls -t security/Logs/*.log | head -n 1)
CURRENT_IPS=$(grep -oE '192\.168\.1\.[0-9]+' "$LATEST" | sort -u)
NOW=$(date +%s)

for ip in $CURRENT_IPS; do
    # 1. Registrar si es nueva
    if ! grep -q "$ip" security/session_start.log; then
        echo "$ip | $NOW" >> security/session_start.log
    fi
    
    # 2. Obtener el timestamp con validación estricta
    # grep -w busca la IP exacta, tail -1 coge la última entrada, cut extrae el tiempo
    START=$(grep -w "$ip" security/session_start.log | tail -1 | cut -d '|' -f2 | tr -d ' ')
    
    # 3. Verificación de seguridad: ¿Es START un número válido?
    if [[ ! "$START" =~ ^[0-9]+$ ]]; then
        START=$NOW # Si falla, reiniciamos el contador a 0h
    fi

    ELAPSED=$(( (NOW - START) / 3600 )) 

    # 4. Lógica de colores
    if [ "$ELAPSED" -lt 5 ]; then
        COLOR="\033[0;34m" # Azul
        MSG="ACTIVO"
    elif [ "$ELAPSED" -lt 10 ]; then
        COLOR="\033[0;33m" # Amarillo
        MSG="PERSISTENTE"
    else
        COLOR="\033[5;31m" # Rojo + Parpadeo
        MSG="CRÍTICO"
    fi

    echo -e "${COLOR}IP: $ip | Tiempo: ${ELAPSED}h | Estado: $MSG\033[0m"
done

