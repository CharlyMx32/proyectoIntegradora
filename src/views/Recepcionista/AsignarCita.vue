<template>
    <v-container>
      <v-card
        class="mx-auto"
        color="surface-light"
        max-width="400"
      >
        <v-card-text>
          <v-text-field
            :loading="loading"
            append-inner-icon="mdi-magnify"
            density="compact"
            label="Filtrar la fecha"
            variant="solo"
            hide-details
            single-line
            @click:append-inner="onClick"
          ></v-text-field>  
        </v-card-text>
      </v-card>
  
      <v-row>
        <v-col cols="12" md="6">
          <div>
            <h1>CITAS</h1>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div>
            <h1>EMPLEADO</h1>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-btn variant="tonal">
  ASIGNAR
</v-btn>
    
  </template>
<script>
  export default {
    data: () => ({
      loaded: false,
      loading: false,
    }),

    methods: {
      onClick () {
        this.loading = true

        setTimeout(() => {
          this.loading = false
          this.loaded = true
        }, 2000)
      },
    },
  }
</script>
  


  

