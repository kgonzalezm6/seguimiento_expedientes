import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios'
import { useGlobalStore } from './global';
export const useexpedientesStore = defineStore('expedientes', () => {

        const carga_sin_asignar = ref(false);
        let carga_asignados = ref(false);
        let carga_finalizados = ref(false);
        let datos_sin_asignar = ref([]);
        let detalle = ref(false);
        let datos_asignados = ref([]);
        let datos_finalizados = ref([]);
        let errors = ref([]);
        let open_asignar = ref(false);
        let open_controlcalidad = ref(false);
        let open_finalizar = ref(false);
        let open_aceptar = ref(false);
        let one_expediente = ref([]);
        const headers_sin_asignar=ref([]);
        const headers_asignados=ref([ 
            { title: 'no. expediente', key: 'id', sort: true },
            { title: 'no. documento', key: 'num_wf_documento', sort: true },
            { title: 'año', key: 'num_wf_anio', sort: true },
            { title: 'tipo de expediente', key: 'tipo', sort: true },
            { title: 'fecha ingreso', key: 'fechaingreso', sort: true },
            { title: 'fecha asignacion', key: 'fechaasignacion', sort: true },
            { title: 'fecha aceptación', key: 'fechaaceptacion', sort: true },
            { title: 'asignado', key: 'user_aplic', sort: true },
            { title: 'acciones', key: 'actions', sort: true },
        ]);
        const headers_finalizados=ref([ 
            { title: 'no. expediente', key: 'id', sort: true },
            { title: 'no. documento', key: 'num_wf_documento', sort: true },
            { title: 'año', key: 'num_wf_anio', sort: true },
            { title: 'tipo de expediente', key: 'tipo', sort: true },
            { title: 'fecha ingreso', key: 'fechaingreso', sort: true },
            { title: 'fecha asignación', key: 'fecha_asignacion', sort: true },
            { title: 'fecha finalización', key: 'fecha_finalizacion', sort: true },
            { title: 'asignado', key: 'user_aplic', sort: true }
        ]);
        let users= ref([]);
        let isWorkFlow= ref(true);
        let theUser= ref('');
        let btn_asignar= ref(false);
        let btn_aceptar= ref(false);
        let btn_finalizar= ref(false);
        let btn_controlcalidad= ref(false);

        async function getSinAsignar() {
            carga_sin_asignar.value = true;
            const globalstore = useGlobalStore();
            datos_sin_asignar.value = [];
            headers_sin_asignar.value = [];
            try {
                if (isWorkFlow.value) {
                    headers_sin_asignar.value = [
                        { title: 'no. expediente', key: 'id', sort: true },
                        { title: 'no. documento', key: 'num_wf_documento', sort: true },
                        { title: 'año', key: 'num_wf_anio', sort: true },
                        { title: 'tipo de expediente', key: 'tipo', sort: true },
                        { title: 'fecha ingreso', key: 'fechaingreso', sort: true },
                        { title: 'fecha traslado', key: 'fechatraslado', sort: true },
                        { title: 'acciones', key: 'actions', sort: true }
                    ];
                    const response = await axios.get('expedientes/sin-asignar');
                    if (!response.data.error) {
                        datos_sin_asignar.value = response.data;
                       
                    } else {
                        errors.value = { error: [response.data.error] };
                    }

                    carga_sin_asignar.value = false;
                } else {
                    headers_sin_asignar.value = [
                        { title: 'no. expediente', key: 'id_ingreso_expediente', sort: true },
                        { title: 'no. documento', key: 'num_iusicaso', sort: true },
                        { title: 'fecha ingreso', key: 'fecha', sort: true },
                        { title: 'acciones', key: 'actions', sort: true }
                    ];
                    const response = await axios.get('expedientes/sin-asignar-iusi');
                    if (!response.data.error) {
                        datos_sin_asignar.value = response.data;
                    } else {
                        errors.value = { error: [response.data.error] };
                    }
                    carga_sin_asignar.value = false;
                }
            } catch (err) {
                errors.value = err.response?.data?.errors || err.message;
            } finally {
                
            }
        }
        async function getAsignados() {
            carga_asignados.value = true;
            const data = {
                tipo: isWorkFlow.value ? 'WF' : 'IUSI' 
            };
            if(!isWorkFlow.value){
                headers_asignados.value=[ 
                    { title: 'no. expediente', key: 'id_ingreso_expediente', sort: true },
                    { title: 'no. documento', key: 'num_iusicaso', sort: true },
                    { title: 'fecha ingreso', key: 'fecha', sort: true },
                    { title: 'fecha asignacion', key: 'fechaasignacion', sort: true },
                    { title: 'fecha aceptación', key: 'fechaaceptacion', sort: true },
                    { title: 'asignado', key: 'usuarioasignacion', sort: true },
                    { title: 'acciones', key: 'actions', sort: true },
                ];
            }
            const response = await axios.post('expedientes/asignados',data)
            .then(response => {
                if(!response.data.error){
                    datos_asignados.value = response.data;
                }else{
                    errors.value = { error: [response.data.error] }
                }
            })
            .catch(err => {
                errors.value = err.response?.data?.errors
            })
            .finally(()=>{
                carga_asignados.value = false
            })
        };
        async function getFinalizados() {
            carga_finalizados.value = true;
            const data = {
                tipo: isWorkFlow.value ? 'WF' : 'IUSI' 
            };
            if(!isWorkFlow.value){
                headers_finalizados.value=[ 
                    { title: 'no. expediente', key: 'id_ingreso_expediente', sort: true },
                    { title: 'no. documento', key: 'num_iusicaso', sort: true },
                    { title: 'fecha ingreso', key: 'fecha', sort: true },
                    { title: 'fecha asignacion', key: 'fechaasignacion', sort: true },
                    { title: 'fecha finalización', key: 'fechafinalizacion', sort: true },
                    { title: 'asignado', key: 'usuarioasignacion', sort: true },
                    { title: 'acciones', key: 'actions', sort: true },
                ];
            }
            const response = await axios.post('expedientes/finalizados', data)
            .then(response => {
                if(!response.data.error){
                    datos_finalizados.value = response.data;
                }else{
                    errors.value = { error: [response.data.error] }
                }
            })
            .catch(err => {
                errors.value = err.response?.data?.errors
            })
            .finally(()=>{
                carga_finalizados.value = false
            })
        };
        function action(item,action){
            one_expediente.value = item;
            errors.value = [];
            if(action === 1){
                open_asignar.value = true;
            }else if(action == 2){
                open_controlcalidad.value = true;
            }else if(action == 3){
                open_aceptar.value = true;
            }else if(action == 4){
                detalle.value = true;
            }else if(action == 5){
                open_finalizar.value = true;
            }
        };
        async function getUsers() {
            carga_sin_asignar.value = true;
            const globalstore = useGlobalStore();
            const response = await axios.get('users/9')
            .then(response => {
                if(!response.data.error){
                    users.value = response.data.filter(users => users.status == 'A');
                }else{
                    errors.value = { error: [response.data.error] }
                }
            })
            .catch(err => {
                errors.value = err.response?.data?.errors
            })
            .finally(()=>{
                carga_sin_asignar.value = false
            })
        };
        async function asignar(){
            btn_asignar.value = true;
            errors.value = [];
            const globalstore = useGlobalStore();
            let json = {
                id:one_expediente.value.id_ingreso_expediente,
                num_expediente:isWorkFlow.value ? one_expediente.value.id : one_expediente.value.num_iusicaso,
                tipo: isWorkFlow.value ? 'WF' : 'IUSI',
                fechaingreso:isWorkFlow.value ? one_expediente.value.fechaingreso : one_expediente.value.fecha,
                fechatraslado:isWorkFlow.value ? one_expediente.value.fechatraslado : new Date(),
                fechaasignacion:new Date(),
                usuario: theUser.value
            };
            const response = await axios.post('expedientes/asignar',json)
            .then(response => {
                if(!response.data.error){
                    globalstore.setAlert(response.data,'success','Exito');
                    setTimeout(() => {
                        open_asignar.value = false;
                        this.getSinAsignar();
                    },500);

                }else{
                    
                    errors.value = { error: [response.data.error] }
                }
            })
            .catch(err => {
                errors.value = err.response?.data?.errors
            })
            .finally(()=>{
                btn_asignar.value = false;
            })
            
        };
        async function aceptar(){
            errors.value = [];
            btn_aceptar.value = true;
            const globalstore = useGlobalStore();
            let json = {
                id: one_expediente.value.id,
            };
            const response = await axios.post('expedientes/aceptar',json)
            .then(response => {
                if(!response.data.error){
                    globalstore.setAlert(response.data,'success','Exito');
                    setTimeout(() => {
                        open_aceptar.value = false;
                        this.getAsignados();
                    },500);
                    

                }else{
                    errors.value = { error: [response.data.error] }
                }
            })
            .catch(err => {
                errors.value = err.response?.data?.errors
            })
            .finally(()=>{
                btn_aceptar.value = false;
                
            })
            
        };
        async function controlcalidad(){
            btn_controlcalidad.value = true;
            errors.value = [];
            const globalstore = useGlobalStore();
            let json = {
                id: one_expediente.value.id
            };
            const response = await axios.post('expedientes/controlcalidad',json)
            .then(response => {
                if(!response.data.error){
                    globalstore.setAlert(response.data,'success','Exito');
                    setTimeout(() => {
                        this.getAsignados();
                        open_controlcalidad.value = false;
                    }, 500);

                }else{
                    errors.value = { error: [response.data.error] }
                }
            })
            .catch(err => {
                errors.value = err.response?.data?.errors
            })
            .finally(()=>{
                btn_controlcalidad.value = false;
                
            })
            
        };
        async function finalizar(){
            errors.value = [];
            btn_finalizar.value = true;
            const globalstore = useGlobalStore();
            let json = {
                id: one_expediente.value.id
            };
            const response = await axios.post('expedientes/finalizar',json)
            .then(response => {
                if(!response.data.error){
                    globalstore.setAlert(response.data,'success','Exito');
                    setTimeout(() => {
                        this.getAsignados();
                        open_finalizar.value = false;
                    }, 500);

                }else{
                    errors.value = { error: [response.data.error] }
                }
            })
            .catch(err => {
                errors.value = err.response?.data?.errors
            })
            .finally(()=>{
                btn_finalizar.value = false;
                
            })
            
        };
    return {
        carga_sin_asignar,
        carga_asignados,
        carga_finalizados,
        datos_sin_asignar,
        datos_asignados,
        datos_finalizados,
        errors,
        open_asignar,
        open_finalizar,
        open_controlcalidad,
        open_aceptar,
        one_expediente,
        headers_sin_asignar,
        headers_asignados,
        headers_finalizados,
        users,
        isWorkFlow,
        theUser,
        btn_asignar,
        btn_aceptar,
        btn_finalizar,
        detalle,

        getSinAsignar,
        getAsignados,
        getFinalizados,
        action,
        getUsers,
        asignar,
        aceptar,
        finalizar,
        controlcalidad,
        
    }
});
