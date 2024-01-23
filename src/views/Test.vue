<script setup>
import { computed, ref, onMounted } from 'vue'
import { useGlobalStore } from '../stores/global'
import axios from 'axios'
import UserPhoto from '../components/UserPhoto.vue'
import Calendar from '../components/Calendar.vue'
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

const store = useGlobalStore()

const search = ref('')
const users = ref([])
const userResult = ref([])
const loading = ref(false)
const loadingUsers = ref(false)
const open = ref(false)
const openAlert = ref(false)
const openModal = ref(false)
const usr = ref([])

const headers = [
   { title: 'nit', key: 'nit', sort: true },
   { title: 'empleado', key: 'fullname' },
   { title: 'usuario', key: 'usuario' },
   { title: 'password', key: 'pass' },
   { title: 'puesto', key: 'puesto' },
   { title: 'status', key: 'status', sort: true, align: 'center' },
   { title: 'area', key: 'area.descripcion', sort: true },
   { title: '', key: 'actions' },
];

const options = ref(
   {
      chart: {
         height: 380,
         type: "bar"
      },
      xaxis: {
         categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      },

   }
)

const series = ref([
   {
      data: [30, 40, 45, 50, 49, 60, 70, 81]
   }
])

function user(user) {
   open.value = true
   usr.value = user
}

async function fetchUsers() {
   loadingUsers.value = true
   const response = await axios.get('users')
   users.value = response.data
   loadingUsers.value = false
}

const result = computed(() => {
   return users.value.filter(user => {
      if (search.value) {
         return user.fullname.toLowerCase().match(search.value.toLowerCase())
      }
   })
})

const bossList = computed(() => {
   const dataArray = new Set(users.value.map(user => user.depende))
   return [...dataArray]
})

function resultado() {
   if (result.value.length === 1) {
      const res = result.value
      userResult.value = res[0]
   } else {
      userResult.value = []
   }
}

function resetData() {
   usr.value = []
   open.value = false
   openAlert.value = false
}

function updateChart() {
   setInterval(() => {
      const max = 90;
      const min = 20;
      const newData = series.value[0].data.map(() => {
         return Math.floor(Math.random() * (max - min + 1)) + min
      })

      series.value = [{
         data: newData
      }]
   }, 3000);
}

onMounted(() => {
   store.titlePage.title = 'Test'
   store.titlePage.icon = 'fas fa-cogs'
   store.titlePage.color = "bg-red-500 border-red-700"
   fetchUsers()
   updateChart();
   tippy('#myButton', {
      content: '<strong>Bolded <span style="color: aqua;">content</span></strong>',
      allowHTML: true,
      animateFill: true,
   });
})


function loadingBtn() {
   loading.value = true
   setTimeout(() => loading.value = false, 3000)
}


const eventos = [
   { title: 'Evento 1', description: 'Esta es la descripcion del evento que dice que carajos hacer 01', time: { start: '2023-09-07 06:30' } },
   { title: 'Evento 2', description: 'Esta es la descripcion del evento que dice que carajos hacer 02', time: { start: '2023-09-07 06:30' } },
   { title: 'Evento 3', description: 'Esta es la descripcion del evento que dice que carajos hacer 03', time: { start: '2023-09-07 06:30' } },
   { title: 'Evento 4', description: 'Esta es la descripcion del evento que dice que carajos hacer 04', time: { start: '2023-09-07 06:30' } },
   { title: 'Evento 5', description: 'Esta es la descripcion del evento que dice que carajos hacer 05', time: { start: '2023-09-07 06:30' } },
   { title: 'Evento 6', description: 'Esta es la descripcion del evento que dice que carajos hacer 06', time: { start: '2023-09-07 06:30' } },
   { title: 'Evento', description: 'Esta es la descripcion del evento que dice que carajos hacer 07', time: { start: '2023-09-08 06:30' } },
   { title: 'Evento 3', description: 'Esta es la descripcion del evento que dice que carajos hacer 08', time: { start: '2023-09-09 06:30' } },
   { title: 'Evento 3', description: 'Esta es la descripcion del evento que dice que carajos hacer 09', time: { start: '2023-09-09 06:30' } },
   { title: 'Evento 3', description: 'Esta es la descripcion del evento que dice que carajos hacer 10', time: { start: '2023-09-10 06:30' } },
   { title: 'Evento 3', description: 'Esta es la descripcion del evento que dice que carajos hacer 11', time: { start: '2023-09-07 06:30' } },
   { title: 'Dia de la independencia', description: 'Esta es la descripcion del evento que dice que carajos hacer 12', time: { start: '2023-09-15 06:30' } },
];
const socials = [
   { name: 'Facebook', iconClass: 'fa-brands fa-facebook', hoverClass: 'hover:bg-facebook', iconBgClass: 'bg-white' },
   { name: 'Twitter', iconClass: 'fa-twitter', hoverClass: 'hover:bg-twitter', iconBgClass: 'bg-white' },
   { name: 'Instagram', iconClass: 'fa-instagram', hoverClass: 'hover:bg-instagram', iconBgClass: 'bg-white' },
];

</script>


<template>
   <card class="bg-white">
      <div class="bg-green-500 rounded-full p-2 w-12 h-12 flex justify-center items-center" ref="tooltipTarget"
         id="myButton">
         <icon icon="check" />
      </div>
      <datatable :headers="headers" :data="users" color="bg-lime-muni text-blue-muni" :loading="loadingUsers">
         <template #fullname="{ item }">
            <div class="flex items-center gap-3">
               <UserPhoto :user="item" class="h-12 w-12 hover:scale-150 cursor-pointer" />
               <div class="grid">
                  <span>{{ item.fullname }}</span>
                  <small class="text-xs font-normal">{{ item.emailmuni }}</small>
               </div>
            </div>
         </template>
         <template #puesto="{ item }">
            <span class="text-sm font-normal">{{ bossList.includes(item.nit) ? 'Jefe' : 'Sub-alterno' }}</span>
         </template>
         <template #status="{ item }">
            <icon v-if="item.status === 'A'" icon="fa-solid fa-user-check" class="text-green-500 text-xl" />
            <icon v-else icon="fa-solid fa-user-xmark" class="text-red-500 text-xl" />
         </template>
         <template #actions="{ item }">
            <div class="flex space-x-2">
               <tooltip message="Alguna acción">
                  <icon @click="user(item)" icon="fa-solid fa-user-check"
                     class="text-green-500 text-2xl hover:scale-150 cursor-pointer" />
               </tooltip>
               <tooltip message="Otra acción">
                  <icon @click="openAlert = true" icon="fa-solid fa-user-xmark"
                     class="text-red-500 text-2xl hover:scale-150 cursor-pointer" />
               </tooltip>
            </div>
         </template>
      </datatable>
   </card>
   <br>
   <card class="bg-white">
      <Calendar :events="eventos" />
   </card>
   <br>
   <br>
   <card class="bg-white">
      <h1 class="text-3xl font-bold">Botones</h1>
      <div class="flex items-center gap-x-4">
         <btn icon="fas fa-home" @click="loadingBtn" text="Primary" class="btn-primary shadow-blue-800"
            :loading="loading" />
         <btn icon="fas fa-home" @click="loadingBtn" text="Success" class="btn-success shadow-green-800"
            :loading="loading" />
         <btn icon="fas fa-home" @click="loadingBtn" text="Danger" class="btn-danger shadow-red-800" :loading="loading" />
         <btn icon="fas fa-home" @click="loadingBtn" text="Warning" class="btn-warning shadow-orange-800"
            :loading="loading" />
         <btn icon="fas fa-home" @click="loadingBtn" text="Dark" class="btn-dark shadow-gray-800" :loading="loading" />
         <btn icon="fas fa-home" @click="loadingBtn" text="Muni" class="btn-muni shadow-lime-800" :loading="loading" />
         <btn @click="loadingBtn" text="Cualquier color"
            class="bg-violet-500 text-violet-300 border-violet-700 shadow-violet-800" :loading="loading" />
      </div>
      <br>
      <br>
      <div class="flex items-center gap-x-4">
        
      </div>
      <br>
      <br>
      <br>
      <div>
         <h1 class="text-3xl font-bold">Alertas Toast</h1>
         <btn icon="fas fa-home" @click="store.setAlert('Toast Primary', 'primary')" text="Alert Toast Primary"
            class="btn-primary shadow-blue-800" />
         <btn icon="fas fa-home" @click="store.setAlert('Toast Success', 'success')" text="Alert Toast Success"
            class="btn-success shadow-green-800" />
         <btn icon="fas fa-home" @click="store.setAlert('Toast Danger', 'danger')" text="Alert Toast Danger"
            class="btn-danger shadow-red-800" />
         <btn icon="fas fa-home" @click="store.setAlert('Toast Warning', 'warning')" text="Alert Toast Warning"
            class="btn-warning shadow-orange-800" />
         <btn icon="fas fa-home" @click="store.setAlert('Toast Dark', 'dark')" text="Alert Toast Dark"
            class="btn-dark shadow-gray-800" />
      </div>
      <br>
      <br>
      <br>
      <div>
         <h1 class="text-3xl font-bold">Modal</h1>
         <btn icon="fas fa-home" @click="openModal = true" text="Abrir Modal" class="btn-primary shadow-blue-800" />
         <modal :open="openModal" icon="fas fa-users">
            <div class="grid lg:grid-cols-2 gap-4">
               <text-field icon="fas fa-envelope" type="email" placeholder="example@example.com" />
               <text-field icon="fas fa-key" type="password" placeholder="************" />
               <select class="input">
                  <option selected>Seleccione opcion</option>
                  <option>option 1</option>
                  <option>option 2</option>
                  <option>option 3</option>
                  <option>option 4</option>
                  <option>option 5</option>
               </select>
               <text-field placeholder="Escribe aqui cualquier cosa .." />
            </div>
            <template #footer>
               <btn @click="openModal = false" icon="fas fa-xmark" class="btn-danger" text="Cancelar" />
               <btn icon="fas fa-check" class="btn-success" text="Aceptar" />
            </template>
         </modal>
      </div>
      <br>
      <br>
      <br>
      <div>
         <h1 class="text-3xl font-bold">Iconos</h1>
         <icon icon="fas fa-home" class="text-blue-muni text-xs" />
         <icon icon="fas fa-home" class="text-lime-muni text-sm" />
         <icon icon="fas fa-home" class="text-blue-500 text-base" />
         <icon icon="fas fa-home" class="text-red-500 text-lg" />
         <icon icon="fas fa-home" class="text-gray-500 text-xl" />
         <icon icon="fas fa-home" class="text-violet-500 text-2xl" />
      </div>
      <br>
      <br>
      <br>
      <div class="grid lg:grid-cols-4 gap-4">
         <text-field />
         <text-field icon="fas fa-envelope" type="email" autocomplete="off" placeholder="example@example.com" />
         <text-field icon="fas fa-key" type="password" autocomplete="off" placeholder="Password" />
         <select class="input">
            <option selected>Seleccione opcion</option>
            <option>option 1</option>
            <option>option 2</option>
            <option>option 3</option>
            <option>option 4</option>
            <option>option 5</option>
         </select>
      </div>
   </card>

   <br>
   <br>

   <card class="bg-white">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2">
         <apexchart type="bar" :options="options" :series="series"></apexchart>
         <apexchart type="bar" :options="options" :series="series"></apexchart>
         <apexchart type="bar" :options="options" :series="series"></apexchart>
      </div>
   </card>

   <br>

   <div class="w-full grid justify-items-center">
      <small>Escribe un nombre y presiona la tecla ENTER</small>
      <div class="flex justify-center">
         <text-field option="label" title="Buscar por nombre:" v-model="search" list="data" @change="resultado"
            type="search" class="w-96" />
         <datalist id="data">
            <option v-for="user in result" :key="user.nit" :value="user.fullname"></option>
         </datalist>
      </div>
   </div>

   <card v-if="userResult?.roles">
      <template #header>
         <h1 class="text-center text-2xl text-gray-500 font-bold">
            {{ userResult.fullname }}
         </h1>
         <hr class="my-4">
      </template>
      <div class="flex gap-4">
         <div class="flex justify-center items-center">
            <UserPhoto :user="userResult" class="h-96 w-96" />
         </div>

         <card class="flex-1">
            <template #header>
               <h1 class="text-gray-500 font-bold text-center text-xl">Informacion personal</h1>
               <hr class="my-4">
            </template>
            <div class="grid grid-cols-2 gap-4">
               <text-field class="w-full" option="label" title="Nombre:" v-model="userResult.nombre" />
               <text-field class="w-full" option="label" title="Apellido:" v-model="userResult.apellido" />
               <text-field class="w-full" option="label" title="nit:" v-model="userResult.nit" />
               <text-field class="w-full" option="label" title="correo:" v-model="userResult.emailmuni" />
               <text-field class="w-full" option="label" title="Area:" v-model="userResult.area.descripcion" />
            </div>
            <template #footer>
               <div class="text-center">
                  <btn text="Actualizar" class="btn-dark shadow-gray-900" />
               </div>
            </template>
         </card>
      </div>
   </card>

   <br>




   <modal :open="open" title="Ejemplo de modal" icon="fas fa-user">
      <div v-if="usr?.nombre" class="grid grid-cols-2 gap-4">
         <text-field option="label" title="Nombre:" v-model="usr.nombre" />
         <text-field option="label" title="Apellido:" v-model="usr.apellido" />
         <text-field option="label" title="nit:" v-model="usr.nit" />
         <text-field option="label" title="correo:" v-model="usr.emailmuni" />
         <text-field option="label" title="Area:" v-model="usr.area.descripcion" />
      </div>
      <template #footer>
         <div>
            <btn @click="resetData()" text="Cancelar" class="btn-danger shadow-red-800" />
         </div>
      </template>
   </modal>

   <modal :open="openAlert" title=" A T E N C I O N ">
      <div class="flex justify-center items-center space-x-4">
         <icon icon="fa-solid fa-triangle-exclamation" class="text-7xl text-orange-500" />
         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, provident quam? Quasi deleniti maxime accusamus
            nam facilis, minus corrupti quam necessitatibus. Voluptatibus aliquam temporibus unde doloribus hic culpa quos
            fugit.</p>
      </div>
      <template #footer>
         <btn text="Cerrar" @click="resetData" class="btn-danger shadow-red-800" />
      </template>
   </modal>
</template>
<style>
.tooltip {
   position: absolute;
   top: 0;
   font-size: 14px;
   background: #fff;
   color: #fff;
   padding: 5px 8px;
   border-radius: 5px;
   box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
   opacity: 0;
   pointer-events: none;
   transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.tooltip::before {
   position: absolute;
   content: "";
   height: 8px;
   width: 8px;
   background: #fff;
   bottom: -3px;
   left: 50%;
   transform: translate(-50%) rotate(45deg);
   transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
</style>