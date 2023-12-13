<script setup>
    import { useGlobalStore } from '../stores/global'
    
    const store = useGlobalStore()
    const menus = [
        {title : 'Inicio', icon : 'fas fa-house-user', route : '../../' }, 
        {title : 'Portal de certificaciones', icon : 'fas fa-medal', route : '#' }, 
        {title : 'Configuración', icon : 'fas fa-gear', route : '/test' },
    ]

</script>

<template>
    <div :class="store.openSidebar ? 'w-52' : 'w-20'" class="fixed hover:text-blue-600 z-20 h-screen transition-[width] duration-500 ease-in-out top-0">
        <div class="bg-lime-muni rounded-br-[6rem] border-2 border-lime-600 shadow-xl shadow-lime-800 h-screen overflow-auto no-scrollbar">
            <div class="flex justify-center py-8">
                <a @click="store.updateOpenSidebar" class="cursor-pointer">
                    <logo class="w-auto transition-[height] duration-500 ease-in-out " :class=" store.openSidebar ? 'h-32' : 'h-16'" />
                </a>
            </div>
            <div>
                <ul class=" divide-y-2 divide-green-600 px-4 text-blue-muni">
                    <li></li>
                    <li v-for="(menu,index) in menus" :key="index"  class="py-7 cursor-pointer hover:scale-105 transition hover:text-blue-600">
                        <RouterLink :to="menu.route" class="flex items-center gap-3">
                            <icon :icon="menu.icon" class="text-4xl " />
                            <span class=" font-bold text-sm" :hidden="!store.openSidebar" >{{ menu.title }}</span>
                        </RouterLink>
                    </li>
                    <li class="py-7 cursor-pointer hover:scale-105 transition hover:text-blue-600">
                        <a href="../../logout.php" class="flex items-center gap-3">
                            <icon icon="fas fa-right-from-bracket" class="text-4xl " />
                            <span class=" font-bold text-sm" :hidden="!store.openSidebar" >Cerrar sesión</span>
                        </a>
                    </li>
                    <li class="py-7"></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>

.no-scrollbar::-webkit-scrollbar {
    display: none;
}


.no-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
</style>
