<template>
  <div class="verify-container">
    <div class="verify-box">
      <img src="@/assets/minsal-logo.png" alt="MINSAL Logo" class="minsal-logo" />
      <h2 class="verify-title">Código de verificación</h2>
      <div class="verify-instructions">Escribe el código de 6 dígitos que aparece en tu aplicación:</div>

      <div class="otp-group">
        <input v-for="(digit, i) in digits" :key="i" :ref="setOtpInputRef(i)" maxlength="1" type="text" class="otp-box" v-model="digits[i]" @input="onInput(i, $event)" @keydown.backspace="onBackspace(i, $event)" />
      </div>

      <div class="verify-help">
        Si extraviaste tu código QR o tienes algún inconveniente con tu autenticador de Google, puedes solicitar un <a href="#" class="qr-link" @click.prevent="resendCode">nuevo código QR</a>
      </div>

      <button class="verify-btn" :disabled="!codeValid" @click="submitCode">
        Confirmar
      </button>

      <div class="timer">
        <span>{{ minutes < 10 ? '0' + minutes : minutes }}:{{ seconds < 10 ? '0' + seconds : seconds }} minutos</span>
      </div>

      <p v-if="success" class="success-msg">✅ Código correcto</p>
      <p v-if="error" class="error-msg">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const digits = ref(['', '', '', '', '', ''])
const error = ref('')
const success = ref(false)

const minutes = ref(2)
const seconds = ref(0)
const showResend = ref(false)
let interval = null

const codeValid = computed(() => digits.value.every(d => d.length === 1))
const router = useRouter()

function submitCode() {
  const code = digits.value.join('')
  if (code === '123456') {
    error.value = ''
    success.value = true
    setTimeout(() => {
      router.push('/first-time-password')
    }, 1000)
  } else {
    success.value = false
    error.value = 'El código ingresado no es válido'
  }
}

// OTP input focus logic
const otpInputs = ref([])
function setOtpInputRef(i) {
  return (el) => {
    otpInputs.value[i] = el
  }
}
function onInput(i, e) {
  const val = e.target.value.replace(/[^0-9]/g, '')
  digits.value[i] = val
  if (val && i < 5) {
    nextTick(() => otpInputs.value[i + 1]?.focus())
  }
}
function onBackspace(i, e) {
  if (!digits.value[i] && i > 0) {
    nextTick(() => otpInputs.value[i - 1]?.focus())
  }
}

function startTimer() {
  interval = setInterval(() => {
    if (seconds.value === 0) {
      if (minutes.value === 0) {
        clearInterval(interval)
        showResend.value = true
        return
      }
      minutes.value--
      seconds.value = 59
    } else {
      seconds.value--
    }
  }, 1000)
}

function resendCode() {
  minutes.value = 4
  seconds.value = 59
  showResend.value = false
  digits.value = ['', '', '', '', '', '']
  error.value = ''
  success.value = false
  startTimer()
  alert('Se ha reenviado un nuevo código (simulado)')
}

onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<style scoped>
.verify-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

}


.verify-box {
  background: white;
  padding: 2.2rem 2rem 2.5rem 2rem;
  border-radius: 15px;
  width: 410px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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

.otp-group {
  display: flex;
  justify-content: center;
  gap: 0.7rem;
  margin-bottom: 1.1rem;
}

.otp-box {
  width: 40px;
  height: 50px;
  font-size: 1.1rem;
  text-align: center;
  border: 1px solid #e3e6ee;
  border-radius: 10px;
  background: #f8fafd;
  outline: none;
  font-weight: bold;
  color: #23272f;
  transition: border 0.2s;
}
.otp-box:focus {
  border: 2px solid #2D52A8;
}

.verify-help {
  font-size: 0.5rem;
  font-weight: bold;
  color: #23272f;
  margin-bottom: 1.3rem;
}
.qr-link {
  color: #2D52A8;
  text-decoration: underline;
  font-weight: bold;
  cursor: pointer;
}

.verify-btn {
  background-color: #2D52A8;
  color: white;
  padding: 0.7rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  margin-bottom: 1.2rem;
  box-shadow: 0 2px 8px rgba(45, 82, 168, 0.08);
  transition: background 0.2s;
}
.verify-btn:disabled {
  background-color: #a0a0a0;
  cursor: not-allowed;
}

.timer {
  color: #333a45;
  font-weight: bold;
  font-size: 0.7rem;
  margin-bottom: 0.7rem;
}

.otp-input {
  padding: 0.8rem;
  font-size: 1.5rem;
  letter-spacing: 0.5rem;
  text-align: center;
  width: 200px;
  margin: 1rem 0;
}

button {
  background-color: #5b86f0;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  margin-bottom: 1rem;
}

button:disabled {
  background-color: #a0a0a0;
  cursor: not-allowed;
}

.timer {
  color: #333a45;
  font-weight: bold;
}

a {
  color: #5b86f0;
  cursor: pointer;
  text-decoration: underline;
  font-weight: bold;
}

.error-msg {
  color: #e63946;
  margin-top: 1rem;
  font-weight: bold;
}

.success-msg {
  color: #1ED795;
  margin-top: 1rem;
  font-weight: bold;
}

.log-title {
  color: #333A45;
  font-weight: bold;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1.5rem;
}

.minsal-logo {
  height: 80px;
  display: block;
  margin: 0 auto 1rem auto;
}
</style>
