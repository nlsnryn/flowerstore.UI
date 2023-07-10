<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import DefaultButton from '@/components/DefaultButton.vue'
import { useProductStore } from '@/stores/product.store'
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

const authStore = useAuthStore()
const { credentials } = storeToRefs(authStore)
const productStore = useProductStore()
const { products } = storeToRefs(productStore)
const isLoading = ref(false)

onMounted(async () => {
  try {
    isLoading.value = true
    await productStore.fetchProducts()
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
})

onUnmounted(() => {})
</script>

<template>
  <div v-if="isLoading" class="flex justify-center items-center">
    <div class="mt-28 bg-blue-700 text-white text-xs uppercase font-medium px-10 py-3 rounded-md">
      <h1>Loading ...</h1>
    </div>
  </div>
  <section v-else class="mt-28 mb-14">
    <header class="font-medium text-blue-700 mb-10">
      <div class="mb-5">
        <h1 class="font-medium text-sm tracking-wide uppercase">
          Welcome {{ credentials.user.first_name }}, Good Day!
        </h1>
      </div>
      <h1 class="font-bold text-2xl table-text text-blue-700">All products, Buy now</h1>
      <p class="text-lg">Gifting Season Sale</p>
    </header>

    <main class="flex flex-col md:flex-row gap-5 flex-wrap justify-center md:justify-start">
      <div
        v-for="product in products"
        :key="product.id"
        class="bg-blue-600 rounded-md text-white p-5 md:max-w-xs lg:max-w-sm"
      >
        <h1 class="mb-2 text-2xl md:text-xl lg:text-2xl xl:text-3xl">{{ product.product_name }}</h1>
        <p class="mb-3 text-sm md:text-base lg:text-sm xl:text-base">
          {{ product.product_description }}
        </p>
        <h2 class="mb-5 text-lg md:text-base lg:text-lg xl:text-xl">₱{{ product.price }}</h2>

        <router-link :to="{ name: 'product', params: { id: product.id } }">
          <default-button class="w-full md:w-auto bg-blue-800">View Info</default-button>
        </router-link>
      </div>
    </main>
  </section>
</template>
