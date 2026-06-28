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
## 📊 Centro de Mando: Dashboard de Persistencia
El script `security/dashboard.sh` proporciona una visión en tiempo real del estado de la red.

### Lógica de Visualización (Código ANSI)
- **Azul (ACTIVO):** Dispositivos con menos de 5 horas de conexión.
- **Amarillo (PERSISTENTE):** Dispositivos con una conexión entre 5 y 10 horas.
- **Rojo/Parpadeante (CRÍTICO):** Dispositivos con más de 10 horas de conexión.

### Requisitos del Sistema
- `security/session_start.log`: Archivo donde se registra el inicio de sesión de cada IP detectada.
- El script calcula la diferencia de tiempo en segundos desde `session_start` hasta el momento actual (`date +%s`).

## 🛡️ Dashboard Interactivo V2
El sistema ha sido actualizado a una arquitectura de menú persistente (`dashboard_v2.sh`).
- **Optimización:** Ahora se ejecuta bajo demanda, eliminando la carga innecesaria en la RAM al iniciar el terminal.
- **Funcionalidades:**
    1) Escaneo de red (nmap).
    2) Consulta de Blacklist.
    3) Salida segura.

