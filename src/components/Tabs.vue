<script setup>
    import { useAuthStore } from '../stores/auth'
    import { ref, shallowRef, markRaw, watchEffect, onBeforeMount } from 'vue'


    
    const props = defineProps(['tabs'])
    const auth = useAuthStore()
    const arrayTabs = ref([])
    const active = shallowRef(null);
    const currentTab = shallowRef(0);
const cargarTabs = async () => {
    auth.tabsCargadas = false;
    while (!auth.tabsCargadas) {
        props.tabs.map(tab => {
        if(auth.checkPermission(tab.title)){
            arrayTabs.value.push(markRaw(tab));
        }
    })
        if (arrayTabs.value.length > 0) {
            auth.tabsCargadas = true;
        } else {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
    const tituloPrimeraPestaña = await arrayTabs.value[0].title;
    active.value = tituloPrimeraPestaña;
    currentTab.value = arrayTabs.value[0].component;
}
    cargarTabs();

    
</script>

<template>
    <nav class="bg-blue-500 rounded-bl-full rounded-tr-full py-5 text-gray-300 font-semibold">
        <div class="flex justify-center items-center space-x-10">
            <div v-for="(tab,index) in arrayTabs" :key="index">
                <button @click="currentTab = tab.component, active = tab.title" class="hover:text-white hover:font-bold hover:border-b cursor-pointer transition-all" :class="{'font-bold text-white border-b' : active == tab.title}">
                    {{ tab.title }}
                </button>
            </div>
        </div>
    </nav>
    <component :is="currentTab" ></component>
</template>
