<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-card">
      <div class="modal-header">
        <div class="modal-title-wrapper">
          <h3 class="modal-title">
            <svg-icon type="mdi" :path="mdiFileDocument" class="title-icon"></svg-icon>
            Agregar tipo de documento</h3>
        </div>
        <button class="modal-close" @click="$emit('close')">&times;</button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="saveDocumentType">
          <div class="form-field">
            <label for="docTypeName">Nombre del tipo de documento*</label>
            <input type="text" id="docTypeName" v-model="form.name" placeholder="Manual del sistema de Gestión Antisoborno" required />
          </div>
          <div class="form-field">
            <label for="docTypeCode">Código*</label>
            <input type="text" id="docTypeCode" v-model="form.code" placeholder="MAN" required />
          </div>
          <div class="form-field">
            <label for="docTypeDescription">Descripción del tipo de documento*</label>
            <textarea id="docTypeDescription" v-model="form.description" placeholder="Documenos de planificación en los que se describen el modo en que apoyaran las prioridades politicas mas amplias de MINSAL." required></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="cancel-btn" @click="$emit('close')">Cancelar</button>
        <button type="button" class="save-btn" @click="saveDocumentType">Guardar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiFileDocument } from '@mdi/js';

const emit = defineEmits(['close', 'save']);

const form = ref({
  name: '',
  code: '',
  description: '',
});

const saveDocumentType = () => {
  if (form.value.name && form.value.code && form.value.description) {
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
.form-field textarea {
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