<script setup>
    import mapa from '../components/Mapa.vue'
</script>
<template>
    <div class="relative w-full py-4 grid lg:grid-cols-3 gap-7 bg-lime-muni border-t-2 border-lime-500 overflow-hidden ">
        
        <mapa class="stroke-lime-500 absolute lg:top-[-700px]  z-0 " />
        
        <div class="flex justify-center z-10 ">
            <img src="../assets/img/logo.svg" class="w-48" alt="">
        </div>
        <div class=" text-center lg:text-left text-blue-muni z-10">
            <h1 class="text-2xl lg:text-3xl font-bold  lg:tracking-[.25em]">¿ Necesitas ayuda ?</h1>
            <br>
            <div class="flex space-x-4 items-center justify-center lg:justify-start">
                <icon icon="fa-solid fa-envelope" class=" lg:text-xl " />
                <h2 class="lg:text-md ">gestiondeserviciosdcai@muniguate.com</h2>
            </div>
            <div class="flex space-x-4 items-center justify-center lg:justify-start">
                <icon icon="fa-solid fa-phone" class="text-xl lg:text-xl " />
                <h2 class=" lg:text-md ">2285-8610</h2>
            </div>
            <hr class="my-2 border-green-600 border-2">
            <div class="flex space-x-4 items-center justify-center lg:justify-start">
                <icon icon="fa-solid fa-envelope" class=" lg:text-xl " />
                <h2 class="lg:text-md ">soportecatastro@muniguate.com</h2>
            </div>
            <div class="flex space-x-4 items-center justify-center lg:justify-start">
                <icon icon="fa-solid fa-phone" class="text-xl lg:text-xl " />
                <h2 class=" lg:text-md ">2285-8687</h2>
            </div>
        </div>
        <div class="flex items-end text-blue-muni z-10">
            <p class=" font-medium text-center ">© 2023 Dirección de Catastro y Administración del IUSI</p>
        </div>
    </div>
</template>
