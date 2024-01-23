<script setup>
    import spiner from '../components/Spiner.vue'
    const props = defineProps({
        text : '',
        icon : '',
        loading : {
            default : false
        },
        option : ''
    })
</script>

<template>
    <button v-if="props.hasOwnProperty('option') && props.option == 'modern'">
        <div class="flex items-center space-x-2">
            <icon v-if="props.icon" :icon="icon" class="text-base"/>
            <small>
                {{ text }}
            </small>
            <spiner v-if="props.loading" class="border-b-gray-700 h-4 " />
        </div>
    </button>
    <button v-else class="btn "  :disabled="props.loading">
        <div class="flex items-center space-x-2">
            <icon v-if="props.icon" :icon="icon" class="text-base"/>
            <small>
                {{ text }}
            </small>
            <spiner v-if="props.loading" class="border-b-gray-700 h-4 " />
        </div>
    </button>
    
</template>