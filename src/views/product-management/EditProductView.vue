<script setup>
import DefaultInput from '@/components/DefaultInput.vue'
import DefaultButton from '@/components/DefaultButton.vue'
import { defineProps, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useProductStore } from '@/stores/product.store'
import { storeToRefs } from 'pinia'
import { useErrorStore } from '@/stores/error.store'

const productStore = useProductStore()
const errorStore = useErrorStore()
const { product } = storeToRefs(productStore)
const isLoading = ref(false)

const props = defineProps({
  id: String
})

function updateProduct(form) {
  const formData = {
    ...form,
    price: parseFloat(form.price),
    status: Number(form.status)
  }
  productStore.updateProduct(props.id, formData)
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
  <section v-else class="flex justify-center items-center min-h-screen mt-10">
    <div class="w-full max-w-2xl">
      <div class="flex justify-end mb-10">
        <router-link :to="{ name: 'productManagement' }">
          <button class="flex items-center gap-2 text-xl hover:text-blue-800 text-blue-700">
            <i class="fa-solid fa-arrow-left"></i>
            <span class="text-sm font-medium uppercase tracking-wide">Back</span>
          </button>
        </router-link>
      </div>

      <h1 class="text-blue-700 font-semibold text-3xl mb-10">Edit product</h1>

      <div v-if="errorStore.hasErrors" class="max-w-md mx-auto mb-2 px-2">
        <span class="text-xs font-medium uppercase tracking-wide text-red-500">{{
          errorStore.state.message
        }}</span>
      </div>
      <form
        @submit.prevent="updateProduct(product)"
        class="border-2 border-blue-700 rounded-md px-6 py-5 mt-10"
      >
        <label for="prodname" class="table-text">Product Name:</label>
        <default-input
          type="text"
          name="productName"
          id="prodname"
          class="mb-4"
          placeholder="Perfect You"
          :modelValue="product.product_name"
          @newValue="(newValue) => (product.product_name = newValue)"
          required
        />

        <div class="flex flex-col">
          <label for="proddescription" class="table-text">Product Description:</label>
          <textarea
            type="text"
            name="prodDescription"
            id="proddescription"
            class="mb-4 input-text"
            v-model="product.product_description"
            required
          ></textarea>
        </div>

        <label for="quantity" class="table-text">Quantity:</label>
        <default-input
          type="number"
          name="quantity"
          id="quantity"
          class="mb-4"
          placeholder="1"
          :modelValue="product.quantity"
          @newValue="(newValue) => (product.quantity = newValue)"
          required
        />

        <label for="price" class="table-text">Price:</label>
        <default-input
          type="number"
          name="price"
          id="price"
          class="mb-4"
          placeholder="100.00"
          :modelValue="product.price"
          @newValue="(newValue) => (product.price = newValue)"
          required
        />

        <label for="price" class="table-text">Select product status:</label>
        <select
          v-model="product.status"
          class="block w-full mb-6 px-2 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="1">Enable</option>
          <option value="0">Disable</option>
        </select>

        <default-button type="submit" class="uppercase">update product</default-button>
      </form>
    </div>
  </section>
</template>
