<script setup>
import { useOrderStore } from '@/stores/order.store'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const orderStore = useOrderStore()
const { orders, credentials } = storeToRefs(orderStore)

onMounted(() => {
  orderStore.fetchOrders()
})
</script>

<template>
  <section class="mt-28">
    <h1 class="text-xl font-medium text-blue-700 mb-10 uppercase">
      Hi {{ credentials.user.first_name }}! GOOD DAY.
    </h1>
    <table class="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Order ID
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
            Price
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="order in orders" :key="order.id">
          <td class="px-6 py-4 whitespace-nowrap">{{ order.order_id }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ order.product_name }}</td>
          <td class="px-6 py-4 whitespace-nowrap">₱{{ order.order_price }}</td>
        </tr>
        <!-- Add more rows here as needed -->
      </tbody>
    </table>

    <p class="mt-10">SUMMARY: Your number of orders is 5 and total amount is ₱13,000</p>
  </section>
</template>
