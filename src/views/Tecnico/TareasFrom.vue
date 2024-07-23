<template>
  <v-app id="app">
    <v-main>
      <v-container class="py-8 px-6" fluid>
        <v-row justify="center">
          <v-col cols="12" md="8">
            <div v-for="(table, index) in tables" :key="index" class="mb-6">
              <h3 class="text-center mb-4">{{ table.name }}</h3>
              <!-- Agregar filtro -->
              <v-text-field
                v-model="filters[index]"
                label="Filtrar"
                outlined
                class="mb-4"
              ></v-text-field>
              
              <!-- Agregar botón solo a las primeras dos tablas -->
              <v-btn v-if="index < 2" @click="handleButtonClick(index)" color="primary" class="mb-4">
                Botón {{ index + 1 }}
              </v-btn>

              <v-simple-table dense class="elevation-1">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">{{ headers[0].text }}</th>
                      <th class="text-left">{{ headers[1].text }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, idx) in filteredItems(index)" :key="idx">
                      <td>{{ item.name }}</td>
                      <td>{{ item.subtitle }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';

const tables = ref([
  {
    name: 'Tareas Asignadas',
    items: [
      { name: 'Message 1 (Today)', subtitle: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil repellendus distinctio similique' },
      { name: 'Message 2 (Today)', subtitle: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil repellendus distinctio similique' },
    ]
  },
  {
    name: 'Tareas en proceso',
    items: [
      { name: 'Message 1 (Yesterday)', subtitle: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil repellendus distinctio similique' },
      { name: 'Message 2 (Yesterday)', subtitle: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil repellendus distinctio similique' },
    ]
  },
  {
    name: 'Tareas Completadas',
    items: [
      { name: 'Message 1 (Inbox)', subtitle: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil repellendus distinctio similique' },
      { name: 'Message 2 (Inbox)', subtitle: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil repellendus distinctio similique' },
    ]
  },
]);

const headers = ref([
  { text: 'Name', align: 'start' },
  { text: 'Subtitle', align: 'start' },
]);

const filters = ref(['', '', '']);

function filteredItems(index) {
  const filterText = filters[index].toLowerCase();
  return tables.value[index].items.filter(item =>
    item.name.toLowerCase().includes(filterText) ||
    item.subtitle.toLowerCase().includes(filterText)
  );
}

function handleButtonClick(index) {
  alert(`Botón ${index + 1} presionado.`);
}
</script>

<style scoped>
.text-center {
  text-align: center;
}

.v-simple-table {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.v-simple-table th, .v-simple-table td {
  padding: 12px 16px;
}

.v-simple-table thead {
  background-color: #f5f5f5;
}
</style>
