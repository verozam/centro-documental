<template>
  <div class="edit-dependencies-container">
    <div class="page-header">
      <div class="page-title-wrapper">
        <h2 class="page-title">
            <svg-icon type="mdi" :path="mdiPencil" class="title-icon"></svg-icon>
            Editar dependencia o establecimiento</h2>
      </div>
      <button class="back-btn" @click="goBack">
        <svg-icon type="mdi" :path="mdiArrowLeft" class="btn-icon"></svg-icon>
        Regresar
      </button>
    </div>

    <div class="form-card">
      <form @submit.prevent="saveChanges">
        <div class="form-grid">
          <div class="form-column">
            <div class="form-field">
              <label for="institucion">Institución</label>
              <input id="institucion" type="text" v-model="form.institucion" />
            </div>
            <div class="form-field">
              <label for="siglas">Siglas</label>
              <input id="siglas" type="text" v-model="form.siglas" />
            </div>
            <div class="form-field">
              <label for="sibasi">SIBASI</label>
              <select id="sibasi" v-model="form.sibasi">
                <option value="">SIBASI Ahuachapán</option>
                <option value="Sibasi2">SIBASI Santa Ana</option>
                <option value="Sibasi3">SIBASI Sonsonate</option>
              </select>
            </div>
            <div class="form-field">
              <label for="tipoOrganizacion">Tipo de organización</label>
              <select id="tipoOrganizacion" v-model="form.tipoOrganizacion">
                <option value="">Dependencia</option>
              </select>
            </div>
            <div class="form-field">
              <label for="representante">Representante</label>
              <input id="representante" type="text" v-model="form.representante" />
            </div>
            <div class="form-field">
              <label for="correo">Correo electrónico</label>
              <input id="correo" type="email" v-model="form.correo" />
            </div>
            <div class="form-field">
              <label for="departamento">Departamento</label>
              <select id="departamento" v-model="form.departamento">
                <option value="">San Salvador</option>
                <option value="">Ahuachapán</option>
                <option value="">Cabañas</option>
                <option value="">Chalatenango</option>
                <option value="">Cuscatlán</option>
                <option value="">La Libertad</option>
                <option value="">Morazán</option>
                <option value="">La Paz</option>
                <option value="">Santa Ana</option>
              </select>
            </div>
            <div class="form-field">
              <label for="estado">Estado</label>
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

          <div class="form-column">
            <div class="form-field">
              <label for="nombre">Nombre</label>
              <input id="nombre" type="text" v-model="form.nombre" />
            </div>
            <div class="form-field">
              <label for="region">Región</label>
              <select id="region" v-model="form.region">
                <option value="Region1">Región de salud occidental</option>
                <option value="Region2">Región de salud central</option>
                <option value="Region3">Región de salud metropolitana</option>
                <option value="Region4">Región de salud oriental</option>
                <option value="Region5">Región de salud paracentral</option>
                <option value="Region6">Hospital</option>
                <option value="Region7">Nivel superior</option>
              </select>
            </div>
            <div class="form-field">
              <label for="establecimiento">Establecimiento</label>
              <select id="establecimiento" v-model="form.establecimiento">
                <option value="">UCSF Ahuachapán AH</option>
              </select>
            </div>
            <div class="form-field">
              <label for="tipoUnidad">Tipo de unidad</label>
              <select id="tipoUnidad" v-model="form.tipoUnidad">
                <option value="">Oficina</option>
                <option value="">Dirección</option>
                <option value="">Unidad</option>
                <option value="">Centro</option>
                <option value="">Área</option>
                <option value="">Viceministerio</option>
                <option value="">Gerencia</option>
                <option value="">Despacho</option>
              </select>
            </div>
            <div class="form-field">
              <label for="telefono">Teléfono</label>
              <input id="telefono" type="tel" v-model="form.telefono" />
            </div>
            <div class="form-field">
              <label for="direccion">Dirección</label>
              <input id="direccion" type="text" v-model="form.direccion" />
            </div>
            <div class="form-field">
              <label for="municipio">Municipio</label>
              <select id="municipio" v-model="form.municipio">
                <option value="">San Salvador</option>
                <option value="">Aguilares</option>
                <option value="">El Paisnal</option>
                <option value="">Guazapa</option>
                <option value="">Apopa</option>
                <option value="">Nejapa</option>
                <option value="">Ilopango</option>
                <option value="">San Martín</option>
                <option value="">Soyapango</option>
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiPencil, mdiArrowLeft } from '@mdi/js';

const router = useRouter();

const form = ref({
  institucion: 'Ministerio de Salud',
  siglas: 'VOS',
  sibasi: 'SIBASI Ahuachapán',
  tipoOrganizacion: 'Dependencia',
  representante: 'Dra Maribel Alexander Magaña Revelo',
  correo: 'mail@mail.com',
  departamento: 'San Salvador',
  estadoHabilitado: true,
  nombre: 'Viceministerio de Operaciones en Salud',
  region: 'Región Salud Occidente',
  establecimiento: 'UCSF Ahuachapán AH',
  tipoUnidad: 'Viceministerio',
  telefono: '+503 2591 7606',
  direccion: 'Calle Arce No. 827',
  municipio: 'San Salvador',
});

const saveChanges = () => {
  console.log('Datos del formulario:', form.value);
  // Lógica para guardar los cambios
  alert('Cambios guardados!');
};

const goBack = () => {
  router.back();
};
</script>

<style scoped>
.edit-dependencies-container {
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

.form-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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

/* Estilos para el switch del estado */
.status-toggle-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.status-toggle-checkbox {
  display: none;
}

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

.status-toggle-checkbox:checked + .status-toggle-switch {
  background-color: #17A655;
}

.status-toggle-checkbox:checked + .status-toggle-switch .status-toggle-ball {
  transform: translateX(22px);
  background-color: #17A655;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.status-toggle-checkbox:not(:checked) + .status-toggle-switch {
  background-color: #F25C5C;
}

.status-toggle-checkbox:not(:checked) + .status-toggle-switch .status-toggle-ball {
  background-color: #F25C5C;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.status-toggle-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: bold;
  min-width: 100px;
  text-align: center;
  transition: background-color 0.4s, color 0.4s;
  cursor: pointer;
}

.status-toggle-badge.enabled {
  background-color: #2D52A8;
  color: white;
}

.status-toggle-badge.disabled {
  background-color: #D9EEFF;
  color: #2D52A8;
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
</style>