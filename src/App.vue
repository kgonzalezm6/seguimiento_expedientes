<script setup>
import { ref } from 'vue';
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth'
import { onMounted } from 'vue'

import LoadingBar from './components/LoadingBar.vue'
import BackTop from './components/BackTop.vue'

const authStore = useAuthStore()

  onMounted(()=>{
    authStore.login()
  });

</script>

<template>
  <div v-if="!authStore.tabsCargadas" class="h-screen flex justify-center items-center">
    <div class="grid justify-items-center">
      <img src="./assets/img/mapa.gif" alt="">
      <h1 class="text-4xl text-blue-muni font-bold">Ingresando <span class="animate-ping text-4xl text-center">. . . .</span></h1>
    </div>
  </div>
  <RouterView />
  <BackTop />
</template>

