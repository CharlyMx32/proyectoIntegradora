<template>
  <div>
    <barra-cliente/>
  </div>
  <div>
    <PrincipalCliente/>
    <router-view/>
  </div>
  </template>


  <script setup>
  import router from '@/router';
  import PrincipalCliente from './PrincipalCliente.vue';
  import BarraCliente from '@/components/CompCliente/BarraCliente.vue';

</script>




 
  


