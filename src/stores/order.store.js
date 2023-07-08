import { defineStore } from 'pinia'
import axios from 'axios'
import router from '../router'
import { ref } from 'vue'
import { getCredentials } from '@/helper/LocalStorage'

const useOrderStore = defineStore('order', () => {
  const orders = ref([])
  const credentials = ref(getCredentials())

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${credentials.value.token}`
  }

  async function fetchOrders() {
    const response = await axios.get(
      'http://127.0.0.1:8000/api/orders/' + credentials.value.user.id,
      {
        headers
      }
    )
    orders.value = response.data
  }

  return {
    orders,
    credentials,
    fetchOrders
  }
})

export { useOrderStore }
