<script setup>
import { reactive } from 'vue'
import DefaultInput from '@/components/DefaultInput.vue'
import DefaultButton from '@/components/DefaultButton.vue'
import { useAuthStore } from '@/stores/auth.store'
import { RouterLink } from 'vue-router'

const authStore = useAuthStore()

const form = reactive({
  email: '',
  password: ''
})

function login(form) {
  authStore.login(form)
}
</script>

<template>
  <section class="flex justify-center items-center min-h-screen">
    <div class="max-w-md w-full">
      <form @submit.prevent="login(form)" class="border-2 border-blue-700 rounded-md px-6 py-5">
        <h1 class="text-blue-700 font-semibold text-3xl mb-10">Login Form</h1>

        <label for="email">Email:</label>
        <default-input
          type="email"
          name="email"
          id="email"
          class="mb-5"
          placeholder="nelsonarabit@gmail.com"
          :modelValue="form.email"
          @newValue="(newValue) => (form.email = newValue)"
          required
        />

        <label for="password">Password:</label>
        <default-input
          type="password"
          name="password"
          id="password"
          class="mb-5"
          placeholder="*********"
          :modelValue="form.password"
          @newValue="(newValue) => (form.password = newValue)"
          required
        />

        <default-button type="submit">LOGIN</default-button>
        <p class="text-sm text-blue-700 mt-2 font-medium">
          Don't have an account?
          <span class="underline cursor-pointer"
            ><router-link :to="{ name: 'register' }">Register</router-link></span
          >
        </p>
      </form>
    </div>
  </section>
</template>
