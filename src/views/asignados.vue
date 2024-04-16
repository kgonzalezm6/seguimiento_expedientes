<template>
    <div>
        <datatable :data="expedienteStore.datos_asignados" :headers="expedienteStore.headers_asignados" :loading="expedienteStore.carga_asignados">
            <template #actions="{ item }">
                <div class="flex justify-center" v-if="auth.roles.includes('Analista Expedientes')">
                    <tooltip message="Aceptar tarea" v-if="item.fechaasignacion && !item.fechaaceptacion">
                        <icon icon="check" class="hover:scale-110 cursor-pointer mt-4 text-yellow-500 text-2xl"
                            @click="expedienteStore.action(item, 3)" />
                    </tooltip>
                    <tooltip message="Pasar a Control de Calidad" v-if="item.fechaaceptacion && !item.fechacontrolcalidad && (!item.controlcalidad || item.controlcalidad == 2)">
                        <icon icon="file-circle-check" class="hover:scale-110 cursor-pointer mt-4 text-orange-500 text-2xl"
                            @click="expedienteStore.action(item, 2)" />
                    </tooltip>
                    <div v-if="item.fechaaceptacion && item.controlcalidad == 2" class="mt-4 mr-2">
                        <span class="text-red-500">¡ERROR!</span>
                    </div>
                    <tooltip message="Registro de comunicación" v-if="item.controlcalidad && !item.comunicacion && item.controlcalidad == 1">
                        <icon icon="tty" class="hover:scale-110 cursor-pointer mt-4 text-sky-500 text-2xl"
                            @click="expedienteStore.action(item, 6)" />
                    </tooltip>
                    <tooltip message="Finalizar" v-if="item.comunicacion && item.controlcalidad == 3">
                        <icon icon="clipboard-check" class="hover:scale-110 cursor-pointer mt-4 text-red-500 text-2xl"
                            @click="expedienteStore.action(item, 5)" />
                    </tooltip>
                </div>
            </template>
        </datatable>
        <controlcalidad />
        <finalizar />
        <aceptar />
        <comunicacion />
    </div>
</template>
<script setup>
    import { onBeforeMount, watch, toRef } from 'vue';
    import { useGlobalStore } from '../stores/global';
    import { useexpedientesStore } from '../stores/expedientes';
    import { useAuthStore } from '@/stores/auth'
    import controlcalidad from '../components/expedientes/controlcalidad.vue';
    import finalizar from '../components/expedientes/finalizar.vue';
    import aceptar from '../components/expedientes/aceptar.vue';
    import comunicacion from '../components/expedientes/comunicacion.vue';
    const globalStore = useGlobalStore();
    const auth = useAuthStore();
    globalStore.changeTitlePage('Expedientes','folder-open','bg-green-500');
const expedienteStore = useexpedientesStore();
globalStore.changeTitlePage('Expedientes', 'folder-open', 'bg-green-500');
onBeforeMount(() => {
    expedienteStore.getAsignados();
});
const isWorkFlowRef = toRef(expedienteStore,'isWorkFlow')
watch(isWorkFlowRef,(newVal) => {
    expedienteStore.getAsignados();
});
</script>