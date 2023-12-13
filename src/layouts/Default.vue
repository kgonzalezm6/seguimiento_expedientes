<script setup>
    import { useGlobalStore } from '../stores/global'
    import SideBar from './SideBar.vue'
    import UserCard from '../components/UserCard.vue'
    import Footer from './Footer.vue'
    import TitlePage from '../components/TitlePage.vue'

    const store = useGlobalStore()
    
    

</script>

<template>
<toast v-if="store.toast.message.length > 0" :message="store.toast.message" />
    <div>
        <SideBar/>
        <TitlePage />
        <UserCard class="absolute z-30 top-2 right-5 text-black "/>
        <main class="px-2 md:px-5 lg:px-10 transition-[margin] duration-500 pt-20" :class=" store.openSidebar ? 'ml-52' : 'ml-20'">
            <RouterView />
        </main>
        <Footer />
    </div>
</template>