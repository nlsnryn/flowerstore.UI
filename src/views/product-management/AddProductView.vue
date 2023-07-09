<script setup>
import { reactive } from 'vue'
import DefaultInput from '@/components/DefaultInput.vue'
import DefaultButton from '@/components/DefaultButton.vue'
import { useProductStore } from '@/stores/product.store'
import { RouterLink } from 'vue-router'
import { useErrorStore } from '@/stores/error.store'

const productStore = useProductStore()
const errorStore = useErrorStore()
const form = reactive({
  product_name: '',
  product_description: '',
  quantity: null,
  price: null
})

function storeProduct(form) {
  const formData = {
    ...form,
    quantity: Number(form.quantity),
    price: parseFloat(form.price)
  }
  // console.log(formData)
  productStore.storeProduct(formData)
}
</script>

<template>
  <section class="flex justify-center items-center min-h-screen">
    <div class="w-full max-w-2xl">
      <div class="flex justify-end mb-10">
        <router-link :to="{ name: 'productManagement' }">
          <button class="flex items-center gap-2 text-xl hover:text-blue-800 text-blue-700">
            <i class="fa-solid fa-arrow-left"></i>
            <span class="text-sm font-medium uppercase tracking-wide">Back</span>
          </button>
        </router-link>
      </div>

      <h1 class="text-blue-700 font-semibold text-3xl mb-10">Add new product</h1>

      <div v-if="errorStore.hasErrors" class="max-w-md mx-auto mb-2 px-2">
        <span class="text-xs font-medium uppercase tracking-wide text-red-500">{{
          errorStore.state.message
        }}</span>
      </div>
      <form
        @submit.prevent="storeProduct(form)"
        class="border-2 border-blue-700 rounded-md px-6 py-5 mt-10"
      >
        <label for="prodname" class="table-text">Product Name:</label>
        <default-input
          type="text"
          name="productName"
          id="prodname"
          class="mb-4"
          placeholder="Perfect You"
          :modelValue="form.product_name"
          @newValue="(newValue) => (form.product_name = newValue)"
          required
        />

        <div class="flex flex-col">
          <label for="proddescription" class="table-text">Product Description:</label>
          <textarea
            type="text"
            name="prodDescription"
            id="proddescription"
            class="mb-4 input-text"
            v-model="form.product_description"
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
          :modelValue="form.quantity"
          @newValue="(newValue) => (form.quantity = newValue)"
          required
        />

        <label for="price" class="table-text">Price:</label>
        <default-input
          type="number"
          name="price"
          id="price"
          class="mb-8"
          placeholder="100.00"
          :modelValue="form.price"
          @newValue="(newValue) => (form.price = newValue)"
          required
        />

        <default-button type="submit">ADD PRODUCT</default-button>
      </form>
    </div>
  </section>
</template>
