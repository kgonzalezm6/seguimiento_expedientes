<template>
    <icon icon="folder-open" class="h-72 w-72 text-center bg-yellow-200
     text-orange-400 p-6 rounded-xl" @click="open = true">

    </icon>
    <modal :open="open" class="bg-slate-200 w-5/6" title="" @close="open = !open">
        <div v-if="images.length > 0" class="flex justify-center">
            <button @click="prevSlide()" class="mr-auto text-4xl hover:scale-150">&lt;</button>
            <img :src="images[currentSlide]" alt="" class="w-96 object-cover">
            <button @click="nextSlide()" class="ml-auto text-4xl hover:scale-150">&gt;</button>
        </div>
        <div class="flex mt-8 justify-center">
            <!-- <button @click="prevSlide()" class="mr-auto text-4xl hover:scale-150">&lt;</button> -->
            <button @click="prevPage()" :disabled="currentPage === 1" class="mr-2 px-4 py-2 
            text-black rounded ">&lt;</button>
            <div v-for="(image, index) in displayedImages" :key="index" class="flex-shrink-0">
                <img :src="image" alt="" class="h-36 p-2 hover:border-2 hover:border-blue-800"
                    @click="get(index, currentPage)">
            </div>
            <!-- <button @click="nextSlide()" class="ml-auto text-4xl hover:scale-150">&gt;</button> -->
            <button @click="nextPage()" :disabled="currentPage === totalPages" class="px-4 py-2 
            text-black">&gt;</button>
        </div>
        <template #footer>
            <btn text="Cerrar" @click="open = false" class="bg-red-500 text-white" />
        </template>
    </modal>
</template>
  
<script setup>
import { ref, computed } from 'vue';
const itemsPerPage = 3;
const currentPage = ref(1);
const open = ref(false);
const images = ref(['https://th.wallhaven.cc/lg/6d/6d7xmx.jpg',
    'https://th.wallhaven.cc/lg/ex/exrqrr.jpg',
    'https://th.wallhaven.cc/lg/kx/kxrro7.jpg',
    'https://th.wallhaven.cc/small/85/8586my.jpg',
    'https://th.wallhaven.cc/small/x6/x6wjkv.jpg',
    'https://th.wallhaven.cc/small/qz/qz5r6q.jpg',
    'https://th.wallhaven.cc/small/zy/zy2x7v.jpg',
    'https://th.wallhaven.cc/small/o5/o5762l.jpg',
    'https://th.wallhaven.cc/small/kx/kxj3l1.jpg'
]);
let currentSlide = ref(0);
let currentImage = ref('');

const totalPages = computed(() => Math.ceil(images.value.length / itemsPerPage));

const displayedImages = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return images.value.slice(startIndex, endIndex);
});


const nextSlide = () => {
    const ima = images.value.length - 1
    if (currentSlide.value < ima) {
        currentSlide.value = (currentSlide.value + 1);
    }

};

const prevSlide = () => {
    if (currentSlide.value > 0) {
        currentSlide.value = (currentSlide.value - 1);
    }
};
const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};
function get(index, page) {
    currentSlide.value = index + (page - 1) * 3;

}
</script>