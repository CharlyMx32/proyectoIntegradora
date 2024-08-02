<template>
  <div class="welcome" v-if="showWelcome">
    <div class="animation">
      <h1>Bienvenido! {{ userName }}</h1>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  userName: {
    type: String,
    required: true
  }
})

const showWelcome = ref(true)

onMounted(() => {
  setTimeout(() => {
    showWelcome.value = false
  }, 2500) // Duración de la animación en milisegundos
})
</script>

<style scoped>
@keyframes circle-in-hesitate {
  0% {
    clip-path: circle(0%);
    background: rgb(255, 255, 255);
  }
  40% {
    clip-path: circle(40%);
    background: rgb(0, 0, 0);
  }
  100% {
    clip-path: circle(125%);
    background: rgb(0, 0, 0);
  }
}

.welcome {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: 3s cubic-bezier(0.25, 1, 0.3, 1) circle-in-hesitate both;
}

.animation h1 {
  color: #ffad00;
  font-size: 3rem;
  text-align: center;
}
</style>
