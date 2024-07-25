<template>
  <div class="custom-input-container">
    <label v-if="label" :for="id">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="updateValue"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>

<style scoped>
.custom-input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.custom-input-container label {
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.custom-input-container input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.custom-input-container input:focus {
  border-color: #40916c; /* Puedes cambiar este color según tu paleta */
  outline: none;
}
</style>
