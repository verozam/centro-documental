<template>
  <div class="list-users-container">
    <div class="page-header">
      <div class="page-title-wrapper">
        <h2 class="page-title"> 
          <svg-icon type="mdi" :path="mdiAccountGroup" class="title-icon"></svg-icon> 
          Listado de usuarios
        </h2>
      </div>
      <div class="header-actions">
        <button class="back-btn" @click="goBack">
          <svg-icon type="mdi" :path="mdiArrowLeft" class="btn-icon"></svg-icon>
          Regresar
        </button>
        <button class="add-user-btn" @click="go('/admin/adduser')">
          <svg-icon type="mdi" :path="mdiAccountPlus" class="btn-icon"></svg-icon>
          Agregar usuario
        </button>
      </div>
    </div>

    <div class="filter-section">
      <div class="search-box">
        <input type="text" placeholder="Buscar en la tabla" v-model="searchQuery" />
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
              <th @click="sortBy('nombres')">Nombres <svg-icon type="mdi" :path="mdiSwapVertical"></svg-icon></th>
              <th @click="sortBy('apellidos')">Apellidos <svg-icon type="mdi" :path="mdiSwapVertical"></svg-icon></th>
              <th @click="sortBy('rol')">Rol <svg-icon type="mdi" :path="mdiSwapVertical"></svg-icon></th>
              <th @click="sortBy('correo')">Correo electrónico <svg-icon type="mdi" :path="mdiSwapVertical"></svg-icon></th>
              <th @click="sortBy('telefono')">Teléfono de contacto <svg-icon type="mdi" :path="mdiSwapVertical"></svg-icon></th>
              <th @click="sortBy('estado')">Estado <svg-icon type="mdi" :path="mdiSwapVertical"></svg-icon></th>
              <th>Acciones <svg-icon type="mdi" :path="mdiSwapVertical"></svg-icon></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in paginatedUsers" :key="user.id">
              <td>{{ user.nombres }}</td>
              <td>{{ user.apellidos }}</td>
              <td>{{ user.rol }}</td>
              <td>{{ user.correo }}</td>
              <td>{{ user.telefono }}</td>
              <td>
                <span class="status-badge" :class="user.estado === 'Habilitado' ? 'enabled' : 'disabled'">
                  {{ user.estado }}
                </span>
              </td>
              <td>
                <div class="action-buttons">
                  <button class="action-btn delete-btn"><svg-icon type="mdi" :path="mdiCloseCircle"></svg-icon></button>
                  <button class="action-btn view-btn"><svg-icon type="mdi" :path="mdiEye"></svg-icon></button>
                  <button class="action-btn edit-btn" @click="go('/admin/edituser')"><svg-icon type="mdi" :path="mdiPencil"></svg-icon></button>
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
  mdiAccountGroup,
  mdiArrowLeft,
  mdiAccountPlus,
  mdiMagnify,
  mdiSwapVertical,
  mdiEye,
  mdiPencil,
  mdiCloseCircle,
} from '@mdi/js';

const router = useRouter();

const users = ref([
  { id: 1, nombres: 'Juan', apellidos: 'Pérez', rol: 'Motorista', correo: 'jperez@dominio.gob.sv', telefono: '####-####', estado: 'Deshabilitado' },
  { id: 2, nombres: 'Marta', apellidos: 'Gomez', rol: 'Administrador', correo: 'mgomez@dominio.gob.sv', telefono: '####-####', estado: 'Habilitado' },
  { id: 3, nombres: 'Jose', apellidos: 'Hernandez', rol: 'Consultor', correo: 'jhernandez@dominio.gob.sv', telefono: '####-####', estado: 'Habilitado' },
  { id: 4, nombres: 'Mario', apellidos: 'Flores', rol: 'Antisoborno', correo: 'mflores@dominio.gob.sv', telefono: '####-####', estado: 'Habilitado' },
  { id: 5, nombres: 'Rosa', apellidos: 'Lopez', rol: 'Motorista', correo: 'rlopez@dominio.gob.sv', telefono: '####-####', estado: 'Habilitado' },
  // Agrega más usuarios según necesites
]);

const searchQuery = ref('');
const sortByField = ref('nombres');
const sortDirection = ref('asc');
const currentPage = ref(1);
const rowsPerPage = ref(5);

const filteredUsers = computed(() => {
  let filtered = users.value.filter(user => {
    const query = searchQuery.value.toLowerCase();
    return user.nombres.toLowerCase().includes(query) ||
           user.apellidos.toLowerCase().includes(query) ||
           user.rol.toLowerCase().includes(query) ||
           user.correo.toLowerCase().includes(query) ||
           user.telefono.toLowerCase().includes(query) ||
           user.estado.toLowerCase().includes(query);
  });

  return filtered.sort((a, b) => {
    const aValue = a[sortByField.value];
    const bValue = b[sortByField.value];
    if (aValue < bValue) return sortDirection.value === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection.value === 'asc' ? 1 : -1;
    return 0;
  });
});

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value;
  const end = start + rowsPerPage.value;
  return filteredUsers.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredUsers.value.length / rowsPerPage.value);
});

const paginationInfo = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value + 1;
  const end = Math.min(start + rowsPerPage.value - 1, filteredUsers.value.length);
  return `Filas por página: ${rowsPerPage.value}  ${start}-${end} de ${filteredUsers.value.length}`;
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

const addNewUser = () => {
  // Lógica para navegar a la página de agregar usuario
  alert('Navegando a la página de agregar usuario...');
};

const go = (path) => {
  router.push(path);
};
</script>

<style scoped>
.list-users-container {
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

.back-btn, .add-user-btn {
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

.add-user-btn {
  background-color: #2d68ff;
  color: white;
  box-shadow: 0 4px 6px rgba(45, 104, 255, 0.2);
}

.add-user-btn:hover {
  background-color: #1e56e0;
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
  width: 300px;
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