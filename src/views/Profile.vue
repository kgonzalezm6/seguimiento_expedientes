<template>
    <div>
        <div class="w-full rounded-xl p-4 grid grid-cols-3 gap-4 mb-10">
            <div class="col-span-1 bg-blue-500 rounded-xl  grid">
                <img class="w-44 h-44 rounded-full bg-gray-500 mt-8 mx-auto"
                    src="https://udicat.muniguate.com/catastro/GestionServicios/PerfilCatastro/10395809-6/Kevin%20Gonz%C3%A1lez.jpg"
                    alt="Kevin Gonzalez" srcset="">
                <span class="text-white font-bold mx-auto">KEVIN RICARDO GONZÁLEZ MARTÍNEZ</span>
                <span class="text-white mx-auto">DPI: 2819 29408 0101</span>
                <span class="text-white ml-4">Coordinación De Sistemas 
                    De Información Y Soporte </span>
            </div>
            <div class="col-span-2 rounded-xl">
                <div class="grid grid-cols-3 gap-4">
                    <div v-for="i in datos" class="bg-white h-60 border-b-4  rounded-xl grid"
                        :class="i.border" @click="i.action">               
                        <icon :icon="i.icon" class="text-6xl mt-10 mx-auto" :class="i.txtcolor" />
                        <span class="text-2xl mx-auto font-semibold">{{ i.text }}</span>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
const authStore = useAuthStore();
const datos = ref([
    { text: 'Hoja de vida', icon: 'address-card', border:'border-[#ff9100]', txtcolor:'text-[#ff9100]', action: () => { console.log('que pepas')} },
    { text: 'Datos generales', icon: 'file', border: 'border-[#54c8e8]', txtcolor:'text-[#54c8e8]' },
    { text: 'RAVEN', icon: 'brain', color: 'red', border: 'border-[#f5333f]', txtcolor:'text-[#f5333f]' },
    { text: 'Temperamento', icon: 'masks-theater', border: 'border-[#ffce00]', txtcolor:'text-[#ffce00]' },
    { text: 'Varios', icon: 'paste', color: 'blue', border: 'border-[#1700a5]', txtcolor:'text-[#1700a5]' },
    { text: 'Ficha de salud', icon: 'heart-pulse', border: 'border-[#00bc70]', txtcolor:'text-[#00bc70]' },
]);
</script>

