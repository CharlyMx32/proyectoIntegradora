<template>
  <v-app class="Fondo">
    <v-container>
      <v-card class="white-card" :elevation="6" max-width="800" color="#283593" rounded>
        <v-card-title>
          <H1 style="width: 100%; color: white">AGENDAR CITA</H1>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <v-card class="nested-card" :elevation="2">
                <v-card-title>
                  <H2>Tu producto</H2>
                </v-card-title>
                <v-card-text>
                  <v-responsive max-width="500">
                    <v-text-field hide-details="auto" style="color: black"></v-text-field>
                  </v-responsive>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col>
              <v-card class="nested-card" :elevation="2">
                <v-card-title>
                  <H3>Detalla tu Producto</H3>
                </v-card-title>
                <v-card-text>
                  <v-responsive max-width="500">
                    <v-text-field hide-details="auto" style="color: black"></v-text-field>
                  </v-responsive>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row justify="end" class="mt-4">
            <v-col cols="12" md="6">
              <v-card class="nested-card" :elevation="2">
                <v-card-title>
                  <H3>Fecha de la Cita</H3>
                </v-card-title>
                <v-card-text>
                  <v-date-picker width="100%"></v-date-picker>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
</script>

<style scoped>
.Fondo {
  background: url('../../assets/iii.svg') no-repeat center center fixed;
  background-size: cover;
  height: 100%;
}

html,
body {
  height: 100%;
  margin: 0;
  overflow-y: hidden; /* Oculta el scroll vertical */
}

.fill-height {
  height: 100%;
  overflow: hidden; /* Oculta el scroll vertical y horizontal si hay desbordamiento */
}

.white-card {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.nested-card {
  background: #e8eaf6;
  padding: 20px;
  border-radius: 8px;
}
</style>
