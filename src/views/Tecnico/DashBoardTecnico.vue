<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <!--  -->
    </v-navigation-drawer>

    <v-app-bar color="#010001">
      <v-app-bar-nav-icon color="#FE03D0" @click="drawer = !drawer" ></v-app-bar-nav-icon>

      <v-app-bar-titlec>Home</v-app-bar-titlec>
      
    </v-app-bar>

    <v-main >
      hola
    </v-main>
  </v-app>
</template>


<script setup>
  import { ref } from 'vue'

  const drawer = ref(null)
</script>

<script>
  export default {
    data: () => ({ drawer: null }),
  }
</script>