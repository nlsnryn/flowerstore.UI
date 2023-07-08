<script setup>
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <div class="">
    <div class="w-full mx-auto">
      <header>
        <div class="shadow-lg fixed top-0 inset-x-0">
          <Navbar />
        </div>
      </header>

      <main class="max-w-7xl mx-auto w-11/12">
        <RouterView />
      </main>
    </div>
  </div>
</template>
