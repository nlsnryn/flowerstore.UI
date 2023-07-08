import { defineStore } from 'pinia'
import { setCredentials, getCredentials, removeCredentials } from '@/helper/LocalStorage'
import axios from 'axios'
import router from '../router'
import { ref } from 'vue'

const useAuthStore = defineStore('auth', () => {
  const credentials = ref(getCredentials())

  async function login(form) {
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
  }

  const isAuthenticated = () => !!credentials.value.token && !!credentials.value.user

  async function register(form) {
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

    removeCredentials()
    credentials.value.token = ''
    credentials.value.user = ''
    router.push({ name: 'login' })
  }

  return {
    credentials,
    login,
    register,
    logout,
    isAuthenticated
  }
})

export { useAuthStore }
