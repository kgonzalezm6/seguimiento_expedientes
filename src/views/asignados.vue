<template>
    <div>
        <datatable :data="expedienteStore.datos_asignados" :headers="expedienteStore.headers_asignados">
            <template #actions="{ item }">
                <div class="flex justify-center">
                    <tooltip message="Aceptar tarea" v-if="item.status_tarea == 1">
                        <icon icon="check" class="hover:scale-110 cursor-pointer mt-4 text-yellow-500 text-2xl"
                            @click="expedienteStore.action(item, 3)" />
                    </tooltip>
                    <tooltip message="Finalizar tarea" v-if="item.status_tarea == 2">
                        <icon icon="clipboard-check" class="hover:scale-110 cursor-pointer mt-4 text-teal-500 text-2xl"
                            @click="expedienteStore.action(item, 2)" />
                    </tooltip>
                </div>
            </template>
        </datatable>
        <finalizar />
        <aceptar />
        
    </div>
</template>
<script setup>
    import { onBeforeMount } from 'vue';
    import { useGlobalStore } from '../stores/global';
    import { useexpedientesStore } from '../stores/expedientes';
    import finalizar from '../components/expedientes/finalizar.vue';
    import aceptar from '../components/expedientes/aceptar.vue';
    const globalStore = useGlobalStore();

    globalStore.changeTitlePage('Expedientes','folder-open','bg-green-500');
const expedienteStore = useexpedientesStore();
globalStore.changeTitlePage('Expedientes', 'folder-open', 'bg-green-500');
onBeforeMount(() => {
    expedienteStore.getAsignados();
});
</script>