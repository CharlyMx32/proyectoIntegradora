<template>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-card-title class="display-1 font-weight-bold color-titulo">¡AGENDA UNA CITA!</v-card-title>
          <h1>¿Cual es el producto?</h1>
          <p>PRODUCTO</p>

          
  <v-container fluid>
    <v-textarea
      autocomplete="producto"
      label="PRODUCTO"
    ></v-textarea>
  </v-container>

          <p>DETALLE SOBRE SU ARTICULO</p>
          <v-container fluid>
    <v-textarea
      autocomplete="Articulo"
      label="DETALLE DEL ARTICULO"
    ></v-textarea>
  </v-container>

        </v-col>
  
        <v-col cols="12" md="6">
          <v-card class="mx-auto" max-width="328" rounded="lg" border>
            <v-confirm-edit v-model="date">
              <template v-slot:default="{ model: proxyModel, actions }">
                <v-date-picker v-model="proxyModel.value">
                  <template v-slot:actions>
                    <component :is="actions"></component>
                  </template>
                </v-date-picker>
              </template>
            </v-confirm-edit>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <div class="container">
    <v-card-actions class="flex items-center p-6">
      <v-btn
        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-10 px-4 py-2"
        variant="contained"
        @click="submitForm"
        :disabled="isSubmitting"
      >
        AGENDAR 
      </v-btn>
    </v-card-actions>
  </div>
    
  </template>


  

  <script setup>

    import { shallowRef } from 'vue'
  
    const date = shallowRef()

  </script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.v-btn {
  background-color: #ff0def; /* Verde pastel */
  color: #ffffff; /* Texto blanco */
  margin-left: 8px;
}

.v-btn:hover {
  background-color: #ba0afa; /* Verde claro */
}
</style>