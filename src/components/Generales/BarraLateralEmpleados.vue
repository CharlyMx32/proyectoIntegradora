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
  background-color: var(--v-theme-barraLateral); /* Fondo del tema actual */
  color: var(--v-theme-text-primary); /* Color de texto predeterminado */
  border-right: 1px solid var(--v-theme-border); /* Borde del tema actual */
  width: 250px; /* Ancho de la barra lateral */
  box-shadow: 2px 0 5px var(--v-theme-shadow); /* Sombra del tema actual */
  transition: background-color 0.3s ease; /* Transición suave para cambios de fondo */
}

.list-item-header {
  border-bottom: 1px solid var(--v-theme-border); /* Separador debajo del encabezado */
  margin-bottom: 10px;
  padding: 10px;
  background-color: var(--v-theme-header-background); /* Fondo del encabezado */
  color: var(--v-theme-header-text); /* Color de texto del encabezado */
}

.nav-item {
  color: var(--v-theme-text-primary); /* Color de texto predeterminado en los ítems */
  padding: 10px 15px;
  border-radius: 4px; /* Bordes redondeados para los ítems */
  transition:
    background-color 0.3s ease,
    color 0.3s ease; /* Transiciones suaves */
}

.nav-item:hover {
  background-color: var(--v-theme-hover); /* Fondo en hover del tema actual */
  color: var(--v-theme-on-hover); /* Texto en hover del tema actual */
}
</style>
