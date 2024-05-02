<template>
    <div>
        <div class="flex mt-5 justify-center" v-if="!store.isWorkFlow">
            <text-field option="label" title="no. documento" v-model="store.documento" class="h-10"/>
            <text-field option="label" title="año" v-model="store.anio" class="h-10"/>
            <btn class="bg-sky-muni text-white font-bold h-10" icon="magnifying-glass" @click="store.getSinAsignar()" />
        </div>
        <datatable :data="store.datos_sin_asignar" :headers="store.headers_sin_asignar" :loading="store.carga_sin_asignar">
            <template #actions="{ item }">
                <div class="flex justify-center">
                    <tooltip message="Detalle expediente">
                        <icon icon="eye" class="hover:scale-110 cursor-pointer mt-4 text-sky-300 text-2xl"
                            @click="store.action(item, 4)" />
                    </tooltip>
                    <tooltip message="Asignar expediente">
                        <icon icon="user-check" class="hover:scale-110 cursor-pointer mt-4 text-orange-400 text-2xl"
                            @click="store.action(item, 1)" />
                    </tooltip>
                </div>

            </template>
        </datatable>
        
        <asignar/>
        <detalle />
    </div>
</template>
<script setup>
import { onBeforeMount, toRef, watch } from 'vue';
import { useGlobalStore } from '../stores/global';
import { useexpedientesStore } from '../stores/expedientes';
import asignar from '../components/expedientes/asignar.vue';
import detalle from '../components/expedientes/detalle.vue';
const globalStore = useGlobalStore();
const store = useexpedientesStore();
globalStore.changeTitlePage('Expedientes', 'folder-open', 'bg-green-500');
onBeforeMount(() => {
    store.getSinAsignar();
});
const isWorkFlowRef = toRef(store,'isWorkFlow')
watch(isWorkFlowRef,(newVal) => {
    store.getSinAsignar();
});
</script>