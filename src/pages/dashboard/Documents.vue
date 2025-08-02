<template>
  <div>
    <h2>Gestión de Documentos</h2>
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Tipo</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="doc in docs" :key="doc.id">
          <td>{{ doc.nombre }}</td>
          <td>{{ doc.tipo }}</td>
          <td>{{ doc.fecha }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const docs = [
  { id: 1, nombre: 'Ley Antisoborno', tipo: 'Regulación', fecha: '2024-06-01' },
  { id: 2, nombre: 'Código Ético', tipo: 'Política', fecha: '2024-05-20' },
]
</script>
