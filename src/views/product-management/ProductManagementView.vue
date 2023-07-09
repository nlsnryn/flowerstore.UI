<script setup>
import DefaultButton from '@/components/DefaultButton.vue'
import { useProductStore } from '@/stores/product.store'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const productStore = useProductStore()
const { products } = storeToRefs(productStore)
const isLoading = ref(false)

onMounted(async () => {
  try {
    isLoading.value = true
    await productStore.fetchProductsForAdmin()
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div v-if="isLoading" class="flex justify-center items-center">
    <div class="mt-28 bg-blue-700 text-white text-xs uppercase font-medium px-10 py-3 rounded-md">
      <h1>Loading ...</h1>
    </div>
  </div>
  <section v-else class="my-32">
    <div class="mb-5">
      <h1 class="font-medium text-sm tracking-wide uppercase">Welcome Administrator, Good Day!</h1>
    </div>
    <div class="flex justify-end mb-10">
      <default-button class="w-fit"
        ><router-link :to="{ name: 'addProduct' }">Add new product</router-link></default-button
      >
    </div>
    <table class="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Product ID
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Product Name
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Quantity
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Price
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Status
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Edit
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="product in products" :key="product.id">
          <td class="px-6 py-4 whitespace-nowrap table-text">{{ product.id }}</td>
          <td class="px-6 py-4 whitespace-nowrap table-text">{{ product.product_name }}</td>
          <td class="px-6 py-4 whitespace-nowrap table-text">{{ product.quantity }}</td>
          <td class="px-6 py-4 whitespace-nowrap table-text">₱{{ product.price }}</td>
          <td class="px-6 py-4 whitespace-nowrap table-text">
            {{ product.status ? 'Available' : 'Not available' }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap table-text">
            <router-link
              :to="{ name: 'editProduct', params: { id: product.id } }"
              class="text-blue-600 hover:text-blue-900"
              >Edit</router-link
            >
          </td>
        </tr>
        <!-- Add more rows here as needed -->
      </tbody>
    </table>
  </section>
</template>
