import { defineStore } from 'pinia'
import { setCredentials, getCredentials, removeCredentials } from '@/helper/LocalStorage'
import { useErrorStore } from './error.store'
import axios from 'axios'
import router from '../router'
import { ref } from 'vue'

const useAuthStore = defineStore('auth', () => {
  const credentials = ref(getCredentials())
  const errorStore = useErrorStore()

  async function login(form) {
    try {
      errorStore.clearState()
      const response = await axios.post('http://127.0.0.1:8000/api/login', form)
      const { current_user, access_token } = response.data

      if (!current_user || !access_token) {
        return
      }

      // Set Credentials into Local Storage
      setCredentials(access_token, current_user)

      // update credentials
      credentials.value.token = access_token
      credentials.value.user = current_user

      // redirect into dashboard
      router.push({ name: 'dashboard' })
    } catch (error) {
      errorStore.setState(error.response.data)
    }
  }

  const isAuthenticated = () => !!credentials.value.token && !!credentials.value.user
  const isAdmin = () => credentials.value.user.status == 'administrator'

  async function register(form) {
    try {
      errorStore.clearState()
      const response = await axios.post('http://127.0.0.1:8000/api/register', form)
      const { current_user, access_token } = response.data

      if (!current_user || !access_token) {
        return
      }

      // Set Credentials into Local Storage
      setCredentials(access_token, current_user)

      // update credentials

      credentials.value.token = access_token
      credentials.value.user = current_user

      // redirect into dashboard
      router.push({ name: 'dashboard' })
    } catch (error) {
      errorStore.setState(error.response.data)
    }
  }

  async function logout() {
    if (!window.confirm('Are you sure?')) {
      return
    }

    await axios.post(
      'http://127.0.0.1:8000/api/logout',
      {},
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${credentials.value.token}`
        }
      }
    )

    credentials.value.token = ''
    credentials.value.user = ''
    removeCredentials()
    localStorage.setItem('isReload', 'true')
    router.push({ name: 'login' })
  }

  return {
    credentials,
    login,
    register,
    logout,
    isAdmin,
    isAuthenticated
  }
})

export { useAuthStore }
