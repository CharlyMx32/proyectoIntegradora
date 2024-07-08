<template>
  <v-container>
    <v-card class="mx-auto" max-width="400">
      <v-card-title>
        <span class="headline">Iniciar sesión</span>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field v-model="email" label="Email" required></v-text-field>
          <v-text-field
            v-model="password"
            label="Contraseña"
            type="password"
            required
          ></v-text-field>
          <v-btn type="submit" color="primary">Iniciar sesión</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      // Aquí implementarías la lógica para autenticar al usuario
      // Puedes usar Vuex para gestionar el estado de la autenticación
      // Ejemplo básico de autenticación
      if (this.email === 'usuario@example.com' && this.password === 'contraseña') {
        // Redirigir al usuario a la vista correspondiente según su rol
        this.$router.push('/cliente/dashboard') // Ejemplo de redirección a la vista de cliente
      } else {
        alert('Credenciales incorrectas')
      }
    }
  }
}
</script>

<style scoped>
/* Estilos específicos para el componente de login */
</style>
