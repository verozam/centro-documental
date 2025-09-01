<template>
  <div class="sites-of-interest-container">
    <div class="page-header">
      <div class="page-title-wrapper">
        <h2 class="page-title">
            <svg-icon type="mdi" :path="mdiBookmarkMultiple" class="title-icon"></svg-icon>
            Sitios de interés</h2>
      </div>
      <div class="header-actions">
        <button class="back-btn" @click="goBack">
          <svg-icon type="mdi" :path="mdiArrowLeft" class="btn-icon"></svg-icon>
          Regresar
        </button>
      </div>
    </div>

    <div class="filter-section">
      <div class="search-box">
        <input type="text" placeholder="Buscar sitio de interés" v-model="searchQuery" />
        <svg-icon type="mdi" :path="mdiMagnify" class="search-icon"></svg-icon>
      </div>
    </div>

    <div class="sites-grid">
      <a v-for="site in filteredSites" :key="site.id" :href="site.url" target="_blank" class="site-card">
        <div class="card-icon">
          <svg-icon type="mdi" :path="mdiWeb"></svg-icon>
        </div>
        <div class="card-content">
          <h3 class="card-title">{{ site.title }}</h3>
          <p class="card-description">{{ site.description }}</p>
          <span class="card-url">{{ site.url }}</span>
        </div>
        <div class="card-action">
          <svg-icon type="mdi" :path="mdiOpenInNew"></svg-icon>
        </div>
      </a>
    </div>

    <div v-if="filteredSites.length === 0" class="no-results">
      <p>No se encontraron sitios de interés que coincidan con la búsqueda.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import SvgIcon from '@jamescoyle/vue-icon';
import {
  mdiMapMarkerMultiple,
  mdiBookmarkMultiple,
  mdiArrowLeft,
  mdiMagnify,
  mdiWeb,
  mdiOpenInNew,
} from '@mdi/js';

const router = useRouter();

const sites = ref([
  {
    id: 1,
    title: 'Ministerio de Salud',
    description: 'Página oficial del Ministerio de Salud de El Salvador.',
    url: 'https://www.salud.gob.sv'
  },
  {
    id: 2,
    title: 'Ley del Ministerio de Salud',
    description: 'Documento legal que rige las operaciones del MINSAL.',
    url: 'https://www.salud.gob.sv/ley-minsal'
  },
  {
    id: 3,
    title: 'Organización Panamericana de la Salud',
    description: 'Organización internacional de salud pública.',
    url: 'https://www.paho.org'
  },
  {
    id: 4,
    title: 'Organización Mundial de la Salud',
    description: 'Agencia especializada en salud de las Naciones Unidas.',
    url: 'https://www.who.int'
  }
]);

const searchQuery = ref('');

const filteredSites = computed(() => {
  return sites.value.filter(site => {
    const query = searchQuery.value.toLowerCase();
    return site.title.toLowerCase().includes(query) ||
           site.description.toLowerCase().includes(query) ||
           site.url.toLowerCase().includes(query);
  });
});

const goBack = () => {
  router.back();
};
</script>

<style scoped>
.sites-of-interest-container {
  padding: 2rem;
  background-color: #f1f5f9;
  min-height: 100vh;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.page-title-wrapper {
  display: flex;
  align-items: center;
}

.page-title {
  font-size: 1.5rem;
  color: #4b5563;
  margin: 0;
}

.title-icon {
  width: 24px;
  height: 24px;
  fill: #2d68ff;
  margin-right: 0.5rem;
}

.header-actions {
  display: flex;
  gap: 1rem;
}

.back-btn {
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: background-color 0.2s;
  background-color: transparent;
  border: 1px solid #d1d5db;
  color: #4b5563;
}

.back-btn:hover {
  background-color: #e5e7eb;
}

.btn-icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

.filter-section {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.5rem;
}

.search-box {
  position: relative;
  width: 100%;
  max-width: 800px;
}

.search-box input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: white;
  font-size: 1rem;
}

.search-box .search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  fill: #9ca3af;
  width: 20px;
  height: 20px;
}

.sites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.site-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s, box-shadow 0.2s;
  text-decoration: none;
  color: inherit;
}

.site-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.card-icon {
  width: 48px;
  height: 48px;
  background-color: #e3f2fd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-icon svg {
  fill: #2d68ff;
  width: 28px;
  height: 28px;
}

.card-content {
  flex-grow: 1;
}

.card-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: #4b5563;
  margin: 0 0 0.25rem 0;
}

.card-description {
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
}

.card-url {
  font-size: 0.8rem;
  color: #9ca3af;
  margin-top: 0.5rem;
  display: block;
}

.card-action svg {
  fill: #2d68ff;
  width: 24px;
  height: 24px;
}

.no-results {
  text-align: center;
  font-size: 1rem;
  color: #6b7280;
  margin-top: 2rem;
}
</style>