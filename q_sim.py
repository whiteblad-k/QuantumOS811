import math
import random

class QuantumSystem:
    def __init__(self):
        # Estado inicial |00> : [1, 0, 0, 0]
        # Representa |00>, |01>, |10>, |11>
        self.state = [1+0j, 0j, 0j, 0j]

    def apply_hadamard_q0(self):
        # Aplica Hadamard al primer Qubit (q0)
        inv_sqrt2 = 1 / math.sqrt(2)
        new_state = [0j] * 4
        new_state[0] = inv_sqrt2 * (self.state[0] + self.state[2])
        new_state[1] = inv_sqrt2 * (self.state[1] + self.state[3])
        new_state[2] = inv_sqrt2 * (self.state[0] - self.state[2])
        new_state[3] = inv_sqrt2 * (self.state[1] - self.state[3])
        self.state = new_state
        print("[*] Puerta Hadamard aplicada a Q0.")

    def apply_cnot(self):
        # CNOT: si Q0 es 1, invierte Q1
        self.state[2], self.state[3] = self.state[3], self.state[2]
        print("[*] Puerta CNOT aplicada (Entrelazamiento).")

    def measure(self):
        # Seleccionamos un estado basado en sus probabilidades (abs^2)
        estados = ['|00>', '|01>', '|10>', '|11>']
        probabilidades = [abs(x)**2 for x in self.state]
        
        # El colapso: la naturaleza elige un estado
        resultado = random.choices(estados, weights=probabilidades)[0]
        print(f"[*] Medición realizada. El sistema colapsó en: {resultado}")
        return resultado

# --- Ejecución del Experimento ---
qs = QuantumSystem()
qs.apply_hadamard_q0()
qs.apply_cnot()

print(f"Probabilidades pre-medición: {[round(abs(x)**2, 2) for x in qs.state]}")
resultado = qs.measure()
