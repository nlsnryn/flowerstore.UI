<script setup>
import { useOrderStore } from '@/stores/order.store'
import { storeToRefs } from 'pinia'
import { onMounted, ref, computed } from 'vue'

const orderStore = useOrderStore()
const { orders, credentials } = storeToRefs(orderStore)
const totalOrders = ref(null)
const totalAmount = ref(null)
const isLoading = ref(false)

totalOrders.value = computed(() => {
  return orders.value.length
})

totalAmount.value = computed(() => {
  return orders.value.reduce((total, order) => total + parseFloat(order.order_price), 0)
})

onMounted(async () => {
  try {
    isLoading.value = true
    await orderStore.fetchOrders()
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
  <section v-else class="mt-28">
    <h1 class="table-text text-lg text-blue-700 mb-10">
      Hi {{ credentials.user.first_name }}! GOOD DAY.
    </h1>

    <div v-if="orders.length == 0" class="flex justify-center">
      <div class="flex items-center gap-2 sm:gap-5">
        <h1 class="text-xl sm:text-4xl text-blue-700 font-semibold">No Orders yet</h1>
        <i class="text-xl fa-solid fa-circle-check sm:text-4xl text-blue-700"></i>
      </div>
    </div>
    <!--TABLE-->
    <table v-else class="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th scope="col" class="px-6 py-3 text-left text-xs table-text">Order ID</th>
          <th scope="col" class="px-6 py-3 text-left text-xs table-text">Product Name</th>
          <th scope="col" class="px-6 py-3 text-left text-xs table-text">Price</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="order in orders" :key="order.id">
          <td class="px-6 py-4 whitespace-nowrap table-text">{{ order.order_id }}</td>
          <td class="px-6 py-4 whitespace-nowrap table-text">{{ order.product_name }}</td>
          <td class="px-6 py-4 whitespace-nowrap table-text">₱{{ order.order_price }}</td>
        </tr>
        <!-- Add more rows here as needed -->
      </tbody>
    </table>

    <p class="my-20 text-sm font-medium uppercase tracking-wide">
      The summary of your order indicates that you have a
      <span class="text-blue-700"> total of {{ totalOrders }} orders</span>, with a combined
      <span class="text-blue-700"> amount of ₱{{ totalAmount }}</span
      >.
    </p>
  </section>
</template>
