<template>
    <div>
        <div class="flex justify-center items-center select-none">
            <!-- <div class="ml-2 group h-16 w-16 bg-blue-500 rounded-full overflow-hidden hover:bg-blue-800 hover:w-40 
                hover:h-12 transition-all duration-300 grid justify-items-center relative">
                <span class="-mt-20 group-hover:mt-3 text-white font-bold transition-all duration-300 group-hover:ml-6"> WORKFLOW</span>
                <icon icon="file-lines" class="absolute top-5 text-white text-2xl transition-all duration-300 
                group-hover:text-xl group-hover:mr-28 group-hover:-mt-2"/>
            </div>
            <div class="ml-2 group h-16 w-16 bg-blue-500 rounded-full overflow-hidden hover:bg-blue-800 hover:w-36 
                hover:h-12 transition-all duration-300 grid justify-items-center relative">
                <span class="-mt-20 group-hover:mt-3 text-white font-bold transition-all duration-300"> SAP</span>
                <icon icon="file-lines" class="absolute top-5 text-white text-2xl transition-all duration-300 group-hover:text-xl group-hover:mr-24 group-hover:-mt-2"/>
            </div> -->
            <div class="flex space-x-2 justify-end">
      <span>WORKFLOW</span>
      <label
        class="relative block aspect-[2/0.75] w-14 rounded-full bg-blue-500 shadow-2xl shadow-blue-300 transition-all duration-300 hover:bg-blue-600 focus:bg-blue-700 ">
        <!-- Cambia el color a azul y elimina el gradiente -->
        <input class="peer/input hidden" type="checkbox" v-model="store.isWorkFlow">
        <div
          class="absolute right-[3%] top-1/2 aspect-square h-[70%] -translate-y-1/2 rotate-180 rounded-full bg-white transition-all duration-500 peer-checked/input:right-[63%] peer-checked/input:-rotate-6">
        </div> <!-- Ajusta las posiciones y elimina el gradiente -->
      </label>
      <span>IUSI-CASO</span>
    </div>
        </div>
        <div class="mt-8">
            <tab :tabs="tabs" />
        </div>
    </div>

</template>
<script setup>
import { ref, onBeforeMount, watch, toRef } from 'vue';
import { useGlobalStore } from '../stores/global';
import { useexpedientesStore } from '../stores/expedientes';
import sinAsignar from './sin-asignar.vue';
import asignados from './asignados.vue';
import finalizados from './finalizados.vue'

const globalStore = useGlobalStore();
const store = useexpedientesStore();
globalStore.changeTitlePage('Expedientes', 'folder-open', 'bg-green-500');

const tabs = [
    
    { title: 'Por asignar', component: sinAsignar },
    { title: 'Asignados', component: asignados },
    { title: 'Finalizados', component: finalizados }
];

</script>