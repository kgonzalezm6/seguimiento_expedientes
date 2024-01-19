<template>
    <div>
        <div class="flex justify-center items-center">
            <div class="ml-2 group h-16 w-16 bg-blue-500 rounded-full overflow-hidden hover:bg-blue-800 hover:w-40 
                hover:h-12 transition-all duration-300 grid justify-items-center relative">
                <span class="-mt-20 group-hover:mt-3 text-white font-bold transition-all duration-300 group-hover:ml-6"> WORKFLOW</span>
                <icon icon="file-lines" class="absolute top-5 text-white text-2xl transition-all duration-300 
                group-hover:text-xl group-hover:mr-28 group-hover:-mt-2"/>
            </div>
            <div class="ml-2 group h-16 w-16 bg-blue-500 rounded-full overflow-hidden hover:bg-blue-800 hover:w-36 
                hover:h-12 transition-all duration-300 grid justify-items-center relative">
                <span class="-mt-20 group-hover:mt-3 text-white font-bold transition-all duration-300"> SAP</span>
                <icon icon="file-lines" class="absolute top-5 text-white text-2xl transition-all duration-300 group-hover:text-xl group-hover:mr-24 group-hover:-mt-2"/>
            </div>
        </div>
        <div class="mt-8">
            <tab :tabs="tabs" />
        </div>
    </div>
</template>
<script setup>
import { useGlobalStore } from '../stores/global';
import sinAsignar from './sin-asignar.vue';
import asignados from './asignados.vue';
import finalizados from './finalizados.vue'
const globalStore = useGlobalStore();

globalStore.changeTitlePage('Expedientes', 'folder-open', 'bg-green-500');

const tabs = [
    { title: 'POR ASIGNAR', component: sinAsignar },
    { title: 'ASIGNADOS', component: asignados },
    { title: 'FINALIZADOS', component: finalizados }
];
</script>