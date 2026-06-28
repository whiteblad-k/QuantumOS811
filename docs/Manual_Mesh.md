# Manual del Sistema: GhostRider (Mesh/PubSub)

## Propósito
GhostRider es la capa de comunicación descentralizada de QuantumOS811. Permite que los nodos se descubran y comuniquen sin depender de servidores centralizados.

## Conceptos Clave
- **PubSub (Publish/Subscribe):** Sistema de mensajería donde los datos se emiten a "Canales" (Topics).
- **Topic `quantum-mesh`:** Canal principal de comunicación de la red.
- **Heartbeat:** Latido automático que emite el nodo cada 60 segundos para anunciar su disponibilidad.

## Flujo de Comunicación
1. **Emisión:** El nodo inyecta datos mediante `ipfs pubsub pub <topic> <data>`.
2. **Propagación:** La red IPFS distribuye el mensaje a todos los suscriptores del topic.
3. **Recepción:** Cualquier nodo con `ipfs pubsub sub <topic>` recibe el mensaje en tiempo real.

## Scripts de Gestión
- `ghostrider/mesh/heartbeat.sh`: Script principal que mantiene el nodo "visible" en la red.
- Ejecución en background: `nohup ./heartbeat.sh > /dev/null 2>&1 &`
