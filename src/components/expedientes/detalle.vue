<template>
    <div>
        <modal :open="store.detalle" title="Detalle expediente"
            icon="file" @close="store.detalle = !store.detalle" class="w-5/6 bg-[#f4f4f4]">

            <div class="grid">
                <text-field v-model="store.one_expediente.nombre" option="label" title="nombre" class="w-full" disabled/>
                <text-field v-model="store.one_expediente.domicilio" option="label" title="domicilio" class="w-full" disabled/>
                <text-field v-model="store.one_expediente.telefono" option="label" title="telefono" class="w-full" disabled/>
                <text-field v-model="store.one_expediente.email" option="label" title="email" class="w-full" disabled v-if="store.one_expediente.email"/>
                <text-field v-model="store.one_expediente.folios" option="label" title="folios" class="w-full" disabled/>

            </div>
        </modal>

    </div>
</template>

<script setup>
import { onBeforeMount } from 'vue';
import { useGlobalStore } from '../../stores/global';
import { useexpedientesStore } from '../../stores/expedientes';
const globalStore = useGlobalStore();
const store = useexpedientesStore();
</script>

<style lang="css" scoped>

</style>