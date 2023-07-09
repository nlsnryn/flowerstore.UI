import { defineStore } from 'pinia'
import axios from 'axios'
import router from '../router'
import { ref } from 'vue'
import { getCredentials } from '@/helper/LocalStorage'
import { useErrorStore } from './error.store'
import { data } from 'autoprefixer'

const useProductStore = defineStore('product', () => {
  const errorStore = useErrorStore()
  const credentials = ref(getCredentials())
  const products = ref([])
  const product = ref({})

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${credentials.value.token}`
  }

  async function fetchProducts() {
    const response = await axios.get('http://127.0.0.1:8000/api/products', { headers })
    products.value = response.data.filter((data) => data.status == 1)
  }

  async function fetchProductsForAdmin() {
    const response = await axios.get('http://127.0.0.1:8000/api/products', { headers })
    products.value = response.data
  }

  async function storeProduct(form) {
    try {
      errorStore.clearState()
      await axios.post('http://127.0.0.1:8000/api/products', form, { headers })
      // console.log(response.data)

      router.push({ name: 'productManagement' })
    } catch (error) {
      errorStore.setState(error.response.data)
    }
  }

  async function showProduct(id) {
    const response = await axios.get('http://127.0.0.1:8000/api/products/' + id, { headers })
    product.value = response.data
  }

  async function updateProduct(id, form) {
    try {
      errorStore.clearState()
      await axios.put('http://127.0.0.1:8000/api/products/' + id, form, { headers })

      router.push({ name: 'productManagement' })
    } catch (error) {
      errorStore.setState(error.response.data)
    }
  }

  return {
    products,
    product,
    updateProduct,
    fetchProductsForAdmin,
    fetchProducts,
    storeProduct,
    showProduct
  }
})

export { useProductStore }
