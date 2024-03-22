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
        <modal :open="expedienteStore.open_aceptar" title="Aceptar expediente"
            icon="clipboard-check" @close="expedienteStore.open_aceptar = !expedienteStore.open_aceptar" class="w-5/6">
                    <div class="flex items-center">
                        <icon icon="file-circle-check" class="text-9xl text-sky-500"/>
                        <span class="text-3xl ml-6 font-semibold">¿Esta seguro de aceptar el expediente # {{expedienteStore.isWorkFlow ? expedienteStore.one_expediente.id : expedienteStore.one_expediente.num_expediente}} ?</span>
                    </div>
                    <validate-errors :errors="expedienteStore.errors" v-if="expedienteStore.errors != 0" />
            <template #footer>
                <div class="flex ml-auto">
                    <btn text="Cerrar" class="bg-red-500 text-white" icon="x" @click="expedienteStore.open_aceptar = false"
                     />
                     <btn text="Si, Aceptar" class="bg-green-500 text-white" icon="check" @click="expedienteStore.aceptar()"
                     :loading="expedienteStore.btn_aceptar"/>
                </div>
            </template>
        </modal>
    </div>
</template>