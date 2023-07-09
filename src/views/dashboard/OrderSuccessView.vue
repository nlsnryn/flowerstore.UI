<script setup>
import DefaultButton from '@/components/DefaultButton.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="flex justify-center items-center min-h-screen">
    <div class="max-w-xl w-full">
      <div class="flex items-center gap-5">
        <h1 class="text-4xl text-blue-700 font-semibold">Order Successfully</h1>
        <i class="fa-solid fa-circle-check text-4xl text-blue-700"></i>
      </div>

      <p class="text-lg mt-5">
        Your order is confirmed. We're now processing your request and will keep you updated every
        step of the way. Thank you for choosing FlowerstorePH.
      </p>

      <router-link :to="{ name: 'dashboard' }">
        <default-button class="mt-10">Return to dashboard</default-button>
      </router-link>
    </div>
  </section>
</template>
