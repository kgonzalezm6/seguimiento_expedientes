<script setup>
    import { useAuthStore } from '../stores/auth'
    import { ref, shallowRef, markRaw } from 'vue'


    
    const props = defineProps(['tabs'])
    const auth = useAuthStore()
    const arrayTabs = ref([])
    
    props.tabs.map(tab => {
        if(auth.checkPermission(tab.title)){
            arrayTabs.value.push(markRaw(tab))
        }
    })
    
    const active = ref(arrayTabs.value[0].title)
    const currentTab = shallowRef(arrayTabs.value[0].component)

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
