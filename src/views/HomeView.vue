<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="flex items-center h-screen">
    <div class="max-w-5xl w-full mx-auto">
      <div class="flex flex-col">
        <div>
          <h1 class="text-blue-700 text-4xl sm:text-7xl font-bold">FlowerStore PH</h1>
          <h2 class="text-blue-700 text-xl sm:text-2xl font-semibold">
            Metro Manila's #1 Online Gift Store
          </h2>
        </div>

        <p class="text-blue-700 text-sm sm:text-lg mt-6">
          Welcome to our online flower store, where beauty and fragrance intertwine to create
          unforgettable moments. Step into a virtual garden of blooms, where nature's delicate
          wonders are just a click away. Our carefully curated collection of flowers embodies
          elegance, emotion, and enchantment, making every bouquet a masterpiece.
        </p>

        <div class="flex gap-3 mt-10">
          <router-link
            :to="{ name: 'login' }"
            class="button-form sm:px-5 sm:py-2 text-center uppercase w-fit"
            >Login your account</router-link
          >
          <router-link
            :to="{ name: 'register' }"
            class="button-form sm:px-10 sm:py-2 text-center uppercase w-fit"
            >Create an account</router-link
          >
        </div>
      </div>
    </div>
  </section>
</template>
