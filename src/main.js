// src/main.js
// Hardening de Firebase: leer configuración desde Vite env (VITE_FIREBASE_*), inicialización diferida y guards.

import { initializeApp } from "firebase/app"
import { getFirestore, collection, query, orderBy, limit, onSnapshot, addDoc } from "firebase/firestore"
import { getDatabase, ref, onValue, set } from "firebase/database"
import { getRemoteConfig, fetchAndActivate, getValue } from "firebase/remote-config"

// Helpers mínimos de logging / telemetry (puedes integrar tu sistema real)
function log(msg) { console.log(msg) }
function event(name, props = {}) { console.log(`event:${name}`, props) }

// ===== 1) Config (leer desde env build - Vite: VITE_FIREBASE_*) =====
// Define tus variables en `.env` (no comitear claves): VITE_FIREBASE_API_KEY, VITE_FIREBASE_PROJECT_ID, etc.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? "TU_API_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? "TU_PROYECTO.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "TU_PROYECTO",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? "TU_PROYECTO.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "XXXX",
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? "XXXX",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ?? "G-XXXX"
}

// ===== 2) Estado de Firebase (diferida) =====
let app = null
let db = null
let rtdb = null
let rc = null

function isPlaceholder(v) {
  return !v || v === 'TU_API_KEY' || v === 'TU_PROYECTO' || v === 'XXXX' || v === 'G-XXXX'
}

// ===== 3) Init Firebase (deferida, lee env y valida) =====
export async function initFirebase() {
  const cfg = firebaseConfig
  if (isPlaceholder(cfg.apiKey) || isPlaceholder(cfg.projectId)) {
    log("⚠️ Firebase config incompleta — define VITE_FIREBASE_* en .env o usa backend para operaciones sensibles")
    return false
  }
  try {
    app = initializeApp(cfg)
    db = getFirestore(app)
    rtdb = getDatabase(app)
    rc = getRemoteConfig(app)

    // Remote Config defaults
    rc.settings = rc.settings || {}
    rc.settings.minimumFetchIntervalMillis = 60_000
    rc.defaultConfig = {
      welcome_message: "Revolskyynet online",
      agent_mode: "IDLE",
      gemini_command: ""
    }

    log("✅ Firebase inicializado")
    return true
  } catch (e) {
    log(`❌ Error inicializando Firebase: ${e?.message || e}`)
    return false
  }
}

// ===== 4) Firestore listener con guard =====
export function startFirestoreListener() {
  if (!db) {
    log("⚠️ Firestore no inicializado. Ejecuta initAgent() o configura VITE_FIREBASE_*")
    return
  }

  const col = collection(db, "agent_logs")
  const qy = query(col, orderBy("timestamp", "desc"), limit(10))

  onSnapshot(qy, (snap) => {
    snap.docChanges().forEach((ch) => {
      if (ch.type === "added") {
        log(`📥 Firestore agent_logs: ${JSON.stringify(ch.doc.data())}`)
      }
    })
  })

  log("👂 Firestore listener activo (agent_logs)")
}

// ===== 5) RTDB listener con guard =====
export function startRtdbListener() {
  if (!rtdb) {
    log("⚠️ RTDB no inicializada. Ejecuta initAgent() o configura VITE_FIREBASE_*")
    return
  }
  const statusRef = ref(rtdb, "status")
  onValue(statusRef, (snap) => {
    log(`📥 RTDB status: ${JSON.stringify(snap.val())}`)
  })
  log("👂 RTDB listener activo (status)")
}

// ===== 6) Remote Config sync con try/catch y guard =====
export async function syncRemoteConfig() {
  if (!rc) {
    log("⚠️ Remote Config no disponible (Firebase no inicializado).")
    return
  }
  log("🔄 Remote Config fetch&activate...")
  try {
    await fetchAndActivate(rc)
  } catch (e) {
    log("❌ Error fetch Remote Config: " + e?.message || e)
    return
  }

  const welcome = getValue(rc, "welcome_message").asString()
  const mode = getValue(rc, "agent_mode").asString()
  const cmd = getValue(rc, "gemini_command").asString()

  log(`📡 RC welcome_message = ${welcome}`)
  log(`📡 RC agent_mode      = ${mode}`)
  log(`📡 RC gemini_command   = ${cmd || "(vacío)"}`)

  event("remote_config_sync", { mode })

  if (cmd && cmd !== "idle") {
    log(`⚡ Ejecutando comando RC: ${cmd}`)
    if (cmd === "test_data") await testFirebase()
  }
}

// ===== 7) Test write con guards =====
export async function testFirebase() {
  const payload = {
    source: "vite_web",
    device: "web",
    status: "online",
    timestamp: new Date().toISOString()
  }

  if (!db || !rtdb) {
    log("⚠️ Firebase no inicializado. No se puede ejecutar testFirebase.")
    return
  }

  try {
    log("✍️ Escribiendo Firestore agent_logs...")
    await addDoc(collection(db, "agent_logs"), payload)
    event("db_write_firestore", { node: "web" })

    log("✍️ Escribiendo RTDB status/web...")
    await set(ref(rtdb, "status/web"), payload)
    event("db_write_rtdb", { node: "web" })

    log("✅ Test Firebase completado")
  } catch (e) {
    log("❌ Error testFirebase: " + (e?.message || e))
  }
}

// ===== 8) Init Agent (inicia analytics, firebase y listeners) =====
export async function initAgent() {
  log("🧠 Init Agent: enlazando todo...")

  // placeholder para initAnalytics si tienes
  // Note: initAnalytics is not defined yet, so we skip it for now

  const ok = await initFirebase()
  if (!ok) {
    log("⚠️ Firebase no inicializado. El agente funcionará en modo limitado.")
    event("agent_start", { platform: "web", limited: true })
    log("✅ Agente Web online (modo limitado)")
    return
  }

  startFirestoreListener()
  startRtdbListener()
  await syncRemoteConfig()
  event("agent_start", { platform: "web" })
  log("✅ Agente Web online")
}

// Auto-init when document ready (puedes controlar esto desde tu app)
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    // No await here; queremos que la UI cargue aunque Firebase falte
    initAgent().catch(e => log('Error initAgent: ' + e?.message || e))
  })
}
