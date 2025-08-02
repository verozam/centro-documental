<template>
  <div class="login-box">
    <img src="@/assets/minsal-logo.png" alt="MINSAL Logo" class="minsal-logo" />
    <div class="login-title">Inicie sesión</div>
    <form @submit.prevent="handleLogin">
      <div class="input-group">
        <label for="email">Correo electrónico</label>
        <div class="input-wrapper">
          <span class="icon">👤</span>
          <input
            v-model="email"
            id="email"
            type="email"
            placeholder="usuario@salud.gob.sv"
            required
          />
        </div>
      </div>

      <div class="input-group">
        <label for="password">Contraseña</label>
        <div class="input-wrapper">
          <span class="icon">🔒</span>
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            id="password"
            placeholder="********"
            required
          />
          <button type="button" @click="togglePassword" class="toggle-btn">

          </button>
        </div>
      </div>

      <button type="submit" class="submit-btn">Ingresar</button>

      <a class="link" @click="goToPasswordRecovery">Recuperar contraseña</a>

      <p v-if="error" class="error-msg">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const error = ref('')

const router = useRouter()

function togglePassword() {
  showPassword.value = !showPassword.value
}

function handleLogin() {
  if (!email.value || !password.value) {
    error.value = 'Debes completar todos los campos'
    return
  }

  if (
    email.value.toLowerCase() === 'admin@salud.gob.sv' &&
    password.value === 'admin123'
  ) {
    error.value = ''
    router.push('/verify-code') // Mockeado
  } else {
    error.value = 'Credenciales incorrectas'
  }
}

function goToPasswordRecovery() {
  router.push('/password-recovery')
}
</script>

<style scoped>
.login-box {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  width: 100%;
  max-width: 360px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #2e3a59;
}

.input-group {
  margin-bottom: 1.2rem;
}

.input-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 0.5rem;
  background: #f9f9f9;
}

.input-wrapper input {
  border: none;
  outline: none;
  flex: 1;
  padding: 0.5rem;
  background: transparent;
  font-size: 0.95rem;
}

.icon {
  margin-right: 0.5rem;
  font-size: 1.1rem;
}

.toggle-btn {
  background: transparent;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  margin-left: 0.5rem;
}

.submit-btn {
  width: 100%;
  background-color: #2e68ff;
  color: white;
  border: none;
  padding: 0.7rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: background 0.2s;
}

.submit-btn:hover {
  background-color: #1e4fcc;
}

.link {
  display: block;
  margin-top: 1rem;
  color: #2e68ff;
  text-align: center;
  text-decoration: underline;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.9rem;
}

.error-msg {
  color: #e63946;
  margin-top: 1rem;
  font-weight: bold;
  text-align: center;
}

.minsal-logo {
  height: 80px;
  display: block;
  margin: 0 auto 1rem auto;
}

.login-title {
  color: #333A45;
  font-weight: bold;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1.5rem;
}
</style>
