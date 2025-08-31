<template>
  <div class="login-box">
    <img src="@/assets/Logo MINSAL.svg" alt="MINSAL Logo" class="minsal-logo" />
    <div class="login-title">Inicie sesión</div>
    <form @submit.prevent="handleLogin">
      <div class="input-group">
        <div class="input-wrapper">
          <svg-icon type="mdi" :path="mdiAccount" color="#000"></svg-icon>
          <input
            v-model="email"
            id="email"
            type="email"
            placeholder="Correo electrónico"
            required
          />
        </div>
      </div>

      <div class="input-group">
        <div class="input-wrapper">
          <svg-icon type="mdi" :path="mdiLock" color="#000"></svg-icon>
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            id="password"
            placeholder="Contraseña"
            required
          />
          <button type="button" @click="togglePassword" class="toggle-btn">
            <svg-icon type="mdi" :path="showPassword ? mdiEyeOff : mdiEye"></svg-icon>
          </button>
        </div>
      </div>

      <button type="submit" class="submit-btn">Ingresar</button>

      <a class="link" @click="goToPasswordRecovery">Recuperar contraseña</a>

      <div class="register-link-container">
        <div class="register-text">¿No eres miembro?</div>
        <a class="link register-link" @click="goToRegister">Regístrate</a>
      </div>

      <p v-if="error" class="error-msg">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAccount, mdiLock, mdiEye, mdiEyeOff } from "@mdi/js";

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

// Agrega una nueva función para la navegación al registro
function goToRegister() {
  // Aquí va tu lógica de navegación.
  // Por ejemplo, usando Vue Router:
  // router.push('/register')
  console.log('Navegando a la página de registro');
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

/* Iconos dentro del input-wrapper */
.input-wrapper .svg-icon {
  width: 20px;
  height: 20px;
  fill: #000 !important;
  margin: 0 0.5rem; /* Margen para separar el icono del texto */
}

.input-wrapper input {
  border: none;
  outline: none;
  flex: 1;
  padding: 0.5rem;
  background: transparent;
  font-size: 0.95rem;
}

/* Estilos para el placeholder */
.input-wrapper input::placeholder {
  color: #333;
}

.toggle-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 0.5rem;
  display: flex; /* Para alinear el icono del botón */
  align-items: center;
}

.toggle-btn .svg-icon {
  fill: #000 !important;
  width: 20px;
  height: 20px;
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


/* Contenedor para el texto y el enlace de registro */
.register-link-container {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
}

.register-link-container .register-text {
  color: #333a45; /* El color de tu título */
  margin-right: 0.25rem; /* Pequeño espacio entre el texto y el enlace */
}


</style>