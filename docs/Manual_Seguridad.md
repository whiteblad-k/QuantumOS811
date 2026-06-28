# Manual de Seguridad y Defensa Activa (IDS)

## 🛡️ Propósito
QuantumOS811 integra un Sistema de Detección de Intrusos (IDS) diseñado para monitorizar la red local y notificar anomalías en tiempo real.

## 🧠 Arquitectura de Defensa
El sistema se basa en tres componentes críticos:

1. **Lista Blanca (`known_devices.txt`):** El "Censo de Confianza". Solo los dispositivos aquí listados están autorizados.
2. **Motor de Análisis (`analyzer.sh`):** Ejecuta una auditoría proactiva contra el último log de red.
3. **Alerta Mesh (`GhostRider`):** El mecanismo de comunicación descentralizada. Si se detecta un intruso, se emite una alerta pública en el canal `quantum-mesh`.

## 🚀 Protocolo de Operación
Ante una sospecha de intrusión o para auditoría periódica:

1. **Escaneo:** `./security/Logs/audit_gen.sh` (Actualiza los datos).
2. **Análisis:** `./security/Logs/analyzer.sh` (Compara con lista blanca).
3. **Respuesta:** Si `analyzer.sh` detecta una IP no autorizada:
   - Imprime alerta en terminal local.
   - Publica `ALERTA_IDS` en la red IPFS (PubSub).

## ⚠️ ¿Qué hacer ante una ALERTA_IDS?
1. Verifica si el dispositivo es nuevo pero legítimo (ej. un invitado, un nuevo IoT).
2. Si es legítimo, añade la IP a `security/known_devices.txt`.
3. Si no es reconocido, inicia protocolos de aislamiento de red (desconexión o cambio de clave WiFi).
