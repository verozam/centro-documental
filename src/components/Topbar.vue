<template>
  <div class="topbar">
    <div class="topbar-logo-container">
      <img src="@/assets/HEADER.svg" alt="MINSAL Logo" class="topbar-logo" />
    </div>

    <div class="user-menu-wrapper" @click="toggleMenu">
      <button class="user-info-btn">
        <span>{{ userEmail }}</span>
        <svg-icon type="mdi" :path="isMenuOpen ? mdiChevronUp : mdiChevronDown"></svg-icon>
      </button>

      <div class="user-dropdown-menu" v-show="isMenuOpen">
        <a class="dropdown-item" @click.stop="logout">Cerrar sesión</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiChevronDown, mdiChevronUp } from '@mdi/js';

const router = useRouter();

const userEmail = ref('usuario@salud.gob.sv');
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const logout = () => {
  // Aquí puedes agregar la lógica para limpiar el token de autenticación
  router.push('/login');
};
</script>

<style scoped>
.topbar {
  height: 60px;
  background-color: #2d52a8; /* Color azul */
  display: flex;
  align-items: center;
  /* CAMBIO CLAVE: empuja los elementos al extremo derecho */
  justify-content: flex-end;
  padding: 0 1.5rem;
}

.topbar-logo-container {
  /* Mantenemos el logo en el centro con un posicionamiento absoluto */
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.topbar-logo {
  height: 40px;
  filter: invert(100%) contrast(100);
}

.user-menu-wrapper {
  position: relative;
  z-index: 10;
  cursor: pointer;
  /* CAMBIO: Eliminamos cualquier margen que pueda interferir con el flexbox */
  margin-left: 0;
}

.user-info-btn {
  display: flex;
  align-items: center;
  background-color: white;
  color: #2d52a8;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
}

.user-info-btn span {
  margin-right: 0.5rem;
}

.svg-icon {
  width: 20px;
  height: 20px;
  fill: #2d52a8;
}

.user-dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  min-width: 180px;
  overflow: hidden;
}

.dropdown-item {
  display: block;
  padding: 0.75rem 1rem;
  color: #333;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.dropdown-item:hover {
  background-color: #f1f1f1;
}
</style>