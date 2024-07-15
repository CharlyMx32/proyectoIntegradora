<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-table dense height="300px">
      <thead>
        <tr>
          <th class="text-left" style="width: 50%">Name</th>
          <th class="text-left" style="width: 50%">Calories</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in desserts" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.calories }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const desserts = ref([
  {
    name: 'Frozen Yogurt',
    calories: 159
  },
  {
    name: 'Ice cream sandwich',
    calories: 237
  },
  {
    name: 'Eclair',
    calories: 262
  },
  {
    name: 'Cupcake',
    calories: 305
  },
  {
    name: 'Gingerbread',
    calories: 356
  },
  {
    name: 'Jelly bean',
    calories: 375
  },
  {
    name: 'Lollipop',
    calories: 392
  },
  {
    name: 'Honeycomb',
    calories: 408
  },
  {
    name: 'Donut',
    calories: 452
  },
  {
    name: 'KitKat',
    calories: 518
  }
])
</script>

<script>
export default {
  data() {
    return {
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159
        },
        {
          name: 'Ice cream sandwich',
          calories: 237
        },
        {
          name: 'Eclair',
          calories: 262
        },
        {
          name: 'Cupcake',
          calories: 305
        },
        {
          name: 'Gingerbread',
          calories: 356
        },
        {
          name: 'Jelly bean',
          calories: 375
        },
        {
          name: 'Lollipop',
          calories: 392
        },
        {
          name: 'Honeycomb',
          calories: 408
        },
        {
          name: 'Donut',
          calories: 452
        },
        {
          name: 'KitKat',
          calories: 518
        }
      ]
    }
  }
}
</script>

<style scoped>
/* Estilo para hacer la tabla más compacta */
.v-table {
  font-size: 14px; /* Tamaño de fuente más pequeño */
  width: 800px;
  border: 1px solid rgb(171, 171, 171);
  border-radius: 5px;
  padding: 10px;
}

/* Estilos para las celdas */
.text-left {
  text-align: left; /* Alineación del texto a la izquierda */
  padding: 8px; /* Padding interno de las celdas */
}

/* Estilos para filas alternas (opcional) */
tbody tr:nth-child(even) {
  background-color: #f2f2f2; /* Fondo gris claro para filas pares */
}

.fill-height {
  height: 100%;
}
.align-center {
  align-items: center;
}
.justify-center {
  justify-content: center;
}

.card {
  padding: 20px;
  margin: 0%;
}

.my-custom-class {
  border-radius: 8px;
  background-color: #f0f0f0;
  color: #333;
}

.v-text-field {
  margin-bottom: 16px;
}
</style>
