<template>
    <div>
        <modal :open="store.open_comunicacion" title="Detalle comunicación"
            icon="pen-ruler" @close="store.open_comunicacion = !store.open_comunicacion" class="w-2/3">
            <div class="grid grid-cols-3 gap-2 select-none">
                <div class="col-span-3">
                    <text-field title="No. Expediente" option="label" v-model="expedienteValue" class="w-full" disabled/>
                </div>
                <text-field title="telefono" option="label" v-model="store.one_expediente.telefono" disabled/>
                <div class="col-span-2">
                  <text-field title="telefono adicional" option="label" v-model="store.one_expediente.telefono_adicional" class="w-full" disabled/>
                </div>
                <div class="col-span-3">
                    <text-field title="correo electronico" option="label" class="w-full" v-model="store.one_expediente.email" disabled/>
                </div>
                <div class="col-span-3 flex select-none">
                    <span class="mr-4"> Llamada:</span>
                    <label class="switch" :class="{ 'checked': store.one_expediente.llamada }">
                        <input type="checkbox" v-model="store.one_expediente.llamada" disabled>
                        <span class="slider"></span>
                      </label>
                </div>
                <div class="col-span-3 relative mb-3">
                    <textarea class="peer m-0 block h-[100px] bg-white rounded border-2 focus-within:border-blue-400 
                    bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition 
                    duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] 
                    focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary 
                    [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem] w-full"
                    v-model="store.one_expediente.comentarios" disabled>

                    </textarea>
                    <label
                        class="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent 
                        px-3 py-4 text-neutral-500 font-bold transition-[opacity,_transform] duration-200 ease-linear 
                        peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] 
                        peer-focus:text-gray-400 peer-[:not(:placeholder-shown)]:-translate-y-2 
                        peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] 
                        motion-reduce:transition-none uppercase">
                            COMENTARIOS
                    </label>
                </div>
                <div class="col-span-3">
                  <validate-errors :errors="store.errors" v-if="store.errors != 0" />
                </div>
            </div>
            <template #footer>
                <div class="flex ml-auto">
                    <btn text="Cerrar" class="bg-red-500 text-white" icon="x" @click="store.open_comunicacion = false"
                     />
                </div>
            </template>
        </modal>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useexpedientesStore } from '../../stores/expedientes';
const store = useexpedientesStore();

const expedienteValue = computed(() => {
      return store.isWorkFlow ? store.one_expediente.num_expediente : store.one_expediente.num_iusicaso;
    });
</script>

<style lang="css" scoped>
.switch {
    position: relative;
    display: inline-block;
    width: 48px;
    height: 20px;
  }
  
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: red;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 34px;
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 15px;
    width: 15px;
    left: 4px;
    bottom: 3px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 50%;
  }
  
  .switch.checked .slider {
    background-color: #00bc70;
  }
  
  .switch.checked .slider:before {
    background-color: #fff;
    transform: translateX(26px);
  }
</style>