<script setup>
import { onBeforeMount } from 'vue';
import { useGlobalStore } from '../../stores/global';
import { useexpedientesStore } from '../../stores/expedientes';
const globalStore = useGlobalStore();
const expedienteStore = useexpedientesStore();
onBeforeMount(() => {
    expedienteStore.getUsers();
});
</script>
<template>
    <div>
        <modal :open="expedienteStore.open_controlcalidad" title="Enviar a Control de Calidad"
            icon="clipboard-check" @close="expedienteStore.open_controlcalidad = !expedienteStore.open_controlcalidad" class="w-5/6">
                    <div class="flex items-center">
                        <icon icon="bell" class="text-9xl text-red-500"/>
                        <span class="text-3xl ml-6 font-semibold">¿Esta seguro de pasar el expediente # {{expedienteStore.isWorkFlow ? expedienteStore.one_expediente.num_expediente : expedienteStore.one_expediente.num_iusicaso}} a control de calidad ?</span>
                    </div>
                    <validate-errors :errors="expedienteStore.errors" v-if="expedienteStore.errors != 0" />
            <template #footer>
                <div class="flex ml-auto">
                    <btn text="Cerrar" class="bg-red-500 text-white" icon="x" @click="expedienteStore.open_controlcalidad = false"
                     />
                     <btn text="Si, Pasar" class="bg-teal-500 text-white" icon="clipboard-check" @click="expedienteStore.controlcalidad()"
                     :loading="expedienteStore.btn_controlcalidad"/>
                </div>
            </template>
        </modal>
    </div>
</template>