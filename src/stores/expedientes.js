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
        open_asignar:false,
        one_expediente:[],
        headers_sin_asignar:[ 
            { title: 'no. expediente', key: 'id', sort: true },
            { title: 'no. documento', key: 'num_wf_documento', sort: true },
            { title: 'año', key: 'num_wf_anio', sort: true },
            { title: 'tipo de expediente', key: 'tipo', sort: true },
            { title: 'fecha ingreso', key: 'fechaingreso', sort: true },
            { title: 'fecha traslado', key: 'fechatraslado', sort: true },
            { title: 'acciones', key: 'actions', sort: true },
        ],
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
        action(item,action){
            this.one_expediente = item;
            if(action === 1){
                this.open_asignar = true;
            }
        }
    },
});

