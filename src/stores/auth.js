import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '../router'
import axios from 'axios';



export const useAuthStore = defineStore('auth', () => {

	const user = ref([])
	const roles = ref([])
	const permissions = ref([])
	const loading = ref(false)
	const rolesApp = import.meta.env.VITE_MY_APPNAME
	const errors = ref('')
	const tabsCargadas = ref(false);

	function login() {
		loading.value = true
		axios.post('login')
			.then(response => {
				if (!response.data.error) {

					user.value = response.data
					roles.value = response.data.roles.map(role => role.nombre)
					permissions.value = response.data.roles.map(role => role.permissions.map(permission => permission.nombre)).flat(Infinity)
					permissions.value = Array.from(new Set(permissions.value))

					loading.value = false
					localStorage.setItem('nit', response.data.nit)

				} else {

					errors.value = { error: [response.data.error] }
					loading.value = false
					router.push({ name: '401-Unauthorize' })

				}

			})
			.catch(err => {
				errors.value = err.response.data.errors
				loading.value = false
				router.push({ name: '401-Unauthorize' })
			})

	}
	
	async function validateNit(nit) {
		try {

			const response = await axios.post('validate-nit',{ nit : nit })

			if (response.data == 'Authorized') {
				return true
			} else {
				return false
			}

		} catch (error) {
			console.error(error)
			return false
		}

	}


	async function logout() {
		localStorage.clear();
		return await axios.post('logout')
	}

	function checkPermission(el) {
		for (var key in this.permissions) {
			if (this.permissions.hasOwnProperty(key)) {
				var value = this.permissions[key];

				if (value === el) {
					return true;
				}

				if (typeof value === 'object' && checkPermission(el)) {
					return true;
				}
			}
		}

		return false;
	}


	return {
		user,
		roles,
		permissions,
		errors,
		loading,
		tabsCargadas,

		login,
		logout,
		validateNit,
		checkPermission,
	}
})
