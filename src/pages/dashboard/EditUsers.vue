<template>
  <div class="user-management-container">
    <div class="page-header">
      <h2 class="page-title">
        <svg-icon type="mdi" :path="mdiAccountGroup" class="title-icon"></svg-icon>
        Modificar usuario seleccionado
      </h2>
      <button class="back-btn" @click="goBack">
        <svg-icon type="mdi" :path="mdiArrowLeft" class="btn-icon"></svg-icon>
        Regresar
      </button>
    </div>

    <div class="form-card">
      <form @submit.prevent="saveUser">
        <div class="form-grid">
          <div class="form-field">
            <label for="nombres">Nombres</label>
            <input id="nombres" type="text" v-model="form.nombres" placeholder="Izuku Eliseo" />
          </div>
          <div class="form-field">
            <label for="apellidos">Apellidos</label>
            <input id="apellidos" type="text" v-model="form.apellidos" placeholder="Midoriya" />
          </div>
          <div class="form-field">
            <label for="correo">Correo electrónico</label>
            <input id="correo" type="email" v-model="form.correo" placeholder="mail@mail.com" />
          </div>
          <div class="form-field">
            <label for="usuario">Usuario</label>
            <input id="usuario" type="text" v-model="form.usuario" placeholder="mail@mail.com" />
          </div>
          <div class="form-field">
            <label for="tipoDocumento">Tipo de documento</label>
            <select id="tipoDocumento" v-model="form.tipoDocumento">
              <option value="">Seleccione el tipo de documento</option>
              <option value="DUI">DUI</option>
              <option value="Pasaporte">Pasaporte</option>
            </select>
          </div>
          <div class="form-field">
            <label for="documentoIdentidad">Documento de identidad</label>
            <input id="documentoIdentidad" type="text" v-model="form.documentoIdentidad" placeholder="01234567-8" />
          </div>
          <div class="form-field">
            <label for="region">Región</label>
            <select id="region" v-model="form.region">
              <option value="">Seleccione la región</option>
              <option value="Región de salud occidental">Región de salud occidental</option>
              <option value="Region2">Región de salud central</option>
              <option value="Region3">Región de salud metropolitana</option>
              <option value="Region4">Región de salud oriental</option>
              <option value="Region5">Región de salud paracentral</option>
              <option value="Region6">Hospital</option>
              <option value="Region7">Nivel superior</option>
            </select>
          </div>
          <div class="form-field">
            <label for="dependencia">Dependencias</label>
            <select id="dependencia" v-model="form.dependencia">
              <option value="">Seleccione la dependencia</option>
              <option value="Dependencia 1">Dependencia 1</option>
            </select>
          </div>
          <div class="form-field">
            <label for="sibasi">SIBASI</label>
            <select id="sibasi" v-model="form.sibasi">
              <option value="">Seleccione la SIBASI</option>
              <option value="SIBASI Ahuachapán">SIBASI Ahuachapán</option>
              <option value="Sibasi2">SIBASI Santa Ana</option>
              <option value="Sibasi3">SIBASI Sonsonate</option>
            </select>
          </div>
          <div class="form-field">
            <label for="establecimiento">Establecimiento</label>
            <select id="establecimiento" v-model="form.establecimiento">
              <option value="">Seleccione el establecimiento</option>
              <option value="UCSF Ahuachapán AH">UCSF Ahuachapán AH</option>
            </select>
          </div>
          <div class="form-field">
            <label for="telefono">Teléfono de contacto</label>
            <input id="telefono" type="tel" v-model="form.telefono" placeholder="2134-5678" />
          </div>
          <div class="form-field">
            <label for="user-status-toggle">Estado</label>
            <div class="status-toggle-container">
              <input type="checkbox" id="user-status-toggle" v-model="form.estadoHabilitado" class="status-toggle-checkbox">
              
              <label for="user-status-toggle" class="status-toggle-switch">
                <span class="status-toggle-ball"></span>
              </label>
              
              <span class="status-toggle-badge" :class="{ 'enabled': form.estadoHabilitado, 'disabled': !form.estadoHabilitado }">
                {{ form.estadoHabilitado ? 'Habilitado' : 'Deshabilitado' }}
              </span>
            </div>
          </div>

        </div>

        <div class="roles-section">
          <div class="section-title-wrapper">
            <h3 class="section-title">Roles del sistema</h3>
          </div>
          <div class="roles-grid">

            <div class="form-field full-width">
              <label for="rol">Rol*</label>
              <div class="tag-selector-wrapper" @click="toggleDropdown">
                <span v-for="rol in form.roles" :key="rol" class="tag-pill">
                  {{ rol }}
                  <span class="remove-tag" @click.stop="removeRol(rol)">
                    &times;
                  </span>
                </span>
                <div class="select-container" @click.stop="">
                  <input 
                    type="text" 
                    v-model="searchText" 
                    @input="filterOptions" 
                    placeholder="Seleccione un rol"
                    class="select-input"
                  />
                  <svg-icon type="mdi" :path="mdiMenuDown" class="dropdown-icon" :class="{ 'rotated': isDropdownOpen }"></svg-icon>
                  
                  <div v-if="isDropdownOpen" class="dropdown-menu">
                    <div 
                      v-for="option in filteredRoles" 
                      :key="option" 
                      class="dropdown-item" 
                      @click="addRol(option)"
                    >
                      {{ option }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-field">
              <label for="categoria">Categoría</label>
              <select id="categoria" v-model="form.categoria">
                <option value="">Seleccione una categoría</option>
                <option value="Normativos">Normativos</option>
                <option value="Cat2">Estratégicos</option>
                <option value="Cat3">De organización y funciones</option>
                <option value="Cat4">Conceptuales</option>
                <option value="Cat5">De práctica clínica</option>
                <option value="Cat6">Asociados a la gestión por procesos</option>
                <option value="Cat7">Otros documentos</option>
              </select>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="submit-btn">Guardar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted  } from 'vue';
import { useRouter } from 'vue-router';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAccountGroup, mdiArrowLeft, mdiMenuDown } from '@mdi/js';

const router = useRouter();

const form = ref({
  nombres: '',
  apellidos: '',
  correo: '',
  usuario: '',
  tipoDocumento: 'DUI',
  documentoIdentidad: '',
  region: 'Región de salud occidental',
  dependencia: 'Dependencia 1',
  sibasi: 'SIBASI Ahuachapán',
  establecimiento: 'UCSF Ahuachapán AH',
  telefono: '',
  estado: 'Habilitado',
  rol: [],
  categoria: 'Normativos',
  estadoHabilitado: true,
  roles: ['Colaborador de documentos Centro Virtual', 'Consulta de documentos Antifazorno'],
});

const isDropdownOpen = ref(false);
const searchText = ref('');
const allRoles = ref([
  'Administrador DTIC',
  'Administrador de documentos centro virtual',
  'Colaborador de documentos centro virtual',
  'Consultor de documentos centro virtual - Vista pública',
  'Administrador de documentos antisoborno',
  'Colaborador de documentos antisoborno'
]);

// Roles que se muestran en el menú desplegable
const filteredRoles = computed(() => {
  return allRoles.value.filter(rol => 
    !form.value.roles.includes(rol) && 
    rol.toLowerCase().includes(searchText.value.toLowerCase())
  );
});

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const addRol = (rol) => {
  if (!form.value.roles.includes(rol)) {
    form.value.roles.push(rol);
  }
  searchText.value = '';
  isDropdownOpen.value = false;
};

const removeRol = (rol) => {
  form.value.roles = form.value.roles.filter(r => r !== rol);
};

const filterOptions = () => {
  isDropdownOpen.value = true;
};

// Cierra el dropdown al hacer clic fuera
onMounted(() => {
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.tag-selector-wrapper')) {
      isDropdownOpen.value = false;
    }
  });
});

const saveUser = () => {
  console.log('Datos del formulario:', form.value);
  // Aquí puedes agregar la lógica para enviar los datos al servidor
  alert('Formulario guardado!');
};

const goBack = () => {
  router.back();
};
</script>

<style scoped>
.user-management-container {
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

.page-title {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: #4b5563;
}

.title-icon {
  width: 24px;
  height: 24px;
  fill: #2d68ff;
  margin-right: 0.5rem;
}

.back-btn {
  background-color: transparent;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-weight: 500;
  color: #4b5563;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.back-btn:hover {
  background-color: #e5e7eb;
}

.btn-icon {
  width: 20px;
  height: 20px;
  fill: #4b5563;
  margin-right: 0.25rem;
}

.form-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem 2rem;
}

.form-field {
  display: flex;
  flex-direction: column;
}

.form-field label {
  font-size: 0.9rem;
  font-weight: 500;
  color: #4b5563;
  margin-bottom: 0.25rem;
}

.form-field input,
.form-field select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #f9fafb;
  font-size: 1rem;
  color: #4b5563;
}

.status-pill {
  width: fit-content;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: bold;
}

.status-pill.enabled {
  background-color: rgba(45, 104, 255, 0.2);
  color: #2d68ff;
}

.roles-section {
  margin-top: 2rem;
}

.section-title-wrapper {
  padding: 0.5rem 0;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 1rem;
}

.section-title-wrapper .section-title {
  font-size: 1.25rem;
  color: #4b5563;
  font-weight: bold;
  margin: 0;
}

.roles-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem 2rem;
}

.full-width {
  grid-column: 1 / span 2;
}

.tag-selector-wrapper {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #f9fafb;
  cursor: pointer;
  min-height: 48px; /* Altura mínima para que no colapse */
}

.tag-pill {
  background-color: #2d68ff;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.remove-tag {
  cursor: pointer;
  font-weight: bold;
}

.select-container {
  position: relative;
  flex-grow: 1; /* Permite que el input se expanda */
}

.select-input {
  width: 100%;
  border: none;
  background: transparent;
  outline: none;
  color: #4b5563;
  padding: 0;
}

.select-input::placeholder {
  color: #a0a0a0;
}

.dropdown-icon {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  transition: transform 0.3s ease;
  fill: #4b5563;
}

.dropdown-icon.rotated {
  transform: translateY(-50%) rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.dropdown-item {
  padding: 0.75rem 1rem;
  cursor: pointer;
  color: #4b5563;
  transition: background-color 0.2s ease;
  
}

.dropdown-item:hover {
  background-color: #f1f5f9;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
}

.submit-btn {
  background-color: #2d68ff;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(45, 104, 255, 0.2);
}

.submit-btn:hover {
  background-color: #1e56e0;
}

/* Estilos del contenedor del switch */
.status-toggle-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Ocultar el checkbox nativo del navegador */
.status-toggle-checkbox {
  display: none;
}

/* Estilos de la barra del switch (el 'track') */
.status-toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
  background-color: #f1f1f1;
  border-radius: 20px;
  transition: background-color 0.4s;
  box-shadow: inset 0 0 5px rgba(0,0,0,0.1);
  cursor: pointer;
}

/* Estilos de la bolita del switch (el 'thumb') */
.status-toggle-ball {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: white;
  transition: transform 0.4s;
}

/* Estilos cuando el checkbox está deshabilitado */
.status-toggle-checkbox:checked + .status-toggle-switch {
  background-color: #17A655; /* Color verde para habilitado */
}

/* Mover la bolita cuando el switch está habilitado */
.status-toggle-checkbox:checked + .status-toggle-switch .status-toggle-ball {
  transform: translateX(22px);
  background-color: #17A655;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

/* Estilos para el estado deshabilitado */
.status-toggle-checkbox:not(:checked) + .status-toggle-switch {
  background-color: #F25C5C; /* Color rojo para deshabilitado */
}

.status-toggle-checkbox:not(:checked) + .status-toggle-switch .status-toggle-ball {
  background-color: #F25C5C;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

/* Estilos del badge de estado */
.status-toggle-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: bold;
  min-width: 100px;
  text-align: center;
  transition: background-color 0.4s, color 0.4s;
  cursor: pointer;
}

/* Estilos para el badge "Habilitado" */
.status-toggle-badge.enabled {
  background-color: #2D52A8;
  color: white;
}

/* Estilos para el badge "Deshabilitado" */
.status-toggle-badge.disabled {
  background-color: #D9EEFF;
  color: #2D52A8;
}
</style>