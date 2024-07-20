<template>
  <v-navigation-drawer expand-on-hover rail class="nav">
    <v-list>
      <v-list-item
        :prepend-avatar="props.avatarUrl"
        :subtitle="props.subtitle"
        :title="props.title"
        class="list-item-header"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item v-for="(item, index) in props.items" :key="index" :to="item.to" class="nav-item">
        {{ item.title }}
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  avatarUrl: String,
  subtitle: String,
  title: String,
  items: Array
})
</script>

<style scoped>
/* Estilos para personalizar la apariencia de la barra lateral */
.nav {
  background-color: #f0f0f0; /* Fondo gris claro */
  color: #a0a0a0; /* Color de texto predeterminado */
  border-right: 1px solid #d1d1d1; /* Borde gris medio a la derecha */
  width: 250px; /* Ancho de la barra lateral */
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); /* Sombra ligera para destacar */
}

.list-item-header {
  border-bottom: 1px solid #d1d1d1; /* Separador debajo del encabezado */
  margin-bottom: 10px;
}

.nav-item {
  color: #a0a0a0; /* Color de texto predeterminado en los ítems */
}

.nav-item:hover {
  background-color: #add8e6; /* Fondo azul claro en hover */
  color: #ffffff; /* Texto blanco en hover para contraste */
}
</style>
