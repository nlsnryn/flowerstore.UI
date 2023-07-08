<script setup>
import { onMounted } from 'vue'
import DefaultButton from '@/components/DefaultButton.vue'
import { useProductStore } from '@/stores/product.store'
import { storeToRefs } from 'pinia'

const productStore = useProductStore()
const { products } = storeToRefs(productStore)

onMounted(() => {
  productStore.fetchProducts()
})
</script>

<template>
  <section class="mt-28">
    <header class="font-medium text-blue-700 mb-10">
      <h1 class="font-bold text-2xl">All products, Buy now</h1>
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

        <default-button class="w-full md:w-auto bg-blue-800">View Info</default-button>
      </div>
    </main>
  </section>
</template>
