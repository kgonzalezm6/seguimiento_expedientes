<template>
    <div>
        <datatable :data="expedienteStore.datos_sin_asignar" :headers="expedienteStore.headers_sin_asignar">
            <template #actions="{ item }">
                <div class="flex justify-center">
                    <tooltip message="Asignar expediente">
                        <icon icon="user-check" class="hover:scale-110 cursor-pointer mt-4 text-orange-400 text-2xl"
                            @click="expedienteStore.action(item, 1)" />
                    </tooltip>
                </div>

            </template>
        </datatable>
        <asignar/>
    </div>
</template>
<script setup>
import { onBeforeMount } from 'vue';
import { useGlobalStore } from '../stores/global';
import { useexpedientesStore } from '../stores/expedientes';
import asignar from '../components/expedientes/asignar.vue';
const globalStore = useGlobalStore();
const expedienteStore = useexpedientesStore();
globalStore.changeTitlePage('Expedientes', 'folder-open', 'bg-green-500');
onBeforeMount(() => {
    expedienteStore.getSinAsignar();
});

</script>