<template>
  <div class="layout">
    <!-- Imagen de fondo cubriendo todo -->
    <div class="background-overlay"></div>

    <!-- Contenido principal con fondo superpuesto -->
    <div class="left-panel">
      <img src="@/assets/logo-documental.png" alt="Centro Documental" class="left-logo" />
      <h1>Centro virtual de documentación regulatoria</h1>
    </div>

    <div class="right-panel">
      <div class="form-slot">
        <slot />
      </div>
    </div>

    <!-- Footer -->
    <footer class="footer">
      Copyright © 2024 | DTIC |
      <a href="https://www.salud.gob.sv" target="_blank" class="footer-link">Ministerio de Salud República de El Salvador, C.A.</a>
    </footer>
  </div>
</template>

<style scoped>
.layout {
  position: relative;
  display: flex;
  min-height: 100vh;
  width: 100%;
  font-family: 'Segoe UI', sans-serif;
  overflow: hidden;
}

/* Cubre todo con la imagen de fondo */
.background-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/background.png');
  background-size: cover;
  background-position: center;
  z-index: -1;
  filter: brightness(0.6);
}

/* Panel izquierdo con texto encima del fondo */
.left-panel {
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-width: 0;
  height: 100vh;
  padding-left: 2vw;
  padding-right: 2vw;
  box-sizing: border-box;
}

.left-panel h1 {
  background-color: rgb(255, 255, 255);
  display: inline-block;
  padding: 1rem 2rem;
  border-radius: 10px;
  font-size: 1.5rem;
}

.left-logo {
  height: 100px;
  margin-bottom: 1rem;
}

/* Panel derecho con el formulario flotando encima del fondo */
.right-panel {
  width: 450px;
  min-width: 350px;
  max-width: 100vw;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2);
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  height: 100vh;
  justify-content: center;
  overflow-y: auto;
}
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.form-slot {
  width: 100%;
  max-width: 350px;
}

/* Footer fijo abajo */
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.7rem;
  font-size: 0.85rem;
  z-index: 2;
}
</style>
