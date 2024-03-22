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
        <modal :open="expedienteStore.open_asignar" :title="expedienteStore.isWorkFlow ? 'Asignar expediente # '+ expedienteStore.one_expediente.id : 'Asignar expediente # ' + expedienteStore.one_expediente.num_iusicaso"
            icon="user-check" @close="expedienteStore.open_asignar = !expedienteStore.open_asignar" class="w-5/6">
                    <v-select class="focus-within:border-blue-400" 
                    :options="expedienteStore.users" label="fullname" :reduce="user => user.usuario"
                    placeholder="Seleccione el usuario" append-to-body v-model="expedienteStore.theUser">
                    <template v-slot:no-options="{ search, searching }">
                        <template v-if="searching">
                            No se han encontrado resultados para <em>{{ search }}</em>.
                        </template>
                        <em v-else style="font-bold">Busque un usuario</em>
                    </template>
                    <template #option="{ fullname, image }">
                        <em class="flex">
                            <img :src="'https://udicat.muniguate.com/catastro/GestionServicios/' + image" :alt="fullname"
                                class="h-14">
                            <div class="ml-4 font-bold">{{ fullname }}</div>
                        </em>
                    </template>
                    <slot name="spinner">
                        <div class="spinner" v-show="true">Loading...</div>
                    </slot>
                    </v-select>
                    <validate-errors :errors="expedienteStore.errors" v-if="expedienteStore.errors != 0"/>
                    
            <template #footer>
                <div class="flex ml-auto">
                    <btn text="Cerrar" class="bg-red-500 text-white" icon="x" @click="expedienteStore.open_asignar = false"
                     />
                     <btn text="Asignar" class="bg-green-500 text-white" icon="save" @click="expedienteStore.asignar()"
                     :loading="expedienteStore.btn_asignar"/>
                </div>
            </template>
        </modal>
    </div>
</template>