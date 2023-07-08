<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="flex justify-center items-center h-screen">
    <div class="flex flex-col">
      <div>
        <h1 class="text-blue-700 text-4xl font-bold">Flower Store PH</h1>
        <h2 class="text-blue-700 2xl font-semibold">Metro Manila's #1 Online Gift Store</h2>
      </div>

      <div class="flex gap-2 mt-5">
        <router-link :to="{ name: 'login' }" class="button-form text-center uppercase w-fit"
          >Login</router-link
        >
        <router-link :to="{ name: 'register' }" class="button-form text-center uppercase w-fit"
          >Register</router-link
        >
      </div>
    </div>
  </section>
</template>
