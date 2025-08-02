<template>
  <div class="recovery-container">
    <div class="recovery-box">
      <h2>¿Olvidaste tu contraseña?</h2>
      <p>Ingresa tu correo institucional y te enviaremos instrucciones para restablecerla.</p>

      <form @submit.prevent="handleRecovery">
        <label for="email">Correo electrónico</label>
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="usuario@salud.gob.sv"
          required
        />

        <button type="submit" class="submit-btn">Enviar instrucciones</button>
        <p v-if="success" class="success-msg">📩 Se han enviado las instrucciones a tu correo.</p>
        <p v-if="error" class="error-msg">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const success = ref(false)
const error = ref('')

function handleRecovery() {
  error.value = ''
  success.value = false

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(email.value)) {
    error.value = 'Por favor ingresa un correo válido.'
    return
  }

  // Simular que el correo existe en el sistema
  if (email.value.toLowerCase() === 'admin@salud.gob.sv') {
    success.value = true
    error.value = ''
    email.value = ''
  } else {
    error.value = 'El correo no se encuentra registrado.'
  }
}
</script>

<style scoped>
.recovery-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #eef2ff;
}

.recovery-box {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  width: 350px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

input {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.submit-btn {
  width: 100%;
  background-color: #5b86f0;
  color: white;
  border: none;
  padding: 0.7rem;
  border-radius: 10px;
  font-weight: bold;
  margin-top: 0.5rem;
}

.success-msg {
  color: #1ed795;
  font-weight: bold;
  margin-top: 1rem;
}

.error-msg {
  color: #e63946;
  font-weight: bold;
  margin-top: 1rem;
}
</style>
