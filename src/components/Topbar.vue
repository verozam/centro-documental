<template>
  <div class="topbar">
    <div>👤 Bienvenido, Admin</div>
    <button @click="logout">Cerrar sesión</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function logout() {
  router.push('/login')
}
</script>

<style scoped>
.topbar {
  height: 60px;
  background-color: #f1f5f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  border-bottom: 1px solid #ccc;
}
button {
  background: #e53e3e;
  color: white;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}
</style>
