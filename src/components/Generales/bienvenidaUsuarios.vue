<template>
  <div class="welcome" v-if="showWelcome" @click="closeWelcome">
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

const closeWelcome = () => {
  showWelcome.value = false
}

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
  30% {
    clip-path: circle(30%);
    background: rgb(255, 255, 255);
  }
  50% {
    clip-path: circle(50%);
    background: rgb(0, 0, 0);
  }
  70% {
    clip-path: circle(70%);
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
  animation: fadeIn 1s ease-out forwards;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
