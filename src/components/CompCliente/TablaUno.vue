<template>
  <v-card class="mb-6 custom-card" outlined>
    <v-card-title>
      <v-row justify="space-between" align="center" class="w-100">
        <v-col>
          <h3 class="title">Por pagar</h3>
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
              <th class="text-left">Problema</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, idx) in filteredItems"
              :key="'asignadas_' + idx"
              :class="{ 'selected-row': selectedItem === item }"
              @click="selectItem(item)"
            >
              <td>{{ item.producto }}</td>
              <td>{{ item.problema }}</td>
            </tr>
            <tr v-if="!filteredItems.length">
              <td colspan="2" class="text-center py-4">No tienes pagos pendientes.</td>
            </tr>
          </tbody>
        </v-simple-table>
      </div>
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn @click="processPayment" color="#ffffff" class="custom-btn">pagar</v-btn>
    </v-card-actions>
  </v-card>

  <!-- Dialog for item details -->
  <v-dialog v-model="dialog" max-width="800px">
    <v-card>
      <v-card-title>
        <span class="headline title">Detalles</span>
      </v-card-title>
      <v-card-subtitle>
        <v-row>
          <v-col cols="6">
            <div class="detail-item"><strong>Producto:</strong> {{ itemDetails.producto }}</div>
            <div class="detail-item"><strong>Problema:</strong> {{ itemDetails.problema }}</div>
            <div class="detail-item">
              <strong>Costo de Chequeo:</strong> {{ itemDetails.costoChequeo }}
            </div>
            <div class="detail-item">
              <strong>Costo de Reparación:</strong> {{ itemDetails.costoReparacion }}
            </div>
          </v-col>
          <v-col cols="6">
            <div class="detail-item">
              <strong>Diagnóstico:</strong> {{ itemDetails.diagnostico }}
            </div>
          </v-col>
        </v-row>
      </v-card-subtitle>
      <v-card-actions>
        <v-btn text @click="redirectToPayment">Confirmar</v-btn>
        <v-btn text @click="rejectPayment">Cancelar</v-btn>
        <v-btn text @click="handleCancellation">Cancelado</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Snackbar for cancellation message -->
  <v-snackbar v-model="cancellationSnackbar.show" timeout="5000">
    Favor de pasar al local a pagar el chequeo y recoger el producto
  </v-snackbar>

  <!-- Snackbar for selection warning -->
  <v-snackbar v-model="snackbar.visible" :color="snackbar.color" timeout="3000">
    {{ snackbar.message }}
    <v-btn text @click="snackbar.visible = false">Cerrar</v-btn>
  </v-snackbar>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import apiCliente from '@/axiosconf'

const router = useRouter()

const localFilterText = ref('')
const filteredItems = ref([])
const selectedItem = ref(null)
const dialog = ref(false)
const snackbar = ref({ visible: false, message: '', color: 'error' })
const cancellationSnackbar = ref({ show: false })
const itemDetails = ref({
  producto: '',
  problema: '',
  costoChequeo: '',
  costoReparacion: '',
  diagnostico: ''
})

const fetchItems = async () => {
  try {
    const token = localStorage.getItem('token') // Obtén el token almacenado
    const response = await apiCliente.post(
      `ClienteCitas`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    filteredItems.value = response.data.data.citas // Asigna los datos a `filteredItems`
  } catch (error) {
    console.error('Error fetching items:', error)
  }
}

const rejectPayment = async () => {
  try {
    // Verificar que un servicio esté seleccionado
    if (!selectedItem.value || !selectedItem.value.id_detalle_linea) {
      alert('Primero debes seleccionar un servicio.')
      return
    }

    // Enviar solicitud para rechazar el pago
    const response = await apiCliente.post('linearechazado', {
      id_detalle_linea: selectedItem.value.id_detalle_linea
    })

    // Mostrar mensaje de éxito
    alert('El pago ha sido rechazado exitosamente.')

    console.log('Respuesta del servidor:', response) // Para depuración

  } catch (error) {
    // Mostrar mensaje de error
    alert('Ocurrió un error al rechazar el pago. Intenta nuevamente.')

    console.error('Error al rechazar el pago:', error) // Para depuración
  }
}


onMounted(fetchItems) // Llama a fetchItems cuando el componente se monta

const redirectToPayment = () => {
  if (selectedItem.value) {
    router.push({ path: '/PagoFinal', query: { item: JSON.stringify(selectedItem.value) } });
  }
};

const selectItem = (item) => {
  selectedItem.value = item;
  localStorage.setItem('selectedItem', JSON.stringify(item));
};

const openDialog = () => {
  if (selectedItem.value) {
    itemDetails.value = {
      producto: selectedItem.value.producto,
      problema: selectedItem.value.problema,
      costoChequeo: selectedItem.value.costo_chequeo,
      costoReparacion: selectedItem.value.costo_reparacion,
      diagnostico: selectedItem.value.diagnostico_linea
    }
    dialog.value = true
  } else {
    snackbar.value = { visible: true, message: 'Primero selecciona un servicio.', color: 'error' }
  }
}

const processPayment = () => {
  if (!selectedItem.value) {
    snackbar.value = { visible: true, message: 'Primero selecciona un servicio.', color: 'error' }
    return
  }
  openDialog()
}

const handleCancellation = async () => {
  // Rechazar el pago
  await rejectPayment();

  // Mostrar el snackbar por 5 segundos
  cancellationSnackbar.value.show = true;

  // Después de 5 segundos, redirigir a /PagoFinal
  setTimeout(() => {
    router.push({ path: '/PagoFinal' });
  }, 5000);
};
</script>

<style scoped>
.custom-card {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
  color: #DC143C; /* Azul para el título */
  font-size: 24px;
  font-weight: bold;
}

.table-container {
  width: 100%; /* Asegura que la tabla ocupe todo el ancho del card */
  max-height: 400px; /* Ajusta la altura según tus necesidades */
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
  background-color: #ffad00;
  color: #ffffff;
}

.custom-btn:hover {
  background-color: #1976d2;
}

.v-dialog .v-card {
  padding: 16px;
}

.detail-item {
  margin-bottom: 8px;
}

.v-snackbar {
  bottom: 100px;
}
</style>
