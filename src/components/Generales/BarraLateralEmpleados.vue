<template>
  <v-navigation-drawer expand-on-hover rail>
    <v-list>
      <v-list-item
        :prepend-avatar="props.avatarUrl"
        :subtitle="props.subtitle"
        :title="props.title"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item v-for="(item, index) in props.items" :key="index" :to="item.to">
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
/* Estilos opcionales para personalizar la apariencia */
</style>
