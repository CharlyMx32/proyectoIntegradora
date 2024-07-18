<template>
    <v-card>
      <v-layout>
        <v-navigation-drawer
          expand-on-hover
          rail
        >
          <v-list>
            <v-list-item
              prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
              subtitle="alejandracamacho@hs.com"
              title="Recepcionista"
            ></v-list-item>
          </v-list>
  
          <v-divider></v-divider>
  
          <v-list density="compact" nav>
            <v-list-item title="Pantalla principal" value="principal"></v-list-item>
            <v-list-item title="Cuenta cliente" value="cliente"></v-list-item>
            <v-list-item title="Agendar citas" value="agendar"></v-list-item>
            <v-list-item title="Citas" value="citas"></v-list-item>
            <v-list-item title="Asignar citas" value="asignar"></v-list-item>
            <v-list-item title="Citas pendientes" value="pendientes"></v-list-item>
          </v-list>
        </v-navigation-drawer>
  
        <v-main style="height: 700px"></v-main>
      </v-layout>
    </v-card>
  </template>