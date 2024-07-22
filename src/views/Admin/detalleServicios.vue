<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-data-table
      :headers="headers"
      :items="users"
      item-key="id_persona"
      dense
      class="elevation-1"
      style="max-width: 800px; width: 100%"
    >
      <!-- Slot for customizing the default table cell rendering -->
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.nombre }}</td>
          <td>{{ item.telefono }}</td>
        </tr>
      </template>

      <!-- Custom header slot -->
      <template v-slot:column="{ column }">
        <th>{{ column.text }}</th>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const users = ref([])
const headers = [
  { text: 'Name', value: 'nombre' },
  { text: 'Phone', value: 'telefono' }
]

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost/myproject/srcphp/model')
    users.value = response.data
  } catch (error) {
    console.error('Error fetching users:', error)
  }
})
</script>
