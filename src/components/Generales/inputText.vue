<!-- src/components/CustomVuetifyInput.vue -->
<template>
  <v-text-field
    :label="label"
    :placeholder="placeholder"
    :type="type"
    v-model="modelvalue"
    :class="customClass"
    :style="customStyle"
    :outlined="outlined"
  />
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  customClass: {
    type: String,
    default: ''
  },
  customStyle: {
    type: Object,
    default: () => ({})
  },
  outlined: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
.custom-input {
  /* Añade estilos personalizados aquí */
  border-radius: 8px;
  border: 1px solid #ccc;
}
</style>
