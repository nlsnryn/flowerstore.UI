<script setup>
import DefaultButton from '@/components/DefaultButton.vue'
import Modal from '@/components/Modal.vue'
import { ref } from 'vue'

const showModal = ref(false)
</script>

<template>
  <section class="flex justify-center items-center min-h-screen">
    <div class="max-w-xl">
      <div class="flex justify-end mb-40">
        <button class="flex items-center gap-2 text-xl hover:text-blue-800 text-blue-700">
          <i class="fa-solid fa-arrow-left"></i>
          <span class="text-medium">Back</span>
        </button>
      </div>
      <h1 class="text-4xl font-semibold text-blue-700 mb-5">Perfect you</h1>
      <p class="text-lg mb-4">
        What better way to show your care and appreciation for your loved ones than this arrangement
        of a dozen fresh and classic red roses. This stunning bouquet radiates your unconditional
        love for your person.
      </p>
      <h2 class="text-xl font-medium mb-5">₱799.00</h2>

      <default-button @click="showModal = true">Buy</default-button>
    </div>

    <Modal :activeModal="showModal" @close-modal="showModal = false">
      <div class="text-black">
        <h1 class="text-sm sm:text-base">Are you sure to buy this product?</h1>
      </div>
    </Modal>
  </section>
</template>
