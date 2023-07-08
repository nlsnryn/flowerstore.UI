<script setup>
import { useAuthStore } from '@/stores/auth.store'
import { RouterLink } from 'vue-router'

const authStore = useAuthStore()

function logout() {
  authStore.logout()
}
</script>

<template>
  <nav class="px-10 py-2 flex justify-between items-center bg-blue-700">
    <div>
      <h1 class="text-gray-100 sm:text-xl font-bold text-lg">Flower Store PH</h1>
      <h2 class="text-gray-100 sm:text-base text-sm font-semibold">
        Metro Manila's #1 Online Gift Store
      </h2>
    </div>
    <div v-if="authStore.isAuthenticated()">
      <div class="sm:flex hidden space-x-4 text-gray-100 font-medium">
        <router-link class="hover:nav" :to="{ name: 'dashboard' }">Dashboard</router-link>
        <router-link class="hover:nav" :to="{ name: 'orders' }">Orders</router-link>
        <router-link class="hover:nav" :to="{ name: 'productManagement' }"
          >Product Management</router-link
        >
        <ul>
          <li class="cursor-pointer hover:nav" @click="logout()">Logout</li>
        </ul>
      </div>
    </div>
  </nav>
</template>
