<template>
    <div>
      <datatable :data="expedienteStore.datos_finalizados" :headers="expedienteStore.headers_finalizados" :loading="expedienteStore.carga_finalizados">
            <template #actions="{ item }">
                <div class="flex justify-center">
                    <tooltip message="Aceptar tarea" v-if="item.status_tarea == 1">
                        <icon icon="check" class="hover:scale-110 cursor-pointer mt-4 text-yellow-500 text-2xl"
                            @click="expedienteStore.action(item, 3)" />
                    </tooltip>
                    <tooltip message="Finalizar tarea" v-if="item.status_tarea == 2">
                        <icon icon="clipboard-check" class="hover:scale-110 cursor-pointer mt-4 text-teal-500 text-2xl"
                            @click="expedienteStore.action(item, 2)" />
                    </tooltip>
                    <tooltip message="Registro de comunicación">
                        <icon icon="tty" class="hover:scale-110 cursor-pointer mt-4 text-sky-500 text-2xl"
                            @click="expedienteStore.action(item, 6)" />
                    </tooltip>
                </div>
                
            </template>
        </datatable>
        <comunicacion />
    </div>
</template>
<script setup>
    import { onBeforeMount } from 'vue';
    import { useGlobalStore } from '../stores/global';
    import { useexpedientesStore } from '../stores/expedientes';
    import comunicacion from '../components/expedientes/detallecomunicacion.vue';
    const expedienteStore = useexpedientesStore();
    const globalStore = useGlobalStore();

    globalStore.changeTitlePage('Expedientes','folder-open','bg-green-500');
    onBeforeMount(() => {
    expedienteStore.getFinalizados();
});
</script>