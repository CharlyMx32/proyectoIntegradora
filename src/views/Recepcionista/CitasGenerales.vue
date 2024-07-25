<template>
    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="serverItems"
      :items-length="totalItems"
      :loading="loading"
      item-value="name"
      @update:options="loadItems"
    ></v-data-table-server>
  </template>
  <script>
    const Nombre = [
      {
        name: 'Angela Aguilar',
        producto: 'Television',
        cuenta: 'porqueeresmi@novio.cristian',
        pago: 'Pendiente',
        garantia: 'Pendiente',
      },
      {
        name: 'Gloria Trevi',
        producto: 'Celular',
        cuenta: 'gloriatre@gmail.com',
        pago: 'Pendiente',
        garantia: 'Pendiente',
      },
      {
        name: 'hola 2',
        producto: 'Celular',
        cuenta: 'gloriatre@gmail.com',
        pago: 'Pendiente',
        garantia: 'Pendiente',
      },
      {
        name: 'Hola 3',
        producto: 'Celular',
        cuenta: 'gloriatre@gmail.com',
        pago: 'Pendiente',
        garantia: 'Pendiente',
      },
      {
        name: 'Hola 4',
        producto: 'Celular',
        cuenta: 'gloriatre@gmail.com',
        pago: 'Pendiente',
        garantia: 'Pendiente',
      },
      {
        name: 'Hola 5',
        producto: 'Celular',
        cuenta: 'gloriatre@gmail.com',
        pago: 'Pendiente',
        garantia: 'Pendiente',
      },
      {
        name: 'Hola 6',
        producto: 'Celular',
        cuenta: 'gloriatre@gmail.com',
        pago: 'Pendiente',
        garantia: 'Pendiente',
      },
      {
        name: 'Hola 7',
        producto: 'Celular',
        cuenta: 'gloriatre@gmail.com',
        pago: 'Pendiente',
        garantia: 'Pendiente',
      },
    ]
  
    const FakeAPI = {
      async fetch ({ page, itemsPerPage, sortBy }) {
        return new Promise(resolve => {
          setTimeout(() => {
            const start = (page - 1) * itemsPerPage
            const end = start + itemsPerPage
            const items = Nombre.slice()
  
            if (sortBy.length) {
              const sortKey = sortBy[0].key
              const sortOrder = sortBy[0].order
              items.sort((a, b) => {
                const aValue = a[sortKey]
                const bValue = b[sortKey]
                return sortOrder === 'desc' ? bValue - aValue : aValue - bValue
              })
            }
  
            const paginated = items.slice(start, end)
  
            resolve({ items: paginated, total: items.length })
          }, 500)
        })
      },
    }
  
    export default {
      data: () => ({
        itemsPerPage: 5,
        headers: [
          {
            title: 'Nombre cliente',
            align: 'start',
            sortable: false,
            key: 'name',
          },
          { title: 'Producto', key: 'producto', align: 'end' },
          { title: 'Cuenta', key: 'cuenta', align: 'end' },
          { title: 'Pago', key: 'pago', align: 'end' },
          { title: 'Garantia', key: 'garantia', align: 'end' },
        ],
        serverItems: [],
        loading: true,
        totalItems: 0,
      }),
      methods: {
        loadItems ({ page, itemsPerPage, sortBy }) {
          this.loading = true
          FakeAPI.fetch({ page, itemsPerPage, sortBy }).then(({ items, total }) => {
            this.serverItems = items
            this.totalItems = total
            this.loading = false
          })
        },
      },
    }
  </script> 