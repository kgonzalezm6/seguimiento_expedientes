<script setup>
 
</script>

<template>
    <div class="border-2 rounded-lg shadow-lg p-4">
        <slot name="header"></slot>
        <div class="px-4">
            <slot></slot>    
        </div>
        <slot name="footer"></slot>
    </div>
</template>

