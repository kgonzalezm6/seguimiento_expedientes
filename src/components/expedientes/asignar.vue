<script setup>
    import { onBeforeMount } from 'vue';
import { useGlobalStore } from '../../stores/global';
import { useexpedientesStore } from '../../stores/expedientes';
const globalStore = useGlobalStore();
const expedienteStore = useexpedientesStore();
</script>

<template>
    <div>
        <modal :open="expedienteStore.open_asignar" title="Asignar expediente" icon="user-check" @close="expedienteStore.open_asignar= !expedienteStore.open_asignar">

            {{ expedienteStore.one_expediente.id }}
            <fieldset>
                <legend>Asignar</legend>    
                <v-select />
            </fieldset>

            <template #footer>
                <div class="flex ml-auto">
                   <btn text="Asignar" class="bg-green-500 text-white" icon="save"/> 
                </div>
            </template>
        </modal>
    </div>
</template>