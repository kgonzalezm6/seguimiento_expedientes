import { defineStore } from 'pinia';
import axios from 'axios'
import {
  useGlobalStore
} from './global';
export const useexpedientesStore = defineStore('expedientes', {
    state: () => ({
        carga_sin_asignar:false,
        carga_asignados:false,
        carga_finalizados:false,
        datos_sin_asignar:[],
        datos_asignados:[],
        datos_finalizados:[],
        errors:[],
        open_asignar:false,
        open_finalizar:false,
        open_aceptar:false,
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
        headers_asignados:[ 
            { title: 'no. expediente', key: 'id', sort: true },
            { title: 'no. documento', key: 'num_wf_documento', sort: true },
            { title: 'año', key: 'num_wf_anio', sort: true },
            { title: 'tipo de expediente', key: 'tipo', sort: true },
            { title: 'fecha ingreso', key: 'fechaingreso', sort: true },
            { title: 'fecha asignacion', key: 'fecha_asignacion', sort: true },
            { title: 'asignado', key: 'user_aplic', sort: true },
            { title: 'acciones', key: 'actions', sort: true },
        ],
        headers_finalizados:[ 
            { title: 'no. expediente', key: 'id', sort: true },
            { title: 'no. documento', key: 'num_wf_documento', sort: true },
            { title: 'año', key: 'num_wf_anio', sort: true },
            { title: 'tipo de expediente', key: 'tipo', sort: true },
            { title: 'fecha ingreso', key: 'fechaingreso', sort: true },
            { title: 'fecha asignación', key: 'fecha_asignacion', sort: true },
            { title: 'fecha finalización', key: 'fecha_finalizacion', sort: true },
            { title: 'asignado', key: 'user_aplic', sort: true }
        ],
        users:[],
        isWorkFlow:true,
        theUser:'',
        btn_asignar:false,
        btn_aceptar:false,
        btn_finalizar:false,

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
        async getAsignados() {
            this.carga_asignados = true;
            const response = await axios.get('expedientes/asignados')
            .then(response => {
                if(!response.data.error){
                    this.datos_asignados = response.data;
                }else{
                    this.errors = { error: [response.data.error] }
                }
            })
            .catch(err => {
                this.errors = err.response?.data?.errors
            })
            .finally(()=>{
                this.carga_asignados = false
            })
        },
        async getFinalizados() {
            this.carga_finalizados = true;
            const response = await axios.get('expedientes/finalizados')
            .then(response => {
                if(!response.data.error){
                    this.datos_finalizados = response.data;
                }else{
                    this.errors = { error: [response.data.error] }
                }
            })
            .catch(err => {
                this.errors = err.response?.data?.errors
            })
            .finally(()=>{
                this.carga_finalizados = false
            })
        },
        action(item,action){
            this.one_expediente = item;
            this.errors = [];
            if(action === 1){
                this.open_asignar = true;
            }else if(action == 2){
                this.open_finalizar = true;
            }else if(action == 3){
                this.open_aceptar = true;
            }
        },
        async getUsers() {
            this.carga_sin_asignar = true;
            const globalstore = useGlobalStore();
            const response = await axios.get('users/9')
            .then(response => {
                if(!response.data.error){
                    this.users = response.data.filter(users => users.status == 'A');
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
        async asignar(){
            this.btn_asignar = true;
            const globalstore = useGlobalStore();
            let json = {
                transaccion:this.one_expediente.transaccion,
                codtramite:this.one_expediente.codtramite,
                documento:this.one_expediente.documento,
                anio:this.one_expediente.anio,
                fecha:this.one_expediente.fecha,
                user_aplic:this.one_expediente.user_aplic,
                status_tarea:this.one_expediente.status_tarea,
                numero_matricula:this.one_expediente.numero_matricula,
                numero_terminacion:this.one_expediente.numero_terminacion,
                prioridad:this.one_expediente.prioridad,
                nuevo:this.one_expediente.nuevo,
                referencia:this.one_expediente.referencia,
                codigoclase:this.one_expediente.codigoclase,
                trn_ref:this.one_expediente.trn_ref,
                numfolios:this.one_expediente.numfolios,
                numdoctos:this.one_expediente.numdoctos,
                dependencia:this.one_expediente.dependencia,
                fecha_asignacion:this.one_expediente.fecha_asignacion,
                fecha_finalizacion:this.one_expediente.fecha_finalizacion,
                user: this.theUser
            };
            const response = await axios.post('expedientes/asignar',json)
            .then(response => {
                if(!response.data.error){
                    globalstore.setAlert(response.data,'success','Exito');
                    setTimeout(() => {
                        this.open_asignar = false;
                        this.getSinAsignar();
                    },500);

                }else{
                    this.errors = { error: [response.data.error] }
                }
            })
            .catch(err => {
                this.errors = err.response?.data?.errors
            })
            .finally(()=>{
                this.btn_asignar = false;
                this.errors = [];
            })
            
        },
        async aceptar(){
            this.btn_aceptar = true;
            const globalstore = useGlobalStore();
            let json = {
                transaccion:this.one_expediente.transaccion,
                documento:this.one_expediente.documento,
                anio:this.one_expediente.anio,
                codigoclase:this.one_expediente.codigoclase
            };
            const response = await axios.post('expedientes/aceptar',json)
            .then(response => {
                if(!response.data.error){
                    globalstore.setAlert(response.data,'success','Exito');
                    setTimeout(() => {
                        this.open_aceptar = false;
                        this.getAsignados();
                    },500);
                    

                }else{
                    this.errors = { error: [response.data.error] }
                }
            })
            .catch(err => {
                this.errors = err.response?.data?.errors
            })
            .finally(()=>{
                this.btn_aceptar = false;
                this.errors = [];
            })
            
        },
        async finalizar(){
            this.btn_finalizar = true;
            const globalstore = useGlobalStore();
            let json = {
                transaccion:this.one_expediente.transaccion,
                documento:this.one_expediente.documento,
                anio:this.one_expediente.anio,
                codigoclase:this.one_expediente.codigoclase
            };
            const response = await axios.post('expedientes/finalizar',json)
            .then(response => {
                if(!response.data.error){
                    globalstore.setAlert(response.data,'success','Exito');
                    setTimeout(() => {
                        this.getAsignados();
                        this.open_finalizar = false;
                    }, 500);

                }else{
                    this.errors = { error: [response.data.error] }
                }
            })
            .catch(err => {
                this.errors = err.response?.data?.errors
            })
            .finally(()=>{
                this.btn_finalizar = false;
                this.errors = [];
            })
            
        }
    },
});

