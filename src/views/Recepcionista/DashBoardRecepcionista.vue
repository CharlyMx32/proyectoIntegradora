<template>
  <v-container fluid>
    <v-row>
      <!-- Barra lateral a la izquierda -->
      <v-col cols="2">
        <BarraRecepcionista />
      </v-col>

      <!-- Contenido principal a la derecha -->
      <v-col cols="10">
        <v-card>
          <v-card-title class="text-center">Bienvenido/a a nuestra plataforma</v-card-title>
          <!-- Aquí puedes agregar más contenido dinámico -->
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import BarraRecepcionista from '@/components/CompRecepcionista/BarraRecepcionista.vue'
</script>
