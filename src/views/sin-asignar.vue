<template>
    <div>
       <datatable :options="expedienteStore.datos_sin_asignar" :headers="expedienteStore.headers_sin_asignar">

       </datatable>
    </div>
</template>
<script setup>
    import { onBeforeMount } from 'vue'; 
    import { useGlobalStore } from '../stores/global';
    import { useexpedientesStore } from '../stores/expedientes';
    const globalStore = useGlobalStore();
    const expedienteStore = useexpedientesStore();
    globalStore.changeTitlePage('Expedientes','folder-open','bg-green-500');
    onBeforeMount(() => {
        expedienteStore.getSinAsignar();
    })
</script>