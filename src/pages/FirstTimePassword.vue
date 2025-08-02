<template>
  <div class="password-container">
    <div class="password-box">
      <img src="@/assets/minsal-logo.png" alt="MINSAL Logo" class="minsal-logo" />
      <h2 class="verify-title">Inicio de sesión por primera vez</h2>
      <p class="verify-instructions">Por favor, establezca su nueva contraseña para ingresar al sistema.</p>

      <form @submit.prevent="handleUpdate">
        <!-- Nueva contraseña -->
        <div class="input-wrapper">
          <input
            :type="showPassword ? 'text' : 'password'"
            id="password"
            v-model="password"
            required
            placeholder="Nueva contraseña"
          />
          <button type="button" @click="showPassword = !showPassword">
            {{ showPassword ? '🙈' : '👁️' }}
          </button>
        </div>

        <!-- Confirmar contraseña -->
        <div class="input-wrapper">
          <input
            :type="showConfirm ? 'text' : 'password'"
            id="confirmPassword"
            v-model="confirmPassword"
            required
            placeholder="Confirmar contraseña"
          />
          <button type="button" @click="showConfirm = !showConfirm">
            {{ showConfirm ? '🙈' : '👁️' }}
          </button>
        </div>

        <button type="submit" class="submit-btn">Actualizar</button>

        <p v-if="error" class="error-msg">{{ error }}</p>
        <p v-if="success" class="success-msg">✅ Contraseña actualizada correctamente</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirm = ref(false)
const error = ref('')
const success = ref(false)

function handleUpdate() {
  error.value = ''
  success.value = false

  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#%&/?!.,*-_])[A-Za-z\d@$#%&/?!.,*-_]{8,}$/

  if (!regex.test(password.value)) {
    error.value =
      'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.'
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'Las contraseñas no coinciden.'
    return
  }

  // Simulación de éxito
  success.value = true
  error.value = ''
  setTimeout(() => {
    router.push('/admin/home') // Redirige al dashboard
  }, 1000)
}
</script>

<style scoped>
.password-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.password-box {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  width: 350px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.input-wrapper {
  position: relative;
  margin-bottom: 1rem;
}

input {
  width: 100%;
  padding: 0.6rem;
  padding-right: 2.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

button[type='button'] {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}

.submit-btn {
  width: 100%;
  background-color: #5b86f0;
  color: white;
  border: none;
  padding: 0.7rem;
  border-radius: 10px;
  font-weight: bold;
  margin-top: 1rem;
}

.error-msg {
  color: #e63946;
  margin-top: 1rem;
  font-size: 0.5rem;
  font-weight: bold;
}

.success-msg {
  color: #1ed795;
  margin-top: 1rem;
  font-weight: bold;
}

.minsal-logo {
  height: 80px;
  display: block;
  margin: 0 auto 1rem auto;
}
.log-title {
  color: #333A45;
  font-weight: bold;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1.5rem;
}

.verify-title {
  color: #333A45;
  font-weight: bold;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1.2rem;
}
.verify-instructions {
  font-size: 0.5rem;
  font-weight: bold;
  color: #23272f;
  margin-bottom: 1.2rem;
}
</style>
