<script setup>
import DefaultButton from '@/components/DefaultButton.vue'
import { useProductStore } from '@/stores/product.store'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const productStore = useProductStore()
const { products } = storeToRefs(productStore)

onMounted(() => {
  productStore.fetchProducts()
})
</script>

<template>
  <section class="mt-28">
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
          <td class="px-6 py-4 whitespace-nowrap">{{ product.id }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ product.product_name }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ product.quantity }}</td>
          <td class="px-6 py-4 whitespace-nowrap">₱{{ product.price }}</td>
          <td class="px-6 py-4 whitespace-nowrap">
            {{ product.status ? 'Available' : 'Not available' }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
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
