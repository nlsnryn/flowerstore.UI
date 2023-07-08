<script setup>
import { reactive } from 'vue'
import DefaultInput from '@/components/DefaultInput.vue'
import DefaultButton from '@/components/DefaultButton.vue'
import { useAuthStore } from '@/stores/auth.store'
import { RouterLink } from 'vue-router'

const authStore = useAuthStore()
const form = reactive({
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  password_confirmation: '',
  mobile_number: '',
  address: ''
})

function register(form) {
  authStore.register(form)
}
</script>

<template>
  <section class="flex justify-center items-center min-h-screen">
    <div class="max-w-md w-full">
      <form
        @submit.prevent="register(form)"
        class="border-2 border-blue-700 rounded-md px-6 py-5 mt-28"
      >
        <h1 class="text-blue-700 font-semibold text-3xl mb-10">Registration Form</h1>

        <label for="fname">First name:</label>
        <default-input
          type="text"
          name="firstName"
          id="fname"
          class="mb-2"
          placeholder="Nelson Ryan"
          :modelValue="form.first_name"
          @newValue="(newValue) => (form.first_name = newValue)"
          required
        />

        <label for="lname">Last name:</label>
        <default-input
          type="text"
          name="lastName"
          id="lname"
          class="mb-2"
          placeholder="Arabit"
          :modelValue="form.last_name"
          @newValue="(newValue) => (form.last_name = newValue)"
          required
        />

        <label for="email">Email:</label>
        <default-input
          type="email"
          name="email"
          id="email"
          class="mb-2"
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
          class="mb-2"
          placeholder="********"
          :modelValue="form.password"
          @newValue="(newValue) => (form.password = newValue)"
          required
        />

        <label for="confirm_password">Confirm Password:</label>
        <default-input
          type="password"
          name="confirm_password"
          id="confirm_password"
          class="mb-2"
          placeholder="********"
          :modelValue="form.password_confirmation"
          @newValue="(newValue) => (form.password_confirmation = newValue)"
          required
        />

        <label for="number">Mobile number:</label>
        <default-input
          type="text"
          name="mobileNo"
          id="number"
          class="mb-2"
          placeholder="09305782924"
          :modelValue="form.mobile_number"
          @newValue="(newValue) => (form.mobile_number = newValue)"
        />

        <label for="address">Address:</label>
        <default-input
          type="text"
          name="address"
          id="address"
          class="mb-5"
          placeholder="Libid Binangonan Rizal"
          :modelValue="form.address"
          @newValue="(newValue) => (form.address = newValue)"
        />

        <default-button type="submit">REGISTER</default-button>
        <p class="text-sm text-blue-700 mt-2 font-medium">
          Already have an account?
          <span class="underline cursor-pointer"
            ><router-link :to="{ name: 'login' }">Login</router-link></span
          >
        </p>
      </form>
    </div>
  </section>
</template>
