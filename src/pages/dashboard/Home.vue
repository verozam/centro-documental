<template>
  <div class="home-container">
    <div class="header-section">
      <h2 class="section-title">Panel de control</h2>
    </div>

    <div class="info-cards-grid">
      <div v-for="card in infoCards" :key="card.title" class="info-card">
        <div class="card-background-image"></div>
        
        <div class="card-content">
          <div class="card-header">
            <div class="card-title">{{ card.title }}</div>
          </div>
          
          <div class="card-body">
            <svg-icon type="mdi" :path="card.icon" class="card-icon"></svg-icon>
            <div class="card-value-container">
              <span class="card-value">{{ card.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="action-buttons-grid">
      <button class="action-btn">
        <svg-icon type="mdi" :path="mdiPlusBox" class="action-icon"></svg-icon>
        Agregar nuevo documento
      </button>
      <button class="action-btn has-notification">
        <span class="notification-badge">0</span>
        <svg-icon type="mdi" :path="mdiCommentEye" class="action-icon"></svg-icon>
        Ver comentarios de vista pública
      </button>
      <button class="action-btn">
        <svg-icon type="mdi" :path="mdiPrinter" class="action-icon"></svg-icon>
        Copia controlada
      </button>
    </div>

    <div class="categories-section">
      <div class="section-header">
        <h3 class="section-title">Todas las categorías</h3>
      </div>
      <div class="categories-grid">
        <div v-for="category in categories" :key="category.title" class="category-card">
          <div class="category-background">
            <div class="category-images-container">
              <img :src="category.image" :alt="category.title" class="category-image default-image" />
              <img :src="category.imageHover" :alt="category.title + ' Hover'" class="category-image hover-image" />
            </div>
          </div>
          <p class="category-title-overlay">{{ category.title }}</p>
        </div>
      </div>
    </div>
    <div class="documents-section">
      <div class="documents-header">
        <h3 class="section-title">Documentos relacionados a normas</h3>
      </div>
      <div class="documents-table-container">
        <table class="documents-table">
          <thead>
            <tr>
              <th>Documento</th>
              <th>Subcategoría</th>
              <th>Dependencia</th>
              <th>Fecha publicación/oficialización</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Plan nacional para la prevención, el control y la eliminación de las enfermedades...</td>
              <td>Planes</td>
              <td>Planificación</td>
              <td>25/02/2024 - 20/05/2024</td>
              <td><button class="action-btnx"><svg-icon type="mdi" :path="mdiEye" class="table-action-icon"></svg-icon></button></td>
            </tr>
            <tr>
              <td>Plan nacional para la prevención, el control y la eliminación de las enfermedades...</td>
              <td>Planes</td>
              <td>Planificación</td>
              <td>25/02/2024 - 20/05/2024</td>
              <td><button class="action-btnx"><svg-icon type="mdi" :path="mdiEye" class="table-action-icon"></svg-icon></button></td>
            </tr>
            <tr>
              <td>Plan nacional para la prevención, el control y la eliminación de las enfermedades...</td>
              <td>Planes</td>
              <td>Planificación</td>
              <td>25/02/2024 - 20/05/2024</td>
              <td><button class="action-btnx"><svg-icon type="mdi" :path="mdiEye" class="table-action-icon"></svg-icon></button></td>
            </tr>
            </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import {
  mdiFileDocumentAlertOutline,
  mdiFileDocument,
  mdiDownload,
  mdiEye,
  mdiPlusBox,
  mdiCommentEye,
  mdiPrinter,
} from '@mdi/js';

// Datos para las tarjetas de información
const infoCards = ref([
  { title: 'Total de documentos vigentes', value: 1919, icon: mdiFileDocumentAlertOutline },
  { title: 'Total de documentos descargados', value: 524, icon: mdiDownload },
  { title: 'Total de vistas al sitio web', value: 2525, icon: mdiEye },
]);

// Datos para las categorías
const categories = ref([
  { title: 'Normativos', image: '/src/assets/Normativos/Libro cerrado.png',
    imageHover: '/src/assets/Normativos/Libro abierto.png'
   },
  { title: 'Estratégicos', image: '/src/assets/Estratégicos/Bombillo Off.png',
    imageHover: '/src/assets/Estratégicos/Bombillo On.png'
   },
  { title: 'De organización y funciones', image: '/src/assets/De organizaciones y funciones/Handshake1.png',
     imageHover: '/src/assets/De organizaciones y funciones/Handshake2.png'
   },
  { title: 'Conceptuales', image: '/src/assets/Conceptuales/Conceptuales1.png',
    imageHover: '/src/assets/Conceptuales/Conceptuales2.png'
   },
  { title: 'De práctica clínica', image: '/src/assets/De práctica clínica/Practica Clinica 1.png',
    imageHover: '/src/assets/De práctica clínica/Practica Clinica 2.png' 
   },
  { title: 'Asociados a la gestión por procesos', image: '/src/assets/Asociados a la gestión por procesos/Gestión por procesos.png',
    imageHover: '/src/assets/Asociados a la gestión por procesos/Gestión por procesos2.png' 
   },
  { title: 'Otros documentos', image: '/src/assets/Otros documentos/Otros documentos.png',
    imageHover: '/src/assets/Otros documentos/Otros documentos2.png' 
   },
  // ... agrega el resto de tus categorías
]);
</script>

<style scoped>
.home-container {
  padding: 2rem;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.section-title {
  color: #2e3a59;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

/* --- Estilos de las tarjetas de información --- */
.info-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;
}

.info-card {
  position: relative;
  /* CAMBIO CLAVE: Fondo blanco para que sea claro */
  background-color: white; 
  border-radius: 10px;
  border: 2px solid #2D52A8;
  box-shadow: 0px 4px 20px 0px rgba(89, 133, 240, 0.25);
  overflow: hidden;
  height: 180px;
  padding: 1rem;
}

.info-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 5px;
  background-color: #5985F0;
}

.card-background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* CAMBIO CLAVE: Usamos un SVG blanco para el fondo con opacidad baja */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='%23FFFFFF' d='M0 0h100v100H0z'/%3E%3C/svg%3E");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  /* La opacidad baja es la clave para que se vea claro y sutil */
  opacity: 0.1;
  z-index: 1;
}

.card-content {
  position: relative;
  height: 100%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 0.5rem;
}

.card-header {
  padding: 0;
  flex-grow: 1;
}

.card-title {
  color: #5985F0;
  font-size: 1rem;
  line-height: 1.3;
  margin: 0;
}

.card-body {
  display: flex;
  /* CAMBIO CLAVE: Alinear el ícono a la izquierda y el valor a la derecha */
  justify-content: space-between;
  align-items: flex-end;
}

.card-icon {
  width: 130px;
  height: 130px;
  fill: #5985F0;
  /* CAMBIO CLAVE: Aumenta la opacidad para que el icono sea visible */
  opacity: 1;
  position: absolute;
  left: 15px; /* Cambiado a right para que el icono esté a la derecha */
  bottom: 10px;
  z-index: 1; /* Asegura que el icono esté por encima del fondo */
}

.card-value-container {
  /* CAMBIO CLAVE: El `margin-left: auto` empuja el contenedor a la derecha */
  margin-left: auto;
  border-bottom: 1px solid #333A45;
  padding-bottom: 5px;
}

.card-value {
  font-size: 46px;
  font-weight: bold;
  /* CAMBIO CLAVE: Color oscuro para el número */
  color: #333A45;
  z-index: 2;
  position: relative;
}

/* --- Estilos de los botones de acción --- */
.action-buttons-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;
}

.action-btn {
  background-color: white;
  color: #555;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  position: relative;
}

.action-icon {
  width: 24px;
  height: 24px;
  fill: #2d52a8;
  /**fill: #555;**/
  margin-right: 0.5rem;
}

.notification-badge {
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: #2e68ff;
  color: white;
  border-radius: 50%;
  padding: 0.2rem 0.5rem;
  font-size: 0.75rem;
  font-weight: bold;
}

/* --- Estilos de la sección de categorías --- */
.categories-section {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.section-header {
  background-color: #2e68ff;
  color: white;
  padding: 1rem;
}

.section-header .section-title {
  color: white;
  margin: 0;
}

.categories-grid {
  background-color: white;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

.category-card {
  position: relative;
  text-align: center;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.category-card:hover {
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}

.category-image {
  width: 80%;
  height: 150px;
  object-fit: cover;
}

.category-title {
  background-color: #7896d2;
  padding: 0.5rem;
  margin: 0;
  font-weight: bold;  
  color: white;
}


.categories-grid {
  background-color: white;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

.category-card {
  position: relative; /* Importante para posicionar el título-overlay */
  text-align: center;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  /* Altura fija para todas las tarjetas */
  height: 180px; 
  display: flex; /* Para centrar contenido si es necesario */
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.category-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #ffffffff 0%, #337ada 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.3s ease-in-out; /* Transición para el degradado */
}

/* Estado hover del fondo */
.category-card:hover .category-background {
  background: linear-gradient(180deg, #dcefff 0%, #2d68ff 100%);
}

.category-images-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.category-image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 90%;
  max-height: 80%;
  object-fit: contain;
  z-index: 1;
  transition: opacity 0.3s ease-in-out; /* Transición para la opacidad */
}

/* Imagen por defecto: visible */
.category-image.default-image {
  opacity: 1;
}

/* Imagen de hover: oculta por defecto */
.category-image.hover-image {
  opacity: 0;
}

/* Al hacer hover en la tarjeta: */
.category-card:hover .default-image {
  opacity: 0; /* Oculta la imagen por defecto */
}

.category-card:hover .hover-image {
  opacity: 1; /* Muestra la imagen de hover */
}

.category-title-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgb(61 127 240 / 21%);
  color: white;
  padding: 0.5rem 0;
  margin: 0;
  font-weight: bold;
  font-size: 0.95rem;
  z-index: 2;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

/* Estilos generales */
.documents-section {
  margin-top: 2rem;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.documents-header {
  background-color: #f1f5f9; /* Color de fondo del encabezado */
  padding: 1rem;
  border-bottom: 1px solid #ccc;
}

.documents-header .section-title {
  margin: 0;
}

.documents-table-container {
  padding: 1rem;
  overflow-x: auto;
}

/* Estilos de la tabla */
.documents-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.documents-table thead tr th {
  background-color: #2d68ff; /* Color de fondo de los encabezados de columna */
  color: white;
  padding: 0.75rem 1rem;
  position: relative;
  cursor: pointer;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
}

.documents-table tbody tr {
  border-bottom: 1px solid #eee;
  transition: background-color 0.2s ease;
}

.documents-table tbody tr:hover {
  background-color: #f9f9f9;
}

.documents-table tbody tr td {
  padding: 1rem;
  font-size: 0.9rem;
  color: #555;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px;
}

.documents-table tbody tr td:first-child {
  white-space: normal;
  max-width: 350px;
}

/* Estilo del botón de acciones */

/* CAMBIO CLAVE: Nuevo estilo para el icono dentro del botón */
.table-action-icon {
  width: 20px; /* Tamaño del icono */
  height: 20px;
  fill: #2d68ff !important; /* Color del icono */
}

.action-btnx {
  background-color: white;
  border: 0px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
  align-items: center;
  justify-content: center;
}
</style>