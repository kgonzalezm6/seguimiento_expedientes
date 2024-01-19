<template>
    <div>
        <h1>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi, neque, laudantium earum vel molestias dolor libero tempora ipsa fuga officia laborum! Cupiditate illum numquam porro nesciunt ex expedita sequi nostrum.</h1>
    </div>
</template>
<script setup>
    import { useGlobalStore } from '../stores/global';

    const globalStore = useGlobalStore();

    globalStore.changeTitlePage('Expedientes','folder-open','bg-green-500');
</script>