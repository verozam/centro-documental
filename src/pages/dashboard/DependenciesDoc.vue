<template>
  <div class="dependencies-container">
    <div class="page-header">
      <div class="page-title-wrapper">        
        <h2 class="page-title">
          <svg-icon type="mdi" :path="mdiOfficeBuildingMarker" class="title-icon"></svg-icon>
          Listado de dependencias y establecimientos</h2>
      </div>
      <div class="header-actions">
        <button class="back-btn" @click="goBack">
          <svg-icon type="mdi" :path="mdiArrowLeft" class="btn-icon"></svg-icon>
          Regresar
        </button>
        <button class="sync-btn" @click="syncData">
          <svg-icon type="mdi" :path="mdiSync"></svg-icon>
          Sincronizar catálogo de dependencias y establecimientos
        </button>
      </div>
    </div>

    <div class="filter-section">
      <div class="search-box">
        <input type="text" placeholder="Buscar dependencia o establecimiento" v-model="searchQuery" />
        <svg-icon type="mdi" :path="mdiMagnify" class="search-icon"></svg-icon>
      </div>
    </div>

    <div class="results-card">
      <div class="results-header">
        <h3 class="results-title">Lista de resultados</h3>
      </div>
      <div class="results-table-container">
        <table class="results-table">
          <thead>
            <tr>
              <th @click="sortBy('nombre')">Nombre <svg-icon type="mdi" :path="mdiSwapVertical"></svg-icon></th>
              <th @click="sortBy('tipoUnidad')">Tipo de unidad organizativa <svg-icon type="mdi" :path="mdiSwapVertical"></svg-icon></th>
              <th @click="sortBy('region')">Región <svg-icon type="mdi" :path="mdiSwapVertical"></svg-icon></th>
              <th @click="sortBy('estado')">Estado <svg-icon type="mdi" :path="mdiSwapVertical"></svg-icon></th>
              <th>Acciones <svg-icon type="mdi" :path="mdiSwapVertical"></svg-icon></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="dependency in paginatedDependencies" :key="dependency.id">
              <td>{{ dependency.nombre }}</td>
              <td>{{ dependency.tipoUnidad }}</td>
              <td>{{ dependency.region }}</td>
              <td>
                <span class="status-badge" :class="dependency.estado === 'Habilitado' ? 'enabled' : 'disabled'">
                  {{ dependency.estado }}
                </span>
              </td>
              <td>
                <div class="action-buttons">
                  <button class="action-btn delete-btn"><svg-icon type="mdi" :path="mdiCloseCircle"></svg-icon></button>
                  <button class="action-btn view-btn"><svg-icon type="mdi" :path="mdiEye"></svg-icon></button>
                  <button class="action-btn edit-btn"><svg-icon type="mdi" :path="mdiPencil"></svg-icon></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="pagination-footer">
        <div class="rows-per-page">
          <span>Filas por página:</span>
          <select v-model="rowsPerPage">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
        <div class="pagination-info">
          <span>{{ paginationInfo }}</span>
        </div>
        <div class="pagination-controls">
          <button @click="prevPage" :disabled="currentPage === 1"><</button>
          <span class="page-number" :class="{ 'active': page === currentPage }" v-for="page in totalPages" :key="page" @click="goToPage(page)">{{ page }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages">></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import SvgIcon from '@jamescoyle/vue-icon';
import {
  mdiOfficeBuildingMarker,
  mdiArrowLeft,
  mdiSync,
  mdiMagnify,
  mdiSwapVertical,
  mdiEye,
  mdiPencil,
  mdiCloseCircle,
} from '@mdi/js';

const router = useRouter();

const dependencies = ref([
  { id: 1, nombre: 'Despacho Ministerial', tipoUnidad: 'Dependencia', region: 'Dirección Regional de Salud Paracentral', estado: 'Habilitado' },
  { id: 2, nombre: 'Dirección de Monitoreo Estratégico de Servicios de Salud', tipoUnidad: 'Dependencia', region: 'Dirección Regional de Salud Oriental', estado: 'Deshabilitado' },
  { id: 3, nombre: 'Viceministerio de Gestión y Desarrollo en Salud', tipoUnidad: 'Establecimiento', region: 'Dirección Regional de Salud Metropolitana', estado: 'Habilitado' },
  { id: 4, nombre: 'Dirección de Regulación', tipoUnidad: 'Dependencia', region: 'Dirección Regional de Salud Central', estado: 'Habilitado' },
  { id: 5, nombre: 'Gerencia General', tipoUnidad: 'Dependencia', region: 'Dirección Regional de Salud Occidental', estado: 'Habilitado' },
  // Agrega más datos de dependencias según necesites
]);

const searchQuery = ref('');
const sortByField = ref('nombre');
const sortDirection = ref('asc');
const currentPage = ref(1);
const rowsPerPage = ref(5);

const filteredDependencies = computed(() => {
  let filtered = dependencies.value.filter(dep => {
    const query = searchQuery.value.toLowerCase();
    return dep.nombre.toLowerCase().includes(query) ||
           dep.tipoUnidad.toLowerCase().includes(query) ||
           dep.region.toLowerCase().includes(query) ||
           dep.estado.toLowerCase().includes(query);
  });

  return filtered.sort((a, b) => {
    const aValue = a[sortByField.value];
    const bValue = b[sortByField.value];
    if (aValue < bValue) return sortDirection.value === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection.value === 'asc' ? 1 : -1;
    return 0;
  });
});

const paginatedDependencies = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value;
  const end = start + rowsPerPage.value;
  return filteredDependencies.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredDependencies.value.length / rowsPerPage.value);
});

const paginationInfo = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value + 1;
  const end = Math.min(start + rowsPerPage.value - 1, filteredDependencies.value.length);
  return `Filas por página: ${rowsPerPage.value}  ${start}-${end} de ${filteredDependencies.value.length}`;
});

const sortBy = (field) => {
  if (sortByField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortByField.value = field;
    sortDirection.value = 'asc';
  }
};

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const goBack = () => {
  router.back();
};

const syncData = () => {
  alert('Sincronizando catálogo de dependencias...');
  // Aquí puedes agregar la lógica para llamar a tu API
};
</script>

<style scoped>
.dependencies-container {
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

.back-btn, .sync-btn {
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: background-color 0.2s;
}

.back-btn {
  background-color: transparent;
  border: 1px solid #d1d5db;
  color: #4b5563;
}

.back-btn:hover {
  background-color: #e5e7eb;
}

.sync-btn {
  background-color: transparent;
  color: #4b5563;
  border: 1px solid #d1d5db;
}

.sync-btn:hover {
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
  width: 800px;
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

.results-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.results-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.results-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #4b5563;
  margin: 0;
}

.results-table-container {
  overflow-x: auto;
}

.results-table {
  width: 100%;
  border-collapse: collapse;
}

.results-table thead tr th {
  background-color: #2d68ff;
  color: white;
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 500;
  cursor: pointer;
}

.results-table thead tr th svg {
  vertical-align: middle;
  fill: white;
  width: 16px;
  height: 16px;
  margin-left: 0.25rem;
}

.results-table tbody tr {
  border-bottom: 1px solid #e5e7eb;
}

.results-table tbody tr:last-child {
  border-bottom: none;
}

.results-table tbody tr td {
  padding: 1rem;
  font-size: 0.9rem;
  color: #4b5563;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-weight: 500;
  font-size: 0.8rem;
}

.status-badge.enabled {
  background-color: #d1f7e0;
  color: #17a655;
}

.status-badge.disabled {
  background-color: #f2c7c7;
  color: #f25c5c;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.action-btn {
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0.25rem;
}

.action-btn svg {
  width: 20px;
  height: 20px;
}

.view-btn svg { fill: #2d68ff; }
.edit-btn svg { fill: #f2a61e; }
.delete-btn svg { fill: #f25c5c; }

.pagination-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
  font-size: 0.9rem;
  color: #4b5563;
}

.pagination-footer .rows-per-page {
  margin-right: auto;
}

.pagination-footer .pagination-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pagination-controls button,
.pagination-controls .page-number {
  background-color: transparent;
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.pagination-controls .page-number.active {
  background-color: #2d68ff;
  color: white;
}
</style>