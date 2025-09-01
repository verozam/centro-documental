<template>
  <div
    class="sidebar"
    @mouseenter="isExpanded = true"
    @mouseleave="isExpanded = false"
    :class="{ expanded: isExpanded }"
  >
    <div class="sidebar-header">
<!--      <img src="@/assets/Logo MINSAL.svg" alt="MINSAL" class="header-logo" v-show="isExpanded"> -->
      <h3 v-show="isExpanded">Centro Documental</h3>
    </div>

    <ul class="menu-options-area">
      <li @click="go('/admin/home')">
        <svg-icon type="mdi" :path="mdiHome" class="menu-icon"></svg-icon>
        <span v-show="isExpanded">Dashboard</span>
      </li>
      <li @click="go('/admin/sitios-interes')">
        <svg-icon type="mdi" :path="mdiBookmarkMultiple" class="menu-icon"></svg-icon>
        <span v-show="isExpanded">Sitios de interés</span>
      </li>
      <li @click="go('/admin/documents')">
        <svg-icon type="mdi" :path="mdiFileDocument" class="menu-icon"></svg-icon>
        <span v-show="isExpanded">Documentos</span>
      </li>
      <li @click="go('/admin/documents-public')">
        <svg-icon type="mdi" :path="mdiFileDocumentMultiple" class="menu-icon"></svg-icon>
        <span v-show="isExpanded">Documentos para vista<br/>pública</span>
      </li>
      <li @click="go('/admin/copia-controlada')">
        <svg-icon type="mdi" :path="mdiPrinter" class="menu-icon"></svg-icon>
        <span v-show="isExpanded">Copia controlada</span>
      </li>
      
      <li @click="toggleDropdown('clasificacion')" :class="{ 'has-submenu': true, active: activeDropdown === 'clasificacion' }">
        <div class="menu-item-content">
          <svg-icon type="mdi" :path="mdiFolder" class="menu-icon"></svg-icon>
          <span v-show="isExpanded">Clasificación de <br/>documentos</span>
          <svg-icon
            type="mdi"
            :path="activeDropdown === 'clasificacion' ? mdiChevronUp : mdiChevronDown"
            class="dropdown-icon"
            v-show="isExpanded"
          ></svg-icon>
        </div>
      </li>
      <ul v-show="isExpanded && activeDropdown === 'clasificacion'" class="submenu">
        <li @click="go('/admin/categorias')">
          <svg-icon type="mdi" :path="mdiChevronRightBoxOutline" class="submenu-icon"></svg-icon>
          <span>Categorías</span>
        </li>
        <li @click="go('/admin/subcategorias')">
          <svg-icon type="mdi" :path="mdiBriefcaseArrowUpDownOutline" class="submenu-icon"></svg-icon>
          <span>Subcategorías</span>
        </li>
      </ul>

      <li @click="go('/admin/users')">
        <svg-icon type="mdi" :path="mdiAccountGroup" class="menu-icon"></svg-icon>
        <span v-show="isExpanded">Usuarios</span>
      </li>
      <li @click="go('/admin/tipos-documentos')">
        <svg-icon type="mdi" :path="mdiFileCode" class="menu-icon"></svg-icon>
        <span v-show="isExpanded">Tipos de documentos</span>
      </li>
      <li @click="go('/admin/dependencias')">
        <svg-icon type="mdi" :path="mdiHomeCity" class="menu-icon"></svg-icon>
        <span v-show="isExpanded">Dependencias y <br/>establecimientos</span>
      </li>
      <li @click="go('/admin/auditoria')">
        <svg-icon type="mdi" :path="mdiFormatListChecks" class="menu-icon"></svg-icon>
        <span v-show="isExpanded">Auditoría del sistema</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import SvgIcon from '@jamescoyle/vue-icon';
import {
  mdiHome,
  mdiFileDocument,
  mdiAccountGroup,
  mdiFileDocumentMultiple,
  mdiPrinter,
  mdiFolder,
  mdiChevronDown,
  mdiChevronUp,
  mdiChevronRight,
  mdiBookmarkMultiple,
  mdiFileCode,
  mdiHomeCity,
  mdiFormatListChecks,
  mdiChevronRightBoxOutline,
  mdiBriefcaseArrowUpDownOutline 
} from '@mdi/js';

const router = useRouter();

const isExpanded = ref(false);
const activeDropdown = ref(null);

const go = (path) => {
  router.push(path);
};

const toggleDropdown = (dropdownName) => {
  if (activeDropdown.value === dropdownName) {
    activeDropdown.value = null;
  } else {
    activeDropdown.value = dropdownName;
  }
};
</script>

<style scoped>
.sidebar {
  background-color: #2d52a8;
  color: white;
  width: 80px; /* Ancho por defecto (contraído) */
  min-height: 100vh;
  padding: 1rem;
  transition: width 0.3s ease;
  overflow: hidden;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
}

.sidebar.expanded {
  width: 240px; /* Ancho cuando está expandido */
}

.sidebar-header {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  white-space: nowrap;
}

.header-logo {
  height: 40px;
  margin-right: 10px;
}

.sidebar h3 {
  margin: 0;
  font-weight: bold;
}

.menu-options-area {
  list-style: none;
  padding: 0;
}

.sidebar li {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.75rem 0.5rem;
  margin: 0.5rem 0;
  white-space: nowrap;
  font-weight: bold;
  border-radius: 5px;
  transition: background-color 0.2s ease;
}

.sidebar li:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.menu-icon {
  width: 24px;
  height: 24px;
  fill: white;
  margin-right: 1rem;
  flex-shrink: 0;
}

/* Estilos específicos para el submenú */
.has-submenu .menu-item-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.dropdown-icon {
  width: 24px;
  height: 24px;
  fill: white;
}

.submenu {
  list-style: none;
  padding: 0;
  margin-left: 1.5rem; /* Indentación de 25px */
}

.submenu li {
  padding-left: 0.5rem;
  font-weight: normal;
}

.submenu-icon {
  width: 20px;
  height: 20px;
  fill: white;
  margin-right: 0.5rem;
}
</style>