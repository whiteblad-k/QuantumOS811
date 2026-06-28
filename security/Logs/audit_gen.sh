#!/bin/bash
# Auditoría rápida de red para QuantumOS811
LOG_FILE="security/Logs/scan_$(date +%Y%m%d_%H%M%S).log"

echo "[*] Iniciando escaneo de red local: $(date)" > $LOG_FILE
echo "------------------------------------------------" >> $LOG_FILE

# Escaneo ligero de nodos activos
nmap -sP 192.168.1.0/24 >> $LOG_FILE 2>&1

echo "------------------------------------------------" >> $LOG_FILE
echo "[*] Auditoría finalizada. Guardado en: $LOG_FILE"
