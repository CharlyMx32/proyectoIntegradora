<template>
  <v-card class="mb-6 custom-card" outlined>
    <v-card-title>
      <v-row justify="space-between" align="center" class="w-100">
        <v-col>
          <h3 class="title">Completado</h3>
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
              <th class="text-left">Estado</th>
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
              <td>{{ item.seguimiento }}</td>
            </tr>
            <tr v-if="!filteredItems.length">
              <td colspan="2" class="text-center py-4">No tienes citas completadas.</td>
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
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Ticket</span>
      </v-card-title>
      <v-card-text>
        <div class="detail-item"><strong>Nombre del Técnico:</strong> {{ dialogData.nombre }}</div>
        <div class="detail-item"><strong>Producto:</strong> {{ dialogData.producto }}</div>
        <div class="detail-item"><strong>Problema:</strong> {{ dialogData.problema }}</div>
        <div class="detail-item">
          <strong>Costo de Chequeo:</strong> {{ dialogData.costoChequeo }}
        </div>
        <div class="detail-item">
          <strong>Costo de Reparación:</strong> {{ dialogData.costoReparacion }}
        </div>
        <div class="detail-item"><strong>Total:</strong> {{ dialogData.total }}</div>
        <div class="detail-item">
          <strong>Tiempo Garantía:</strong> {{ dialogData.tiempoGarantia }}
        </div>
        <div class="detail-item"><strong>Diagnóstico:</strong> {{ dialogData.diagnostico }}</div>
        <div class="detail-item"><strong>Uso Garantía:</strong> {{ dialogData.usoGarantia }}</div>
        <div class="detail-item">
          <strong>Estado del Pago:</strong> {{ dialogData.estadoDelPago }}
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="downloadPDF" color="primary">Descargar</v-btn>
        <v-btn text @click="closeDialog">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import jsPDF from 'jspdf'
import apiCliente from '@/axiosconf'

// Variables reactivas
const localFilterText = ref('')
const items = ref([]) // Almacena las citas
const selectedItem = ref(null) // Almacena la cita seleccionada
const dialog = ref(false) // Controla la visibilidad del diálogo
const dialogData = ref({
  nombre: '',
  producto: '',
  problema: '',
  costoChequeo: '',
  costoReparacion: '',
  total: '',
  tiempoGarantia: '',
  diagnostico: '',
  usoGarantia: '',
  estadoDelPago: ''
})

// Función para obtener las citas completadas
const fetchItems = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await apiCliente.post(
      `ClienteCitasCompletadas`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    items.value = response.data.data.citas // Asigna correctamente las citas obtenidas
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
      nombre: selectedItem.value.nombre_tecnico,
      producto: selectedItem.value.producto,
      problema: selectedItem.value.problema,
      costoChequeo: selectedItem.value.costo_chequeo,
      costoReparacion: selectedItem.value.costo_reparacion,
      total: selectedItem.value.total,
      tiempoGarantia: selectedItem.value.tiempo_garantia,
      diagnostico: selectedItem.value.diagnostico_linea,
      usoGarantia: selectedItem.value.uso_garantia,
      estadoDelPago: selectedItem.value.estado_del_pago
    }
    dialog.value = true
  } else {
    console.warn('No item selected')
  }
}

// Cierra el diálogo
const closeDialog = () => {
  dialog.value = false
}

// Función para descargar el PDF
const downloadPDF = () => {
  const doc = new jsPDF()
  

  // Agregar título con estilo centrado
  doc.setFontSize(26) // Hacer el título más grande
  doc.setFont("helvetica", "bold")
  doc.setTextColor(0, 0, 0) // Color negro para el texto
  const title = 'HardwareSolutions'
  const titleWidth = doc.getStringUnitWidth(title) * 26 / doc.internal.scaleFactor
  const pageWidth = doc.internal.pageSize.getWidth()
  doc.text(title, (pageWidth - titleWidth) / 2, 20) // Centrar el título
 
  // Agregar contenido con diseño mejorado
  doc.setFontSize(14)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(0, 0, 0) // Color negro para el texto

  const lineHeight = 10
  let y = 35

  doc.text(`Nombre del Técnico: ${dialogData.value.nombre}`, 10, y += lineHeight)
  doc.text(`Producto: ${dialogData.value.producto}`, 10, y += lineHeight)
  doc.text(`Problema: ${dialogData.value.problema}`, 10, y += lineHeight)
  doc.text(`Costo de Chequeo: ${dialogData.value.costoChequeo}`, 10, y += lineHeight)
  doc.text(`Costo de Reparación: ${dialogData.value.costoReparacion}`, 10, y += lineHeight)
  doc.text(`Total: ${dialogData.value.total}`, 10, y += lineHeight)
  doc.text(`Diagnóstico: ${dialogData.value.diagnostico}`, 10, y += lineHeight)
 

  // Agregar un pie de página
  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100) // Color gris para el pie de página
  doc.text('© 2024 Hardware Solutions', 10, 280)

  // Guarda el PDF
  doc.save('ticket_reparacion.pdf')
}





// Llama a fetchItems cuando el componente se monta
onMounted(fetchItems)
</script>

<style scoped>
.custom-card {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
  color: #93C572;
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