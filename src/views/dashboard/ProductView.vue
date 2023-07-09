<script setup>
import DefaultButton from '@/components/DefaultButton.vue'
import Modal from '@/components/Modal.vue'
import { ref, defineProps, onMounted } from 'vue'
import { useProductStore } from '@/stores/product.store'
import { useOrderStore } from '@/stores/order.store'
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'

const productStore = useProductStore()
const { product } = storeToRefs(productStore)
const orderStore = useOrderStore()
const { credentials } = storeToRefs(orderStore)
const showModal = ref(false)
const isLoading = ref(false)

const props = defineProps({
  id: String
})

function successOrder() {
  const formData = {
    product_id: product.value.id,
    user_id: credentials.value.user.id,
    price: parseFloat(product.value.price)
  }
  orderStore.successOrder(formData)
}

onMounted(async () => {
  try {
    isLoading.value = true
    await productStore.showProduct(props.id)
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
  <section v-else class="flex justify-center items-center min-h-screen">
    <div class="max-w-xl">
      <div class="flex justify-end mb-40">
        <router-link :to="{ name: 'dashboard' }">
          <button class="flex items-center gap-2 text-xl hover:text-blue-800 text-blue-700">
            <i class="fa-solid fa-arrow-left"></i>
            <span class="text-sm font-medium uppercase tracking-wide">Back</span>
          </button>
        </router-link>
      </div>
      <h1 class="text-4xl font-semibold text-blue-700 mb-5">{{ product.product_name }}</h1>
      <p class="text-lg mb-4">
        {{ product.product_description }}
      </p>
      <h2 class="text-xl font-medium mb-5">₱{{ product.price }}</h2>

      <default-button @click="showModal = true">Buy</default-button>
    </div>

    <Modal :activeModal="showModal" @store-order="successOrder()" @close-modal="showModal = false">
      <div class="text-black">
        <h1 class="text-sm sm:text-base">Are you sure to buy this product?</h1>
      </div>
    </Modal>
  </section>
</template>
