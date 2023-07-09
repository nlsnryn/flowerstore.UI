<script setup>
import { useAuthStore } from '@/stores/auth.store'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const authStore = useAuthStore()
const { credentials } = storeToRefs(authStore)
const showMenu = ref(true)

function logout() {
  authStore.logout()
}
</script>

<template>
  <nav class="px-2 md:px-10 py-2 md:flex justify-between items-center bg-blue-700">
    <div>
      <h1 class="text-gray-100 sm:text-xl font-bold text-lg">Flower Store PH</h1>
      <h2 class="text-gray-100 sm:text-base text-xs font-semibold">
        Metro Manila's #1 Online Gift Store
      </h2>
    </div>

    <span
      v-if="authStore.isAuthenticated()"
      @click="showMenu = !showMenu"
      class="absolute md:hidden right-4 top-2 cursor-pointer text-4xl"
    >
      <i class="text-white" :class="[showMenu ? 'bi bi-x' : 'bi bi-filter-left']"></i>
    </span>

    <div v-if="authStore.isAuthenticated()">
      <div
        class="md:flex md:item-center md:px-0 md:pt-0 md:pb-0 md:space-x-2 md:space-y-0 space-y-0.5 pb-5 pt-5 md:static absolute bg-blue-700 md:w-auto w-full top-14 duration-700 ease-in text-white font-medium"
        :class="[showMenu ? 'left-0' : 'left-[100%]']"
      >
        <div
          v-if="!authStore.isAdmin()"
          class="md:space-x-2 md:mx-0 md:space-y-0 space-y-0.5 mx-2 flex flex-col md:flex-row"
        >
          <router-link class="nav" :to="{ name: 'dashboard' }">Dashboard</router-link>
          <router-link class="nav" :to="{ name: 'orders' }">Orders</router-link>
        </div>
        <div v-else class="mx-2 flex">
          <router-link class="nav w-full" :to="{ name: 'productManagement' }"
            >Product Management</router-link
          >
        </div>
        <ul>
          <li class="cursor-pointer nav md:mx-0 mx-2" @click="logout()">Logout</li>
        </ul>
      </div>
    </div>
  </nav>
</template>
