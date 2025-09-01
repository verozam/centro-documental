<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-card">
      <div class="modal-header">
        <div class="modal-title-wrapper">
          <svg-icon type="mdi" :path="mdiFormatListBulleted" class="title-icon"></svg-icon>
          <h3 class="modal-title">Agregar una subcategoría</h3>
        </div>
        <button class="modal-close" @click="$emit('close')">&times;</button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="saveSubCategory">
          <div class="form-field">
            <label for="subCategoryName">Nombre de la subcategoría*</label>
            <input type="text" id="subCategoryName" v-model="form.name" placeholder="Planes" required />
          </div>
          <div class="form-field">
            <label for="categorySelect">Seleccionar categoría*</label>
            <select id="categorySelect" v-model="form.category" required>
              <option value="" disabled>Seleccione la categoría a la que pertenece la subcategoría</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
            </select>
          </div>
          <div class="form-field">
            <label for="subCategoryDescription">Descripción de la subcategoría*</label>
            <textarea id="subCategoryDescription" v-model="form.description" placeholder="Sub categoría de planes de la categoría estrategicos" required></textarea>
          </div>
          <div class="form-field status-field">
            <label>Estado de la subcategoría:</label>
            <div class="status-toggle-container">
              <input type="checkbox" id="subcategory-status-toggle" v-model="form.estadoHabilitado" class="status-toggle-checkbox">
              <label for="subcategory-status-toggle" class="status-toggle-switch">
                <span class="status-toggle-ball"></span>
              </label>
              <span class="status-toggle-badge" :class="{ 'enabled': form.estadoHabilitado, 'disabled': !form.estadoHabilitado }">
                {{ form.estadoHabilitado ? 'Habilitada' : 'Deshabilitada' }}
              </span>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="cancel-btn" @click="$emit('close')">Cancelar</button>
        <button type="button" class="save-btn" @click="saveSubCategory">Guardar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiFormatListBulleted } from '@mdi/js';

const emit = defineEmits(['close', 'save']);

const form = ref({
  name: '',
  category: '',
  description: '',
  estadoHabilitado: true,
});

// Datos de ejemplo para las categorías
const categories = ref([
  { id: 1, name: 'Propiamente regulatorios' },
  { id: 2, name: 'Estratégicos' },
  { id: 3, name: 'Normativos' },
]);

const saveSubCategory = () => {
  if (form.value.name && form.value.category && form.value.description) {
    emit('save', form.value);
  } else {
    alert('Por favor, complete todos los campos requeridos.');
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 600px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-title-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.modal-title {
  font-size: 1.2rem;
  color: #2d68ff;
  font-weight: bold;
  margin: 0;
}

.title-icon {
  width: 24px;
  height: 24px;
  fill: #2d68ff;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
}

.modal-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
.form-field textarea,
.form-field select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #f9fafb;
  font-size: 1rem;
  color: #4b5563;
  resize: vertical;
}

.form-field textarea {
  min-height: 100px;
}

.status-field {
  flex-direction: row;
  align-items: center;
}

.status-field label {
  flex-shrink: 0;
  margin-right: 1rem;
}

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
  width: 40px;
  height: 22px;
  background-color: #f1f1f1;
  border-radius: 20px;
  transition: background-color 0.4s;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.status-toggle-ball {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: white;
  transition: transform 0.4s;
}

.status-toggle-checkbox:checked + .status-toggle-switch {
  background-color: #17A655;
}

.status-toggle-checkbox:checked + .status-toggle-switch .status-toggle-ball {
  transform: translateX(18px);
  background-color: #17A655;
}

.status-toggle-checkbox:not(:checked) + .status-toggle-switch {
  background-color: #F25C5C;
}

.status-toggle-checkbox:not(:checked) + .status-toggle-switch .status-toggle-ball {
  background-color: #F25C5C;
}

.status-toggle-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-weight: bold;
  font-size: 0.8rem;
  min-width: 90px;
  text-align: center;
  transition: background-color 0.4s, color 0.4s;
}

.status-toggle-badge.enabled {
  background-color: #2D52A8;
  color: white;
}

.status-toggle-badge.disabled {
  background-color: #D9EEFF;
  color: #2D52A8;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  gap: 1rem;
}

.cancel-btn {
  background-color: white;
  border: 1px solid #d1d5db;
  color: #4b5563;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.cancel-btn:hover {
  background-color: #e5e7eb;
}

.save-btn {
  background-color: #2d68ff;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.save-btn:hover {
  background-color: #1e56e0;
}
</style>