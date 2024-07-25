<template>
  <v-app class="Fondo">
  <v-container >

  <H1  style="width: 300px; color: white;">AGENDAR CITA</H1>
  <br>
  <v-sheet
  :elevation="6"
  :height="300"
  :width="600"
  border
  color="#283593"
  rounded>
  <H2 style="width: 200px;">
    Tu producto
  </H2> 
  <v-responsive
  max-width="500"
   style="background-color: #E8EAF6;">
  <v-text-field
    hide-details="auto"
     style="color: black;"
  ></v-text-field> <br>
</v-responsive>
<br>
<H3 style="width: 200px;">
  Detalla tu Producto
</H3>
  <v-responsive
  max-width="500"
  style="background-color: #E8EAF6;">
  <v-text-field
    hide-details="auto"
     style="color: black;"
  ></v-text-field> <br>
</v-responsive>
</v-sheet>

<v-row justify="end" align="start">
  <v-date-picker width="400"></v-date-picker>
</v-row>

    </v-container>
  </v-app>
  </template>
  
  <style scoped>

.Fondo {
  background: url('../../assets/iii.svg') no-repeat center center fixed;
  background-size: cover;
  height: 100%;
}
</style>