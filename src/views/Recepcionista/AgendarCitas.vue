<template>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-card-title class="display-1 font-weight-bold color-titulo">¡AGENDA UNA CITA!</v-card-title>
          <p></p>
          <h1>¿Cual es el problema?</h1>
          <p>PRODUCTO</p>
          <p></p>
  <v-container fluid>
    <v-textarea
      label="Label"
      model-value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
      name="input-7-1"
      variant="filled"
      auto-grow
    ></v-textarea>
  </v-container>
          <p>DETALLE SOBRE SU ARTICULO</p>
          <v-app>
    <v-container>
      <v-textarea label="Label" variant="solo"></v-textarea>
    </v-container>
  </v-app>

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
  </template>


  

  <script setup>
    import { shallowRef } from 'vue'
  
    const date = shallowRef()
  </script>