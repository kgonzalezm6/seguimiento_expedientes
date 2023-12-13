import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRoute } from 'vue-router'



export const useGlobalStore = defineStore('global', () => {

    // INICIO SIDEBAR
    //----------------------------------------
    const openSidebar = ref(false)
    
    function updateOpenSidebar () {
        openSidebar.value = !openSidebar.value
    }
    //----------------------------------------
    // FIN SIDEBAR

    // INICIO TITLE PAGE
    //----------------------------------------
    const route = useRoute()

    const titlePage = ref({
        title : route.name,
        icon : 'fas fa-home',
        textColor : 'text-white',
        color : 'bg-blue-muni'
    })

    function changeTitlePage (title = 'Home',icon = 'fas fa-home',color = 'bg-blue-muni',textColor = 'text-white') {
        titlePage.value.title = title
        titlePage.value.icon = icon
        titlePage.value.textColor = textColor
        titlePage.value.color = color
    }   
    //----------------------------------------
    // FIN TITLE PAGE


    // INICIO ALERTA TOAST
    //----------------------------------------
    const toast = ref({
        message: '',
        type: '',
        title: ' A T E N C I O N '
    })

    function setAlert(message,type,title = ' A T E N C I O N '){
        toast.value.message = message
        toast.value.type = type
        toast.value.title = title
    }
    //----------------------------------------
    // FIN ALERTA TOAST


    return {
        openSidebar,
        updateOpenSidebar,

        titlePage,
        changeTitlePage,

        toast,
        setAlert,
    }
})