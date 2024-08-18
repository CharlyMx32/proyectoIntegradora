<template>
    <v-card class="mb-6 custom-card" outlined>
      <v-card-title>
        <v-row justify="space-between" align="center" class="w-100">
          <v-col>
            <h3 class="title">Citas Pendientes</h3>
          </v-col>
          <v-col class="d-flex justify-end">
            <v-text-field
              v-model="localFilterText"
              label="Buscar"
              outlined
              dense
              hide-details
              class="filter-field"
              prepend-icon="mdi-magnify"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <div class="table-container">
          <v-simple-table dense class="custom-table">
            <thead>
              <tr>
                <th class="text-left">Producto</th>
                <th class="text-left">Día</th>
                <th class="text-left">Hora</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, idx) in filteredItems"
                :key="'completado_' + idx"
                :class="{ 'selected-row': selectedItem === item }"
                @click="selectItem(item)"
              >
                <td>{{ item.producto }}</td>
                <td>{{ item.fecha_cita}}</td>
                <td>{{ item.fecha_hora}}</td>
              </tr>
              <tr v-if="!filteredItems.length">
                <td colspan="2" class="text-center py-4">No tienes citas pendientes.</td>
              </tr>
            </tbody>
          </v-simple-table>
        </div>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn @click="openDetailDialog" color="#ffffff" class="custom-btn">Detalle</v-btn>
      </v-card-actions>
    </v-card>
  
    <!-- Dialogo para ver detalles -->
    <!-- Dialogo para ver detalles -->
<v-dialog v-model="dialog" max-width="600px">
  <v-card>
    <v-card-title>
      <span class="headline">Detalles de Cita</span>
    </v-card-title>
    <v-card-text>
      <div class="detail-item"><strong>Producto:</strong> {{ dialogData.producto }}</div>
      <div class="detail-item"><strong>Día:</strong> {{ dialogData.fecha_cita }}</div>
      <div class="detail-item"><strong>Hora:</strong> {{ dialogData.fecha_hora }}</div>
      <div class="detail-item"><strong>Problema:</strong> {{ dialogData.problema }}</div>
    </v-card-text>
    <v-card-actions>
      <v-btn text @click="cancelarCita">Cancelar Cita</v-btn>
      <v-btn text @click="closeDialog">Cerrar</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>

  </template>
  
  <script setup>
import { ref, onMounted, computed } from 'vue'
import apiCliente from '@/axiosconf'

// Variables reactivas
const localFilterText = ref('')
const items = ref([]) // Almacena las citas
const selectedItem = ref(null) // Almacena la cita seleccionada
const dialog = ref(false) // Controla la visibilidad del diálogo
const dialogData = ref({
  id_orden_cita: '',
  producto: '',
  problema: '',
  fecha_cita: '',
  fecha_hora: ''
})

// Función para obtener las citas
const fetchItems = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await apiCliente.post(
      `ClienteCitasPendientes`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    items.value = response.data.data.citas 
  } catch (error) {
    console.error('Error fetching items:', error)
  }
}

// Computed para filtrar las citas basadas en el texto de búsqueda
const filteredItems = computed(() => {
  if (!localFilterText.value) {
    return items.value
  }
  return items.value.filter((item) =>
    item.producto.toLowerCase().includes(localFilterText.value.toLowerCase())
  )
})

// Selecciona un ítem de la tabla
const selectItem = (item) => {
  selectedItem.value = item
}

// Abre el diálogo con los detalles del ítem seleccionado
const openDetailDialog = () => {
  if (selectedItem.value) {
    dialogData.value = {
      producto: selectedItem.value.producto,
      fecha_cita: selectedItem.value.fecha_cita,
      fecha_hora: selectedItem.value.fecha_hora,
      problema: selectedItem.value.problema
    }
    dialog.value = true
  } else {
    console.warn('No item selected')
  }
}

const closeDialog = () => {
  dialog.value = false
  dialogData.value = {
    id_orden_cita: '',
    producto: '',
    problema: '',
    fecha_cita: '',
    fecha_hora: ''
  }
}

const cancelarCita = async () => {
  try {
    if (!selectedItem.value) {
      console.error('No se ha seleccionado ninguna cita para cancelar');
      return;
    }

    const token = localStorage.getItem('token');
    const requestData = { item: { id_orden_cita: selectedItem.value.id_orden_cita } };

    console.log('Datos que se enviarán:', requestData);
    
    const response = await apiCliente.post(
      `cancelarcita`,
      requestData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log('Respuesta del servidor:', response.data);

    if (response.data.success) {
      console.log('Cancelación exitosa');
      // Actualiza la lista de citas
      await fetchItems();
      // Cierra el diálogo
      closeDialog();
    } else {
      console.error('Error en la cancelación:', response.data.message);
    }
  } catch (error) {
    console.error('Error al cancelar la cita:', error);
  }
};

onMounted(fetchItems)
</script>

  <style scoped>
  .custom-card {
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .title {
    color: #72c5c5;
    font-size: 24px;
    font-weight: bold;
  }
  
  .table-container {
    max-height: 200px; /* Ajusta esta altura según tus necesidades */
    overflow-y: auto; /* Agrega scroll vertical si el contenido excede la altura */
  }
  
  .custom-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .custom-table thead {
    background-color: #E8E8E8;
  }
  
  .custom-table th,
  .custom-table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  .custom-table tbody tr:hover {
    background-color: #f0f0f0;
  }
  
  .selected-row {
    background-color: #e3f2fd;
  }
  
  .filter-field {
    max-width: 300px;
  }
  
  .custom-btn {
    background-color:  #ffad00;
    color: #ffffff;
  }
  
  .custom-btn:hover {
    background-color: #1976d2;
  }
  
  .detail-item {
    margin-bottom: 8px;
  }
  </style>
  