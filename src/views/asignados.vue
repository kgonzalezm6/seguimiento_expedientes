<template>
    <div>
        <h1>Asignados</h1>
    </div>
</template>
<script setup>
    import { useGlobalStore } from '../stores/global';

    const globalStore = useGlobalStore();

    globalStore.changeTitlePage('Expedientes','folder-open','bg-green-500');
</script>