<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import DefaultLayout from './layouts/DefaultLayout.vue'
import DashboardLayout from './layouts/DashboardLayout.vue'

const route = useRoute()

// Detectar si ruta es dashboard
const layout = computed(() => {
  return route.path.startsWith('/admin') ? DashboardLayout : DefaultLayout
})
</script>
