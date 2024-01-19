import { defineStore } from 'pinia';
import axios from 'axios'
import {
  useGlobalStore
} from './global';
export const useexpedientesStore = defineStore('expedientes', {
    state: () => ({
        carga_sin_asignar:false,
        datos_sin_asignar:[],
        errors:[],
        headers_sin_asignar:[{
        }]
    }),
    actions: {
        async getSinAsignar() {
            this.carga_sin_asignar = true;
            const globalstore = useGlobalStore();
            const response = await axios.get('expedientes/sin-asignar')
            .then(response => {
                if(!response.data.error){
                    this.datos_sin_asignar = response.data;
                }else{
                    this.errors = { error: [response.data.error] }
                }
            })
            .catch(err => {
                this.errors = err.response?.data?.errors
            })
            .finally(()=>{
                this.carga_sin_asignar = false
            })
          },
    },
});

