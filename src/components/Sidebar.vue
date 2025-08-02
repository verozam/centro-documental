<template>
  <div class="sidebar">
    <h3>Centro Documental</h3>
    <ul>
      <li @click="go('/admin/home')">🏠 Inicio</li>
      <li @click="go('/admin/documents')">📄 Documentos</li>
      <li @click="go('/admin/users')">👥 Usuarios</li>
      <li @click="go('/admin/reports')">📊 Reportes</li>
    </ul>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function go(path) {
  router.push(path)
}
</script>

<style scoped>
.sidebar {
  background-color: #2e3a59;
  color: white;
  width: 200px;
  height: 100vh;
  padding: 1rem;
}

.sidebar h3 {
  margin-bottom: 2rem;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  cursor: pointer;
  margin: 1rem 0;
  font-weight: bold;
}

.sidebar li:hover {
  text-decoration: underline;
}
</style>
