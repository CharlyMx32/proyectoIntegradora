<template>
  <v-app class="Fondo">
    <br> 
    <v-card :elevation="10" :height="200" :width="450" border color="#E3F2FD" rounded style="margin-left: 50px; position: relative;">
      <v-row justify="center" align="center" style="height: 100%;">
        <v-btn color="#1E88E5" style="position: absolute; bottom: 10px; right: 10px;">
          Pagar
        </v-btn>
      </v-row>
    </v-card>
  
  <br> 
  <v-card :elevation="10" :height="200" :width="450" border color="#E3F2FD" rounded style="margin-left: 50px; position: relative;">
    <v-row justify="center" align="center" style="height: 100%;">
      <v-btn color="#1E88E5" style="position: absolute; bottom: 10px; right: 10px;">
        Proceso
      </v-btn>
    </v-row>
  </v-card>
  <br> 
  <v-card :elevation="10" :height="200" :width="450" border color="#E3F2FD" rounded style="margin-left: 50px; position: relative;">
    <v-row justify="center" align="center" style="height: 100%;">
      <v-btn color="#1E88E5" style="position: absolute; bottom: 10px; right: 10px;">
        Detalle
      </v-btn>
    </v-row>
  </v-card>
 </v-app>
</template>

<style scoped>

.Fondo {
  background: url('../../assets/iii.svg') no-repeat center center fixed;
  background-size: cover;
  height: 100%;
}
</style>

  
