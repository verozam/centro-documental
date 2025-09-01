<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-card">
      <div class="modal-header">
        <h3 class="modal-title">Sincronizar dependencias y establecimientos</h3>
        <button class="modal-close" @click="$emit('close')">&times;</button>
      </div>
      <div class="modal-body">
        <div class="icon-wrapper">
          <svg-icon type="mdi" :path="mdiAlertCircleOutline" class="alert-icon"></svg-icon>
        </div>
        <p class="modal-text">
          ¿Está seguro de realizar la sincronización con el listado maestro?
        </p>
        <p class="modal-description">
          Realizar esta acción hará que se descarguen las dependencias y establecimientos que aún no se encuentran registradas, sin embargo no actualizará las ya registradas.
        </p>
      </div>
      <div class="modal-footer">
        <button type="button" class="cancel-btn" @click="$emit('close')">Cancelar</button>
        <button type="button" class="accept-btn" @click="$emit('accept')">Aceptar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAlertCircleOutline } from '@mdi/js';

const emit = defineEmits(['close', 'accept']);
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
  max-width: 500px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: center;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-title {
  font-size: 1.2rem;
  color: #2d68ff;
  font-weight: bold;
  margin: 0;
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
  align-items: center;
}

.icon-wrapper {
  margin-bottom: 1rem;
}

.alert-icon {
  width: 60px;
  height: 60px;
  fill: #f2a61e;
}

.modal-text {
  font-size: 1.1rem;
  font-weight: bold;
  color: #4b5563;
  margin: 0 0 1rem 0;
}

.modal-description {
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
}

.modal-footer {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.cancel-btn, .accept-btn {
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.cancel-btn {
  background-color: white;
  border: 1px solid #d1d5db;
  color: #4b5563;
}

.cancel-btn:hover {
  background-color: #e5e7eb;
}

.accept-btn {
  background-color: #2d68ff;
  color: white;
}

.accept-btn:hover {
  background-color: #1e56e0;
}
</style>