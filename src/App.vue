<template>
  <v-app class="fondo">
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent } from 'vue'
import { useAuthStore } from '@/stores/authStore'

export default defineComponent({
  setup() {
    const authStore = useAuthStore()
    authStore.checkAuth()

    return {
      authStore
    }
  }
})
</script>

<style></style>
