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
        <modal :open="expedienteStore.open_finalizar" title="Finalizar"
            icon="clipboard-check" @close="expedienteStore.open_finalizar = !expedienteStore.open_finalizar" class="w-5/6">
                    <div class="flex items-center">
                        <icon icon="warning" class="text-9xl text-red-500"/>
                        <span class="text-3xl ml-6 font-semibold">¿Esta seguro de finalizar el expediente # {{expedienteStore.isWorkFlow ? expedienteStore.one_expediente.id : expedienteStore.one_expediente.num_iusicaso}} ?</span>
                    </div>
                    <validate-errors :errors="expedienteStore.errors" v-if="expedienteStore.errors != 0" />
            <template #footer>
                <div class="flex ml-auto">
                    <btn text="Cerrar" class="bg-red-500 text-white" icon="x" @click="expedienteStore.open_finalizar = false"
                     />
                     <btn text="Si, Finalizar" class="bg-teal-500 text-white" icon="clipboard-check" @click="expedienteStore.finalizar()"
                     :loading="expedienteStore.btn_finalizar"/>
                </div>
            </template>
        </modal>
    </div>
</template>