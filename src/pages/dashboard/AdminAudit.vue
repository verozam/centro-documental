<template>
  <div class="audit-container">
    <div class="page-header">
      <div class="page-title-wrapper">
        <svg-icon type="mdi" :path="mdiFileDocument" class="title-icon"></svg-icon>
        <h2 class="page-title">Auditoría del sistema</h2>
      </div>
      <div class="header-actions">
        <button class="back-btn" @click="goBack">
          <svg-icon type="mdi" :path="mdiArrowLeft" class="btn-icon"></svg-icon>
          Regresar
        </button>
      </div>
    </div>

    <div class="filter-section">
      <div class="filter-group">
        <div class="filter-field">
          <label for="date-filter">Fecha</label>
          <select id="date-filter" v-model="filters.date">
            <option value="">Buscar por fecha</option>
            <option value="25/02/2024">25/02/2024</option>
          </select>
        </div>
        <div class="filter-field">
          <label for="user-filter">Usuario</label>
          <select id="user-filter" v-model="filters.user">
            <option value="">Buscar por usuario</option>
            <option value="Juan Oscar Perez Benítez">Juan Oscar Perez Benítez</option>
            <option value="Maria Karla Martinez">Maria Karla Martinez</option>
            <option value="Luis Eduardo Hernandez">Luis Eduardo Hernandez</option>
          </select>
        </div>
        <div class="filter-field">
          <label for="event-filter">Evento</label>
          <select id="event-filter" v-model="filters.event">
            <option value="">Buscar por evento</option>
            <option value="Documento visualizado">Documento visualizado</option>
            <option value="Usuario conectado">Usuario conectado</option>
            <option value="Usuario desconectado">Usuario desconectado</option>
          </select>
        </div>
        <div class="action-buttons">
          <button class="search-btn" @click="applyFilters">
            <svg-icon type="mdi" :path="mdiMagnify"></svg-icon>
            Buscar
          </button>
          <button class="clear-btn" @click="clearFilters"><svg-icon type="mdi" :path="mdiBroom"></svg-icon>Limpiar</button>
          <button class="report-btn" @click="generateReport">
            <svg-icon type="mdi" :path="mdiFileExport"></svg-icon>
            Generar reporte
          </button>
        </div>
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
              <th @click="sortBy('fecha')">Fecha y hora <svg-icon type="mdi" :path="mdiSwapVertical"></svg-icon></th>
              <th @click="sortBy('usuario')">Usuario <svg-icon type="mdi" :path="mdiSwapVertical"></svg-icon></th>
              <th @click="sortBy('evento')">Evento <svg-icon type="mdi" :path="mdiSwapVertical"></svg-icon></th>
              <th @click="sortBy('objetivo')">Objetivo <svg-icon type="mdi" :path="mdiSwapVertical"></svg-icon></th>
              <th @click="sortBy('ip')">IP <svg-icon type="mdi" :path="mdiSwapVertical"></svg-icon></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="log in paginatedLogs" :key="log.id">
              <td>{{ log.fecha }} {{ log.hora }}</td>
              <td>{{ log.usuario }}</td>
              <td>{{ log.evento }}</td>
              <td>{{ log.objetivo }}</td>
              <td>{{ log.ip }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="pagination-footer">
        <div class="pagination-info">
          <span class="rows-per-page">Filas por página:</span>
          <select v-model="rowsPerPage">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <span class="info-text">{{ paginationInfo }}</span>
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
  mdiFileDocument,
  mdiArrowLeft,
  mdiMagnify,
  mdiFileExport,
  mdiSwapVertical,
  mdiBroom,
} from '@mdi/js';

const router = useRouter();

const auditLogs = ref([
  { id: 1, fecha: '02/07/2025', hora: '18:59', usuario: 'Juan Oscar Perez Benítez', evento: 'Documento visualizado', objetivo: 'Documento: Plan nacional para la prevención, el control y la eliminación de las enfermedades tropicales priorizadas en El Salvador 2024-2026', ip: '12.234.123.0' },
  { id: 2, fecha: '02/07/2025', hora: '18:59', usuario: 'Mario Alexander Lopez', evento: 'Usuario conectado', objetivo: '', ip: '12.234.123.0' },
  { id: 3, fecha: '02/07/2025', hora: '18:59', usuario: 'Luis Eduardo Hernandez', evento: 'Documento visualizado', objetivo: 'Documento: leyes', ip: '12.234.123.0' },
  { id: 4, fecha: '02/07/2025', hora: '18:59', usuario: 'Juan Oscar Perez Benítez', evento: 'Usuario desconectado', objetivo: '', ip: '12.234.123.0' },
  { id: 5, fecha: '02/07/2025', hora: '18:59', usuario: 'Maria Karla Martinez', evento: 'Documento visualizado', objetivo: 'Documento: leyes', ip: '12.234.123.0' },
  // Agrega más datos de auditoría para la demostración
]);

const filters = ref({
  date: '',
  user: '',
  event: ''
});

const sortByField = ref('fecha');
const sortDirection = ref('asc');
const currentPage = ref(1);
const rowsPerPage = ref(5);

const filteredLogs = computed(() => {
  let filtered = auditLogs.value.filter(log => {
    return (filters.value.date === '' || log.fecha === filters.value.date) &&
           (filters.value.user === '' || log.usuario === filters.value.user) &&
           (filters.value.event === '' || log.evento === filters.value.event);
  });

  return filtered.sort((a, b) => {
    const aValue = a[sortByField.value];
    const bValue = b[sortByField.value];
    if (aValue < bValue) return sortDirection.value === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection.value === 'asc' ? 1 : -1;
    return 0;
  });
});

const paginatedLogs = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value;
  const end = start + rowsPerPage.value;
  return filteredLogs.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredLogs.value.length / rowsPerPage.value);
});

const paginationInfo = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value + 1;
  const end = Math.min(start + rowsPerPage.value - 1, filteredLogs.value.length);
  return `${start}-${end} de ${filteredLogs.value.length}`;
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

const applyFilters = () => {
  // Lógica para aplicar los filtros, ya está manejada por la propiedad computada
  currentPage.value = 1; // Reinicia la paginación al aplicar filtros
};

const clearFilters = () => {
  filters.value = { date: '', user: '', event: '' };
  currentPage.value = 1; // Reinicia la paginación
};

const generateReport = () => {
  alert('Generando reporte...');
  // Lógica para generar el reporte
};

const goBack = () => {
  router.back();
};
</script>

<style scoped>
.audit-container {
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
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.filter-group {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 1rem;
}

.filter-field {
  display: flex;
  flex-direction: column;
}

.filter-field label {
  font-size: 0.8rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.filter-field select {
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #f9fafb;
  font-size: 0.9rem;
  color: #4b5563;
  min-width: 150px;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.search-btn, .clear-btn, .report-btn {
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: background-color 0.2s;
}

.search-btn {
  background-color: #2d68ff;
  color: white;
}

.search-btn:hover {
  background-color: #1e56e0;
}

.clear-btn {
  background-color: #d1d5db;
  color: #4b5563;
}

.clear-btn:hover {
  background-color: #b3b7bd;
}

.report-btn {
  background-color: #007bff;
  color: white;
}

.report-btn:hover {
  background-color: #0056b3;
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

.pagination-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
  font-size: 0.9rem;
  color: #4b5563;
}

.pagination-footer .pagination-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pagination-footer .rows-per-page {
  margin-right: 0.5rem;
}

.pagination-footer select {
  border: 1px solid #d1d5db;
  border-radius: 4px;
  padding: 0.25rem;
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
  color: #4b5563;
}

.pagination-controls button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.pagination-controls .page-number.active {
  background-color: #2d68ff;
  color: white;
}
</style>