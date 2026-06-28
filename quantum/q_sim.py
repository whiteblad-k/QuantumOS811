import math

class QuantumSystem:
    def __init__(self):
        # Estado inicial |00> : [1, 0, 0, 0]
        self.state = [1+0j, 0j, 0j, 0j]

    def apply_hadamard_q0(self):
        # Aplica Hadamard al primer Qubit (q0)
        inv_sqrt2 = 1 / math.sqrt(2)
        # Transformación matricial simplificada para 2 qubits
        new_state = [0j] * 4
        new_state[0] = inv_sqrt2 * (self.state[0] + self.state[2])
        new_state[1] = inv_sqrt2 * (self.state[1] + self.state[3])
        new_state[2] = inv_sqrt2 * (self.state[0] - self.state[2])
        new_state[3] = inv_sqrt2 * (self.state[1] - self.state[3])
        self.state = new_state
        print("[*] Hadamard aplicada a Q0.")

    def apply_cnot(self):
        # CNOT: q0 es control, q1 es target
        # Si q0 es 1, q1 se invierte (0<->1)
        self.state[2], self.state[3] = self.state[3], self.state[2]
        print("[*] Puerta CNOT aplicada (Entrelazamiento).")

# --- Ejecución ---
qs = QuantumSystem()
qs.apply_hadamard_q0()
qs.apply_cnot()
print(f"Estado final tras Bell State: {[round(abs(x)**2, 2) for x in qs.state]}")
